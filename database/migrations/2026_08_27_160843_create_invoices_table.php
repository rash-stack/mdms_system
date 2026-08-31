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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            
            // Connect to the Inquiry (which holds the customer & bike details)
            $table->foreignId('inquiry_id')->constrained()->onDelete('cascade');
            
            // Financial Details
            $table->string('payment_method')->default('cash'); // 'cash' or 'finance'
            $table->string('finance_provider')->nullable(); // e.g., Commercial Bank, LB Finance
            $table->decimal('down_payment', 12, 2)->default(0);
            $table->decimal('loan_amount', 12, 2)->default(0);
            $table->decimal('total_price', 12, 2);
            
            $table->string('status')->default('proforma'); // proforma, paid
            
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
