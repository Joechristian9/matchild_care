<?php

namespace App\Services;

use App\Models\MaternalRecord;
use App\Models\PrenatalVisit;
use App\Models\NutritionalAssessment;
use App\Models\ImmunizationRecord;
use App\Models\PrenatalSupplementation;
use App\Models\MicronutrientSupplementation;
use App\Models\HighRiskSupplementation;
use App\Models\LaboratoryScreening;
use App\Models\PregnancyOutcome;
use App\Models\DeliveryInformation;
use App\Models\PostnatalCare;
use App\Models\PostpartumSupplementation;
use App\Models\PostpartumIfaCompletion;
use App\Models\PostpartumRemark;
use Illuminate\Support\Facades\DB;

class MaternalCareService
{
    /**
     * Create a new maternal care record with all related data
     */
    public function createMaternalRecord(array $data, int $userId): MaternalRecord
    {
        return DB::transaction(function () use ($data, $userId) {
            // Create main maternal record
            $maternalRecord = $this->createMainRecord($data, $userId);
            
            // Create related records
            $this->createPrenatalVisits($maternalRecord, $data['visits'] ?? []);
            $this->createNutritionalAssessment($maternalRecord, $data['nutritional_assessment'] ?? []);
            $this->createImmunizationRecord($maternalRecord, $data['immunization_status'] ?? []);
            $this->createPrenatalSupplementations($maternalRecord, $data['prenatal_supplementation'] ?? []);
            $this->createMicronutrientSupplementations($maternalRecord, $data['micronutrient_supplementation'] ?? []);
            $this->createHighRiskSupplementations($maternalRecord, $data['high_risk_supplementation'] ?? []);
            $this->createLaboratoryScreening($maternalRecord, $data['laboratory_screening'] ?? []);
            $this->createPregnancyOutcome($maternalRecord, $data['pregnancy_outcome'] ?? []);
            $this->createDeliveryInformation($maternalRecord, $data['delivery_info'] ?? []);
            $this->createPostnatalCare($maternalRecord, $data['postnatal_care'] ?? []);
            $this->createPostpartumSupplementation($maternalRecord, $data['postpartum_supplementation'] ?? []);
            
            return $maternalRecord->load([
                'prenatalVisits',
                'nutritionalAssessment',
                'immunizationRecord',
                'prenatalSupplementations',
                'micronutrientSupplementations',
                'highRiskSupplementations',
                'laboratoryScreening',
                'pregnancyOutcome',
                'deliveryInformation',
                'postnatalCare',
                'postpartumSupplementations',
                'postpartumIfaCompletions',
                'postpartumRemark'
            ]);
        });
    }

    /**
     * Update an existing maternal care record with all related data
     */
    public function updateMaternalRecord(int $id, array $data, int $userId): MaternalRecord
    {
        return DB::transaction(function () use ($id, $data, $userId) {
            $maternalRecord = MaternalRecord::findOrFail($id);
            
            // Update main maternal record
            $maternalRecord->update([
                'date_of_registration' => $data['date_of_registration'],
                'family_serial' => $data['family_serial'],
                'last_name' => $data['last_name'],
                'first_name' => $data['first_name'],
                'middle_initial' => $data['middle_initial'] ?? null,
                'address' => $data['address'],
                'age' => $data['age'],
                'age_group' => $data['age_group'],
                'blood_pressure_systolic' => $data['vital_signs']['blood_pressure_systolic'] ?? null,
                'blood_pressure_diastolic' => $data['vital_signs']['blood_pressure_diastolic'] ?? null,
                'heart_rate' => $data['vital_signs']['heart_rate'] ?? null,
                'temperature' => $data['vital_signs']['temperature'] ?? null,
                'respiratory_rate' => $data['vital_signs']['respiratory_rate'] ?? null,
                'weight' => $data['vital_signs']['weight'] ?? null,
                'height' => $data['vital_signs']['height'] ?? null,
                'bmi' => $data['vital_signs']['bmi'] ?? null,
                'fetal_heart_tone' => $data['vital_signs']['fetal_heart_tone'] ?? null,
                'fundal_height' => $data['vital_signs']['fundal_height'] ?? null,
                'vital_signs_others' => $data['vital_signs']['others'] ?? null,
                'last_menstrual_period' => $data['last_menstrual_period'],
                'gravida' => $data['gravida'],
                'parity' => $data['parity'],
                'expected_date_of_delivery' => $data['expected_date_of_delivery'] ?? null,
            ]);
            
            // Update or create related records
            $this->updateOrCreatePrenatalVisits($maternalRecord, $data['visits'] ?? []);
            $this->updateOrCreateNutritionalAssessment($maternalRecord, $data['nutritional_assessment'] ?? []);
            $this->updateOrCreateImmunizationRecord($maternalRecord, $data['immunization_status'] ?? []);
            $this->updateOrCreatePrenatalSupplementations($maternalRecord, $data['prenatal_supplementation'] ?? []);
            $this->updateOrCreateMicronutrientSupplementations($maternalRecord, $data['micronutrient_supplementation'] ?? []);
            $this->updateOrCreateHighRiskSupplementations($maternalRecord, $data['high_risk_supplementation'] ?? []);
            $this->updateOrCreateLaboratoryScreening($maternalRecord, $data['laboratory_screening'] ?? []);
            $this->updateOrCreatePregnancyOutcome($maternalRecord, $data['pregnancy_outcome'] ?? []);
            $this->updateOrCreateDeliveryInformation($maternalRecord, $data['delivery_info'] ?? []);
            $this->updateOrCreatePostnatalCare($maternalRecord, $data['postnatal_care'] ?? []);
            $this->updateOrCreatePostpartumSupplementation($maternalRecord, $data['postpartum_supplementation'] ?? []);
            
            return $maternalRecord->load([
                'prenatalVisits',
                'nutritionalAssessment',
                'immunizationRecord',
                'prenatalSupplementations',
                'micronutrientSupplementations',
                'highRiskSupplementations',
                'laboratoryScreening',
                'pregnancyOutcome',
                'deliveryInformation',
                'postnatalCare',
                'postpartumSupplementations',
                'postpartumIfaCompletions',
                'postpartumRemark'
            ]);
        });
    }

    // Update or create methods (similar to create but use updateOrCreate)
    private function updateOrCreatePrenatalVisits(MaternalRecord $record, array $visits): void
    {
        // Delete existing visits and recreate
        $record->prenatalVisits()->delete();
        $this->createPrenatalVisits($record, $visits);
    }

    private function updateOrCreateNutritionalAssessment(MaternalRecord $record, array $data): void
    {
        if (!empty($data)) {
            $record->nutritionalAssessment()->updateOrCreate(
                ['maternal_record_id' => $record->id],
                [
                    'height' => $data['height'] ?? null,
                    'weight_1st_trimester' => $data['weight_1st'] ?? null,
                    'weight_2nd_trimester' => $data['weight_2nd'] ?? null,
                    'weight_3rd_trimester' => $data['weight_3rd'] ?? null,
                    'bmi_1st_trimester' => $data['bmi_1st'] ?? null,
                    'remarks' => $data['remarks'] ?? null,
                ]
            );
        }
    }

    private function updateOrCreateImmunizationRecord(MaternalRecord $record, array $data): void
    {
        if (!empty($data)) {
            $record->immunizationRecord()->updateOrCreate(
                ['maternal_record_id' => $record->id],
                [
                    'td1_tt1' => $data['td1_tt1'] ?? null,
                    'td2_tt2' => $data['td2_tt2'] ?? null,
                    'td3_tt3' => $data['td3_tt3'] ?? null,
                    'td4_tt4' => $data['td4_tt4'] ?? null,
                    'td5_tt5' => $data['td5_tt5'] ?? null,
                    'fully_immunized_mother' => $data['fully_immunized'] ?? null,
                    'received_deworming' => $data['received_deworming'] ?? null,
                ]
            );
        }
    }

    private function updateOrCreatePrenatalSupplementations(MaternalRecord $record, array $data): void
    {
        $record->prenatalSupplementations()->delete();
        $this->createPrenatalSupplementations($record, $data);
    }

    private function updateOrCreateMicronutrientSupplementations(MaternalRecord $record, array $data): void
    {
        $record->micronutrientSupplementations()->delete();
        $this->createMicronutrientSupplementations($record, $data);
    }

    private function updateOrCreateHighRiskSupplementations(MaternalRecord $record, array $data): void
    {
        $record->highRiskSupplementations()->delete();
        $this->createHighRiskSupplementations($record, $data);
    }

    private function updateOrCreateLaboratoryScreening(MaternalRecord $record, array $data): void
    {
        if (!empty($data)) {
            $record->laboratoryScreening()->updateOrCreate(
                ['maternal_record_id' => $record->id],
                [
                    'hepatitis_b_screened' => $data['hepatitis_b']['completed'] ?? false,
                    'hepatitis_b_date' => $data['hepatitis_b']['date'] ?? null,
                    'hepatitis_b_result' => $data['hepatitis_b']['result'] ?? null,
                    'cbc_hgb_hct_screened' => $data['cbc_hgb_hct']['completed'] ?? false,
                    'cbc_hgb_hct_date' => $data['cbc_hgb_hct']['date'] ?? null,
                    'cbc_hgb_hct_result' => $data['cbc_hgb_hct']['result'] ?? null,
                    'gestational_diabetes_screened' => $data['gestational_diabetes']['completed'] ?? false,
                    'gestational_diabetes_date' => $data['gestational_diabetes']['date'] ?? null,
                    'gestational_diabetes_result' => $data['gestational_diabetes']['result'] ?? null,
                ]
            );
        }
    }

    private function updateOrCreatePregnancyOutcome(MaternalRecord $record, array $data): void
    {
        if (!empty($data['date_terminated']) || !empty($data['outcome_type'])) {
            $record->pregnancyOutcome()->updateOrCreate(
                ['maternal_record_id' => $record->id],
                [
                    'date_terminated' => $data['date_terminated'] ?? null,
                    'outcome_type' => $data['outcome_type'] ?? null,
                    'remarks_action_taken' => $data['remarks'] ?? null,
                ]
            );
        }
    }

    private function updateOrCreateDeliveryInformation(MaternalRecord $record, array $data): void
    {
        if (!empty($data)) {
            $record->deliveryInformation()->updateOrCreate(
                ['maternal_record_id' => $record->id],
                [
                    'delivery_type' => $data['delivery_type'] ?? null,
                    'birth_weight' => $data['birth_weight'] ?? null,
                    'weight_category' => $data['weight_category'] ?? null,
                    'health_facility_type' => $data['place_of_delivery']['health_facility']['type'] ?? null,
                    'health_facility_capable' => $data['place_of_delivery']['health_facility']['capable'] ?? null,
                    'non_health_facility' => $data['place_of_delivery']['non_health_facility'] ?? null,
                    'birth_attendant' => $data['birth_attendant'] ?? null,
                    'delivery_date' => $data['delivery_date'] ?? null,
                    'delivery_time' => $data['delivery_time'] ?? null,
                ]
            );
        }
    }

    private function updateOrCreatePostnatalCare(MaternalRecord $record, array $data): void
    {
        if (!empty($data)) {
            $record->postnatalCare()->updateOrCreate(
                ['maternal_record_id' => $record->id],
                [
                    'contact_1' => $data['contact_1'] ?? null,
                    'contact_2' => $data['contact_2'] ?? null,
                    'contact_3' => $data['contact_3'] ?? null,
                    'contact_4' => $data['contact_4'] ?? null,
                    'completed_4pnc' => $data['completed_4pnc'] ?? false,
                ]
            );
        }
    }

    private function updateOrCreatePostpartumSupplementation(MaternalRecord $record, array $data): void
    {
        $record->postpartumSupplementations()->delete();
        $record->postpartumIfaCompletions()->delete();
        $record->postpartumRemark()->delete();
        $this->createPostpartumSupplementation($record, $data);
    }

    private function createMainRecord(array $data, int $userId): MaternalRecord
    {
        return MaternalRecord::create([
            'user_id' => $userId,
            'date_of_registration' => $data['date_of_registration'],
            'family_serial' => $data['family_serial'],
            'last_name' => $data['last_name'],
            'first_name' => $data['first_name'],
            'middle_initial' => $data['middle_initial'] ?? null,
            'address' => $data['address'],
            'age' => $data['age'],
            'age_group' => $data['age_group'],
            'blood_pressure_systolic' => $data['vital_signs']['blood_pressure_systolic'] ?? null,
            'blood_pressure_diastolic' => $data['vital_signs']['blood_pressure_diastolic'] ?? null,
            'heart_rate' => $data['vital_signs']['heart_rate'] ?? null,
            'temperature' => $data['vital_signs']['temperature'] ?? null,
            'respiratory_rate' => $data['vital_signs']['respiratory_rate'] ?? null,
            'weight' => $data['vital_signs']['weight'] ?? null,
            'height' => $data['vital_signs']['height'] ?? null,
            'bmi' => $data['vital_signs']['bmi'] ?? null,
            'fetal_heart_tone' => $data['vital_signs']['fetal_heart_tone'] ?? null,
            'fundal_height' => $data['vital_signs']['fundal_height'] ?? null,
            'vital_signs_others' => $data['vital_signs']['others'] ?? null,
            'last_menstrual_period' => $data['last_menstrual_period'],
            'gravida' => $data['gravida'],
            'parity' => $data['parity'],
            'expected_date_of_delivery' => $data['expected_date_of_delivery'] ?? null,
        ]);
    }

    private function createPrenatalVisits(MaternalRecord $record, array $visits): void
    {
        foreach ($visits as $key => $date) {
            if (!empty($date)) {
                $visitNumber = (int) str_replace('visit_', '', $key);
                PrenatalVisit::create([
                    'maternal_record_id' => $record->id,
                    'visit_number' => $visitNumber,
                    'visit_date' => $date,
                ]);
            }
        }
    }

    private function createNutritionalAssessment(MaternalRecord $record, array $data): void
    {
        if (!empty($data)) {
            NutritionalAssessment::create([
                'maternal_record_id' => $record->id,
                'height' => $data['height'] ?? null,
                'weight_1st_trimester' => $data['weight_1st'] ?? null,
                'weight_2nd_trimester' => $data['weight_2nd'] ?? null,
                'weight_3rd_trimester' => $data['weight_3rd'] ?? null,
                'bmi_1st_trimester' => $data['bmi_1st'] ?? null,
                'remarks' => $data['remarks'] ?? null,
            ]);
        }
    }

    private function createImmunizationRecord(MaternalRecord $record, array $data): void
    {
        if (!empty($data)) {
            ImmunizationRecord::create([
                'maternal_record_id' => $record->id,
                'td1_tt1' => $data['td1_tt1'] ?? null,
                'td2_tt2' => $data['td2_tt2'] ?? null,
                'td3_tt3' => $data['td3_tt3'] ?? null,
                'td4_tt4' => $data['td4_tt4'] ?? null,
                'td5_tt5' => $data['td5_tt5'] ?? null,
                'fully_immunized_mother' => $data['fully_immunized'] ?? null,
                'received_deworming' => $data['received_deworming'] ?? null,
            ]);
        }
    }

    private function createPrenatalSupplementations(MaternalRecord $record, array $data): void
    {
        if (!empty($data['iron_folic_acid'])) {
            foreach ($data['iron_folic_acid'] as $index => $visit) {
                if (!empty($visit['date']) || !empty($visit['tablets'])) {
                    PrenatalSupplementation::create([
                        'maternal_record_id' => $record->id,
                        'visit_number' => $index + 1,
                        'visit_date' => $visit['date'] ?? null,
                        'tablets_given' => $visit['tablets'] ?? null,
                    ]);
                }
            }
        }
    }

    private function createMicronutrientSupplementations(MaternalRecord $record, array $data): void
    {
        if (!empty($data['visits'])) {
            foreach ($data['visits'] as $index => $visit) {
                if (!empty($visit['date']) || !empty($visit['tablets'])) {
                    MicronutrientSupplementation::create([
                        'maternal_record_id' => $record->id,
                        'completed_mms' => $data['completed'] ?? false,
                        'visit_number' => $index + 1,
                        'visit_date' => $visit['date'] ?? null,
                        'tablets_given' => $visit['tablets'] ?? null,
                    ]);
                }
            }
        }
    }

    private function createHighRiskSupplementations(MaternalRecord $record, array $data): void
    {
        if (!empty($data['visits'])) {
            foreach ($data['visits'] as $index => $visit) {
                if (!empty($visit['date']) || !empty($visit['tablets'])) {
                    HighRiskSupplementation::create([
                        'maternal_record_id' => $record->id,
                        'completed_calcium' => $data['completed'] ?? false,
                        'visit_number' => $index + 1,
                        'visit_date' => $visit['date'] ?? null,
                        'tablets_given' => $visit['tablets'] ?? null,
                    ]);
                }
            }
        }
    }

    private function createLaboratoryScreening(MaternalRecord $record, array $data): void
    {
        if (!empty($data)) {
            LaboratoryScreening::create([
                'maternal_record_id' => $record->id,
                'hepatitis_b_screened' => $data['hepatitis_b']['completed'] ?? false,
                'hepatitis_b_date' => $data['hepatitis_b']['date'] ?? null,
                'hepatitis_b_result' => $data['hepatitis_b']['result'] ?? null,
                'cbc_hgb_hct_screened' => $data['cbc_hgb_hct']['completed'] ?? false,
                'cbc_hgb_hct_date' => $data['cbc_hgb_hct']['date'] ?? null,
                'cbc_hgb_hct_result' => $data['cbc_hgb_hct']['result'] ?? null,
                'gestational_diabetes_screened' => $data['gestational_diabetes']['completed'] ?? false,
                'gestational_diabetes_date' => $data['gestational_diabetes']['date'] ?? null,
                'gestational_diabetes_result' => $data['gestational_diabetes']['result'] ?? null,
            ]);
        }
    }

    private function createPregnancyOutcome(MaternalRecord $record, array $data): void
    {
        if (!empty($data['date_terminated']) || !empty($data['outcome_type'])) {
            PregnancyOutcome::create([
                'maternal_record_id' => $record->id,
                'date_terminated' => $data['date_terminated'] ?? null,
                'outcome_type' => $data['outcome_type'] ?? null,
                'remarks_action_taken' => $data['remarks'] ?? null,
            ]);
        }
    }

    private function createDeliveryInformation(MaternalRecord $record, array $data): void
    {
        if (!empty($data)) {
            DeliveryInformation::create([
                'maternal_record_id' => $record->id,
                'delivery_type' => $data['delivery_type'] ?? null,
                'birth_weight' => $data['birth_weight'] ?? null,
                'weight_category' => $data['weight_category'] ?? null,
                'health_facility_type' => $data['place_of_delivery']['health_facility']['type'] ?? null,
                'health_facility_capable' => $data['place_of_delivery']['health_facility']['capable'] ?? null,
                'non_health_facility' => $data['place_of_delivery']['non_health_facility'] ?? null,
                'birth_attendant' => $data['birth_attendant'] ?? null,
                'delivery_date' => $data['delivery_date'] ?? null,
                'delivery_time' => $data['delivery_time'] ?? null,
            ]);
        }
    }

    private function createPostnatalCare(MaternalRecord $record, array $data): void
    {
        if (!empty($data)) {
            PostnatalCare::create([
                'maternal_record_id' => $record->id,
                'contact_1' => $data['contact_1'] ?? null,
                'contact_2' => $data['contact_2'] ?? null,
                'contact_3' => $data['contact_3'] ?? null,
                'contact_4' => $data['contact_4'] ?? null,
                'completed_4pnc' => $data['completed_4pnc'] ?? false,
            ]);
        }
    }

    private function createPostpartumSupplementation(MaternalRecord $record, array $data): void
    {
        if (!empty($data)) {
            // Create visit records
            if (!empty($data['visits'])) {
                foreach ($data['visits'] as $index => $visit) {
                    if (!empty($visit['date']) || !empty($visit['tablets'])) {
                        PostpartumSupplementation::create([
                            'maternal_record_id' => $record->id,
                            'completed_ifa' => $data['completed_ifa'] ?? false,
                            'visit_number' => $index + 1,
                            'visit_date' => $visit['date'] ?? null,
                            'tablets_given' => $visit['tablets'] ?? null,
                        ]);
                    }
                }
            }

            // Create IFA completion records
            if (!empty($data['completed_ifa_1st']) || !empty($data['date_completed_1st'])) {
                PostpartumIfaCompletion::create([
                    'maternal_record_id' => $record->id,
                    'completion_type' => '1st',
                    'completed' => $data['completed_ifa_1st'] ?? null,
                    'date_completed' => $data['date_completed_1st'] ?? null,
                ]);
            }

            if (!empty($data['completed_ifa_2nd']) || !empty($data['date_completed_2nd'])) {
                PostpartumIfaCompletion::create([
                    'maternal_record_id' => $record->id,
                    'completion_type' => '2nd',
                    'completed' => $data['completed_ifa_2nd'] ?? null,
                    'date_completed' => $data['date_completed_2nd'] ?? null,
                ]);
            }

            // Create remark record
            if (!empty($data['remarks'])) {
                PostpartumRemark::create([
                    'maternal_record_id' => $record->id,
                    'remark_type' => $data['remarks'],
                ]);
            }
        }
    }
}
