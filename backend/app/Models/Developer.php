<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
// use HasFactory;

class Developer extends Model

{
    protected $fillable = [
        'resume_text',
        'resume_pdf_url',
        'experience',
        'score',
        'request_resume_completed',
        'request_project_post'];

    protected $casts = [
        'request_resume_completed' => 'boolean',
        'request_project_post' => 'boolean',
        'score' => 'float',
    ];

    public function user() {
    return $this->belongsTo(User::class);}

    public function projects() {
        return $this->hasMany(Project::class);}
}
