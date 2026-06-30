<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMaternalCareRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            // Basic Information
            'date_of_registration' => 'required|date',
            'family_serial' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'middle_initial' => 'nullable|string|max:2',
            'address' => 'required|string|max:500',
            'age' => 'required|integer|min:10|max:49',
            'age_group' => 'required|string|in:10-14,15-19,20-49',
            
            // Vital Signs
            'vital_signs' => 'nullable|array',
            'vital_signs.blood_pressure_systolic' => 'nullable|numeric|min:0|max:300',
            'vital_signs.blood_pressure_diastolic' => 'nullable|numeric|min:0|max:200',
            'vital_signs.heart_rate' => 'nullable|numeric|min:0|max:250',
            'vital_signs.temperature' => 'nullable|numeric|min:30|max:45',
            'vital_signs.respiratory_rate' => 'nullable|numeric|min:0|max:100',
            'vital_signs.weight' => 'nullable|numeric|min:0|max:300',
            'vital_signs.height' => 'nullable|numeric|min:0|max:250',
            'vital_signs.bmi' => 'nullable|numeric|min:0|max:100',
            'vital_signs.fetal_heart_tone' => 'nullable|numeric|min:0|max:200',
            'vital_signs.fundal_height' => 'nullable|numeric|min:0|max:50',
            'vital_signs.others' => 'nullable|string|max:500',
            
            // Medical Information
            'last_menstrual_period' => 'required|date',
            'gravida' => 'required|integer|min:1',
            'parity' => 'required|integer|min:0',
            'expected_date_of_delivery' => 'nullable|string',
            
            // Prenatal Visits
            'visits' => 'nullable|array',
            
            // Nutritional Assessment
            'nutritional_assessment' => 'nullable|array',
            'nutritional_assessment.height' => 'nullable|numeric',
            'nutritional_assessment.weight_1st' => 'nullable|numeric',
            'nutritional_assessment.weight_2nd' => 'nullable|numeric',
            'nutritional_assessment.weight_3rd' => 'nullable|numeric',
            'nutritional_assessment.bmi_1st' => 'nullable|numeric',
            'nutritional_assessment.remarks' => 'nullable|string|in:N,U,O,A,B',
            
            // Immunization
            'immunization_status' => 'nullable|array',
            
            // Supplementations
            'prenatal_supplementation' => 'nullable|array',
            'micronutrient_supplementation' => 'nullable|array',
            'high_risk_supplementation' => 'nullable|array',
            'postpartum_supplementation' => 'nullable|array',
            
            // Laboratory Screening
            'laboratory_screening' => 'nullable|array',
            
            // Pregnancy Outcome
            'pregnancy_outcome' => 'nullable|array',
            'pregnancy_outcome.outcome_type' => 'nullable|string|in:FT,PT,FD,AB',
            
            // Delivery Information
            'delivery_info' => 'nullable|array',
            'delivery_info.delivery_type' => 'nullable|string|in:CS,VD,VBAC,Combined',
            'delivery_info.weight_category' => 'nullable|string|in:A,B,C',
            'delivery_info.birth_attendant' => 'nullable|string|in:MD,RN,MW,O,N/A',
            
            // Postnatal Care
            'postnatal_care' => 'nullable|array',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'age.min' => 'Age must be at least 10 years.',
            'age.max' => 'Age must not exceed 49 years.',
            'age_group.in' => 'Invalid age group selected.',
            'gravida.min' => 'Gravida must be at least 1.',
            'parity.min' => 'Parity cannot be negative.',
        ];
    }
}
