<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ApproveController extends Controller
{
    public function approve($id) 
    {    
         
        if ($this->isAuthenticated() !== null)
        return $this->isAuthenticated();
        
        $product = Product::findOrFail($id);                    # Approves Products By Their ID (Must Only Be Approved By Admins !)
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

    public function reject($id)
    {
        if ($this->isAuthenticated() !== null)
            return $this->isAuthenticated();
        
        $product = Product::findOrFail($id);            # Rejects Products By Their ID (Must Only Be Rejected By Admins !)
        if ($product->is_approved === '0') {            # Checks If Product Has Already Been Rejected Or No
            return response()->json([
                'message' => 'Product already rejected.',
                'product' => $product
            ], 200);
        }
        
        $product->is_approved = '0';
        $product->save();

        return response()->json([
            'message' => 'Product rejected successfully',
            'product' => $product
        ], 200);
    }

    public function isAuthenticated()
    {
        $user = auth()->user();

        if (!$user || !in_array($user->role, ['admin', 'supervisor'])) 
            return response()->json(['message' => 'Unauthorized: Only admin or supervisor allowed'], 403);
            return null;
    }
}
