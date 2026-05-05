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
        Schema::create('postnatal_care', function (Blueprint $table) {
            $table->id();
            $table->foreignId('maternal_record_id')->constrained()->onDelete('cascade');
            $table->date('contact_1')->nullable(); // within 24 hours after delivery
            $table->date('contact_2')->nullable(); // on day 3
            $table->date('contact_3')->nullable(); // between 7-14 days
            $table->date('contact_4')->nullable(); // 6 weeks after birth
            $table->boolean('completed_4pnc')->default(false);
            $table->timestamps();
            
            $table->unique('maternal_record_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('postnatal_care');
    }
};
