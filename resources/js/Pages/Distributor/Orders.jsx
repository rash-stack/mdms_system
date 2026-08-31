import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';

export default function Orders({ auth, orders = [] }) {
    const { errors = {} } = usePage().props;

    const pendingOrders = orders.filter((order) => order.status === 'pending').length;
    const approvedOrders = orders.filter((order) => order.status === 'approved').length;
    const totalValue = orders.reduce(
        (total, order) => total + Number(order.total_price || 0),
        0,
    );

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
            approved: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
            rejected: 'bg-rose-50 text-rose-700 ring-rose-600/20',
        };

        return (
            <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ring-1 ring-inset ${
                    styles[status] || 'bg-slate-100 text-slate-600 ring-slate-500/20'
                }`}
            >
                {status}
            </span>
        );
    };

    const updateStatus = (id, newStatus) => {
        if (window.confirm(`Are you sure you want to mark this order as ${newStatus}?`)) {
            router.patch(route('distributor.orders.status', id), { status: newStatus });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                            Distributor portal
                        </p>
                        <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-800">
                            Order Management
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-700"
                    >
                        🖨️ Print records
                    </button>
                </div>
            }
        >
            <Head title="Manage Orders" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 py-8">
                <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
                    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 p-8 text-white shadow-2xl shadow-indigo-200">
                        <div className="relative z-10 max-w-2xl">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-100">
                                Incoming requests
                            </p>
                            <h1 className="mt-3 text-3xl font-black sm:text-4xl">
                                Keep every order moving.
                            </h1>
                            <p className="mt-3 text-blue-100">
                                Review dealer requests, approve available orders, and maintain a
                                smooth distribution workflow.
                            </p>
                        </div>

                        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white/10" />
                        <div className="absolute -bottom-40 right-20 h-96 w-96 rounded-full border-[40px] border-white/10" />
                    </section>

                    {errors.error && (
                        <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700 shadow-sm">
                            <span className="text-lg">⚠️</span>
                            <span>{errors.error}</span>
                        </div>
                    )}

                    <section className="grid gap-5 sm:grid-cols-3">
                        {([
                            ['Total orders', orders.length, '📦', 'bg-indigo-100 text-indigo-600'],
                            ['Pending review', pendingOrders, '⏳', 'bg-amber-100 text-amber-600'],
                            ['Order value', `Rs. ${totalValue.toLocaleString('en-LK')}`, '💰', 'bg-emerald-100 text-emerald-600'],
                        ]).map(([label, value, icon, iconStyle]) => (
                            <div
                                key={label}
                                className="rounded-2xl border border-slate-200 border-t-4 border-indigo-500 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                                            {label}
                                        </p>
                                        <p className="mt-3 text-2xl font-black text-slate-800">
                                            {value}
                                        </p>
                                    </div>
                                    <div className={`rounded-2xl p-3 text-xl ${iconStyle}`}>
                                        {icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-col gap-2 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-xl font-black text-slate-800">
                                    Dealer requests
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    Review and process incoming orders.
                                </p>
                            </div>

                            <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                                {approvedOrders} approved
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-slate-50">
                                    <tr>
                                        {['Dealer', 'Product', 'Quantity', 'Total', 'Status', 'Actions'].map(
                                            (heading) => (
                                                <th
                                                    key={heading}
                                                    className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-400"
                                                >
                                                    {heading}
                                                </th>
                                            ),
                                        )}
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-16 text-center">
                                                <div className="text-4xl">📭</div>
                                                <p className="mt-3 font-bold text-slate-700">
                                                    No orders found
                                                </p>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    New dealer requests will appear here.
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order) => (
                                            <tr
                                                key={order.id}
                                                className="transition hover:bg-indigo-50/40"
                                            >
                                                <td className="whitespace-nowrap px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-black text-indigo-700">
                                                            {order.user?.name?.charAt(0)?.toUpperCase() || 'D'}
                                                        </div>
                                                        <span className="font-bold text-slate-800">
                                                            {order.user?.name || 'Unknown dealer'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-5 text-sm font-semibold text-slate-600">
                                                    {order.product?.name || 'Unknown product'}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-5 text-sm font-black text-slate-800">
                                                    {order.quantity}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-5 text-sm font-black text-emerald-600">
                                                    Rs. {Number(order.total_price || 0).toLocaleString('en-LK')}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-5">
                                                    {getStatusBadge(order.status)}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-5 text-right">
                                                    {order.status === 'pending' ? (
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    updateStatus(order.id, 'approved')
                                                                }
                                                                className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    updateStatus(order.id, 'rejected')
                                                                }
                                                                className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
                                                            >
                                                                Reject
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs font-semibold text-slate-400">
                                                            Processed
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
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