<?php

namespace App\Http\Controllers\Distributor;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\DealerInventory; // Added the new model
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['product', 'user'])->latest()->get();

        return Inertia::render('Distributor/Orders', [
            'orders' => $orders
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected'
        ]);

        $order = Order::findOrFail($id);

        // If the order is already processed, do nothing
        if ($order->status !== 'pending') {
            return redirect()->back();
        }

        if ($request->status === 'approved') {
            $product = $order->product;

            if ($product->stock_quantity < $order->quantity) {
                return redirect()->back()->withErrors(['error' => 'Not enough stock to approve this order!']);
            }

            // 1. Deduct from Distributor stock
            $product->stock_quantity -= $order->quantity;
            $product->save();

            // 2. Add to Dealer Inventory
            // firstOrCreate checks if the dealer already has this bike model. If not, it creates a 0-stock record first.
            $dealerStock = DealerInventory::firstOrCreate(
                ['user_id' => $order->user_id, 'product_id' => $order->product_id],
                ['quantity' => 0]
            );
            
            $dealerStock->quantity += $order->quantity;
            $dealerStock->save();
        }

        // 3. Mark order as approved or rejected
        $order->status = $request->status;
        $order->save();

        return redirect()->back();
    }
}