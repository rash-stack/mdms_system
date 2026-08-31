<?php

namespace App\Http\Controllers\Dealer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia; // Make sure to add this!

class OrderController extends Controller
{
    // Fetch and display the dealer's orders
    public function index(Request $request)
    {
        // Get orders for the logged-in user, include the product details, sort newest first
        $orders = Order::where('user_id', $request->user()->id)
            ->with('product')
            ->latest()
            ->get();

        return Inertia::render('Dealer/Orders', [
            'orders' => $orders
        ]);
    }

    // Save a new order
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);

        Order::create([
            'user_id' => $request->user()->id,
            'product_id' => $product->id,
            'quantity' => $request->quantity,
            'total_price' => $product->price * $request->quantity,
            'status' => 'pending',
        ]);

        return redirect()->back();
    }
}