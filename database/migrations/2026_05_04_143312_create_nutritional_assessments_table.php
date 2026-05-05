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
        Schema::create('nutritional_assessments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('maternal_record_id')->constrained()->onDelete('cascade');
            $table->decimal('height', 5, 2)->nullable(); // in cm
            $table->decimal('weight_1st_trimester', 5, 2)->nullable(); // in kg
            $table->decimal('weight_2nd_trimester', 5, 2)->nullable();
            $table->decimal('weight_3rd_trimester', 5, 2)->nullable();
            $table->decimal('bmi_1st_trimester', 5, 2)->nullable();
            $table->enum('remarks', ['N', 'U', 'O', 'A', 'B'])->nullable();
            // N=Normal, U=Underweight, O=Overweight, A=Receiving 8 ANC, B=Trans Out
            $table->timestamps();
            
            $table->unique('maternal_record_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nutritional_assessments');
    }
};
