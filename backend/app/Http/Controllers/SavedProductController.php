<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SavedProduct;

class SavedProductController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $savedProducts = $user->savedProducts()->get();

        return response()->json([
            'status' => true,
            'message' => 'Saved products retrieved successfully',
            'data' => $savedProducts
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        $saved = SavedProduct::firstOrCreate([
            'user_id' => $request->user()->id,
            'product_id' => $request->product_id
        ]);

        return response()->json([
            'message' => 'Product saved successfully',
            'data' => $saved
        ]);
    }

    public function destroy(Request $request, $id)
    {
        if ($this->isAuthenticated() !== null)
        return $this->isAuthenticated();
        $saved = SavedProduct::where('user_id', $request->user()->id)
            ->where('product_id', $id)
            ->firstOrFail();

        $saved->delete();

        return response()->json([
            'message' => 'Product removed from saved successfully'
        ]);
    }

    public function isAuthenticated(){
        $user = auth()->user();

        if (!$user || !in_array($user->role, ['admin', 'supervisor'])) 
            return response()->json(['message' => 'Unauthorized: Only admin or supervisor allowed'], 403);
            return null;
    }
}
