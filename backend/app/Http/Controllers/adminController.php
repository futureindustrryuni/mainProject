<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Admin;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class adminController extends Controller
{
//     /* Admin login
//      */
//     public function login(Request $req)
//     {
//         $valid = $req->validate([
//             'email' => 'required|email',
//             'password' => 'required'
//         ]);

//         $admin = Admin::where('email', $req->email)->first();
//         if (!$admin || !Hash::check($req->password, $admin->password)) {
//             return response()->json(['message' => 'Invalid credentials'], 401);
//         }

//         $token = $admin->createToken('admin-token')->plainTextToken;

//         return response()->json([
//             'token' => $token,
//             'admin' => $admin
//         ]);
//     }

//     /* 
//     Admin registration
//     */
//     public function register(Request $req)
//     {
//         $validator = Validator::make($req->all(), [
//             'name' => 'required|string|max:255',
//             'email' => 'required|string|email|max:255|unique:admin',
//             'password' => 'required|string|min:8|confirmed',
//         ]);

//         if ($validator->fails()) {
//             return response()->json([
//                 'status' => false,
//                 'message' => 'Validation error',
//                 'errors' => $validator->errors()
//             ], 422);
//         }

//         $admin = Admin::create([
//             'name' => $req->name,
//             'email' => $req->email,
//             'password' => Hash::make($req->password),
//         ]);

//         $token = $admin->createToken('admin-token')->plainTextToken;

//         return response()->json([
//             'status' => true,
//             'message' => 'Admin registered successfully',
//             'token' => $token,
//             'admin' => $admin
//         ], 201);
//     }

//     /* Show all users
//      */
    public function showUsers()
    {
        if ($this->isAuthenticated() !== null)
        return $this->isAuthenticated();
        $show = User::select('id', 'name', 'email', 'role' , 'created_at')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json([
            'message' => 'All users retrieved successfully',
            'data' => $show
        ]);
    }

//     /* 
//     Search for a specific user
//      */
    public function searchUser($id)
    {
        if ($this->isAuthenticated() !== null)
        return $this->isAuthenticated();
        $search = User::select('id', 'name', 'email', 'created_at')->find($id);

        if (!$search) {
            return response()->json([
                'status' => false,
                'message' => 'User not found!'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'User found successfully',
            'data' => $search
        ]);
    }

//     /*
//      Delete a user
//      */
    public function destroyUser($id)
    {
        if ($this->isAuthenticated() !== null)
        return $this->isAuthenticated();
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found!'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'status' => true,
            'message' => 'User deleted successfully'
        ]);
    }

//     /* Show all products
//      */
    public function showProduct()
    {
        $products = Product::select(['id', 'title', 'description', 'category_id', 'created_at'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'message' => 'Products Seen By Admins',
            'data' => $products
        ]);
    }
    /* Search for a specific product
     */
    public function searchProduct($id)
    {
        $prod = Product::select('id', 'title', 'description', 'created_at')->find($id);

        if (!$prod) {
            return response()->json([
                'status' => false,
                'message' => 'Product not found!'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Product found successfully',
            'data' => $prod
        ]);
    }

    public function destroyProduct($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Product not found!'
            ], 404);
        }

        $product->delete();

        return response()->json([
            'status' => true,
            'message' => 'product deleted successfully'
        ]);
    }

    /* Get admin profile
     */
    public function profile(Request $request)
    {
        if ($this->isAuthenticated() !== null)
        return $this->isAuthenticated();
        return response()->json([
            'status' => true,
            'message' => 'Admin profile retrieved successfully',
            'data' => $request->user()
        ]);
    }

    public function allProfiles()
    {
        if ($this->isAuthenticated() !== null)
        return $this->isAuthenticated();
        $admins = User::select('id', 'name', 'role' , 'email', 'created_at')
            ->where('role', 'admin')
            ->orderBy('created_at', 'desc')->get();

        return response()->json([
            'message' => 'All admins retrieved successfully',
            'data' => $admins
        ]);
    }

    /**
     * Update admin profile
     */
    public function updateProfile(Request $request)
    {
        if ($this->isAuthenticated() !== null)
        return $this->isAuthenticated();        
        $admin = $request->user();

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|unique:users,email'
        ]);

        $admin->update($request->only(['name', 'email']));

        return response()->json([
            'status' => true,
            'message' => 'Profile updated successfully',
            'data' => $admin
        ]);
    }
    public function checkEmail(Request $request)
    {
        if ($this->isAuthenticated() !== null)
        return $this->isAuthenticated();

        $request->validate(['email' => 'required|email']);
        $exists = User::where('email', $request->email)->exists();
        return response()->json(['email' => $request->email,
                                'exists' => $exists]);
    }

    public function updateRole(Request $request, $id)
    {
    if ($this->isAuthenticated() !== null)
        return $this->isAuthenticated();

    $request->validate([
        'role' => 'required|in:admin,developer,supervisor,user'
    ]);

    $user = User::find($id);
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    if ($user->role === 'supervisor') {
        return response()->json(['message' => 'supervisor role cannot be changed'], 403);
    }

    if ($request->role === 'supervisor') {
        return response()->json(['message' => 'You cannot assign supervisor role'], 403);
    }

    $user->role = $request->role;
    $user->save();

    return response()->json([
        'message' => 'User role updated successfully',
        'data' => $user
    ]);
    }

    public function banUser($id)
    {
    if ($this->isAuthenticated() !== null)
        return $this->isAuthenticated();

    $user = User::find($id);
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    if ($user->role === 'supervisor') {
        return response()->json(['message' => 'supervisor cannot be banned'], 403);
    }

    $user->status = false;
    $user->save();

    return response()->json([
        'message' => 'User has been banned successfully',
        'data' => $user
    ]);
    }

    public function isAuthenticated(){
        $user = auth()->user();

        if (!$user || !in_array($user->role, ['admin', 'supervisor'])) 
            return response()->json(['message' => 'Unauthorized: Only admin or supervisor allowed'], 403);
            return null;
    }
}