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
        $product = Product::find($productId);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
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
        $image = ProductImage::find($id);

        if (!$image) {
            return response()->json(['message' => 'Image not found'], 404);
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