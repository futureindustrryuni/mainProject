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

        $user = User::create([
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'status' => true,
            'role' => 'user',
        ]);

        $token = $user->createToken('api_token')->plainTextToken;

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'family' => $user->family,
                'email' => $user->email,
                'password' => $user->password,
                'phone' => $user->phone,
                'role' => $user->role,
                'birth_day' =>$user->birth_day,
                'meli_code' =>$user->meli_code,
                'education' =>$user->education,
                'profile_photo_url' => $user->profile_photo_url,
                'last_login' => $user->last_login,
                'last_login_human' => $user->last_login
                    ? Carbon::parse($user->last_login)->diffForHumans()
                    : null,
                'status' => $user->status,
                'profile_completed' => "false",
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ],
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

        if ($user->tokens()->count() > 0) {
            return response()->json([
                'message' => 'You are already logged in.',
                'user' => [
                    'id' => $user->id,
                    'email' => $user->email,
                    'last_login' => $user->last_login,
                    'last_login_human' => $user->last_login
                        ? Carbon::parse($user->last_login)->diffForHumans()
                        : null,
                ]
            ], 403);
        }

        $user->update(['last_login' => now()]);

        $token = $user->createToken('api_token')->plainTextToken;

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'family' => $user->family,
                'email' => $user->email,
                'phone' => $user->phone,
                'role' => $user->role,
                'profile_photo_url' => $user->profile_photo_url,
                'last_login' => $user->last_login,
                'last_login_human' => $user->last_login
                    ? Carbon::parse($user->last_login)->diffForHumans()
                    : null,
                'status' => $user->status,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ],
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }

}
