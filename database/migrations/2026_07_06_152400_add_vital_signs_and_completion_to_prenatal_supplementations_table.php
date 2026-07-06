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
        Schema::table('prenatal_supplementations', function (Blueprint $table) {
            // Add vital signs columns
            $table->decimal('weight', 5, 2)->nullable()->after('tablets_given');
            $table->decimal('height', 5, 2)->nullable()->after('weight');
            $table->integer('blood_pressure_systolic')->nullable()->after('height');
            $table->integer('blood_pressure_diastolic')->nullable()->after('blood_pressure_systolic');
            $table->decimal('temperature', 3, 1)->nullable()->after('blood_pressure_diastolic');
            $table->integer('heart_rate')->nullable()->after('temperature');
            $table->integer('respiratory_rate')->nullable()->after('heart_rate');
            $table->integer('fetal_heart_tone')->nullable()->after('respiratory_rate');
            $table->decimal('fundal_height', 4, 1)->nullable()->after('fetal_heart_tone');
            $table->text('others')->nullable()->after('fundal_height');
            
            // Add completion tracking
            $table->boolean('is_completed')->default(false)->after('others');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('prenatal_supplementations', function (Blueprint $table) {
            $table->dropColumn([
                'weight',
                'height',
                'blood_pressure_systolic',
                'blood_pressure_diastolic',
                'temperature',
                'heart_rate',
                'respiratory_rate',
                'fetal_heart_tone',
                'fundal_height',
                'others',
                'is_completed',
            ]);
        });
    }
};
