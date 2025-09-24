<?php

namespace App\Http\Controllers;

use App\Models\Developer;
use Illuminate\Http\Request;
use App\Http\Requests\StoreDevRequests;
use Illuminate\Support\Facades\Auth;

class DevController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDevRequests $request)
    {
        $user = Auth::user();
        $originalName = $request->file('resume_file_path')->getClientOriginalName();
        $path = $request->file('resume_file_path')->storeAs('resumes', $originalName, 'public');
        $data = ['resume_file_path' => $path,];
    
        if ($user->developer) {
            $user->developer->update($data);                  // Update Data
            $developer = $user->developer;     
        } else {
            $developer = $user->developer()->create($data);   // Create Data
        }
        
        return response()->json([
            'message' => 'Resume Uploaded !',
            'developer' => [
                'id' => $developer->id,
                'resume_file_url' => asset('storage/' . $developer->resume_file_path),
                'status' => 'pending'
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        if ($this->isAuthenticated() !== null)
        return $this->isAuthenticated();
        $requests = Developer::with('user')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'message' => 'All developer requests retrieved successfully',
            'data' => $requests
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function approve($id)
    {
        if ($this->isAuthenticated() !== null)
        return $this->isAuthenticated();
        $developer = Developer::findOrFail($id);

        if ($developer->status === 'approved') {
            return response()->json([
                'message' => 'Status Is Already at Approved',
                'data' => $developer
            ], 400);
    }
        $developer->status = 'approved';
        $developer->save();

        $user = $developer->user;
        if ($user->role !== 'developer') {
            $user->role = 'developer';
            $user->save();
        }

        return response()->json([
            'message' => 'Developer resume approved successfully',
            'data' => $developer
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function reject($id)
    {
        if ($this->isAuthenticated() !== null)
        return $this->isAuthenticated();
        $developer = Developer::findOrFail($id);

        if ($developer->status === 'rejected') {
            return response()->json([
                'message' => 'Status Is Already at Rejected',
                'data' => $developer
            ], 400);
    }
        $developer->status = 'rejected'; 
        $developer->save();

        return response()->json([
            'message' => 'Developer resume rejected',
            'data' => $developer
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function status()
    {
    $user = auth()->user();

    if (!$user->developer) {
        return response()->json([
            'message' => 'No Resumes Has Been Added',
            'status' => null
        ], 404);
    }

    return response()->json([
        'message' => 'Your Resume Status :',
        'status' => $user->developer->status,
        'resume_url' => asset('storage/' . $user->developer->resume_file_path),
        'creation_date' => $user->developer->created_at->format('Y-m-d H:i:s'),
        'update_date' => $user->developer->updated_at->format('Y-m-d H:i:s')
        ]);
    }

    public function isAuthenticated(){
    $user = auth()->user();

    if (!$user || !in_array($user->role, ['admin', 'supervisor'])) 
        return response()->json(['message' => 'Unauthorized: Only admin or supervisor allowed'], 403);
        return null;
    }
}
