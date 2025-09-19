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
    /* Admin login
     */
    public function login(Request $req)
    {
        $valid = $req->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $admin = Admin::where('email', $req->email)->first();
        if (!$admin || !Hash::check($req->password, $admin->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $admin->createToken('admin-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'admin' => $admin
        ]);
    }

    /* 
    Admin registration
    */
    public function register(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admin',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $admin = Admin::create([
            'name' => $req->name,
            'email' => $req->email,
            'password' => Hash::make($req->password),
        ]);

        $token = $admin->createToken('admin-token')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Admin registered successfully',
            'token' => $token,
            'admin' => $admin
        ], 201);
    }

    /* Show all users
     */
    public function showUsers()
    {
        $show = User::select('id', 'name', 'email', 'created_at')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json([
            'message' => 'All users retrieved successfully',
            'data' => $show
        ]);
    }

    /* 
    Search for a specific user
     */
    public function searchUser($id)
    {
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

    /*
     Delete a user
     */
    public function destroyUser($id)
    {
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

    /* Show all products
     */
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
        return response()->json([
            'status' => true,
            'message' => 'Admin profile retrieved successfully',
            'data' => $request->user()
        ]);
    }

    public function allProfiles()
    {
        $admins = Admin::select('id', 'name', 'email', 'created_at')
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
        $admin = $request->user();

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:admin,email,' . $admin->id,
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $admin->update($request->only(['name', 'email']));

        return response()->json([
            'status' => true,
            'message' => 'Profile updated successfully',
            'data' => $admin
        ]);
    }
    public function checkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $exists = Admin::where('email', $request->email)->exists();
        return response()->json(['email' => $request->email,
                                'exists' => $exists]);
    }
}