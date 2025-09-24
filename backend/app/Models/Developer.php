<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Developer extends Model
{
    protected $fillable = [
        'user_id',
        'resume_file_path',
    ];

    protected $casts = [
        'status' => 'string',
    ];

    public function user() {
        return $this->belongsTo(User::class);}

    public function projects() {
        return $this->hasMany(Project::class);}
}
