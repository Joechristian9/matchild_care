<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HighRiskSupplementation extends Model
{
    use HasFactory;

    protected $fillable = [
        'maternal_record_id',
        'completed_calcium_supplementation',
        'visit_number',
        'supplementation_date',
        'tablets_given',
    ];

    protected $casts = [
        'supplementation_date' => 'date',
        'completed_calcium_supplementation' => 'boolean',
    ];

    public function maternalRecord()
    {
        return $this->belongsTo(MaternalRecord::class);
    }
}
