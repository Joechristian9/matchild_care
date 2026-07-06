<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrenatalVisit extends Model
{
    use HasFactory;

    protected $fillable = [
        'maternal_record_id',
        'visit_number',
        'visit_date',
        'weight',
        'height',
        'blood_pressure_systolic',
        'blood_pressure_diastolic',
        'temperature',
        'heart_rate',
        'respiratory_rate',
        'fetal_heart_tone',
        'fundal_height',
        'others',
        'is_completed',
    ];

    protected $casts = [
        'visit_date' => 'date',
        'weight' => 'decimal:2',
        'height' => 'decimal:2',
        'temperature' => 'decimal:1',
        'fundal_height' => 'decimal:1',
        'is_completed' => 'boolean',
    ];

    /**
     * Get the maternal record that owns the prenatal visit.
     */
    public function maternalRecord()
    {
        return $this->belongsTo(MaternalRecord::class);
    }
}
