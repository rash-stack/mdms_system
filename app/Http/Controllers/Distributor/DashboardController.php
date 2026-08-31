<?php

namespace App\Http\Controllers\Distributor;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Get Inventory Alerts (Bikes with stock under 10)
        $lowStock = Product::where('stock_quantity', '<', 10)->get();

        // 2. Fetch all approved orders to calculate analytics
        $approvedOrders = Order::with(['product', 'user'])->where('status', 'approved')->get();

        // Calculate Model-wise Sales
        $modelSales = $approvedOrders->groupBy('product_id')->map(function ($orders) {
            return [
                'name' => $orders->first()->product->name ?? 'Unknown Model',
                'sold' => $orders->sum('quantity'),
                'revenue' => $orders->sum('total_price')
            ];
        })->sortByDesc('sold')->values();

        // Calculate Dealer-wise Inflow
        $dealerSales = $approvedOrders->groupBy('user_id')->map(function ($orders) {
            return [
                'name' => $orders->first()->user->name ?? 'Unknown Dealer',
                'bikes' => $orders->sum('quantity'),
                'revenue' => $orders->sum('total_price')
            ];
        })->sortByDesc('revenue')->values();

        // 3. Quick Stats
        $stats = [
            'revenue' => $approvedOrders->sum('total_price'),
            'dealers' => User::where('role', 'dealer')->count(),
            'pending' => Order::where('status', 'pending')->count(),
        ];

        return Inertia::render('Distributor/Dashboard', [
            'lowStock' => $lowStock,
            'modelSales' => $modelSales,
            'dealerSales' => $dealerSales,
            'stats' => $stats
        ]);
    }
}