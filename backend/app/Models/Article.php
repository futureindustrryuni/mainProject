<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category_id',
        'author_id',
        'reading_time',
        'tags',
        'image',
        'description',
    ];

    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}