<?php

namespace App\Http\Controllers\Distributor;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    public function index()
    {
        // Fetch all products from the database, newest first
        $products = Product::latest()->get();

        return Inertia::render('Distributor/Inventory', [
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        // 1. Validate the incoming data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|max:100|unique:products,sku',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
        ]);

        // 2. Save to the database
        Product::create($validated);

        // 3. Send the user back (Inertia handles this seamlessly without refreshing!)
        return redirect()->back();
    }
}