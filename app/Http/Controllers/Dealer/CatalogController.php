<?php

namespace App\Http\Controllers\Dealer;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    public function index()
    {
        // Fetch all available TVS bikes from the database
        $products = Product::latest()->get();

        return Inertia::render('Dealer/Catalog', [
            'products' => $products
        ]);
    }
}