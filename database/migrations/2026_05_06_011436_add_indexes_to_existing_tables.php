<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * WHY ADD INDEXES?
     * Indexes speed up database queries by creating a "lookup table" for frequently searched columns.
     * Without indexes, the database scans ALL rows (slow). With indexes, it jumps directly to the data (fast).
     * 
     * WHAT WE'RE INDEXING:
     * - date_of_registration: Used for sorting (ORDER BY) and filtering (WHERE)
     * - family_serial: Used for searching specific families
     * - user_id: Used for filtering records by user
     * - deleted_at: Used for soft delete queries (WHERE deleted_at IS NULL)
     * - maternal_record_id: Used for joining child/maternal tables
     * 
     * PERFORMANCE IMPACT:
     * - Before: Query scans 60+ rows (gets slower with more data)
     * - After: Query uses index to find data instantly (stays fast even with 10,000+ rows)
     */
    public function up(): void
    {
        // Add indexes to maternal_records table
        Schema::table('maternal_records', function (Blueprint $table) {
            $table->index('date_of_registration', 'idx_maternal_date_registration');
            $table->index('family_serial', 'idx_maternal_family_serial');
            $table->index('user_id', 'idx_maternal_user_id');
            $table->index('deleted_at', 'idx_maternal_deleted_at');
        });

        // Add indexes to children table
        Schema::table('children', function (Blueprint $table) {
            $table->index('maternal_record_id', 'idx_children_maternal_record');
            $table->index('family_serial', 'idx_children_family_serial');
            $table->index('date_of_birth', 'idx_children_date_of_birth');
        });

        // Add indexes to postnatal_care table
        Schema::table('postnatal_care', function (Blueprint $table) {
            $table->index('maternal_record_id', 'idx_postnatal_maternal_record');
            $table->index('completed_4pnc', 'idx_postnatal_completed_4pnc');
        });

        // Add indexes to pregnancy_outcomes table
        Schema::table('pregnancy_outcomes', function (Blueprint $table) {
            $table->index('maternal_record_id', 'idx_pregnancy_maternal_record');
        });

        // Add indexes to prenatal_visits table
        Schema::table('prenatal_visits', function (Blueprint $table) {
            $table->index('maternal_record_id', 'idx_prenatal_maternal_record');
        });
    }

    /**
     * Reverse the migrations.
     * Drops all indexes if we need to rollback
     */
    public function down(): void
    {
        Schema::table('maternal_records', function (Blueprint $table) {
            $table->dropIndex('idx_maternal_date_registration');
            $table->dropIndex('idx_maternal_family_serial');
            $table->dropIndex('idx_maternal_user_id');
            $table->dropIndex('idx_maternal_deleted_at');
        });

        Schema::table('children', function (Blueprint $table) {
            $table->dropIndex('idx_children_maternal_record');
            $table->dropIndex('idx_children_family_serial');
            $table->dropIndex('idx_children_date_of_birth');
        });

        Schema::table('postnatal_care', function (Blueprint $table) {
            $table->dropIndex('idx_postnatal_maternal_record');
            $table->dropIndex('idx_postnatal_completed_4pnc');
        });

        Schema::table('pregnancy_outcomes', function (Blueprint $table) {
            $table->dropIndex('idx_pregnancy_maternal_record');
        });

        Schema::table('prenatal_visits', function (Blueprint $table) {
            $table->dropIndex('idx_prenatal_maternal_record');
        });
    }
};
