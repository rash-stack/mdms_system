<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'inquiry_id',
        'payment_method',
        'finance_provider',
        'down_payment',
        'loan_amount',
        'total_price',
        'status',
    ];

    public function inquiry()
    {
        return $this->belongsTo(Inquiry::class);
    }
}