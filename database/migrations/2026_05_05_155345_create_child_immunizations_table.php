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
        Schema::create('child_immunizations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('child_id')
                ->constrained('children')
                ->cascadeOnDelete();

            // Children protected at birth from neonatal tetanus
            $table->boolean('protected_at_birth_tt2')->default(false);
            $table->boolean('protected_at_birth_tt3_tt5')->default(false);

            // BCG
            $table->date('bcg_0_28_days')->nullable();
            $table->date('bcg_29_days_to_1_year')->nullable();

            // Hepatitis B
            $table->date('hepa_b_within_24_hours')->nullable();
            $table->date('hepa_b_more_than_24_hours')->nullable();

            // DPT-Hib-HepB / Pentavalent
            $table->date('pentavalent_1')->nullable();
            $table->date('pentavalent_2')->nullable();
            $table->date('pentavalent_3')->nullable();

            // OPV
            $table->date('opv_1')->nullable();
            $table->date('opv_2')->nullable();
            $table->date('opv_3')->nullable();

            // IPV
            $table->date('ipv_1')->nullable();
            $table->date('ipv_2')->nullable();

            // PCV
            $table->date('pcv_1')->nullable();
            $table->date('pcv_2')->nullable();
            $table->date('pcv_3')->nullable();

            // MMR
            $table->date('mmr_1')->nullable();
            $table->date('mmr_2')->nullable();

            // Status
            $table->boolean('fic')->default(false); // Fully Immunized Child 0-12 mos
            $table->boolean('cic')->default(false); // Completely Immunized Child 13-23 mos

            $table->text('remarks_action_taken')->nullable();

            $table->timestamps();

            $table->unique('child_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('child_immunizations');
    }
};
