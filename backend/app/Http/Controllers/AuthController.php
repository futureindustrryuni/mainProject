<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // if ($$validated->fails()) {
        //     return response()->json([
        //         'status' => false,
        //         'message' => 'Validation error',
        //         'errors' => $$validated->errors()
        //     ], 422);
        // }

        $user = User::create([
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'status' => true,
            'role' => 'user',
        ]);

        $token = $user->createToken('api_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $this->formatUser($user),
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        if (! $user->status) {
            return response()->json(['message' => 'Account is disabled'], 403);
        }

        // if ($user->tokens()->count() > 0) {
        //     return response()->json([
        //         'message' => 'You are already logged in.',
        //         'user' => [
        //             'id' => $user->id,
        //             'email' => $user->email,
        //             'last_login' => $user->last_login,
        //             'last_login_human' => $user->last_login
        //                 ? Carbon::parse($user->last_login)->diffForHumans()
        //                 : null,
        //         ]
        //     ], 403);
        // }

        $user->update(['last_login' => now()]);

        $token = $user->createToken('api_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }

    private function formatUser(User $user)
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'family' => $user->family,
            'email' => $user->email,
            'phone' => $user->phone,
            'role' => $user->role,
            'birth_date' => $user->birth_date,
            'meli_code' => $user->meli_code,
            'education' => $user->education,
            'profile_photo_url' => $user->profile_photo_url,
            'last_login' => $user->last_login,
            'last_login_human' => $user->last_login
                ? Carbon::parse($user->last_login)->diffForHumans()
                : null,
            'status' => $user->status,
            'profile_completed' => $user->profile_completed ? "true" : "false",
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
        ];
    }
}
