<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PostpartumSupplementation extends Model
{
    protected $fillable = [
        'maternal_record_id',
        'completed_ifa',
        'visit_number',
        'visit_date',
        'tablets_given',
    ];

    protected $casts = [
        'completed_ifa' => 'boolean',
        'visit_date' => 'date',
    ];

    public function maternalRecord(): BelongsTo
    {
        return $this->belongsTo(MaternalRecord::class);
    }
}
