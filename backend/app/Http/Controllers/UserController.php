<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function store(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'family' => 'nullable|string|max:255',
            'birth_date' => 'nullable|date',
            'meli_code' => 'nullable|max:255',
            'phone' => 'nullable|string|max:20',
            'education' => 'nullable|in:دیپلم,فوق دیپلم,لیسانس,فوق لیسانس,دکترا,پرفسورا',
            'address' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:500',
            'email' => 'nullable|email|unique:users,email',
            'password' => 'nullable',
            'profile_photo_url' => 'nullable|image|mimes:jpg,jpeg,png|max:4096',
            'last_login' => 'nullable|date',
            'status' => 'nullable|boolean',
        ]);

        $user = auth()->user();

        if (!$user) 
            return response()->json(['message' => 'User not authenticated'], 401);
        
        $validated = Arr::except($validated, ['email', 'password', 'role']);

        if ($request->hasFile('profile_photo_url')) {   
            if (!empty($user->profile_photo_url)) {
                Storage::disk('public')->delete($user->profile_photo_url);
            }
            $photoPath = $request->file('profile_photo_url')->store('profile_photo_url', 'public');
            $validated['profile_photo_url'] = $photoPath;
        }

        $required = [
        'name',
        'family',
        'birth_date',
        'meli_code',
        'phone',
        'education',
        'address',
        'bio',
        ];

        $isProfileCompleted = true;
        foreach ($required as $field) {
            $val = $validated[$field] ?? $user->$field ?? null;
            if (empty($val)) {
                $isProfileCompleted = false;
                break;
            }
        }

        if (empty($validated['profile_photo_url']) && empty($user->profile_photo_url))
            $isProfileCompleted = false;

        $validated['profile_completed'] = $isProfileCompleted;
        $validated['status'] = $validated['status'] ?? true;
        $user->update($validated);
        $user->refresh();

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
