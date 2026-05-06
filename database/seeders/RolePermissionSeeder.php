<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            'view-dashboard',
            'manage-patients',
            'view-own-records',
            'manage-maternal-records',
            'view-reports',
            'manage-users',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());

        $healthWorkerRole = Role::create(['name' => 'health_worker']);
        $healthWorkerRole->givePermissionTo([
            'view-dashboard',
            'manage-patients',
            'manage-maternal-records',
            'view-reports',
        ]);

        $patientRole = Role::create(['name' => 'patient']);
        $patientRole->givePermissionTo([
            'view-own-records',
        ]);

        // Create default users
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@maternal.com',
            'password' => bcrypt('password'),
        ]);
        $admin->assignRole('admin');

        $healthWorker = User::create([
            'name' => 'Health Worker',
            'email' => 'worker@maternal.com',
            'password' => bcrypt('password'),
        ]);
        $healthWorker->assignRole('health_worker');

        $patient = User::create([
            'name' => 'Jane Doe',
            'email' => 'patient@maternal.com',
            'password' => bcrypt('password'),
        ]);
        $patient->assignRole('patient');

        // Create a sample maternal record for the patient
        $maternalRecord = \App\Models\MaternalRecord::create([
            'user_id' => $patient->id,
            'date_of_registration' => now()->subMonths(3),
            'family_serial' => 'FAM-001',
            'last_name' => 'Doe',
            'first_name' => 'Jane',
            'middle_initial' => 'M',
            'address' => '123 Main Street, City',
            'age' => 28,
            'age_group' => '20-49',
            'last_menstrual_period' => now()->subMonths(5),
            'gravida' => 2,
            'parity' => 1,
            'expected_date_of_delivery' => now()->addMonths(4)->format('Y-m-d'),
        ]);

        // Add sample prenatal visits
        \App\Models\PrenatalVisit::create([
            'maternal_record_id' => $maternalRecord->id,
            'visit_number' => 1,
            'visit_date' => now()->subMonths(3),
        ]);

        \App\Models\PrenatalVisit::create([
            'maternal_record_id' => $maternalRecord->id,
            'visit_number' => 2,
            'visit_date' => now()->subMonths(2),
        ]);

        \App\Models\PrenatalVisit::create([
            'maternal_record_id' => $maternalRecord->id,
            'visit_number' => 3,
            'visit_date' => now()->subMonth(),
        ]);
    }
}
