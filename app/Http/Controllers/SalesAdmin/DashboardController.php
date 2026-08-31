<?php

namespace App\Http\Controllers\SalesAdmin;

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
        // Fetch network-wide data for read-only monitoring
        $approvedOrders = Order::with(['product', 'user'])->where('status', 'approved')->get();
        
        $modelSales = $approvedOrders->groupBy('product_id')->map(function ($orders) {
            return [
                'name' => $orders->first()->product->name ?? 'Unknown Model',
                'sold' => $orders->sum('quantity'),
                'revenue' => $orders->sum('total_price')
            ];
        })->sortByDesc('sold')->values();

        $dealerSales = $approvedOrders->groupBy('user_id')->map(function ($orders) {
            return [
                'name' => $orders->first()->user->name ?? 'Unknown Dealer',
                'bikes' => $orders->sum('quantity'),
                'revenue' => $orders->sum('total_price')
            ];
        })->sortByDesc('revenue')->values();

        $stats = [
            'total_revenue' => $approvedOrders->sum('total_price'),
            'total_dealers' => User::where('role', 'dealer')->count(),
            'total_products' => Product::count(),
            'total_orders' => Order::count(),
        ];

        return Inertia::render('SalesAdmin/Dashboard', [
            'modelSales' => $modelSales,
            'dealerSales' => $dealerSales,
            'stats' => $stats
        ]);
    }
}