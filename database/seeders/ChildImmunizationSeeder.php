<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Child;
use App\Models\MaternalRecord;
use App\Models\ChildImmunization;
use Illuminate\Support\Str;

class ChildImmunizationSeeder extends Seeder
{
    public function run(): void
    {
        $maternalRecords = MaternalRecord::all();

        if ($maternalRecords->isEmpty()) {
            $this->command->warn('No maternal records found. Seed those first.');
            return;
        }

        foreach ($maternalRecords as $maternal) {
            $childCount = rand(1, 3);

            for ($i = 1; $i <= $childCount; $i++) {
                $child = Child::create([
                    'maternal_record_id' => $maternal->id,
                    'date_of_registration' => now()->toDateString(),
                    'family_serial' => $maternal->family_serial,
                    'last_name' => $maternal->last_name,
                    'first_name' => fake()->firstName(),
                    'middle_initial' => strtoupper(Str::random(1)),
                    'sex' => fake()->randomElement(['M', 'F']),
                    'date_of_birth' => now()->subMonths(rand(1, 24))->toDateString(),
                    'address' => $maternal->address,
                ]);

                $fic = fake()->boolean(60);
                $cic = fake()->boolean(40);

                ChildImmunization::create([
                    'child_id' => $child->id,

                    'protected_at_birth_tt2' => fake()->boolean(70),
                    'protected_at_birth_tt3_tt5' => fake()->boolean(50),

                    'bcg_0_28_days' => fake()->boolean(70)
                        ? $child->date_of_birth->copy()->addDays(rand(0, 28))->toDateString()
                        : null,

                    'bcg_29_days_to_1_year' => fake()->boolean(30)
                        ? $child->date_of_birth->copy()->addDays(rand(29, 365))->toDateString()
                        : null,

                    'hepa_b_within_24_hours' => fake()->boolean(70)
                        ? $child->date_of_birth->copy()->addHours(rand(1, 24))->toDateString()
                        : null,

                    'hepa_b_more_than_24_hours' => fake()->boolean(30)
                        ? $child->date_of_birth->copy()->addDays(rand(2, 30))->toDateString()
                        : null,

                    'pentavalent_1' => fake()->boolean(80) ? now()->subMonths(rand(1, 20))->toDateString() : null,
                    'pentavalent_2' => fake()->boolean(70) ? now()->subMonths(rand(1, 18))->toDateString() : null,
                    'pentavalent_3' => fake()->boolean(60) ? now()->subMonths(rand(1, 16))->toDateString() : null,

                    'opv_1' => fake()->boolean(80) ? now()->subMonths(rand(1, 20))->toDateString() : null,
                    'opv_2' => fake()->boolean(70) ? now()->subMonths(rand(1, 18))->toDateString() : null,
                    'opv_3' => fake()->boolean(60) ? now()->subMonths(rand(1, 16))->toDateString() : null,

                    'ipv_1' => fake()->boolean(70) ? now()->subMonths(rand(1, 15))->toDateString() : null,
                    'ipv_2' => fake()->boolean(50) ? now()->subMonths(rand(1, 12))->toDateString() : null,

                    'pcv_1' => fake()->boolean(80) ? now()->subMonths(rand(1, 20))->toDateString() : null,
                    'pcv_2' => fake()->boolean(70) ? now()->subMonths(rand(1, 18))->toDateString() : null,
                    'pcv_3' => fake()->boolean(60) ? now()->subMonths(rand(1, 16))->toDateString() : null,

                    'mmr_1' => fake()->boolean(70) ? now()->subMonths(rand(1, 12))->toDateString() : null,
                    'mmr_2' => fake()->boolean(40) ? now()->subMonths(rand(1, 6))->toDateString() : null,

                    'fic' => $fic,
                    'cic' => $cic,

                    'remarks_action_taken' => fake()->optional(0.4)->sentence(),
                ]);
            }
        }
    }
}
