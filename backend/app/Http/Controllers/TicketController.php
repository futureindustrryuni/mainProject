<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tickets = Ticket::orderBy('created_at', 'desc')->get();

        return response()->json([
            'message' => 'All tickets retrieved successfully',
            'data' => $tickets
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'text' => 'required|string',
            'status' => 'closed',
        ]);
        $validated['user_id'] = auth()->id();

        $ticket = Ticket::create($validated);

        return response()->json([
            'message' => 'Ticket created successfully',
            'data' => $ticket
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $user = auth()->user();
        $ticket = Ticket::where('user_id', $user->id)
        ->orderBy('created_at', 'desc')
        ->get();

        return response()->json([
            'message' => 'Ticket retrieved successfully',
            'data' => $ticket
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->delete();

        return response()->json([
            'message' => 'Ticket deleted successfully'
        ]);
    }

    public function approve($id)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->status = 'open';
        $ticket->save();

        return response()->json([
            'message' => 'Ticket approved successfully',
            'data' => $ticket
        ]);
    }
}
