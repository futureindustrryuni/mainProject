<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductLikesController extends Controller
{
    public function toggleLike($productId)
    {
        $userId = Auth::id();
        if (!$userId) { return response()->json(['message' => 'unathenticated'], 401); }
        
        $product = Product::findOrFail($productId);

        $like = ProductLike::where('product_id', $productId)->where('user_id', $userId)->first();

        if ($like) {
            $like->delete();
            $liked = false;
        } else {
            ProductLike::create([
                'product_id' => $productId,
                'user_id' => $userId,
            ]);
            $liked = true;
        }

        return response()->json([
            'liked' => $liked,
            'likes_count' => $product->likes()->count(),
        ]);
    }
}
