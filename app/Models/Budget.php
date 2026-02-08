<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Budget extends Model
{
    protected $fillable = [
        'target_name', 
        'category', 
        'description',
        'amount', 
        'type',
        'folder_id', 
        'user_id'
    ];
    public function folder(): BelongsTo
    {
        return $this->belongsTo(Folder::class);
    }
}