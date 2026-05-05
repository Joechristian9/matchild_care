<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NutritionalAssessment extends Model
{
    use HasFactory;

    protected $fillable = [
        'maternal_record_id',
        'height',
        'weight_1st_trimester',
        'weight_2nd_trimester',
        'weight_3rd_trimester',
        'bmi_1st_trimester',
        'remarks',
    ];

    protected $casts = [
        'height' => 'decimal:2',
        'weight_1st_trimester' => 'decimal:2',
        'weight_2nd_trimester' => 'decimal:2',
        'weight_3rd_trimester' => 'decimal:2',
        'bmi_1st_trimester' => 'decimal:2',
    ];

    /**
     * Get the maternal record that owns the nutritional assessment.
     */
    public function maternalRecord()
    {
        return $this->belongsTo(MaternalRecord::class);
    }
}
