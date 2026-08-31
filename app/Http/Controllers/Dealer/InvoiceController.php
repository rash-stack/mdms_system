<?php

namespace App\Http\Controllers\Dealer;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        // Fetch all invoices belonging to this dealer's inquiries
        $invoices = Invoice::with(['inquiry.product'])
            ->whereHas('inquiry', function($query) use ($request) {
                $query->where('user_id', $request->user()->id);
            })
            ->latest()
            ->get();

        return Inertia::render('Dealer/Invoices', [
            'invoices' => $invoices
        ]);
    }

    // Save the new invoice and mark the inquiry as 'invoiced'
    public function store(Request $request)
    {
        $validated = $request->validate([
            'inquiry_id' => 'required|exists:inquiries,id',
            'payment_method' => 'required|string',
            'finance_provider' => 'nullable|string',
            'down_payment' => 'required|numeric|min:0',
            'loan_amount' => 'required|numeric|min:0',
            'total_price' => 'required|numeric|min:0',
        ]);

        $validated['status'] = 'proforma';

        $invoice = Invoice::create($validated);

        // Update the inquiry status so it doesn't show as 'open' anymore
        Inquiry::where('id', $validated['inquiry_id'])->update(['status' => 'invoiced']);

        // Send the user directly to the new printable Proforma Invoice page
        return redirect()->route('dealer.invoices.proforma', $invoice->id);
    }

    // Display the printable Proforma Invoice
    public function proforma($id)
    {
        $invoice = Invoice::with(['inquiry.product', 'inquiry.dealer'])->findOrFail($id);

        return Inertia::render('Dealer/Proforma', [
            'invoice' => $invoice
        ]);
    }
}