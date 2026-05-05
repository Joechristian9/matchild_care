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
        Schema::create('delivery_information', function (Blueprint $table) {
            $table->id();
            $table->foreignId('maternal_record_id')->constrained()->onDelete('cascade');
            $table->enum('delivery_type', ['CS', 'VD', 'VBAC', 'Combined'])->nullable();
            // CS=Cesarean Section, VD=Vaginal Delivery, VBAC=Vaginal Birth After Cesarean
            $table->integer('birth_weight')->nullable(); // in grams
            $table->enum('weight_category', ['A', 'B', 'C'])->nullable();
            // A=Normal, B=Low, C=Unknown
            $table->string('health_facility_type')->nullable();
            $table->string('health_facility_capable')->nullable(); // BEmONC or CEmONC
            $table->string('non_health_facility')->nullable();
            $table->enum('birth_attendant', ['MD', 'RN', 'MW', 'O', 'N/A'])->nullable();
            // MD=Doctor, RN=Nurse, MW=Midwife, O=Others
            $table->date('delivery_date')->nullable();
            $table->time('delivery_time')->nullable();
            $table->timestamps();
            
            $table->unique('maternal_record_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delivery_information');
    }
};
