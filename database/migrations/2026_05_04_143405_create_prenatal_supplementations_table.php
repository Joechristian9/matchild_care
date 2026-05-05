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
        Schema::create('prenatal_supplementations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('maternal_record_id')->constrained()->onDelete('cascade');
            $table->integer('visit_number'); // 1-6
            $table->date('supplementation_date')->nullable();
            $table->integer('tablets_given')->nullable();
            $table->enum('supplement_type', ['IFA'])->default('IFA'); // Iron Folic Acid
            $table->timestamps();
            
            $table->unique(['maternal_record_id', 'visit_number', 'supplement_type'], 'prenatal_supp_unique');
            $table->index('supplementation_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prenatal_supplementations');
    }
};
