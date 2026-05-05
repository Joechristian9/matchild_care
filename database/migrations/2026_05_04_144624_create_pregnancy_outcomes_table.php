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
        Schema::create('pregnancy_outcomes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('maternal_record_id')->constrained()->onDelete('cascade');
            $table->date('date_terminated')->nullable();
            $table->enum('outcome_type', ['FT', 'PT', 'FD', 'AB'])->nullable();
            // FT=Full Term, PT=Pre-Term, FD=Fetal Death, AB=Abortion
            $table->text('remarks_action_taken')->nullable();
            $table->timestamps();
            
            $table->unique('maternal_record_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pregnancy_outcomes');
    }
};
