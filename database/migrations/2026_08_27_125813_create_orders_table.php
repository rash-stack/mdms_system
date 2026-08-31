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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            
            // Connects to the user (Dealer) who placed the order
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Connects to the specific product they want
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            
            // Order details
            $table->integer('quantity');
            $table->decimal('total_price', 12, 2); // 12 digits total, 2 decimals to handle bulk orders
            $table->string('status')->default('pending'); // Status can be: pending, approved, rejected
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
