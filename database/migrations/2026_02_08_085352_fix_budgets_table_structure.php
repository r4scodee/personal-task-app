<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('budgets', function (Blueprint $table) {
            // Cek dulu, kalau kolom belum ada baru tambahin (Biar gak error)
            if (!Schema::hasColumn('budgets', 'target_name')) {
                $table->string('target_name')->after('id');
            }
            
            if (!Schema::hasColumn('budgets', 'category')) {
                $table->string('category')->nullable()->after('target_name');
            }

            if (!Schema::hasColumn('budgets', 'type')) {
                $table->enum('type', ['income', 'expense'])->default('income')->after('amount');
            }

            // Mengubah folder_id jadi boleh kosong tanpa hapus kolom
            $table->unsignedBigInteger('folder_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        // Gak perlu drop table, cukup drop kolom kalau mau rollback
        Schema::table('budgets', function (Blueprint $table) {
            $table->dropColumn(['target_name', 'category', 'type']);
        });
    }
};