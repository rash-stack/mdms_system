import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const stats = [
    { label: 'Total Orders', value: '128', change: '+12.5%', color: 'indigo' },
    { label: 'Pending Orders', value: '24', change: '+4.2%', color: 'amber' },
    { label: 'Completed Orders', value: '104', change: '+18.3%', color: 'emerald' },
    { label: 'Total Revenue', value: '$24,680', change: '+9.8%', color: 'blue' },
];

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <p className="text-sm font-medium text-indigo-600">Dealer portal</p>
                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
                        Dashboard overview
                    </h2>
                </div>
            }
        >
            <Head title="Dealer Dashboard" />

            <div className="min-h-screen bg-slate-50 py-8">
                <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
                    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-8 text-white shadow-xl">
                        <div className="relative z-10 max-w-2xl">
                            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-100">
                                Welcome back
                            </p>
                            <h1 className="text-3xl font-extrabold sm:text-4xl">
                                Hello, {auth.user?.name || 'Dealer'}!
                            </h1>
                            <p className="mt-3 max-w-xl text-blue-100">
                                Manage your orders, monitor business performance, and keep your
                                dealership moving forward.
                            </p>
                            <button className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 shadow-lg transition hover:bg-blue-50">
                                Create New Order
                            </button>
                        </div>

                        <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-white/10" />
                        <div className="absolute -bottom-32 right-24 h-80 w-80 rounded-full bg-white/10" />
                    </section>

                    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="flex items-start justify-between">
                                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                    <span
                                        className={`rounded-lg bg-${stat.color}-50 px-2.5 py-1 text-xs font-bold text-${stat.color}-600`}
                                    >
                                        {stat.change}
                                    </span>
                                </div>
                                <p className="mt-4 text-3xl font-extrabold text-gray-900">
                                    {stat.value}
                                </p>
                                <p className="mt-1 text-xs text-gray-400">Compared with last month</p>
                            </div>
                        ))}
                    </section>

                    <section className="grid gap-6 lg:grid-cols-3">
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Recent activity</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Keep track of your latest business updates.
                                    </p>
                                </div>
                                <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                                    View all
                                </button>
                            </div>

                            <div className="mt-6 divide-y divide-gray-100">
                                {[
                                    ['Order #MD-1048', 'Order successfully completed', '2 hours ago'],
                                    ['Order #MD-1047', 'New order requires your attention', '5 hours ago'],
                                    ['Payment received', 'Payment of $2,450 was confirmed', 'Yesterday'],
                                ].map(([title, description, time]) => (
                                    <div key={title} className="flex items-center gap-4 py-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold text-gray-900">{title}</p>
                                            <p className="truncate text-sm text-gray-500">{description}</p>
                                        </div>
                                        <span className="text-xs text-gray-400">{time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900">Quick actions</h3>
                            <p className="mt-1 text-sm text-gray-500">Frequently used tools</p>

                            <div className="mt-5 space-y-3">
                                {['Manage Orders', 'View Inventory', 'Download Reports'].map((action) => (
                                    <button
                                        key={action}
                                        className="flex w-full items-center justify-between rounded-xl border border-gray-100 p-4 text-left text-sm font-semibold text-gray-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                                    >
                                        {action}
                                        <span className="text-lg">→</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}