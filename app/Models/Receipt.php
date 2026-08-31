<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'receipt_number',
        'amount_paid',
        'payment_method',
        'remarks',
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}