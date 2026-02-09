<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Habit extends Model
{
    protected $fillable = ['user_id', 'name', 'icon', 'streak', 'last_completed_at'];

    protected $casts = [
        'last_completed_at' => 'datetime'
    ];

    protected $appends = ['is_completed_today'];

    protected function isCompletedToday(): Attribute
    {
        return Attribute::get(function () {
            return $this->last_completed_at?->isToday() ?? false;
        });
    }
}