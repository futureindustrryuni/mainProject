<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class OwnerController extends Controller
{
    public function updateRole(Request $request, $id)
    {
        $request->validate([
            'role' => 'required|in:user,admin,developer',
        ]);

        $user = User::findOrFail($id);
        if ($request->user()->role !== 'supervisor') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $user->role = $request->role;
        $user->save();

        return response()->json([
            'message' => 'User role updated successfully',
            'user' => $user
        ]);
    }

    public function showUsers()
    {
        $users = User::select('id', 'name', 'email', 'role', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'message' => 'Users retrieved successfully',
            'data' => $users
        ]);
    }

    public function destroyUser(Request $request, $id)
    {
        $user = User::findOrFail($id);
        if ($request->user()->role !== 'supervisor') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $user->delete();
        return response()->json([
            'status' => true,
            'message' => 'User deleted successfully',
            'data' => null
        ]);
    }
}
