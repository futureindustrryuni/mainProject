<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Product;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    
    public function index($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product->comments);
    }

    
    public function store(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        if (!$product) 
            return response()->json(['message' => 'Product not found'], 404);

        $user = auth()->id();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized: User not authenticated'], 401);
        }

        $validated = $request->validate([
            'body' => 'required|string|max:1000',
            'rating' => 'required|integer|min:1|max:5',
        ]);
        $comment = $product->comments()->create([
            'user_id' => $user,
            'body' => $validated['body'],
            'rating' => $validated['rating'],
            ]);

        return response()->json([
            'message' => 'Comment created successfully',
            'data' => $comment->load('user')
        ], 201);
    }

    
    public function update(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);

        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        $user = auth()->user();
        if (!$user || $comment->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'body' => 'required|string|max:1000',
        ]);

        $comment->update($validated);

        return response()->json([
            'message' => 'Comment updated successfully',
            'data' => $comment
        ]);
    }

    
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);

        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        $user = auth()->user();
        if (!$user || $comment->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted']);
    }
}