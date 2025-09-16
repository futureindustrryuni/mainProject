<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{

    public function index()
        {
            $products = Product::orderBy('created_at', 'desc')->get();

            return response()->json([
                'message' => 'List Of All Avaiable Products :',
                'data' => $products
            ]);
        }

    public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string',
        'description' => 'required|string',
        'technologies' => 'required|string',
        'price' => 'required|numeric',
        'stock' => 'required|integer',
        'category_id' => 'required|exists:categories,id',
    ]);

    $product = Product::create($validated);

    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $imageFile) {

            $path = $imageFile->store('products', 'public');

            $product->images()->create([
                'path' => $path,
            ]);
        }
    }

    return response()->json(['product' => $product->load('images')], 201);
}

    public function show($id){
        $product = Product::with(['images','comments.user','category.products'])->findOrFail($id);
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
