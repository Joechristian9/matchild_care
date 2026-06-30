<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('maternal_records', function (Blueprint $table) {
            $table->decimal('blood_pressure_systolic', 5, 2)->nullable()->after('age_group');
            $table->decimal('blood_pressure_diastolic', 5, 2)->nullable()->after('blood_pressure_systolic');
            $table->decimal('heart_rate', 5, 2)->nullable()->after('blood_pressure_diastolic');
            $table->decimal('temperature', 4, 1)->nullable()->after('heart_rate');
            $table->decimal('respiratory_rate', 5, 2)->nullable()->after('temperature');
            $table->decimal('weight', 5, 2)->nullable()->after('respiratory_rate');
            $table->decimal('height', 5, 2)->nullable()->after('weight');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('maternal_records', function (Blueprint $table) {
            $table->dropColumn([
                'blood_pressure_systolic',
                'blood_pressure_diastolic',
                'heart_rate',
                'temperature',
                'respiratory_rate',
                'weight',
                'height'
            ]);
        });
    }
};
