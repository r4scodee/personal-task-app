<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Habit extends Model
{
    protected $fillable = ['user_id', 'name', 'icon', 'streak', 'last_completed_at'];

    public function isCompletedToday()
    {
        return $this->last_completed_at == now()->toDateString();
    }
}
