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
        Schema::create('developers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('address')->nullable();
            $table->text('resume_text')->nullable();
            $table->string('resume_pdf_url')->nullable();
            $table->string('github_uri')->nullable();
            $table->integer('score')->default(0);
            $table->text('experience')->nullable();
            $table->boolean('request_resume_completed')->default(false);
            $table->boolean('request_project_post')->default(false);
            $table->string('phone_number')->nullable();
            // $table->string('website')->nullable(); [Phase 2]
            $table->enum('availability',['Freelance','Full_Time','Part_Time'])->default('Full_Time');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('developers');
    }
};
