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
        Schema::create('receipts', function (Blueprint $table) {
            $table->id();
            
            // Connect to the specific Invoice
            $table->foreignId('invoice_id')->constrained()->onDelete('cascade');
            
            // Payment Details
            $table->string('receipt_number')->unique();
            $table->decimal('amount_paid', 12, 2);
            $table->string('payment_method')->default('cash'); // cash, bank_transfer, card
            $table->text('remarks')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('receipts');
    }
};
