<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'Developed_in',
        'title',
        'description',
        'price',
        'status',
    ];

    public function professors()
    {
        return $this->belongsToMany(Professor::class);
    }

}