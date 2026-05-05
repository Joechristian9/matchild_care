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
        Schema::create('postpartum_supplementations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('maternal_record_id')->constrained()->onDelete('cascade');
            $table->boolean('completed_ifa')->default(false);
            $table->integer('visit_number'); // 1, 2, or 3
            $table->date('visit_date')->nullable();
            $table->integer('tablets_given')->nullable();
            $table->timestamps();
            
            $table->unique(['maternal_record_id', 'visit_number'], 'postpartum_maternal_visit_unique');
        });
        
        // Create a separate table for IFA completion tracking
        Schema::create('postpartum_ifa_completions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('maternal_record_id')->constrained()->onDelete('cascade');
            $table->enum('completion_type', ['1st', '2nd']); // 1st or 2nd completion
            $table->enum('completed', ['yes', 'no'])->nullable();
            $table->date('date_completed')->nullable();
            $table->timestamps();
            
            $table->unique(['maternal_record_id', 'completion_type'], 'postpartum_ifa_maternal_type_unique');
        });
        
        // Create table for postpartum remarks
        Schema::create('postpartum_remarks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('maternal_record_id')->constrained()->onDelete('cascade');
            $table->enum('remark_type', ['A', 'B', 'C'])->nullable();
            // A=Trans In, B=Trans Out, C=Died before completing 4PN
            $table->timestamps();
            
            $table->unique('maternal_record_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('postpartum_remarks');
        Schema::dropIfExists('postpartum_ifa_completions');
        Schema::dropIfExists('postpartum_supplementations');
    }
};
