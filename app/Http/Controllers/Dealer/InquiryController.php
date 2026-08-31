<?php

namespace App\Http\Controllers\Dealer;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InquiryController extends Controller
{
    public function index(Request $request)
    {
        // Get this dealer's inquiries
        $inquiries = Inquiry::with('product')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        // Get all products so the dealer can select them in the dropdown
        $products = Product::all();

        return Inertia::render('Dealer/Inquiries', [
            'inquiries' => $inquiries,
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|max:20',
            'customer_address' => 'nullable|string',
            'product_id' => 'nullable|exists:products,id',
            'notes' => 'nullable|string',
        ]);

        // Add the dealer's ID and set status to open
        $validated['user_id'] = $request->user()->id;
        $validated['status'] = 'open';

        Inquiry::create($validated);

        return redirect()->back();
    }
}