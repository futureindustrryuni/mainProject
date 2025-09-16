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
        'profile_image',
        'status',
        'last_login',
        'teaching_experience',
        'confirmation',
    ];

    public function projects()
    {
        return $this->belongsToMany(Project::class);
    }
}