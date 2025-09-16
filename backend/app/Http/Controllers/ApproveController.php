<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ApproveController extends Controller
{
    public function approve($id) {                 
        $product = Product::findOrFail($id);            # Approves Products By Their ID (Must Only Be Approved By Admins !)
        if ($product->is_approved){                     # Checks If Product Has Already Been Added Or No

            return response()->json([
                'message' => 'Product already approved.',
                'product' => $product], 200);
            }           
        
        $product->is_approved = true;          
        $product->save();

        return response()->json([
            'message' => 'Product approved successfully',
            'product' => $product], 200);

        }
    }
