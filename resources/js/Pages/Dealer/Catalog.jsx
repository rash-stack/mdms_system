import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Catalog({ auth, products = [] }) {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { data, setData, post, processing, reset } = useForm({
        product_id: '',
        quantity: 1,
    });

    const openModal = (product) => {
        setSelectedProduct(product);
        setData({
            product_id: product.id,
            quantity: 1,
        });
    };

    const closeModal = () => {
        setSelectedProduct(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('dealer.orders.store'), {
            onSuccess: () => {
                closeModal();
                alert('Order placed successfully! Waiting for distributor approval.');
            },
        });
    };

    const getStockStyle = (quantity) => {
        if (quantity === 0) {
            return 'bg-rose-50 text-rose-700 ring-rose-600/20';
        }

        if (quantity <= 10) {
            return 'bg-amber-50 text-amber-700 ring-amber-600/20';
        }

        return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';
    };

    const getStockLabel = (quantity) => {
        if (quantity === 0) return 'Out of stock';
        if (quantity <= 10) return 'Low stock';

        return 'In stock';
    };

    const productPrice = Number(selectedProduct?.price || 0);
    const quantity = Number(data.quantity || 0);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
                        Dealer portal
                    </p>
                    <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-800">
                        TVS Product Catalog
                    </h2>
                </div>
            }
        >
            <Head title="Product Catalog" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 py-8">
                <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
                    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 p-8 text-white shadow-2xl shadow-indigo-200 sm:p-10">
                        <div className="relative z-10 max-w-2xl">
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-sm">
                                🏍️ Official dealer catalog
                            </span>

                            <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                                Find your next best seller.
                            </h1>

                            <p className="mt-4 max-w-xl leading-7 text-blue-100">
                                Browse available TVS models, check distributor stock, and submit
                                your stock request in just a few clicks.
                            </p>
                        </div>

                        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white/10" />
                        <div className="absolute -bottom-40 right-20 h-96 w-96 rounded-full border-[40px] border-white/10" />
                    </section>

                    {products.length === 0 ? (
                        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
                            <div className="text-5xl">📦</div>
                            <h3 className="mt-4 text-xl font-black text-slate-800">
                                No products available
                            </h3>
                            <p className="mt-2 text-sm text-slate-500">
                                Products will appear here once the distributor adds them.
                            </p>
                        </div>
                    ) : (
                        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products.map((product) => {
                                const stock = Number(product.stock_quantity || 0);
                                const isUnavailable = stock === 0;

                                return (
                                    <article
                                        key={product.id}
                                        className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                    >
                                        <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-100 via-blue-50 to-cyan-100">
                                            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/40" />
                                            <div className="text-7xl transition duration-300 group-hover:scale-110">
                                                🏍️
                                            </div>

                                            <span
                                                className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-black ring-1 ring-inset ${getStockStyle(stock)}`}
                                            >
                                                {getStockLabel(stock)}
                                            </span>
                                        </div>

                                        <div className="flex flex-1 flex-col p-6">
                                            <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
                                                {product.sku}
                                            </p>

                                            <h3 className="mt-2 text-xl font-black text-slate-800">
                                                {product.name}
                                            </h3>

                                            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                                                <span className="text-sm text-slate-500">
                                                    Available stock
                                                </span>
                                                <span className="font-black text-slate-800">
                                                    {stock} units
                                                </span>
                                            </div>

                                            <div className="mt-6 flex items-center justify-between gap-3">
                                                <div>
                                                    <p className="text-xs font-semibold text-slate-400">
                                                        Price per unit
                                                    </p>
                                                    <p className="mt-1 text-xl font-black text-emerald-600">
                                                        Rs.{' '}
                                                        {Number(product.price).toLocaleString(
                                                            'en-LK',
                                                        )}
                                                    </p>
                                                </div>

                                                <button
                                                    type="button"
                                                    disabled={isUnavailable}
                                                    onClick={() => openModal(product)}
                                                    className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                                                >
                                                    {isUnavailable ? 'Unavailable' : 'Request stock'}
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </section>
                    )}
                </div>
            </div>

            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
                            <p className="text-sm font-bold uppercase tracking-wider text-blue-100">
                                Stock request
                            </p>
                            <h3 className="mt-2 text-2xl font-black">
                                {selectedProduct.name}
                            </h3>
                            <p className="mt-1 text-sm text-blue-100">
                                SKU: {selectedProduct.sku}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 p-6">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Required quantity
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max={selectedProduct.stock_quantity}
                                    value={data.quantity}
                                    onChange={(e) => setData('quantity', e.target.value)}
                                    className="w-full rounded-xl border-slate-200 text-lg font-bold shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                                <p className="mt-2 text-xs text-slate-500">
                                    {selectedProduct.stock_quantity} units currently available
                                </p>
                            </div>

                            <div className="flex items-center justify-between rounded-2xl bg-indigo-50 p-4">
                                <span className="font-semibold text-slate-600">
                                    Estimated total
                                </span>
                                <span className="text-2xl font-black text-indigo-700">
                                    Rs. {(productPrice * quantity).toLocaleString('en-LK')}
                                </span>
                            </div>

                            <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing || quantity < 1}
                                    className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? 'Submitting...' : 'Submit request'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}