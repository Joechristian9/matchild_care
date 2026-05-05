<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\MaternalRecord;
use App\Models\PrenatalVisit;
use App\Models\NutritionalAssessment;
use App\Models\ImmunizationRecord;
use App\Models\PrenatalSupplementation;
use App\Models\MicronutrientSupplementation;
use App\Models\HighRiskSupplementation;
use App\Models\LaboratoryScreening;
use App\Models\PregnancyOutcome;
use App\Models\PostpartumSupplementation;
use App\Models\PostpartumIfaCompletion;
use App\Models\PostpartumRemark;
use App\Models\DeliveryInformation;
use App\Models\PostnatalCare;
use Illuminate\Support\Facades\DB;

class MaternalCareController extends Controller
{
    public function index()
    {
        return Inertia::render('Parent/MaternalCare');
    }

    public function store(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'date_of_registration' => 'required|date',
            'family_serial' => 'required|string',
            'last_name' => 'required|string',
            'first_name' => 'required|string',
            'middle_initial' => 'nullable|string|max:1',
            'address' => 'required|string',
            'age' => 'required|integer',
            'age_group' => 'required|string',
            'last_menstrual_period' => 'required|date',
            'gravida' => 'required|integer',
            'parity' => 'required|integer',
        ]);

        DB::beginTransaction();

        try {
            // Create maternal record
            $maternalRecord = MaternalRecord::create([
                'user_id' => auth()->id(),
                'date_of_registration' => $request->date_of_registration,
                'family_serial' => $request->family_serial,
                'last_name' => $request->last_name,
                'first_name' => $request->first_name,
                'middle_initial' => $request->middle_initial,
                'address' => $request->address,
                'age' => $request->age,
                'age_group' => $request->age_group,
                'last_menstrual_period' => $request->last_menstrual_period,
                'gravida' => $request->gravida,
                'parity' => $request->parity,
                'expected_date_of_delivery' => $request->expected_date_of_delivery,
            ]);

            // Create prenatal visits
            if ($request->has('visits')) {
                foreach ($request->visits as $visitNumber => $visitDate) {
                    if ($visitDate) {
                        PrenatalVisit::create([
                            'maternal_record_id' => $maternalRecord->id,
                            'visit_number' => (int) str_replace('visit_', '', $visitNumber),
                            'visit_date' => $visitDate,
                        ]);
                    }
                }
            }

            // Create nutritional assessment
            if ($request->has('nutritional_assessment')) {
                $nutrition = $request->nutritional_assessment;
                NutritionalAssessment::create([
                    'maternal_record_id' => $maternalRecord->id,
                    'height' => $nutrition['height'] ?? null,
                    'weight_1st_trimester' => $nutrition['weight_1st'] ?? null,
                    'weight_2nd_trimester' => $nutrition['weight_2nd'] ?? null,
                    'weight_3rd_trimester' => $nutrition['weight_3rd'] ?? null,
                    'bmi_1st_trimester' => $nutrition['bmi_1st'] ?? null,
                    'remarks' => $nutrition['remarks'] ?? null,
                ]);
            }

            // Create immunization record
            if ($request->has('immunization_status')) {
                $immunization = $request->immunization_status;
                ImmunizationRecord::create([
                    'maternal_record_id' => $maternalRecord->id,
                    'td1_tt1' => $immunization['td1_tt1'] ?? null,
                    'td2_tt2' => $immunization['td2_tt2'] ?? null,
                    'td3_tt3' => $immunization['td3_tt3'] ?? null,
                    'td4_tt4' => $immunization['td4_tt4'] ?? null,
                    'td5_tt5' => $immunization['td5_tt5'] ?? null,
                    'fully_immunized_mother' => $immunization['fully_immunized'] ?? null,
                    'received_deworming' => $immunization['received_deworming'] ?? null,
                ]);
            }

            // Create prenatal supplementations (IFA)
            if ($request->has('prenatal_supplementation.iron_folic_acid')) {
                foreach ($request->prenatal_supplementation['iron_folic_acid'] as $index => $visit) {
                    if (!empty($visit['date']) || !empty($visit['tablets'])) {
                        PrenatalSupplementation::create([
                            'maternal_record_id' => $maternalRecord->id,
                            'visit_number' => $index + 1,
                            'visit_date' => $visit['date'] ?? null,
                            'tablets_given' => $visit['tablets'] ?? null,
                        ]);
                    }
                }
            }

            // Create micronutrient supplementations (MMS)
            if ($request->has('micronutrient_supplementation.visits')) {
                foreach ($request->micronutrient_supplementation['visits'] as $index => $visit) {
                    if (!empty($visit['date']) || !empty($visit['tablets'])) {
                        MicronutrientSupplementation::create([
                            'maternal_record_id' => $maternalRecord->id,
                            'completed_mms' => $request->micronutrient_supplementation['completed'] ?? false,
                            'visit_number' => $index + 1,
                            'visit_date' => $visit['date'] ?? null,
                            'tablets_given' => $visit['tablets'] ?? null,
                        ]);
                    }
                }
            }

            // Create high risk supplementations (Calcium)
            if ($request->has('high_risk_supplementation.visits')) {
                foreach ($request->high_risk_supplementation['visits'] as $index => $visit) {
                    if (!empty($visit['date']) || !empty($visit['tablets'])) {
                        HighRiskSupplementation::create([
                            'maternal_record_id' => $maternalRecord->id,
                            'completed_calcium' => $request->high_risk_supplementation['completed'] ?? false,
                            'visit_number' => $index + 1,
                            'visit_date' => $visit['date'] ?? null,
                            'tablets_given' => $visit['tablets'] ?? null,
                        ]);
                    }
                }
            }

            // Create laboratory screening
            if ($request->has('laboratory_screening')) {
                $lab = $request->laboratory_screening;
                LaboratoryScreening::create([
                    'maternal_record_id' => $maternalRecord->id,
                    'hepatitis_b_screened' => $lab['hepatitis_b']['completed'] ?? false,
                    'hepatitis_b_date' => $lab['hepatitis_b']['date'] ?? null,
                    'hepatitis_b_result' => $lab['hepatitis_b']['result'] ?? null,
                    'cbc_hgb_hct_screened' => $lab['cbc_hgb_hct']['completed'] ?? false,
                    'cbc_hgb_hct_date' => $lab['cbc_hgb_hct']['date'] ?? null,
                    'cbc_hgb_hct_result' => $lab['cbc_hgb_hct']['result'] ?? null,
                    'gestational_diabetes_screened' => $lab['gestational_diabetes']['completed'] ?? false,
                    'gestational_diabetes_date' => $lab['gestational_diabetes']['date'] ?? null,
                    'gestational_diabetes_result' => $lab['gestational_diabetes']['result'] ?? null,
                ]);
            }

            // Create pregnancy outcome
            if ($request->has('pregnancy_outcome')) {
                $outcome = $request->pregnancy_outcome;
                PregnancyOutcome::create([
                    'maternal_record_id' => $maternalRecord->id,
                    'date_terminated' => $outcome['date_terminated'] ?? null,
                    'outcome_type' => $outcome['outcome_type'] ?? null,
                    'remarks_action_taken' => $outcome['remarks'] ?? null,
                ]);
            }

            // Create delivery information
            if ($request->has('delivery_info')) {
                $delivery = $request->delivery_info;
                DeliveryInformation::create([
                    'maternal_record_id' => $maternalRecord->id,
                    'delivery_type' => $delivery['delivery_type'] ?? null,
                    'birth_weight' => $delivery['birth_weight'] ?? null,
                    'weight_category' => $delivery['weight_category'] ?? null,
                    'health_facility_type' => $delivery['place_of_delivery']['health_facility']['type'] ?? null,
                    'health_facility_capable' => $delivery['place_of_delivery']['health_facility']['capable'] ?? null,
                    'non_health_facility' => $delivery['place_of_delivery']['non_health_facility'] ?? null,
                    'birth_attendant' => $delivery['birth_attendant'] ?? null,
                    'delivery_date' => $delivery['delivery_date'] ?? null,
                    'delivery_time' => $delivery['delivery_time'] ?? null,
                ]);
            }

            // Create postnatal care
            if ($request->has('postnatal_care')) {
                $postnatal = $request->postnatal_care;
                PostnatalCare::create([
                    'maternal_record_id' => $maternalRecord->id,
                    'contact_1' => $postnatal['contact_1'] ?? null,
                    'contact_2' => $postnatal['contact_2'] ?? null,
                    'contact_3' => $postnatal['contact_3'] ?? null,
                    'contact_4' => $postnatal['contact_4'] ?? null,
                    'completed_4pnc' => $postnatal['completed_4pnc'] ?? false,
                ]);
            }

            // Create postpartum supplementations
            if ($request->has('postpartum_supplementation.visits')) {
                foreach ($request->postpartum_supplementation['visits'] as $index => $visit) {
                    if (!empty($visit['date']) || !empty($visit['tablets'])) {
                        PostpartumSupplementation::create([
                            'maternal_record_id' => $maternalRecord->id,
                            'completed_ifa' => $request->postpartum_supplementation['completed_ifa'] ?? false,
                            'visit_number' => $index + 1,
                            'visit_date' => $visit['date'] ?? null,
                            'tablets_given' => $visit['tablets'] ?? null,
                        ]);
                    }
                }
            }

            // Create postpartum IFA completions
            if ($request->has('postpartum_supplementation')) {
                $postpartum = $request->postpartum_supplementation;
                
                // 1st completion
                if (!empty($postpartum['completed_ifa_1st']) || !empty($postpartum['date_completed_1st'])) {
                    PostpartumIfaCompletion::create([
                        'maternal_record_id' => $maternalRecord->id,
                        'completion_type' => '1st',
                        'completed' => $postpartum['completed_ifa_1st'] ?? null,
                        'date_completed' => $postpartum['date_completed_1st'] ?? null,
                    ]);
                }
                
                // 2nd completion
                if (!empty($postpartum['completed_ifa_2nd']) || !empty($postpartum['date_completed_2nd'])) {
                    PostpartumIfaCompletion::create([
                        'maternal_record_id' => $maternalRecord->id,
                        'completion_type' => '2nd',
                        'completed' => $postpartum['completed_ifa_2nd'] ?? null,
                        'date_completed' => $postpartum['date_completed_2nd'] ?? null,
                    ]);
                }
                
                // Remarks
                if (!empty($postpartum['remarks'])) {
                    PostpartumRemark::create([
                        'maternal_record_id' => $maternalRecord->id,
                        'remark_type' => $postpartum['remarks'],
                    ]);
                }
            }

            DB::commit();

            return redirect()->route('parent.maternal-care')->with('success', 'Maternal care record created successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Failed to save maternal care record: ' . $e->getMessage()]);
        }
    }
}
