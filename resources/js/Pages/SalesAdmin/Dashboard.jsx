import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    ArrowTrendingUpIcon,
    BuildingStorefrontIcon,
    ChartBarIcon,
    CurrencyDollarIcon,
    SparklesIcon,
    TrophyIcon,
} from '@heroicons/react/24/outline';

export default function SalesAdminDashboard({
    auth,
    modelSales = [],
    dealerSales = [],
    stats = {},
}) {
    const statCards = [
        {
            label: 'Network Revenue',
            value: `Rs. ${(stats.total_revenue ?? 0).toLocaleString('en-LK')}`,
            icon: CurrencyDollarIcon,
            color: 'emerald',
            accent: 'border-emerald-500',
            iconStyle: 'bg-emerald-100 text-emerald-600',
        },
        {
            label: 'Active Dealers',
            value: stats.total_dealers ?? 0,
            icon: BuildingStorefrontIcon,
            color: 'blue',
            accent: 'border-blue-500',
            iconStyle: 'bg-blue-100 text-blue-600',
        },
        {
            label: 'Bike Models',
            value: stats.total_products ?? 0,
            icon: ChartBarIcon,
            color: 'indigo',
            accent: 'border-indigo-500',
            iconStyle: 'bg-indigo-100 text-indigo-600',
        },
        {
            label: 'Orders Logged',
            value: stats.total_orders ?? 0,
            icon: TrophyIcon,
            color: 'amber',
            accent: 'border-amber-500',
            iconStyle: 'bg-amber-100 text-amber-600',
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                        Sales administration
                    </p>
                    <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-800">
                        Performance monitoring
                    </h2>
                </div>
            }
        >
            <Head title="Sales Admin Dashboard" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-slate-100 py-8">
                <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
                    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-indigo-900 to-blue-700 p-8 text-white shadow-2xl shadow-indigo-200 sm:p-10">
                        <div className="relative z-10 max-w-2xl">
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-md">
                                <SparklesIcon className="h-4 w-4 text-cyan-300" />
                                Network intelligence
                            </div>

                            <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                                Welcome back, {auth.user?.name || 'Sales Admin'}!
                            </h1>

                            <p className="mt-4 max-w-xl text-base leading-7 text-indigo-100">
                                Track sales performance, dealer activity, and revenue growth across
                                your entire distribution network.
                            </p>

                            <div className="mt-7 flex flex-wrap gap-3">
                                <button className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50">
                                    View detailed reports
                                </button>
                                <button className="rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20">
                                    Manage dealers
                                </button>
                            </div>
                        </div>

                        <div className="absolute -right-20 -top-28 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
                        <div className="absolute -bottom-40 right-24 h-96 w-96 rounded-full border-[45px] border-white/10" />
                        <div className="absolute right-12 top-12 hidden rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md lg:block">
                            <ArrowTrendingUpIcon className="h-16 w-16 text-cyan-200" />
                        </div>
                    </section>

                    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {statCards.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.label}
                                    className={`relative overflow-hidden rounded-2xl border border-slate-200 border-t-4 ${stat.accent} bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
                                >
                                    <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-indigo-50" />

                                    <div className="relative flex items-start justify-between">
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                                                {stat.label}
                                            </p>
                                            <p className="mt-3 text-2xl font-black text-slate-800 sm:text-3xl">
                                                {stat.value}
                                            </p>
                                            <p className="mt-2 text-sm text-slate-500">
                                                Updated network summary
                                            </p>
                                        </div>

                                        <div className={`rounded-2xl p-3 ${stat.iconStyle}`}>
                                            <Icon className="h-7 w-7" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </section>

                    <section className="grid gap-6 lg:grid-cols-2">
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-white p-6">
                                <div className="rounded-xl bg-indigo-100 p-2.5">
                                    <ChartBarIcon className="h-6 w-6 text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-slate-800">
                                        Model-wise network sales
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        Performance by motorcycle model
                                    </p>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-slate-50/70">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-400">
                                                Model
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-400">
                                                Units sold
                                            </th>
                                            <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-slate-400">
                                                Revenue
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {modelSales.map((sale, index) => (
                                            <tr
                                                key={index}
                                                className="transition hover:bg-indigo-50/50"
                                            >
                                                <td className="px-6 py-4 text-sm font-bold text-slate-800">
                                                    {sale.name}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-semibold text-slate-500">
                                                    {sale.sold} units
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm font-black text-emerald-600">
                                                    Rs. {(sale.revenue ?? 0).toLocaleString('en-LK')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-amber-50 to-white p-6">
                                <div className="rounded-xl bg-amber-100 p-2.5">
                                    <TrophyIcon className="h-6 w-6 text-amber-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-slate-800">
                                        Dealer performance
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        Highest-value network partners
                                    </p>
                                </div>
                            </div>

                            <div className="divide-y divide-slate-100">
                                {dealerSales.map((dealer, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between gap-4 p-5 transition hover:bg-amber-50/50"
                                    >
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-black text-indigo-700">
                                                {index + 1}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-bold text-slate-800">
                                                    {dealer.name}
                                                </p>
                                                <p className="mt-1 text-xs font-medium text-slate-400">
                                                    {dealer.bikes} units ordered
                                                </p>
                                            </div>
                                        </div>

                                        <p className="whitespace-nowrap text-sm font-black text-emerald-600">
                                            Rs. {(dealer.revenue ?? 0).toLocaleString('en-LK')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}