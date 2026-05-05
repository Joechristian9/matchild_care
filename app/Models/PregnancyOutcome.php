<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PregnancyOutcome extends Model
{
    use HasFactory;

    protected $fillable = [
        'maternal_record_id',
        'date_terminated',
        'outcome_type',
        'remarks_action_taken',
    ];

    protected $casts = [
        'date_terminated' => 'date',
    ];

    public function maternalRecord()
    {
        return $this->belongsTo(MaternalRecord::class);
    }
}
