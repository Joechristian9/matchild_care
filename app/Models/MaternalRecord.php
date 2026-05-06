<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MaternalRecord extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'date_of_registration',
        'family_serial',
        'last_name',
        'first_name',
        'middle_initial',
        'address',
        'age',
        'age_group',
        'last_menstrual_period',
        'gravida',
        'parity',
        'expected_date_of_delivery',
    ];

    protected $casts = [
        'date_of_registration' => 'date',
        'last_menstrual_period' => 'date',
    ];

    /**
     * Get the user that owns the maternal record.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the prenatal visits for the maternal record.
     */
    public function prenatalVisits()
    {
        return $this->hasMany(PrenatalVisit::class);
    }

    /**
     * Get the nutritional assessment for the maternal record.
     */
    public function nutritionalAssessment()
    {
        return $this->hasOne(NutritionalAssessment::class);
    }

    /**
     * Get the immunization record for the maternal record.
     */
    public function immunizationRecord()
    {
        return $this->hasOne(ImmunizationRecord::class);
    }

    /**
     * Get the prenatal supplementations for the maternal record.
     */
    public function prenatalSupplementations()
    {
        return $this->hasMany(PrenatalSupplementation::class);
    }

    /**
     * Get the micronutrient supplementations for the maternal record.
     */
    public function micronutrientSupplementations()
    {
        return $this->hasMany(MicronutrientSupplementation::class);
    }

    /**
     * Get the high risk supplementations for the maternal record.
     */
    public function highRiskSupplementations()
    {
        return $this->hasMany(HighRiskSupplementation::class);
    }

    /**
     * Get the laboratory screening for the maternal record.
     */
    public function laboratoryScreening()
    {
        return $this->hasOne(LaboratoryScreening::class);
    }

    /**
     * Get the pregnancy outcome for the maternal record.
     */
    public function pregnancyOutcome()
    {
        return $this->hasOne(PregnancyOutcome::class);
    }

    /**
     * Get the postpartum supplementations for the maternal record.
     */
    public function postpartumSupplementations()
    {
        return $this->hasMany(PostpartumSupplementation::class);
    }

    /**
     * Get the postpartum IFA completions for the maternal record.
     */
    public function postpartumIfaCompletions()
    {
        return $this->hasMany(PostpartumIfaCompletion::class);
    }

    /**
     * Get the postpartum remark for the maternal record.
     */
    public function postpartumRemark()
    {
        return $this->hasOne(PostpartumRemark::class);
    }

    /**
     * Get the delivery information for the maternal record.
     */
    public function deliveryInformation()
    {
        return $this->hasOne(DeliveryInformation::class);
    }

    /**
     * Get the postnatal care for the maternal record.
     */
    public function postnatalCare()
    {
        return $this->hasOne(PostnatalCare::class);
    }
    public function children()
    {
        return $this->hasMany(Child::class);
    }
    /**
     * Get the full name attribute.
     */
    public function getFullNameAttribute()
    {
        return trim("{$this->first_name} {$this->middle_initial} {$this->last_name}");
    }
}
