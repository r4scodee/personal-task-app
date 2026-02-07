<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    protected $fillable = ['folder_id', 'title', 'description', 'priority', 'is_completed', 'due_date'];

    public function folder(): BelongsTo
    {
        return $this->belongsTo(Folder::class);
    }
}