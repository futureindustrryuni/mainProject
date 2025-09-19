<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Professor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'last_name',
        'father_name',
        'email',
        'phone_number',
        'password',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class,'product_professor');
    }
}