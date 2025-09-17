<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function images(){
        return $this->hasMany(ProductImage::class);
    }
    public function comments(){
        return $this->hasMany(Comment::class);

    }
    public function category(){
        return $this->belongsTo(Category::class);
    }
    
    public function savedByUsers() {
    return $this->hasMany(SavedProduct::class);
    }

     public function likes()
    {
        return $this->hasMany(ProductLike::class);
    }

    protected $fillable = [
        'title','price','stock','description','technologies','category_id','is_approved'
    ];
}
