import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function Inventory({ auth, inventory = [] }) {
    const [search, setSearch] = useState('');

    const filteredInventory = useMemo(() => {
        const query = search.toLowerCase();

        return inventory.filter(
            (item) =>
                item.product?.name?.toLowerCase().includes(query) ||
                item.product?.sku?.toLowerCase().includes(query),
        );
    }, [inventory, search]);

    const totalUnits = inventory.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0,
    );

    const getStockStatus = (quantity) => {
        const stock = Number(quantity || 0);

        if (stock === 0) {
            return {
                label: 'Out of stock',
                style: 'bg-rose-50 text-rose-700 ring-rose-600/20',
            };
        }

        if (stock <= 5) {
            return {
                label: 'Low stock',
                style: 'bg-amber-50 text-amber-700 ring-amber-600/20',
            };
        }

        return {
            label: 'Healthy stock',
            style: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
        };
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
                        Dealer portal
                    </p>
                    <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-800">
                        My Showroom Inventory
                    </h2>
                </div>
            }
        >
            <Head title="Showroom Inventory" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 py-8">
                <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
                    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 p-8 text-white shadow-2xl shadow-indigo-200 sm:p-10">
                        <div className="relative z-10 max-w-2xl">
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-sm">
                                🏍️ Showroom overview
                            </span>

                            <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                                Your stock, always in control.
                            </h1>

                            <p className="mt-4 leading-7 text-blue-100">
                                Monitor available motorcycles in your showroom and identify stock
                                levels that need attention.
                            </p>
                        </div>

                        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white/10" />
                        <div className="absolute -bottom-40 right-20 h-96 w-96 rounded-full border-[40px] border-white/10" />
                    </section>

                    <section className="grid gap-5 sm:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 border-t-4 border-indigo-500 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                            <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                                Product models
                            </p>
                            <p className="mt-3 text-3xl font-black text-slate-800">
                                {inventory.length}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">Currently stocked models</p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 border-t-4 border-emerald-500 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                            <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                                Total units
                            </p>
                            <p className="mt-3 text-3xl font-black text-slate-800">
                                {totalUnits.toLocaleString('en-LK')}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">Available in showroom</p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 border-t-4 border-amber-500 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                            <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                                Stock alerts
                            </p>
                            <p className="mt-3 text-3xl font-black text-amber-600">
                                {
                                    inventory.filter(
                                        (item) => Number(item.quantity || 0) <= 5,
                                    ).length
                                }
                            </p>
                            <p className="mt-1 text-sm text-slate-500">Models needing attention</p>
                        </div>
                    </section>

                    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-col gap-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-xl font-black text-slate-800">
                                    Current stock levels
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    Search and review your showroom inventory.
                                </p>
                            </div>

                            <div className="relative w-full sm:max-w-xs">
                                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                                    🔍
                                </span>
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search model or SKU..."
                                    className="w-full rounded-xl border-slate-200 py-3 pl-11 pr-4 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-slate-50">
                                    <tr>
                                        {['Product', 'SKU', 'Quantity', 'Status'].map((heading) => (
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
                                    {filteredInventory.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-16 text-center">
                                                <div className="text-5xl">📦</div>
                                                <p className="mt-3 font-bold text-slate-700">
                                                    {search
                                                        ? 'No matching stock found'
                                                        : 'Your showroom is currently empty'}
                                                </p>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    Request stock from the product catalog to get
                                                    started.
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredInventory.map((item) => {
                                            const status = getStockStatus(item.quantity);

                                            return (
                                                <tr
                                                    key={item.id}
                                                    className="transition hover:bg-indigo-50/40"
                                                >
                                                    <td className="whitespace-nowrap px-6 py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-xl">
                                                                🏍️
                                                            </div>
                                                            <span className="font-bold text-slate-800">
                                                                {item.product?.name || 'Unknown model'}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-5 text-sm font-semibold text-slate-500">
                                                        {item.product?.sku || 'N/A'}
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-5 text-sm font-black text-slate-800">
                                                        {Number(item.quantity || 0).toLocaleString('en-LK')}{' '}
                                                        units
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-5">
                                                        <span
                                                            className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ring-1 ring-inset ${status.style}`}
                                                        >
                                                            {status.label}
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
        </AuthenticatedLayout>
    );
}