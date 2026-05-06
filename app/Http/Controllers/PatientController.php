<?php

namespace App\Http\Controllers;

use App\Models\MaternalRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function dashboard()
    {
        $user = auth()->user();
        
        // Get maternal record for the logged-in patient
        $maternalRecord = MaternalRecord::where('user_id', $user->id)
            ->with([
                'prenatalVisits',
                'immunizationRecord',
                'nutritionalAssessment',
            ])
            ->first();

        return Inertia::render('Patient/Dashboard', [
            'maternalRecord' => $maternalRecord ? [
                'id' => $maternalRecord->id,
                'first_name' => $maternalRecord->first_name,
                'last_name' => $maternalRecord->last_name,
                'age' => $maternalRecord->age,
                'blood_type' => null,
                'contact_number' => $maternalRecord->address,
                'lmp' => $maternalRecord->last_menstrual_period->format('Y-m-d'),
                'edc' => $maternalRecord->expected_date_of_delivery,
                'gravida' => $maternalRecord->gravida,
                'para' => $maternalRecord->parity,
                'prenatal_visits' => $maternalRecord->prenatalVisits->map(function($visit) {
                    return [
                        'visit_date' => $visit->visit_date ? $visit->visit_date->format('Y-m-d') : 'Scheduled',
                        'weight' => 'N/A',
                        'blood_pressure' => 'N/A',
                    ];
                }),
                'immunization_records' => $maternalRecord->immunizationRecord ? [[
                    'vaccine_type' => 'Tetanus Toxoid',
                    'date_given' => $maternalRecord->immunizationRecord->created_at->format('Y-m-d'),
                ]] : [],
            ] : null,
        ]);
    }

    public function myRecords()
    {
        $user = auth()->user();
        
        // Get all records for the logged-in patient
        $maternalRecord = MaternalRecord::where('user_id', $user->id)
            ->with([
                'prenatalVisits',
                'immunizationRecord',
                'nutritionalAssessment',
                'laboratoryScreening',
                'prenatalSupplementations',
                'micronutrientSupplementations',
                'highRiskSupplementations',
                'pregnancyOutcome',
                'deliveryInformation',
                'postnatalCare',
            ])
            ->first();

        $records = [
            'nutritional_assessments' => $maternalRecord?->nutritionalAssessment ? [$maternalRecord->nutritionalAssessment] : [],
            'laboratory_screenings' => $maternalRecord?->laboratoryScreening ? [$maternalRecord->laboratoryScreening] : [],
            'prenatal_supplementations' => $maternalRecord?->prenatalSupplementations ?? [],
            'delivery_information' => $maternalRecord?->deliveryInformation ?? null,
        ];

        return Inertia::render('Patient/MyRecords', [
            'records' => $records,
        ]);
    }

    public function notifications()
    {
        $user = auth()->user();
        
        // Get maternal record for the logged-in patient
        $maternalRecord = MaternalRecord::where('user_id', $user->id)
            ->with([
                'prenatalVisits',
                'immunizationRecord',
            ])
            ->first();

        return Inertia::render('Patient/Notifications', [
            'maternalRecord' => $maternalRecord ? [
                'id' => $maternalRecord->id,
                'first_name' => $maternalRecord->first_name,
                'last_name' => $maternalRecord->last_name,
                'lmp' => $maternalRecord->last_menstrual_period->format('Y-m-d'),
                'edc' => $maternalRecord->expected_date_of_delivery,
                'prenatal_visits' => $maternalRecord->prenatalVisits->map(function($visit) {
                    return [
                        'visit_date' => $visit->visit_date ? $visit->visit_date->format('Y-m-d') : 'Scheduled',
                    ];
                }),
                'immunization_records' => $maternalRecord->immunizationRecord ? [[
                    'vaccine_type' => 'Tetanus Toxoid',
                    'date_given' => $maternalRecord->immunizationRecord->created_at->format('Y-m-d'),
                ]] : [],
            ] : null,
        ]);
    }
}
