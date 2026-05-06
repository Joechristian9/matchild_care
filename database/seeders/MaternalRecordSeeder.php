<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\MaternalRecord;
use App\Models\ImmunizationRecord;
use App\Models\LaboratoryScreening;
use App\Models\MicronutrientSupplementation;
use App\Models\HighRiskSupplementation;
use App\Models\PrenatalSupplementation;
use Illuminate\Support\Str;
use Carbon\Carbon;

class MaternalRecordSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first(); // make sure you have at least 1 user

        for ($i = 1; $i <= 10; $i++) {
            $maternal = MaternalRecord::create([
                'user_id' => $user->id,
                'date_of_registration' => now()->subDays(rand(1, 100)),
                'family_serial' => 'FS-' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'last_name' => fake()->lastName(),
                'first_name' => fake()->firstNameFemale(),
                'middle_initial' => strtoupper(Str::random(1)),
                'address' => fake()->address(),
                'age' => rand(18, 40),
                'age_group' => collect(['15-19', '20-49'])->random(),
                'last_menstrual_period' => now()->subMonths(rand(1, 6)),
                'gravida' => rand(1, 5),
                'parity' => rand(0, 4),
                'expected_date_of_delivery' => now()->addMonths(rand(1, 6))->format('m/d/Y'),
            ]);

            // 🔹 Immunization
            ImmunizationRecord::create([
                'maternal_record_id' => $maternal->id,
                'td1_tt1' => now()->subMonths(5),
                'td2_tt2' => now()->subMonths(4),
                'td3_tt3' => now()->subMonths(3),
                'td4_tt4' => null,
                'td5_tt5' => null,
                'fully_immunized_status' => collect(['Y', 'N', 'X'])->random(),
                'deworming_date' => now()->subMonths(2),
            ]);

            // 🔹 Laboratory Screening
            LaboratoryScreening::create([
                'maternal_record_id' => $maternal->id,

                'completed_hepatitis_b' => true,
                'hepatitis_b_date' => now()->subMonths(3),
                'hepatitis_b_result' => 'Negative',

                'completed_cbc_hgb_hct' => true,
                'cbc_hgb_hct_date' => now()->subMonths(2),
                'cbc_hgb_hct_result' => 'Normal',

                'completed_gestational_diabetes' => fake()->boolean(),
                'gestational_diabetes_date' => now()->subMonths(1),
                'gestational_diabetes_result' => 'Normal',
            ]);

            // 🔹 Micronutrient Supplementation (6 visits)
            for ($v = 1; $v <= 6; $v++) {
                MicronutrientSupplementation::create([
                    'maternal_record_id' => $maternal->id,
                    'visit_number' => $v,
                    'completed_mms_supplementation' => fake()->boolean(),
                    'supplementation_date' => now()->subDays(rand(1, 100)),
                    'tablets_given' => rand(10, 30),
                ]);
            }

            // 🔹 High Risk Supplementation (4 visits)
            for ($v = 1; $v <= 4; $v++) {
                HighRiskSupplementation::create([
                    'maternal_record_id' => $maternal->id,
                    'visit_number' => $v,
                    'completed_calcium_supplementation' => fake()->boolean(),
                    'supplementation_date' => now()->subDays(rand(1, 100)),
                    'tablets_given' => rand(10, 30),
                ]);
            }

            // 🔹 Prenatal IFA (6 visits)
            for ($v = 1; $v <= 6; $v++) {
                PrenatalSupplementation::create([
                    'maternal_record_id' => $maternal->id,
                    'visit_number' => $v,
                    'supplementation_date' => now()->subDays(rand(1, 100)),
                    'tablets_given' => rand(10, 30),
                    'supplement_type' => 'IFA',
                ]);
            }
        }
    }
}
