<?php

use App\Http\Controllers\DistributorController;
use App\Http\Controllers\SalesAdmin\DashboardController as SalesAdminDashboardController;
use App\Http\Controllers\Distributor\DashboardController;
use App\Http\Controllers\Distributor\DealerManagementController;
use App\Http\Controllers\Dealer\ReceiptController;
use App\Http\Controllers\Dealer\InvoiceController;
use App\Http\Controllers\Dealer\InquiryController;
use App\Http\Controllers\Dealer\InventoryController as DealerInventoryController;
use App\Http\Controllers\Distributor\OrderController as AdminOrderController;
use App\Http\Controllers\Dealer\OrderController;
use App\Http\Controllers\Dealer\CatalogController;
use App\Http\Controllers\Distributor\InventoryController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Fixed Root Route
Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    
    // The Traffic Cop (Updated to handle sales_admin too)
    Route::get('/dashboard', function (\Illuminate\Http\Request $request) {
        if ($request->user()->role === 'distributor') {
            return redirect()->route('distributor.dashboard');
        } elseif ($request->user()->role === 'sales_admin') {
            return redirect()->route('sales_admin.dashboard');
        }
        return redirect()->route('dealer.dashboard');
    })->name('dashboard');

    // DISTRIBUTOR ROUTES
    Route::middleware('role:distributor')->group(function () {
        Route::get('/distributor/dashboard', [DistributorController::class, 'dashboard'])->name('distributor.dashboard');
        Route::get('/distributor/inventory', [InventoryController::class, 'index'])->name('distributor.inventory');
        Route::post('/distributor/inventory', [InventoryController::class, 'store'])->name('distributor.inventory.store');

        Route::get('/distributor/orders', [AdminOrderController::class, 'index'])->name('distributor.orders');
        Route::patch('/distributor/orders/{id}/status', [AdminOrderController::class, 'updateStatus'])->name('distributor.orders.status');
        
        // Dealer Management Routes
        Route::get('/distributor/dealers', [DealerManagementController::class, 'index'])->name('distributor.dealers');
        Route::post('/distributor/dealers', [DealerManagementController::class, 'store'])->name('distributor.dealers.store');
    });

    // DEALER ROUTES
    Route::middleware('role:dealer')->group(function () {
        Route::get('/dealer/dashboard', function () {
            return Inertia::render('Dealer/Dashboard');
        })->name('dealer.dashboard');

        Route::get('/dealer/inventory', [DealerInventoryController::class, 'index'])->name('dealer.inventory');
        Route::get('/dealer/inquiries', [InquiryController::class, 'index'])->name('dealer.inquiries');
        Route::post('/dealer/inquiries', [InquiryController::class, 'store'])->name('dealer.inquiries.store');
        Route::post('/dealer/invoices', [InvoiceController::class, 'store'])->name('dealer.invoices.store');
        Route::get('/dealer/invoices/{id}/proforma', [InvoiceController::class, 'proforma'])->name('dealer.invoices.proforma');
        Route::get('/dealer/invoices', [InvoiceController::class, 'index'])->name('dealer.invoices');
        
        Route::post('/dealer/receipts', [ReceiptController::class, 'store'])->name('dealer.receipts.store');
        Route::get('/dealer/receipts/{id}/print', [ReceiptController::class, 'print'])->name('dealer.receipts.print');
        Route::get('/dealer/catalog', [CatalogController::class, 'index'])->name('dealer.catalog');
        
        Route::post('/dealer/orders', [OrderController::class, 'store'])->name('dealer.orders.store');
        Route::get('/dealer/orders', [OrderController::class, 'index'])->name('dealer.orders');
    });

    // SALES ADMIN ROUTES
    Route::middleware('role:sales_admin')->group(function () {
        Route::get('/sales-admin/dashboard', [SalesAdminDashboardController::class, 'index'])->name('sales_admin.dashboard');
    });
});

require __DIR__.'/auth.php';