<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class StoreController extends Controller
{
    public function index(Request $request){
        $query = Product::with('images' , 'category');

        if($request->has('search')){
            $query->where('title','like','%'.$request->search.'%');
        }

        if($request->has('category_id')){
            $query->where('category_id',$request->category_id);
        }

        if($request->has(['min_price','max_price'])){
            $query->whereBetween('price',[$request->min_price,$request->max_price]);
        }

        if($request->has('rating')){
            $query->whereHas('comments',function($q) use ($request){
                $q->havingRaw('AVG(rating) >= ?',[$request->rating]);
            });
        }

        if($request->sort == 'lastest'){
            $query->orderBy('created_at','desc');
        }elseif($request->sort == 'popular'){
            $query->withCount('comments')->orderBy('comments_count','desc');
        }

        $products = $query->paginate(10);

        return response()->json(['products' => $products]);


        
    }
    
}
