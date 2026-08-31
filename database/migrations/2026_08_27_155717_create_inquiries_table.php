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
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            
            // The dealer handling this inquiry
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // The bike the customer is interested in (nullable, in case they are just looking)
            $table->foreignId('product_id')->nullable()->constrained()->onDelete('set null');
            
            // Customer Details
            $table->string('customer_name');
            $table->string('customer_phone');
            $table->text('customer_address')->nullable();
            
            // Notes and Status
            $table->text('notes')->nullable();
            $table->string('status')->default('open'); // open, invoiced, lost
            
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inquiries');
    }
};
