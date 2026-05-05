<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PostpartumIfaCompletion extends Model
{
    protected $fillable = [
        'maternal_record_id',
        'completion_type',
        'completed',
        'date_completed',
    ];

    protected $casts = [
        'date_completed' => 'date',
    ];

    public function maternalRecord(): BelongsTo
    {
        return $this->belongsTo(MaternalRecord::class);
    }
}
