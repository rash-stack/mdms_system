<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DistributorController extends Controller
{
    public function dashboard()
    {
        // 1. Top Stat Cards
        $stats = [
            'revenue' => Order::where('status', 'approved')->sum('total_price'),
            'dealers' => User::where('role', 'dealer')->count(),
            'pending' => Order::where('status', 'pending')->count(),
        ];

        // 2. Low Stock Alerts (Assuming threshold is < 10)
       
        $lowStock = Product::where('stock_quantity', '<=', 10)
            ->select('name', 'stock_quantity')
            ->get();
        // 3. Monthly Sales (Current Year)
        $monthlySales = Order::selectRaw('MONTH(created_at) as month_num, MONTHNAME(created_at) as month, SUM(total_price) as sales')
            ->where('status', 'approved')
            ->whereYear('created_at', date('Y'))
            ->groupBy('month_num', 'month')
            ->orderBy('month_num')
            ->get();

        // 4. Daily Sales Volume (Last 7 Days)
        $dailySales = Order::selectRaw('DAYNAME(created_at) as day, SUM(total_price) as sales')
            ->where('status', 'approved')
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('day')
            // Order chronologically rather than alphabetically
            ->orderByRaw('FIELD(day, "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")')
            ->get();

        // 5. Top Selling Models
        $topModels = Order::selectRaw('products.name as model, SUM(orders.quantity) as units')
            ->join('products', 'orders.product_id', '=', 'products.id')
            ->where('orders.status', 'approved')
            ->groupBy('products.name')
            ->orderByDesc('units')
            ->limit(4)
            ->get();

        // 6. Revenue by Payment Type
        $paymentRevenue = collect([]);
       // 7. Dealer Revenue Comparison (Changed 'dealer_id' to 'user_id')
        $dealerComparison = Order::selectRaw('users.name as dealer, SUM(orders.total_price) as revenue')
            ->join('users', 'orders.user_id', '=', 'users.id')
            ->where('orders.status', 'approved')
            ->groupBy('users.name')
            ->orderByDesc('revenue')
            ->limit(4)
            ->get();

        // 8. Model Sales by Location (Bypassed until 'city' column is added)
        $modelLocationMap = [];

        return Inertia::render('Distributor/Dashboard', [
            'stats'            => $stats,
            'lowStock'         => $lowStock,
            'monthlySales'     => $monthlySales,
            'dailySales'       => $dailySales,
            'topModels'        => $topModels,
            'paymentRevenue'   => $paymentRevenue,
            'dealerComparison' => $dealerComparison,
            'modelLocation'    => $modelLocationMap,
        ]);// 8. Model Sales by Location (Bypassed until 'city' column is added)
        $modelLocationMap = [];

        return Inertia::render('Distributor/Dashboard', [
            'stats'            => $stats,
            'lowStock'         => $lowStock,
            'monthlySales'     => $monthlySales,
            'dailySales'       => $dailySales,
            'topModels'        => $topModels,
            'paymentRevenue'   => $paymentRevenue,
            'dealerComparison' => $dealerComparison,
            'modelLocation'    => $modelLocationMap,
        ]);
        // Format data to match Recharts dynamic grouping: [{ location: 'Colombo', Apache: 45, Ntorq: 30 }]
        $modelLocationMap = [];
        foreach ($rawLocationData as $row) {
            $loc = $row->location;
            if (!isset($modelLocationMap[$loc])) {
                $modelLocationMap[$loc] = ['location' => $loc];
            }
            // Dynamically assign the product name as a key (e.g., $modelLocationMap['Colombo']['Apache RTR'] = 45)
            $modelLocationMap[$loc][$row->name] = (int) $row->qty;
        }

        return Inertia::render('Distributor/Dashboard', [
            'stats'            => $stats,
            'lowStock'         => $lowStock,
            'monthlySales'     => $monthlySales,
            'dailySales'       => $dailySales,
            'topModels'        => $topModels,
            'paymentRevenue'   => $paymentRevenue,
            'dealerComparison' => $dealerComparison,
            'modelLocation'    => array_values($modelLocationMap),
        ]);
    }
}