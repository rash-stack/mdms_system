import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    ArrowTrendingUpIcon,
    BanknotesIcon,
    ClockIcon,
    CubeIcon,
    ExclamationTriangleIcon,
    SparklesIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function Dashboard({ 
    auth, 
    lowStock = [], 
    stats = {},
    monthlySales = [
        { month: 'Jan', sales: 45 }, { month: 'Feb', sales: 52 }, { month: 'Mar', sales: 48 },
        { month: 'Apr', sales: 70 }, { month: 'May', sales: 65 }, { month: 'Jun', sales: 85 }
    ],
    dailySales = [
        { day: 'Mon', sales: 4 }, { day: 'Tue', sales: 7 }, { day: 'Wed', sales: 5 },
        { day: 'Thu', sales: 8 }, { day: 'Fri', sales: 12 }, { day: 'Sat', sales: 15 }, { day: 'Sun', sales: 9 }
    ],
    topModels = [
        { model: 'Apache RTR 160', units: 120 }, { model: 'Ntorq 125', units: 98 },
        { model: 'Jupiter 125', units: 85 }, { model: 'Raider', units: 65 }
    ],
    paymentRevenue = [
        { name: 'Bank Transfer', value: 4500000 }, { name: 'Cash', value: 1200000 },
        { name: 'Financing', value: 3800000 }
    ],
    dealerComparison = [
        { dealer: 'City Motors', revenue: 2500000 }, { dealer: 'Metro TVS', revenue: 1800000 },
        { dealer: 'Highway Auto', revenue: 3200000 }, { dealer: 'Valley Riders', revenue: 1500000 }
    ],
    modelLocation = [
        { location: 'Colombo', Apache: 45, Ntorq: 30 },
        { location: 'Kandy', Apache: 25, Ntorq: 40 },
        { location: 'Galle', Apache: 20, Ntorq: 25 },
        { location: 'Jaffna', Apache: 15, Ntorq: 15 }
    ]
}) {
    const PIE_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#f43f5e'];

    const statCards = [
        {
            label: 'Total Revenue',
            value: `Rs. ${(stats.revenue ?? 0).toLocaleString('en-LK')}`,
            icon: BanknotesIcon,
            color: 'emerald',
            description: 'Revenue generated',
        },
        {
            label: 'Active Dealers',
            value: stats.dealers ?? 0,
            icon: UsersIcon,
            color: 'blue',
            description: 'Registered dealers',
        },
        {
            label: 'Pending Orders',
            value: stats.pending ?? 0,
            icon: ClockIcon,
            color: 'amber',
            description: 'Awaiting processing',
        },
    ];

    const colorStyles = {
        emerald: {
            icon: 'bg-emerald-100 text-emerald-600',
            border: 'border-emerald-500',
            glow: 'from-emerald-500/10',
        },
        blue: {
            icon: 'bg-blue-100 text-blue-600',
            border: 'border-blue-500',
            glow: 'from-blue-500/10',
        },
        amber: {
            icon: 'bg-amber-100 text-amber-600',
            border: 'border-amber-500',
            glow: 'from-amber-500/10',
        },
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                        Distributor portal
                    </p>
                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-800">
                        Analytics Dashboard
                    </h2>
                </div>
            }
        >
            <Head title="Distributor Dashboard" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 py-8">
                <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
                    
                    {/* Welcome Banner */}
                    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 p-8 text-white shadow-2xl shadow-indigo-200 sm:p-10">
                        <div className="relative z-10 max-w-2xl">
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                                <SparklesIcon className="h-4 w-4 text-cyan-200" />
                                Business overview
                            </div>

                            <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                                Welcome back, {auth.user?.name || 'Distributor'}!
                            </h1>

                            <p className="mt-4 max-w-xl text-base leading-7 text-blue-100">
                                Monitor your distribution network, track inventory, and view detailed analytics from one powerful dashboard.
                            </p>
                        </div>
                        <div className="absolute -right-16 -top-24 h-80 w-80 rounded-full bg-white/10" />
                        <div className="absolute -bottom-40 right-20 h-96 w-96 rounded-full border-[40px] border-white/10" />
                        <div className="absolute right-12 top-12 hidden rounded-2xl bg-white/10 p-5 backdrop-blur-sm lg:block">
                            <ArrowTrendingUpIcon className="h-14 w-14 text-cyan-100" />
                        </div>
                    </section>

                    {/* Stat Cards */}
                    <section className="grid gap-5 md:grid-cols-3">
                        {statCards.map((stat) => {
                            const Icon = stat.icon;
                            const styles = colorStyles[stat.color];

                            return (
                                <div
                                    key={stat.label}
                                    className={`relative overflow-hidden rounded-2xl border border-slate-200 border-t-4 ${styles.border} bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
                                >
                                    <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-br ${styles.glow} to-transparent`} />
                                    <div className="relative flex items-start justify-between">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                {stat.label}
                                            </p>
                                            <p className="mt-3 text-3xl font-black text-slate-800">
                                                {stat.value}
                                            </p>
                                            <p className="mt-2 text-sm text-slate-500">
                                                {stat.description}
                                            </p>
                                        </div>
                                        <div className={`rounded-2xl p-3 ${styles.icon}`}>
                                            <Icon className="h-7 w-7" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </section>

                    {/* Low Stock Alerts */}
                    <section className="overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm">
                        <div className="flex items-center justify-between bg-gradient-to-r from-rose-50 to-white p-6">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-rose-100 p-2.5">
                                    <ExclamationTriangleIcon className="h-6 w-6 text-rose-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Inventory alerts</h3>
                                    <p className="text-sm text-slate-500">Products that need your attention</p>
                                </div>
                            </div>
                            <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
                                {lowStock.length} alerts
                            </span>
                        </div>

                        {lowStock.length === 0 ? (
                            <p className="p-8 text-center text-sm font-medium text-slate-500">
                                ✨ Inventory levels are healthy.
                            </p>
                        ) : (
                            <ul className="divide-y divide-slate-100">
                                {lowStock.map((item, index) => (
                                    <li key={index} className="flex items-center justify-between gap-4 p-5 transition hover:bg-rose-50/40">
                                        <div className="flex items-center gap-3">
                                            <CubeIcon className="h-5 w-5 text-slate-400" />
                                            <span className="font-semibold text-slate-800">{item.name}</span>
                                        </div>
                                        <span className="whitespace-nowrap rounded-full border border-rose-200 bg-rose-100 px-3 py-1.5 text-xs font-black text-rose-700">
                                            {item.stock_quantity} left
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    {/* Interactive Charts Grid */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* 1. Monthly Sales Line Chart */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                            <h3 className="mb-6 text-lg font-black text-slate-800">Monthly Sales Trend</h3>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={monthlySales}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                        <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Line type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={4} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* 2. Daily Sales Bar Chart */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                            <h3 className="mb-6 text-lg font-black text-slate-800">Daily Sales Volume</h3>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={dailySales}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                        <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Bar dataKey="sales" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* 3. Top Selling Models Bar Chart */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                            <h3 className="mb-6 text-lg font-black text-slate-800">Top Selling Models</h3>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={topModels} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                                        <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                        <YAxis dataKey="model" type="category" width={100} axisLine={false} tickLine={false} className="text-xs font-bold fill-slate-500" />
                                        <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Bar dataKey="units" fill="#10b981" radius={[0, 6, 6, 0]} barSize={30} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* 4. Revenue by Payment Type Pie Chart */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                            <h3 className="mb-6 text-lg font-black text-slate-800">Revenue by Payment Type</h3>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={paymentRevenue} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                                            {paymentRevenue.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => `Rs. ${value.toLocaleString('en-LK')}`} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* 5. Dealer Comparison Bar Chart */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                            <h3 className="mb-6 text-lg font-black text-slate-800">Dealer Revenue Comparison</h3>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={dealerComparison}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="dealer" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                        <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value / 1000000}M`} tick={{fill: '#64748b'}} />
                                        <Tooltip formatter={(value) => `Rs. ${value.toLocaleString('en-LK')}`} cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Bar dataKey="revenue" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* 6. Model & Location Grouped Bar Chart */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                            <h3 className="mb-6 text-lg font-black text-slate-800">Model Sales by Location</h3>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={modelLocation}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="location" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                        <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '12px', fontWeight: '600' }} />
                                        <Bar dataKey="Apache" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="Ntorq" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}