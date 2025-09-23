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

    public function show($id){
        $product = Product::with(['images','comments.user','category.products'])->findOrFail($id);
        $product->increment('views');
        return response()->json(['product'=>$product]);
    }

    


    



    // public function search(Request $request){
    //     $query = $request->input('srch');

    //     $products = Product::with(['images', 'category'])
    //         ->where('name', 'LIKE', "%{$query}%")
    //         ->orWhere('description', 'LIKE', "%{$query}%")
    //         ->paginate(10);

    //     return response()->json(['products' => $products]);
    // }
}
