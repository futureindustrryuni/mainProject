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
        Schema::create('product_professor', function (Blueprint $table) {
            $table->id();

            
            $table->unsignedBigInteger('professor_id');
            $table->unsignedBigInteger('product_id');

            
            $table->timestamps();

            
            $table->foreign('professor_id')
                  ->references('id')
                  ->on('professors')
                  ->onDelete('cascade');

            $table->foreign('product_id')
                  ->references('id')
                  ->on('products')
                  ->onDelete('cascade');

            
            $table->unique(['professor_id', 'product_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_professor');
    }
};