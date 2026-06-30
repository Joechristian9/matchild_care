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
            $table->decimal('bmi', 5, 2)->nullable()->after('height');
            $table->decimal('fetal_heart_tone', 5, 2)->nullable()->after('bmi');
            $table->decimal('fundal_height', 5, 2)->nullable()->after('fetal_heart_tone');
            $table->string('vital_signs_others', 500)->nullable()->after('fundal_height');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('maternal_records', function (Blueprint $table) {
            $table->dropColumn(['bmi', 'fetal_heart_tone', 'fundal_height', 'vital_signs_others']);
        });
    }
};
