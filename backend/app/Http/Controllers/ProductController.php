<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
        {
            $userId = auth()->id();
            $products = Product::select('id', 'title', 'description', 'category_id' ,'technologies','price','user_id','is_approved')
            ->whereHas('user', function ($query) {
                $query->where('role', 'developer');
                })
            ->orderBy('created_at', 'desc')->get();

            return response()->json([
                'message' => 'List Of All Avaiable Products :',
                'data' => $products
            ]);
        }

    public function store(Request $request)
    {
        $user = auth()->user();
        if ($user->role !== 'developer') {
            return response()->json([
                'message' => 'Only Developers Can Create Project.'
            ], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'technologies' => 'required|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $validated['user_id'] = auth()->id();
        $validated['is_approved'] = '1';
        $product = Product::create($validated);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $imageFile) {
                $path = $imageFile->store('product_images', 'public');
                $product->images()->create([
                    'path' => $path,
                ]);
            }
        }

        return response()->json(['product' => $product->load('images')], 201);
    }

    public function show($id)
    {
        $product = Product::with(['images','comments.user','category.products'])->findOrFail($id);
        $product->increment('views');
        return response()->json(['product'=>$product]);
    }

    
    public function updateProduct(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $user = auth()->user();

        if ($user->id !== $product->user_id && $user->role !== 'admin' && $user->role !== 'supervisor') {
            return response()->json(['message' => 'You are not authorized to update this product.'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string',
            'description' => 'sometimes|string',
            'technologies' => 'sometimes|string',
            'price' => 'sometimes|numeric',
            'category_id' => 'sometimes|exists:categories,id',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $product->update($validated);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $imageFile) {
                $path = $imageFile->store('product_images', 'public');
                $product->images()->create([
                    'path' => $path,
                ]);
            }
        }

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product->load('images')
        ]);
    }

    public function deleteProduct($id)
    {
        $product = Product::findOrFail($id);
        $user = auth()->user();

        if ($user->id !== $product->user_id && $user->role !== 'admin' && $user->role !== 'supervisor') {
            return response()->json(['message' => 'You are not authorized to delete this product.'], 403);
        }

        foreach ($product->images as $image) {
            \Storage::disk('public')->delete($image->path);
            $image->delete();
        }

        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
        }

    public function isAuthenticated(){
        $user = auth()->user();

        if (!$user || !in_array($user->role, ['admin', 'supervisor'])) 
            return response()->json(['message' => 'Unauthorized: Only admin or supervisor allowed'], 403);
            return null;
    }
}
