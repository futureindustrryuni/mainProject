<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserPanelController extends Controller
{
    public function showProfile()
    {
    if (auth()->check()) {
    $user = auth()->user();
    return response()->json([
        'name' => $user->name,
        'email' => $user->email,
        'profile_photo_url' => $user->profile_photo_url,
        'joined_at' => $user->created_at->format('Y/m/d'),
        'developers' => [
            'address' => $user->developerProfile->address]
        ]);
    }
}

    # This Sesction May Be Only For Phase 2 ! (Its For Developer's Projects)
    public function myProjects()
    {
    if (auth()->check()) {
    $user = auth()->user();

    if ($user){
        $projects = $user->developerProfile ->projects()
        ->select('title', 'published_at', 'image')->latest() ->get();
    } else {
        return response()->json(['message' => 'Developer profile not found'], 404);
    }

    return response()->json($projects);
        }
    }


    public function show($id)
    {
        $user = User::with('developer')->findOrFail($id);

        return response()->json([
            'name' => $user->name,
            'email' => $user->email,
            'profile_photo_url' => $user->profile_photo_url,
            'joined_at' => $user->created_at->format('Y/m/d'),
            'developer_info' => $user->developerProfile ? [
                'address' => $user->developerProfile->address,
            ] : null
        ]);
    }
}

