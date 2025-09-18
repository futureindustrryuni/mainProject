<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ApproveController extends Controller
{
    public function approve($id) {    
         
        $admin = auth('admin')->user();
        if (!$admin) {
            return response()->json([
                'message' => 'Unauthorized. Only admins can approve products.'
            ], 403);
        }         
        $product = Product::findOrFail($id);            # Approves Products By Their ID (Must Only Be Approved By Admins !)
        if ($product->is_approved === '2'){                     # Checks If Product Has Already Been Added Or No

            return response()->json([
                'message' => 'Product already approved.',
                'product' => $product], 200);
            }           
        
        $product->is_approved = '2';          
        $product->save();

        return response()->json([
            'message' => 'Product approved successfully',
            'product' => $product], 200);
        }
    }
