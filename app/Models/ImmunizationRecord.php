<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImmunizationRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'maternal_record_id',
        'td1_tt1',
        'td2_tt2',
        'td3_tt3',
        'td4_tt4',
        'td5_tt5',
        'fully_immunized_status',
        'deworming_date',
    ];

    protected $casts = [
        'td1_tt1' => 'date',
        'td2_tt2' => 'date',
        'td3_tt3' => 'date',
        'td4_tt4' => 'date',
        'td5_tt5' => 'date',
        'deworming_date' => 'date',
    ];

    /**
     * Get the maternal record that owns the immunization record.
     */
    public function maternalRecord()
    {
        return $this->belongsTo(MaternalRecord::class);
    }
}
