<?php

namespace App\Http\Controllers\Distributor;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class DealerManagementController extends Controller
{
    // List all dealers
    public function index()
    {
        // Fetch all users who have the 'dealer' role
        $dealers = User::where('role', 'dealer')->latest()->get();

        return Inertia::render('Distributor/Dealers', [
            'dealers' => $dealers
        ]);
    }

    // Create a new dealer account
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'dealer', // Force the role to 'dealer'
        ]);

        return redirect()->back();
    }
}