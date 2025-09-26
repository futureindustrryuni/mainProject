<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');                      
            $table->unsignedBigInteger('category_id');    
            $table->unsignedBigInteger('author_id');      
            $table->integer('reading_time')->nullable();  
            $table->string('tags')->nullable();           
            $table->string('image')->nullable();         
            $table->text('description');      
            $table->integer('views')->default(0);            
            $table->timestamps();

            
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('author_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};