<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrenatalSupplementation extends Model
{
    use HasFactory;

    protected $fillable = [
        'maternal_record_id',
        'visit_number',
        'supplementation_date',
        'tablets_given',
        'supplement_type',
    ];

    protected $casts = [
        'supplementation_date' => 'date',
    ];

    /**
     * Get the maternal record that owns the prenatal supplementation.
     */
    public function maternalRecord()
    {
        return $this->belongsTo(MaternalRecord::class);
    }
}
