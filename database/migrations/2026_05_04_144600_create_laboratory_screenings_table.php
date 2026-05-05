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
        Schema::create('laboratory_screenings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('maternal_record_id')->constrained()->onDelete('cascade');
            
            // Hepatitis B
            $table->boolean('completed_hepatitis_b')->default(false);
            $table->date('hepatitis_b_date')->nullable();
            $table->string('hepatitis_b_result', 50)->nullable();
            
            // CBC/Hgb/Hct Count
            $table->boolean('completed_cbc_hgb_hct')->default(false);
            $table->date('cbc_hgb_hct_date')->nullable();
            $table->string('cbc_hgb_hct_result', 50)->nullable();
            
            // Gestational Diabetes Mellitus
            $table->boolean('completed_gestational_diabetes')->default(false);
            $table->date('gestational_diabetes_date')->nullable();
            $table->string('gestational_diabetes_result', 50)->nullable();
            
            $table->timestamps();
            
            $table->unique('maternal_record_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laboratory_screenings');
    }
};
