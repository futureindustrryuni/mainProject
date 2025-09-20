<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function store(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'family' => 'nullable|string|max:255',
            'role' => 'nullable|in:user,supervisor,developer,admin',
            'birth_date' => 'nullable|date',
            'meli_code' => 'nullable|digits:10',
            'phone' => 'nullable|string|max:20',
            'education' => 'nullable|in:دیپلم,فوق دیپلم,لیسانس,دکترا,پرفسورا',
            'address' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:500',
            'email' => 'nullable|email|unique:users,email',
            'password' => 'nullable',
            'last_login' => 'nullable|date',
            'status' => 'nullable|boolean',
        ]);

        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
        unset($validated['email'], $validated['password']);

        $isProfileCompleted = 
           !empty($validated['name'])
        && !empty($validated['family'])
        && !empty($validated['role'])
        && !empty($validated['birth_date'])
        && !empty($validated['meli_code'])
        && !empty($validated['phone'])
        && !empty($validated['education'])
        && !empty($validated['address'])
        && !empty($validated['bio']);
        $validated['profile_completed'] = $isProfileCompleted;
        $validated['status'] = $validated['status'] ?? true;
        $user->update($validated);

        return response()->json([
        'message' => 'The Informations Have Beed Updated',
        'data' => $user
        ]);
    }

public function checkEmail(Request $request)
{
    $request->validate(['email' => 'required|email']);
    $exists = User::where('email', $request->email)->exists();
    return response()->json(['email' => $request->email,
                             'exists' => $exists]);
}
}
