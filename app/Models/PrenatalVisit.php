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
    ];

    protected $casts = [
        'visit_date' => 'date',
    ];

    /**
     * Get the maternal record that owns the prenatal visit.
     */
    public function maternalRecord()
    {
        return $this->belongsTo(MaternalRecord::class);
    }
}
