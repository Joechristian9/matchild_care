<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DeliveryInformation extends Model
{
    protected $table = 'delivery_information';

    protected $fillable = [
        'maternal_record_id',
        'delivery_type',
        'birth_weight',
        'weight_category',
        'health_facility_type',
        'health_facility_capable',
        'non_health_facility',
        'birth_attendant',
        'delivery_date',
        'delivery_time',
    ];

    protected $casts = [
        'delivery_date' => 'date',
    ];

    public function maternalRecord(): BelongsTo
    {
        return $this->belongsTo(MaternalRecord::class);
    }
}
