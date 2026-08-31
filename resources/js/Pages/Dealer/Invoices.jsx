import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function Invoices({ auth, invoices = [] }) {
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const { data, setData, post, processing, reset } = useForm({
        invoice_id: '',
        amount_paid: '',
        payment_method: 'cash',
        remarks: '',
    });

    const totalValue = useMemo(
        () =>
            invoices.reduce(
                (total, invoice) => total + Number(invoice.total_price || 0),
                0,
            ),
        [invoices],
    );

    const paidInvoices = invoices.filter((invoice) => invoice.status === 'paid').length;

    const openReceiptModal = (invoice) => {
        setSelectedInvoice(invoice);
        setData({
            invoice_id: invoice.id,
            amount_paid: invoice.total_price,
            payment_method: 'cash',
            remarks: '',
        });
    };

    const closeReceiptModal = () => {
        setSelectedInvoice(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('dealer.receipts.store'), {
            onSuccess: closeReceiptModal,
        });
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
                        Customer Invoices
                    </h2>
                </div>
            }
        >
            <Head title="Customer Invoices" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 py-8">
                <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
                    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 p-8 text-white shadow-2xl shadow-indigo-200 sm:p-10">
                        <div className="relative z-10 max-w-2xl">
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-sm">
                                🧾 Finance center
                            </span>
                            <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                                Manage every customer payment.
                            </h1>
                            <p className="mt-4 leading-7 text-blue-100">
                                Review proforma invoices, track payment progress, and issue
                                professional receipts from one place.
                            </p>
                        </div>

                        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white/10" />
                        <div className="absolute -bottom-40 right-20 h-96 w-96 rounded-full border-[40px] border-white/10" />
                    </section>

                    <section className="grid gap-5 sm:grid-cols-3">
                        {([
                            ['Total invoices', invoices.length, '🧾', 'border-indigo-500'],
                            ['Paid invoices', paidInvoices, '✅', 'border-emerald-500'],
                            [
                                'Total value',
                                `Rs. ${totalValue.toLocaleString('en-LK')}`,
                                '💰',
                                'border-amber-500',
                            ],
                        ]).map(([label, value, icon, border]) => (
                            <div
                                key={label}
                                className={`rounded-2xl border border-slate-200 border-t-4 ${border} bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl`}
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
                                    <span className="rounded-2xl bg-indigo-100 p-3 text-xl">
                                        {icon}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-6">
                            <h3 className="text-xl font-black text-slate-800">
                                Invoice records
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                View invoices and issue receipts for completed payments.
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-slate-50">
                                    <tr>
                                        {['Invoice', 'Customer', 'Total', 'Status', 'Actions'].map(
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
                                    {invoices.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-16 text-center">
                                                <div className="text-5xl">📭</div>
                                                <p className="mt-3 font-bold text-slate-700">
                                                    No invoices found
                                                </p>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    Customer invoices will appear here.
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        invoices.map((invoice) => (
                                            <tr
                                                key={invoice.id}
                                                className="transition hover:bg-indigo-50/40"
                                            >
                                                <td className="whitespace-nowrap px-6 py-5">
                                                    <span className="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-black text-indigo-700">
                                                        INV-{invoice.id}
                                                    </span>
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-black text-blue-700">
                                                            {invoice.inquiry?.customer_name
                                                                ?.charAt(0)
                                                                ?.toUpperCase() || 'C'}
                                                        </div>
                                                        <span className="font-bold text-slate-800">
                                                            {invoice.inquiry?.customer_name || 'Unknown customer'}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-5 text-sm font-black text-emerald-600">
                                                    Rs.{' '}
                                                    {Number(invoice.total_price || 0).toLocaleString(
                                                        'en-LK',
                                                    )}
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-5">
                                                    {invoice.status === 'paid' ? (
                                                        <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                                                            ● Paid
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 ring-1 ring-inset ring-amber-600/20">
                                                            ● Proforma
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <Link
                                                            href={route(
                                                                'dealer.invoices.proforma',
                                                                invoice.id,
                                                            )}
                                                            className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700 transition hover:bg-indigo-100"
                                                        >
                                                            View invoice
                                                        </Link>

                                                        {invoice.status !== 'paid' && (
                                                            <button
                                                                type="button"
                                                                onClick={() => openReceiptModal(invoice)}
                                                                className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
                                                            >
                                                                Issue receipt
                                                            </button>
                                                        )}
                                                    </div>
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

            {selectedInvoice && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-6 text-white">
                            <p className="text-sm font-bold uppercase tracking-wider text-emerald-100">
                                Payment confirmation
                            </p>
                            <h3 className="mt-2 text-2xl font-black">
                                Issue receipt
                            </h3>
                            <p className="mt-1 text-sm text-emerald-100">
                                Invoice INV-{selectedInvoice.id}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5 p-6">
                            <div>
                                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                                    Amount paid (Rs.)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.amount_paid}
                                    onChange={(e) => setData('amount_paid', e.target.value)}
                                    className="w-full rounded-xl border-slate-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                                    Payment method
                                </label>
                                <select
                                    value={data.payment_method}
                                    onChange={(e) => setData('payment_method', e.target.value)}
                                    className="w-full rounded-xl border-slate-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                >
                                    <option value="cash">Cash</option>
                                    <option value="bank_transfer">Bank transfer</option>
                                    <option value="card">Card / POS</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                                    Remarks
                                </label>
                                <input
                                    type="text"
                                    value={data.remarks}
                                    onChange={(e) => setData('remarks', e.target.value)}
                                    placeholder="Optional payment note"
                                    className="w-full rounded-xl border-slate-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                />
                            </div>

                            <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                                <button
                                    type="button"
                                    onClick={closeReceiptModal}
                                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? 'Processing...' : 'Save & print receipt'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}