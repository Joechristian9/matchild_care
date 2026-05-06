<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Child extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'maternal_record_id',
        'date_of_registration',
        'family_serial',
        'last_name',
        'first_name',
        'middle_initial',
        'sex',
        'date_of_birth',
        'address',
    ];

    protected $casts = [
        'protected_at_birth_tt2' => 'boolean',
        'protected_at_birth_tt3_tt5' => 'boolean',
        'fic' => 'boolean',
        'cic' => 'boolean',

        'bcg_0_28_days' => 'date',
        'bcg_29_days_to_1_year' => 'date',
        'hepa_b_within_24_hours' => 'date',
        'hepa_b_more_than_24_hours' => 'date',
        'pentavalent_1' => 'date',
        'pentavalent_2' => 'date',
        'pentavalent_3' => 'date',
        'opv_1' => 'date',
        'opv_2' => 'date',
        'opv_3' => 'date',
        'ipv_1' => 'date',
        'ipv_2' => 'date',
        'pcv_1' => 'date',
        'pcv_2' => 'date',
        'pcv_3' => 'date',
        'mmr_1' => 'date',
        'mmr_2' => 'date',
    ];

    /**
     * Mother / Maternal Record
     */
    public function maternalRecord()
    {
        return $this->belongsTo(MaternalRecord::class);
    }

    /**
     * Child Immunization Record
     */
    public function childImmunizationRecord()
    {
        return $this->hasOne(ChildImmunization::class, 'child_id');
    }

    /**
     * Full Name Attribute
     */
    public function getFullNameAttribute()
    {
        return trim(
            "{$this->last_name}, {$this->first_name}" .
            ($this->middle_initial ? " {$this->middle_initial}." : "")
        );
    }
}
