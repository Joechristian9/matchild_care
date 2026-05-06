<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
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
use Carbon\Carbon;

class MaternalCareSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the test user created in DatabaseSeeder
        $user = User::where('email', 'joe@gmail.com')->first();
        
        if (!$user) {
            $this->command->error('User not found. Make sure DatabaseSeeder creates the user first.');
            return;
        }

        // Sample data for multiple records - More realistic Filipino names
        $firstNames = ['Maria', 'Ana', 'Rosa', 'Elena', 'Carmen', 'Sofia', 'Isabella', 'Lucia', 'Gabriela', 'Valentina',
                       'Nicole', 'Angel', 'Jasmine', 'Princess', 'Angelica', 'Christine', 'Michelle', 'Jennifer', 'Catherine', 'Patricia',
                       'Angela', 'Teresa', 'Beatriz', 'Cristina', 'Daniela', 'Mary Grace', 'Mary Ann', 'Mary Jane', 'Mary Rose', 'Julia',
                       'Karla', 'Liza', 'Maricel', 'Marilyn', 'Marites', 'Rowena', 'Rosalie', 'Shirley', 'Susan', 'Veronica',
                       'Wendy', 'Yvonne', 'Zenaida', 'Aileen', 'Alma', 'Cynthia', 'Dina', 'Eliza', 'Felicia', 'Gloria',
                       'Helen', 'Irene', 'Josephine', 'Katherine', 'Lourdes', 'Melanie', 'Nora', 'Olivia', 'Pamela', 'Rachel'];
        
        $lastNames = ['Santos', 'Cruz', 'Reyes', 'Garcia', 'Mendoza', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
                      'Perez', 'Sanchez', 'Ramirez', 'Torres', 'Flores', 'Rivera', 'Gomez', 'Diaz', 'Morales', 'Jimenez',
                      'Alvarez', 'Romero', 'Castro', 'Ortiz', 'Ruiz', 'Vargas', 'Ramos', 'Castillo', 'Herrera', 'Medina',
                      'Aguilar', 'Gutierrez', 'Chavez', 'Rios', 'Dominguez', 'Vazquez', 'Mendez', 'Silva', 'Moreno', 'Guerrero',
                      'Campos', 'Navarro', 'Rojas', 'Soto', 'Delgado', 'Pena', 'Vega', 'Cortez', 'Nunez', 'Luna',
                      'Salazar', 'Bautista', 'Fernandez', 'Carrillo', 'Estrada', 'Sandoval', 'Valdez', 'Contreras', 'Figueroa', 'Leon'];
        
        $middleInitials = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];
        
        // Real barangays in Metro Manila
        $barangays = [
            'Barangay 1, Tondo', 'Barangay 2, Tondo', 'Barangay 3, Tondo', 'Barangay 4, Tondo', 'Barangay 5, Tondo',
            'Barangay Bagong Silang', 'Barangay Bahay Toro', 'Barangay Commonwealth', 'Barangay Holy Spirit', 'Barangay Batasan Hills',
            'Barangay San Antonio', 'Barangay San Isidro', 'Barangay San Jose', 'Barangay Santa Cruz', 'Barangay Santa Mesa',
            'Barangay Ermita', 'Barangay Malate', 'Barangay Paco', 'Barangay Pandacan', 'Barangay Port Area',
            'Barangay Sampaloc', 'Barangay San Miguel', 'Barangay San Nicolas', 'Barangay Quiapo', 'Barangay Binondo',
            'Barangay Intramuros', 'Barangay Sta. Ana', 'Barangay Sta. Mesa Heights', 'Barangay West Triangle', 'Barangay East Triangle'
        ];
        
        $cities = [
            'Manila', 'Quezon City', 'Makati', 'Caloocan', 'Pasig',
            'Taguig', 'Paranaque', 'Las Pinas', 'Muntinlupa', 'Mandaluyong',
            'Marikina', 'Pasay', 'Valenzuela', 'Malabon', 'Navotas', 'San Juan'
        ];

        // Create 100 records to test pagination and bulk PDF
        $recordsData = [];
        
        // First, generate all the data with registration dates
        for ($index = 0; $index < 100; $index++) {
            // Generate random person data with realistic Filipino format
            $barangay = $barangays[array_rand($barangays)];
            $city = $cities[array_rand($cities)];
            
            $personData = [
                'first_name' => $firstNames[array_rand($firstNames)],
                'last_name' => $lastNames[array_rand($lastNames)],
                'middle_initial' => $middleInitials[array_rand($middleInitials)],
                'age' => rand(18, 40),
                'address' => $barangay . ', ' . $city . ', Metro Manila',
            ];

            // Calculate realistic dates
            if ($index < 30) {
                // First 30 records: Current month (May 2026) - spread across the month
                $dayOfMonth = ($index % 30) + 1; // Days 1-30
                $registrationDate = Carbon::now()->startOfMonth()->addDays($dayOfMonth - 1);
            } else {
                // Remaining 70 records: Previous months (spread across last 12 months)
                $monthsAgo = (int)(($index - 30) / 6) + 1; // Distribute across 12 months
                $registrationDate = Carbon::now()->subMonths($monthsAgo)->addDays(rand(1, 28));
            }
            
            // Calculate LMP BEFORE registration
            // Woman is typically 8-16 weeks pregnant when she first registers
            $weeksPregnantAtRegistration = rand(8, 16);
            $lmp = $registrationDate->copy()->subWeeks($weeksPregnantAtRegistration);
            
            // Calculate EDD using Naegele's Rule:
            // If LMP month is Jan-Mar (1-3): Add 9 months, add 7 days
            // If LMP month is Apr-Dec (4-12): Subtract 3 months, add 7 days, add 1 year
            $lmpMonth = (int) $lmp->format('m');
            
            if ($lmpMonth >= 1 && $lmpMonth <= 3) {
                // January-March: Add 9 months, add 7 days
                $edd = $lmp->copy()->addMonths(9)->addDays(7);
            } else {
                // April-December: Subtract 3 months, add 7 days, add 1 year
                $edd = $lmp->copy()->subMonths(3)->addDays(7)->addYear();
            }

            // Determine age group
            $ageGroup = $personData['age'] <= 14 ? '10-14' : ($personData['age'] <= 19 ? '15-19' : '20-49');

            // Store the data for later sorting
            $recordsData[] = [
                'person' => $personData,
                'registration_date' => $registrationDate,
                'lmp' => $lmp,
                'edd' => $edd,
                'age_group' => $ageGroup,
                'weeks_pregnant_at_registration' => $weeksPregnantAtRegistration,
            ];
        }

        // Sort records by registration date (oldest first) for sequential family serial
        usort($recordsData, function($a, $b) {
            return $a['registration_date']->timestamp <=> $b['registration_date']->timestamp;
        });

        // Now create records in order with sequential family serial numbers
        foreach ($recordsData as $index => $recordData) {
            $personData = $recordData['person'];
            $registrationDate = $recordData['registration_date'];
            $lmp = $recordData['lmp'];
            $edd = $recordData['edd'];
            $ageGroup = $recordData['age_group'];

            // Create Maternal Record with sequential family serial based on registration date order
            $maternalRecord = MaternalRecord::create([
                'user_id' => $user->id,
                'date_of_registration' => $registrationDate,
                'family_serial' => 'FS-2026-' . str_pad($index + 1, 4, '0', STR_PAD_LEFT),
                'last_name' => $personData['last_name'],
                'first_name' => $personData['first_name'],
                'middle_initial' => $personData['middle_initial'],
                'address' => $personData['address'],
                'age' => $personData['age'],
                'age_group' => $ageGroup,
                'last_menstrual_period' => $lmp,
                'gravida' => rand(1, 4),
                'parity' => rand(0, 3),
                'expected_date_of_delivery' => $edd,
            ]);

            // Create Prenatal Visits
            for ($i = 1; $i <= 8; $i++) {
                PrenatalVisit::create([
                    'maternal_record_id' => $maternalRecord->id,
                    'visit_number' => $i,
                    'visit_date' => $registrationDate->copy()->addWeeks($i * 4),
                ]);
            }

            // Create Nutritional Assessment
            $height = rand(150, 170);
            $weight1st = rand(45, 70);
            $bmi1st = round($weight1st / (($height / 100) ** 2), 1);

            NutritionalAssessment::create([
                'maternal_record_id' => $maternalRecord->id,
                'height' => $height,
                'bmi_1st_trimester' => $bmi1st,
                'weight_1st_trimester' => $weight1st,
                'weight_2nd_trimester' => $weight1st + rand(2, 5),
                'weight_3rd_trimester' => $weight1st + rand(6, 12),
                'remarks' => $bmi1st >= 18.5 && $bmi1st <= 24.9 ? 'N' : ($bmi1st < 18.5 ? 'U' : 'O'),
            ]);

            // Create Immunization Record
            ImmunizationRecord::create([
                'maternal_record_id' => $maternalRecord->id,
                'td1_tt1' => $registrationDate->copy()->addWeeks(1),
                'td2_tt2' => $registrationDate->copy()->addWeeks(5),
                'td3_tt3' => $registrationDate->copy()->addWeeks(9),
                'td4_tt4' => $registrationDate->copy()->addWeeks(13),
                'td5_tt5' => $registrationDate->copy()->addWeeks(17),
                'fully_immunized_status' => 'Y',
                'deworming_date' => $registrationDate->copy()->addWeeks(2),
            ]);

            // Create Prenatal Supplementations (IFA)
            for ($i = 1; $i <= 6; $i++) {
                PrenatalSupplementation::create([
                    'maternal_record_id' => $maternalRecord->id,
                    'visit_number' => $i,
                    'supplementation_date' => $registrationDate->copy()->addWeeks($i * 4),
                    'tablets_given' => rand(30, 60),
                ]);
            }

            // Create Micronutrient Supplementation (MMS)
            for ($i = 1; $i <= 6; $i++) {
                MicronutrientSupplementation::create([
                    'maternal_record_id' => $maternalRecord->id,
                    'visit_number' => $i,
                    'supplementation_date' => $registrationDate->copy()->addWeeks($i * 4),
                    'tablets_given' => rand(30, 60),
                    'completed_mms_supplementation' => $i == 6,
                ]);
            }

            // Create High Risk Supplementation (Calcium)
            for ($i = 1; $i <= 4; $i++) {
                HighRiskSupplementation::create([
                    'maternal_record_id' => $maternalRecord->id,
                    'visit_number' => $i,
                    'supplementation_date' => $registrationDate->copy()->addWeeks($i * 6),
                    'tablets_given' => rand(30, 45),
                    'completed_calcium_supplementation' => $i == 4,
                ]);
            }

            // Create Laboratory Screening
            LaboratoryScreening::create([
                'maternal_record_id' => $maternalRecord->id,
                'completed_hepatitis_b' => true,
                'hepatitis_b_date' => $registrationDate->copy()->addWeeks(2),
                'hepatitis_b_result' => 'Negative',
                'completed_cbc_hgb_hct' => true,
                'cbc_hgb_hct_date' => $registrationDate->copy()->addWeeks(3),
                'cbc_hgb_hct_result' => 'Normal - Hgb: 12.5 g/dL',
                'completed_gestational_diabetes' => true,
                'gestational_diabetes_date' => $registrationDate->copy()->addWeeks(12),
                'gestational_diabetes_result' => 'Negative',
            ]);

            // Create Pregnancy Outcome (for some records)
            if ($index % 2 == 0) {
                PregnancyOutcome::create([
                    'maternal_record_id' => $maternalRecord->id,
                    'outcome_type' => 'FT',
                    'date_terminated' => $edd->copy()->addDays(rand(-7, 7)),
                    'remarks_action_taken' => 'Normal delivery, healthy baby',
                ]);
            }

            // Create Delivery Information
            $deliveryDate = $edd->copy()->addDays(rand(-7, 7));
            $birthWeight = rand(2500, 3800);

            DeliveryInformation::create([
                'maternal_record_id' => $maternalRecord->id,
                'delivery_type' => ['VD', 'CS', 'VBAC'][rand(0, 2)],
                'birth_weight' => $birthWeight,
                'weight_category' => $birthWeight >= 2500 ? 'A' : 'B',
                'health_facility_type' => ['BHS', 'RHU/LHU', 'Government', 'Public'][rand(0, 3)],
                'health_facility_capable' => ['BEmONC', 'CEmONC'][rand(0, 1)],
                'non_health_facility' => null,
                'birth_attendant' => ['MD', 'RN', 'MW'][rand(0, 2)],
                'delivery_date' => $deliveryDate,
                'delivery_time' => sprintf('%02d:%02d:00', rand(0, 23), rand(0, 59)),
            ]);

            // Create Postnatal Care
            PostnatalCare::create([
                'maternal_record_id' => $maternalRecord->id,
                'contact_1' => $deliveryDate->copy()->addHours(12),
                'contact_2' => $deliveryDate->copy()->addDays(3),
                'contact_3' => $deliveryDate->copy()->addDays(10),
                'contact_4' => $deliveryDate->copy()->addWeeks(6),
                'completed_4pnc' => true,
            ]);

            // Create Postpartum Supplementation
            for ($i = 1; $i <= 3; $i++) {
                PostpartumSupplementation::create([
                    'maternal_record_id' => $maternalRecord->id,
                    'visit_number' => $i,
                    'visit_date' => $deliveryDate->copy()->addWeeks($i * 2),
                    'tablets_given' => rand(30, 60),
                    'completed_ifa' => $i == 3,
                ]);
            }

            $this->command->info("Created maternal care record for {$personData['first_name']} {$personData['last_name']}");
        }

        $this->command->info('Maternal care seeder completed successfully!');
        $this->command->info('Total records created: 100');
        $this->command->info('You can now view the records at: /parent/maternal-care/list');
    }
}
