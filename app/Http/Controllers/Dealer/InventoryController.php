<?php

namespace App\Http\Controllers\Dealer;

use App\Http\Controllers\Controller;
use App\Models\DealerInventory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    public function index(Request $request)
    {
        // Fetch only the stock belonging to the logged-in dealer, including product details
        $inventory = DealerInventory::with('product')
            ->where('user_id', $request->user()->id)
            ->get();

        return Inertia::render('Dealer/Inventory', [
            'inventory' => $inventory
        ]);
    }
}