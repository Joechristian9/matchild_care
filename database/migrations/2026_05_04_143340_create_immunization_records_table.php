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
        Schema::create('immunization_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('maternal_record_id')->constrained()->onDelete('cascade');
            $table->date('td1_tt1')->nullable();
            $table->date('td2_tt2')->nullable();
            $table->date('td3_tt3')->nullable();
            $table->date('td4_tt4')->nullable();
            $table->date('td5_tt5')->nullable();
            $table->enum('fully_immunized_status', ['Y', 'N', 'X'])->nullable();
            // Y=Yes, N=No, X=Unknown
            $table->date('deworming_date')->nullable();
            $table->timestamps();

            $table->unique('maternal_record_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('immunization_records');
    }
};
