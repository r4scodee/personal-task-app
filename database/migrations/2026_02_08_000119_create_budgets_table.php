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
        Schema::create('budgets', function (Blueprint $table) {
            $table->id();
            $table->string('target_name')->after('id'); 
            $table->string('category')->nullable()->after('target_name');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('description');
            $table->foreignId('folder_id')->nullable()->change();
            $table->decimal('amount', 15, 2); 
            $table->enum('type', ['income', 'expense']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('budgets');
    }
};
