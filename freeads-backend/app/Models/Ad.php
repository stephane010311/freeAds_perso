<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Ad extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'category',
        'description',
        'photo',
        'price',
        'location'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
