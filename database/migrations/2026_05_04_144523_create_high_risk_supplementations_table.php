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
        Schema::create('high_risk_supplementations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('maternal_record_id')->constrained()->onDelete('cascade');
            $table->boolean('completed_calcium_supplementation')->default(false);
            $table->integer('visit_number'); // 1-4
            $table->date('supplementation_date')->nullable();
            $table->integer('tablets_given')->nullable();
            $table->timestamps();
            
            $table->unique(['maternal_record_id', 'visit_number'], 'high_risk_unique');
            $table->index('supplementation_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('high_risk_supplementations');
    }
};
