import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';

const stockStyles = {
    healthy: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    low: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    empty: 'bg-rose-50 text-rose-700 ring-rose-600/20',
};

export default function Inventory({ auth, products = [] }) {
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState('');

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        sku: '',
        price: '',
        stock_quantity: '',
    });

    const filteredProducts = useMemo(() => {
        const query = search.toLowerCase();

        return products.filter(
            (product) =>
                product.name?.toLowerCase().includes(query) ||
                product.sku?.toLowerCase().includes(query),
        );
    }, [products, search]);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('distributor.inventory.store'), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    const getStockStatus = (quantity) => {
        if (Number(quantity) === 0) return ['Out of stock', stockStyles.empty];
        if (Number(quantity) <= 5) return ['Low stock', stockStyles.low];

        return ['In stock', stockStyles.healthy];
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                        Distributor portal
                    </p>
                    <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-800">
                        Inventory Management
                    </h2>
                </div>
            }
        >
            <Head title="Inventory Management" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 py-8">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 p-8 text-white shadow-2xl shadow-indigo-200">
                        <div className="relative z-10">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-100">
                                Product catalogue
                            </p>
                            <h1 className="mt-3 text-3xl font-black sm:text-4xl">
                                Keep your inventory moving.
                            </h1>
                            <p className="mt-3 max-w-xl text-blue-100">
                                Add products, monitor stock levels, and keep your dealership supplied
                                with the latest models.
                            </p>
                        </div>

                        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white/10" />
                        <div className="absolute -bottom-40 right-24 h-96 w-96 rounded-full border-[40px] border-white/10" />
                    </section>

                    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-xl font-black text-slate-800">All products</h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    {products.length} product{products.length === 1 ? '' : 's'} in
                                    your catalogue
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowModal(true)}
                                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
                            >
                                + Add new product
                            </button>
                        </div>

                        <div className="border-b border-slate-100 p-6">
                            <div className="relative max-w-md">
                                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                                    🔍
                                </span>
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by product name or SKU..."
                                    className="w-full rounded-xl border-slate-200 py-3 pl-11 pr-4 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-slate-50">
                                    <tr>
                                        {['Product', 'SKU', 'Price', 'Stock', 'Status'].map((heading) => (
                                            <th
                                                key={heading}
                                                className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-400"
                                            >
                                                {heading}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {filteredProducts.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-14 text-center">
                                                <div className="text-4xl">📦</div>
                                                <p className="mt-3 font-bold text-slate-700">
                                                    {search
                                                        ? 'No matching products found'
                                                        : 'No products found'}
                                                </p>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    Add your first product to get started.
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredProducts.map((product) => {
                                            const [status, statusClass] = getStockStatus(
                                                product.stock_quantity,
                                            );

                                            return (
                                                <tr
                                                    key={product.id}
                                                    className="transition hover:bg-indigo-50/40"
                                                >
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-xl">
                                                                🏍️
                                                            </div>
                                                            <span className="font-bold text-slate-800">
                                                                {product.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 text-sm font-semibold text-slate-500">
                                                        {product.sku}
                                                    </td>
                                                    <td className="px-6 py-5 text-sm font-black text-slate-800">
                                                        Rs. {Number(product.price).toLocaleString('en-LK')}
                                                    </td>
                                                    <td className="px-6 py-5 text-sm font-bold text-slate-700">
                                                        {product.stock_quantity}
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <span
                                                            className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ring-1 ring-inset ${statusClass}`}
                                                        >
                                                            {status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
                            <h3 className="text-2xl font-black">Add new product</h3>
                            <p className="mt-1 text-sm text-blue-100">
                                Enter the product details below.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5 p-6">
                            {([
                                ['name', 'Product name', 'text'],
                                ['sku', 'SKU / Barcode', 'text'],
                                ['price', 'Price (Rs.)', 'number'],
                                ['stock_quantity', 'Initial stock', 'number'],
                            ]).map(([field, label, type]) => (
                                <div key={field}>
                                    <label className="mb-1.5 block text-sm font-bold text-slate-700">
                                        {label}
                                    </label>
                                    <input
                                        type={type}
                                        step={field === 'price' ? '0.01' : undefined}
                                        min={field !== 'name' && field !== 'sku' ? '0' : undefined}
                                        value={data[field]}
                                        onChange={(e) => setData(field, e.target.value)}
                                        className="w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                    {errors[field] && (
                                        <p className="mt-1 text-xs font-semibold text-rose-600">
                                            {errors[field]}
                                        </p>
                                    )}
                                </div>
                            ))}

                            <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Save product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}