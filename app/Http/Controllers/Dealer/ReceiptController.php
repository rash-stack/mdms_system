<?php

namespace App\Http\Controllers\Dealer;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Receipt;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReceiptController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'invoice_id' => 'required|exists:invoices,id',
            'amount_paid' => 'required|numeric|min:1',
            'payment_method' => 'required|string',
            'remarks' => 'nullable|string',
        ]);

        // Generate a random 5-digit receipt number
        $validated['receipt_number'] = 'REC-' . rand(10000, 99999);

        $receipt = Receipt::create($validated);

        // Mark the invoice as paid
        Invoice::where('id', $validated['invoice_id'])->update(['status' => 'paid']);

        return redirect()->route('dealer.receipts.print', $receipt->id);
    }

    public function print($id)
    {
        $receipt = Receipt::with(['invoice.inquiry.product', 'invoice.inquiry.dealer'])->findOrFail($id);

        return Inertia::render('Dealer/PrintReceipt', [
            'receipt' => $receipt
        ]);
    }
}