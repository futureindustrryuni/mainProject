<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Skill extends Model
{
    use HasFactory;

    protected $table = 'user_skills';
    protected $fillable = [
        'user_id',
        'skill',
        'percentage',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

}
