<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductImageController extends Controller
{
    
    public function index($productId)
    {
        if (!$user) return response()->json(['message' => 'Unauthorized'], 401);

        $product = Product::find($productId);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product->images);
    }

    
    public function store(Request $request, $productId)
    {
        $user = auth()->user();

        if (!$user || !in_array($user->role, ['developer','admin'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $product = Product::find($productId);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        if ($user->role === 'developer' && $product->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized: You can only upload to your own products'], 403);
        }

        $validated = $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png|max:4096',
        ]);

        $path = $request->file('image')->store('product_images', 'public');

        $image = new ProductImage();
        $image->product_id = $productId;
        $image->path = $path;
        $image->save();

        return response()->json($image, 201);
    }

   
    public function destroy($id)
    {
        $user = auth()->user();

        if (!$user || !in_array($user->role, ['developer','admin'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $image = ProductImage::find($id);

        if (!$image) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        $product = $image->product;
        if ($user->role === 'developer' && $product->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized: You can only delete from your own products'], 403);
        }

        Storage::disk('public')->delete($image->path);
        $image->delete();
        return response()->json(['message' => 'Image deleted']);
    }

    public function isAuthenticated(){
        $user = auth()->user();

        if (!$user || !in_array($user->role, ['developer'])) 
            return response()->json(['message' => 'Unauthorized: Only developer can create Project'], 403);
            return null;
    }
}