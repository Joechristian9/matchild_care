<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChildImmunization extends Model
{
protected $fillable = [
        'child_id',

        'protected_at_birth_tt2',
        'protected_at_birth_tt3_tt5',

        'bcg_0_28_days',
        'bcg_29_days_to_1_year',

        'hepa_b_within_24_hours',
        'hepa_b_more_than_24_hours',

        'pentavalent_1',
        'pentavalent_2',
        'pentavalent_3',

        'opv_1',
        'opv_2',
        'opv_3',

        'ipv_1',
        'ipv_2',

        'pcv_1',
        'pcv_2',
        'pcv_3',

        'mmr_1',
        'mmr_2',

        'fic',
        'cic',

        'remarks_action_taken',
    ];
    protected $casts = [
        'protected_at_birth_tt2' => 'boolean',
        'protected_at_birth_tt3_tt5' => 'boolean',

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

        'fic' => 'boolean',
        'cic' => 'boolean',
    ];

    public function child()
    {
        return $this->belongsTo(Child::class);
    }
}
