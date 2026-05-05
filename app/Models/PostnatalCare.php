<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PostnatalCare extends Model
{
    protected $table = 'postnatal_care';

    protected $fillable = [
        'maternal_record_id',
        'contact_1',
        'contact_2',
        'contact_3',
        'contact_4',
        'completed_4pnc',
    ];

    protected $casts = [
        'contact_1' => 'date',
        'contact_2' => 'date',
        'contact_3' => 'date',
        'contact_4' => 'date',
        'completed_4pnc' => 'boolean',
    ];

    public function maternalRecord(): BelongsTo
    {
        return $this->belongsTo(MaternalRecord::class);
    }
}
