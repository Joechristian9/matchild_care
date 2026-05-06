<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test user
        User::factory()->create([
            'name' => 'joe',
            'email' => 'joe@gmail.com',
            'password' => bcrypt('123'),
        $this->call([
            RolePermissionSeeder::class,
        ]);
    }
}
