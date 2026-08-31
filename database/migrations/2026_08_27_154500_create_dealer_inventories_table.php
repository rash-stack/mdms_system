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
        Schema::create('dealer_inventories', function (Blueprint $table) {
            $table->id();
            
            // Connects to the specific Dealer
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Connects to the specific TVS Bike
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            
            // The amount currently sitting in the dealer's showroom
            $table->integer('quantity')->default(0);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dealer_inventories');
    }
};
