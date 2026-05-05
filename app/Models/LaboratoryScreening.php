<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LaboratoryScreening extends Model
{
    use HasFactory;

    protected $fillable = [
        'maternal_record_id',
        'completed_hepatitis_b',
        'hepatitis_b_date',
        'hepatitis_b_result',
        'completed_cbc_hgb_hct',
        'cbc_hgb_hct_date',
        'cbc_hgb_hct_result',
        'completed_gestational_diabetes',
        'gestational_diabetes_date',
        'gestational_diabetes_result',
    ];

    protected $casts = [
        'hepatitis_b_date' => 'date',
        'cbc_hgb_hct_date' => 'date',
        'gestational_diabetes_date' => 'date',
        'completed_hepatitis_b' => 'boolean',
        'completed_cbc_hgb_hct' => 'boolean',
        'completed_gestational_diabetes' => 'boolean',
    ];

    public function maternalRecord()
    {
        return $this->belongsTo(MaternalRecord::class);
    }
}
