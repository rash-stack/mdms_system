<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
        'total_price',
        'status',
    ];

    // Connect Order to the Product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // Connect Order to the Dealer (User)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}