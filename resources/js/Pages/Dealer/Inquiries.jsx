import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Inquiries({ auth, inquiries = [], products = [] }) {
    const [showInquiryModal, setShowInquiryModal] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState(null);

    const {
        data: iData,
        setData: setIData,
        post: postInquiry,
        processing: inquiryProcessing,
        errors: inquiryErrors,
        reset: resetInquiry,
    } = useForm({
        customer_name: '',
        customer_phone: '',
        customer_address: '',
        product_id: '',
        notes: '',
    });

    const {
        data: invData,
        setData: setInvData,
        post: postInvoice,
        processing: invProcessing,
        errors: invoiceErrors,
    } = useForm({
        inquiry_id: '',
        payment_method: 'cash',
        finance_provider: '',
        down_payment: 0,
        loan_amount: 0,
        total_price: 0,
    });

    const handleInquirySubmit = (e) => {
        e.preventDefault();

        postInquiry(route('dealer.inquiries.store'), {
            onSuccess: () => {
                setShowInquiryModal(false);
                resetInquiry();
            },
        });
    };

    const openInvoiceModal = (inquiry) => {
        setSelectedInquiry(inquiry);
        setInvData({
            inquiry_id: inquiry.id,
            payment_method: 'cash',
            finance_provider: '',
            down_payment: 0,
            loan_amount: 0,
            total_price: inquiry.product?.price || 0,
        });
    };

    const handleInvoiceSubmit = (e) => {
        e.preventDefault();
        postInvoice(route('dealer.invoices.store'), {
            onSuccess: () => setSelectedInquiry(null),
        });
    };

    const getStatusBadge = (status) => {
        const styles = {
            open: 'bg-blue-50 text-blue-700 ring-blue-600/20',
            invoiced: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
        };

        return (
            <span
                className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold capitalize ring-1 ring-inset ${
                    styles[status] || 'bg-slate-100 text-slate-600 ring-slate-500/20'
                }`}
            >
                {status}
            </span>
        );
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
                        Customer Inquiries
                    </h2>
                </div>
            }
        >
            <Head title="Customer Inquiries" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 py-8">
                <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
                    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 p-8 text-white shadow-2xl shadow-indigo-200 sm:p-10">
                        <div className="relative z-10 max-w-2xl">
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-sm">
                                🤝 Customer relationship hub
                            </span>
                            <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                                Turn interest into sales.
                            </h1>
                            <p className="mt-4 leading-7 text-blue-100">
                                Capture walk-in customers, follow their requirements, and quickly
                                convert qualified inquiries into proforma invoices.
                            </p>
                        </div>
                        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white/10" />
                        <div className="absolute -bottom-40 right-20 h-96 w-96 rounded-full border-[40px] border-white/10" />
                    </section>

                    <section className="grid gap-5 sm:grid-cols-3">
                        {([
                            ['Total inquiries', inquiries.length, '👥', 'border-indigo-500'],
                            [
                                'Open inquiries',
                                inquiries.filter((item) => item.status === 'open').length,
                                '💬',
                                'border-blue-500',
                            ],
                            [
                                'Converted',
                                inquiries.filter((item) => item.status === 'invoiced').length,
                                '✅',
                                'border-emerald-500',
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
                                        <p className="mt-3 text-3xl font-black text-slate-800">
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
                        <div className="flex flex-col gap-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-xl font-black text-slate-800">
                                    Walk-in customers
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    Track and manage customer product interests.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowInquiryModal(true)}
                                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
                            >
                                + Log new customer
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-slate-50">
                                    <tr>
                                        {['Customer', 'Phone', 'Interested in', 'Status', 'Actions'].map(
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
                                    {inquiries.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-16 text-center">
                                                <div className="text-5xl">📭</div>
                                                <p className="mt-3 font-bold text-slate-700">
                                                    No inquiries yet
                                                </p>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    New customer inquiries will appear here.
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        inquiries.map((inquiry) => (
                                            <tr
                                                key={inquiry.id}
                                                className="transition hover:bg-indigo-50/40"
                                            >
                                                <td className="whitespace-nowrap px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-black text-indigo-700">
                                                            {inquiry.customer_name?.charAt(0)?.toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-800">
                                                                {inquiry.customer_name}
                                                            </p>
                                                            <p className="text-xs text-slate-400">
                                                                {inquiry.customer_address || 'No address provided'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-5 text-sm font-semibold text-slate-500">
                                                    {inquiry.customer_phone}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-5 text-sm font-bold text-slate-700">
                                                    {inquiry.product?.name || 'N/A'}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-5">
                                                    {getStatusBadge(inquiry.status)}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-5">
                                                    {inquiry.status === 'open' && inquiry.product && (
                                                        <button
                                                            type="button"
                                                            onClick={() => openInvoiceModal(inquiry)}
                                                            className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
                                                        >
                                                            Convert to invoice →
                                                        </button>
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

            {showInquiryModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
                            <h3 className="text-2xl font-black">Log new customer</h3>
                            <p className="mt-1 text-sm text-blue-100">
                                Record the customer’s requirements.
                            </p>
                        </div>

                        <form onSubmit={handleInquirySubmit} className="space-y-4 p-6">
                            {([
                                ['customer_name', 'Customer name', 'text'],
                                ['customer_phone', 'Phone number', 'tel'],
                                ['customer_address', 'Address', 'text'],
                            ]).map(([field, label, type]) => (
                                <div key={field}>
                                    <label className="mb-1.5 block text-sm font-bold text-slate-700">
                                        {label}
                                    </label>
                                    <input
                                        type={type}
                                        value={iData[field]}
                                        onChange={(e) => setIData(field, e.target.value)}
                                        className="w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required={field !== 'customer_address'}
                                    />
                                    {inquiryErrors[field] && (
                                        <p className="mt-1 text-xs font-semibold text-rose-600">
                                            {inquiryErrors[field]}
                                        </p>
                                    )}
                                </div>
                            ))}

                            <div>
                                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                                    Interested product
                                </label>
                                <select
                                    value={iData.product_id}
                                    onChange={(e) => setIData('product_id', e.target.value)}
                                    className="w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                >
                                    <option value="">Select a product</option>
                                    {products.map((product) => (
                                        <option key={product.id} value={product.id}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <textarea
                                value={iData.notes}
                                onChange={(e) => setIData('notes', e.target.value)}
                                placeholder="Additional notes..."
                                rows="3"
                                className="w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />

                            <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                                <button
                                    type="button"
                                    onClick={() => setShowInquiryModal(false)}
                                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={inquiryProcessing}
                                    className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 disabled:opacity-50"
                                >
                                    {inquiryProcessing ? 'Saving...' : 'Save inquiry'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {selectedInquiry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-6 text-white">
                            <p className="text-sm font-bold uppercase tracking-wider text-emerald-100">
                                Invoice conversion
                            </p>
                            <h3 className="mt-2 text-2xl font-black">
                                {selectedInquiry.customer_name}
                            </h3>
                        </div>

                        <form onSubmit={handleInvoiceSubmit} className="space-y-5 p-6">
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-sm text-slate-500">
                                    Product:{' '}
                                    <strong className="text-slate-800">
                                        {selectedInquiry.product.name}
                                    </strong>
                                </p>
                                <p className="mt-1 text-sm text-slate-500">
                                    Base price:{' '}
                                    <strong className="text-slate-800">
                                        Rs.{' '}
                                        {Number(selectedInquiry.product.price).toLocaleString('en-LK')}
                                    </strong>
                                </p>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                                    Payment method
                                </label>
                                <select
                                    value={invData.payment_method}
                                    onChange={(e) => setInvData('payment_method', e.target.value)}
                                    className="w-full rounded-xl border-slate-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                >
                                    <option value="cash">Full cash payment</option>
                                    <option value="finance">Leasing / finance</option>
                                </select>
                            </div>

                            {invData.payment_method === 'finance' && (
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Finance provider"
                                        value={invData.finance_provider}
                                        onChange={(e) => setInvData('finance_provider', e.target.value)}
                                        className="w-full rounded-xl border-slate-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                        required
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="Down payment"
                                            value={invData.down_payment}
                                            onChange={(e) => setInvData('down_payment', e.target.value)}
                                            className="rounded-xl border-slate-200 shadow-sm"
                                            required
                                        />
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="Loan amount"
                                            value={invData.loan_amount}
                                            onChange={(e) => setInvData('loan_amount', e.target.value)}
                                            className="rounded-xl border-slate-200 shadow-sm"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {invoiceErrors && Object.keys(invoiceErrors).length > 0 && (
                                <p className="text-sm font-semibold text-rose-600">
                                    Please check the invoice details and try again.
                                </p>
                            )}

                            <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                                <button
                                    type="button"
                                    onClick={() => setSelectedInquiry(null)}
                                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={invProcessing}
                                    className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-200 disabled:opacity-50"
                                >
                                    {invProcessing ? 'Generating...' : 'Generate proforma'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}