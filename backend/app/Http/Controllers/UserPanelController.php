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
            'message' => 'Your Profile Information',
            'data' => $user
        ]);
    }
    return response()->json(['message' => 'Unauthorized'], 401);
}

    # This Sesction May Be Only For Phase 2 ! (Its For Developer's Projects)
    public function myProjects()
    {
    if (auth()->check()) {
    $user = auth()->user();

    if ($user){
        $projects = $user->developer ->projects()
        ->select('title', 'published_at', 'image')->latest() ->get();
    } else {
        return response()->json(['message' => 'Developer profile not found'], 404);
    }

    return response()->json($projects);
        }
    }

    public function show($id)
    {
        $user = User::with(['developer', 'products'])->findOrFail($id);

        return response()->json([
            'name' => $user->name,
            'family' => $user->family,
            'email' => $user->email,
            'birth_date' => $user->birth_date,
            'education' => $user->education,
            'address' => $user->address,
            'bio' => $user->bio,
            'profile_photo_url' => $user->profile_photo_url,
            'products' => $user->products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'title' => $product->title,
                    'description' => $product->description,
                    'price' => $product->price,
                    'category_id' => $product->category_id,
                    'technologies' => $product->technologies,
                    'is_approved' => $product->is_approved,
                    'created_at' => $product->created_at,
                ];
            }),
        ]);
    }
}

