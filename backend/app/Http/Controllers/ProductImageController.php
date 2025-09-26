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
        $originalName = $request->file('image')->getClientOriginalName();
        $path = $request->file('image')->storeAs('product_images', $originalName, 'public');

        $image = $product->images()->create([
        'path' => $path,
        ]);

        return response()->json([
            'id' => $image->id,
            'url' => asset('storage/' . $image->path),
        ], 201);
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
}