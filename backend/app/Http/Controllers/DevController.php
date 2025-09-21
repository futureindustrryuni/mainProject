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
        $path = $request->file('resume_file_path')->store('resumes', 'public');
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
                'status' => $developer->status
        ],
    ]);
}

    /**
     * Display the specified resource.
     */
    public function show(Developer $developers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function approve($id)
    {
        $developer = Developer::findOrFail($id);
        $developer->status = 'approved';
        $developer->save();

        return response()->json([
            'message' => 'Developer resume approved successfully',
            'data' => $developer
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Developer $developers)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Developer $developers)
    {
        //
    }
}
