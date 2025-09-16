<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function store(Request $request)
{

    $emailRule = 'required|email|unique:users,email';

if ($request->filled('id')) {
    $emailRule .= ',' . $request->id;
}
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => $emailRule,
        'password' => 'required|string|min:6',
        'phone' => 'nullable|string|max:20',
        'purchase_count' => 'nullable|integer',
        'status' => 'boolean',
        'last_login' => 'nullable|date',
    ]);

   
    if (isset($validated['password'])) {
        $validated['password'] = bcrypt($validated['password']);
    }

    $user = User::updateOrCreate(
        ['email' => $validated['email']],$validated 
    );

    return response()->json(['user' => $user], 200);
}
}
