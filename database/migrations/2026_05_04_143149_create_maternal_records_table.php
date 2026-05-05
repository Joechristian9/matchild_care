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
        Schema::create('maternal_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('date_of_registration');
            $table->string('family_serial', 50);
            $table->string('last_name', 100);
            $table->string('first_name', 100);
            $table->string('middle_initial', 2)->nullable();
            $table->text('address');
            $table->integer('age');
            $table->enum('age_group', ['10-14', '15-19', '20-49']);
            $table->date('last_menstrual_period');
            $table->integer('gravida');
            $table->integer('parity');
            $table->string('expected_date_of_delivery', 20);
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('family_serial');
            $table->index('date_of_registration');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maternal_records');
    }
};
