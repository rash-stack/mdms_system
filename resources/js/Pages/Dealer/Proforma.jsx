import { Head, Link } from '@inertiajs/react';

export default function Proforma({ invoice }) {
    const { inquiry } = invoice;
    const { product, dealer } = inquiry;

    const totalPrice = Number(invoice.total_price || 0);
    const downPayment = Number(invoice.down_payment || 0);
    const loanAmount = Number(invoice.loan_amount || 0);
    const paymentMethod = invoice.payment_method?.replace('_', ' ');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-200 px-4 py-8 print:bg-white print:p-0">
            <Head title={`Proforma Invoice - ${inquiry.customer_name}`} />

            <div className="mx-auto mb-6 flex max-w-4xl items-center justify-between print:hidden">
                <Link
                    href={route('dealer.inquiries')}
                    className="text-sm font-bold text-indigo-600 transition hover:text-indigo-800"
                >
                    ← Back to inquiries
                </Link>

                <button
                    type="button"
                    onClick={() => window.print()}
                    className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-700"
                >
                    🖨️ Print document
                </button>
            </div>

            <main className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl print:w-full print:rounded-none print:border-0 print:shadow-none">
                <div className="h-3 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 print:h-2" />

                <div className="p-6 sm:p-12">
                    <header className="flex flex-col gap-8 border-b border-slate-200 pb-8 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-wider text-indigo-700 print:bg-white print:p-0">
                                <span>✦</span>
                                Official document
                            </div>

                            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
                                Proforma Invoice
                            </h1>

                            <div className="mt-5 space-y-1 text-sm text-slate-500">
                                <p>
                                    Invoice No:{' '}
                                    <strong className="text-slate-800">
                                        #{String(invoice.id).padStart(5, '0')}
                                    </strong>
                                </p>
                                <p>
                                    Date:{' '}
                                    <strong className="text-slate-800">
                                        {new Date(invoice.created_at).toLocaleDateString('en-LK', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </strong>
                                </p>
                            </div>
                        </div>

                        <div className="sm:text-right">
                            <div className="mb-4 ml-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-500 text-3xl text-white shadow-lg shadow-indigo-200 print:hidden">
                                🏍️
                            </div>
                            <h2 className="text-xl font-black text-slate-900">{dealer.name}</h2>
                            <p className="mt-1 text-sm text-slate-500">{dealer.email}</p>
                        </div>
                    </header>

                    <section className="my-8 grid gap-5 sm:grid-cols-2">
                        <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-blue-50 p-6">
                            <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
                                Billed to
                            </p>
                            <h3 className="mt-3 text-xl font-black text-slate-900">
                                {inquiry.customer_name}
                            </h3>
                            <p className="mt-2 text-sm text-slate-600">
                                {inquiry.customer_phone}
                            </p>
                            <p className="mt-1 text-sm text-slate-600">
                                {inquiry.customer_address || 'Address not provided'}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
                            <p className="text-xs font-black uppercase tracking-wider text-emerald-600">
                                Payment summary
                            </p>
                            <p className="mt-3 text-sm capitalize text-slate-600">
                                Method:{' '}
                                <strong className="text-slate-900">{paymentMethod}</strong>
                            </p>
                            <p className="mt-3 text-2xl font-black text-emerald-600">
                                Rs. {totalPrice.toLocaleString('en-LK')}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">Estimated total amount</p>
                        </div>
                    </section>

                    <section className="overflow-hidden rounded-2xl border border-slate-200">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-900 text-white">
                                    <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="hidden px-5 py-4 text-left text-xs font-black uppercase tracking-wider sm:table-cell">
                                        Payment method
                                    </th>
                                    <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wider">
                                        Amount
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                <tr>
                                    <td className="px-5 py-6">
                                        <p className="font-bold text-slate-900">{product.name}</p>
                                        <p className="mt-1 text-xs font-medium text-slate-400">
                                            SKU: {product.sku}
                                        </p>
                                    </td>
                                    <td className="hidden px-5 py-6 text-sm font-semibold capitalize text-slate-600 sm:table-cell">
                                        {paymentMethod}
                                    </td>
                                    <td className="px-5 py-6 text-right font-black text-slate-900">
                                        Rs. {totalPrice.toLocaleString('en-LK')}
                                    </td>
                                </tr>

                                {invoice.payment_method === 'finance' && (
                                    <tr className="bg-slate-50">
                                        <td colSpan="3" className="px-5 py-5">
                                            <div className="grid gap-4 text-sm sm:grid-cols-3">
                                                <div>
                                                    <p className="text-xs font-bold uppercase text-slate-400">
                                                        Finance provider
                                                    </p>
                                                    <p className="mt-1 font-bold text-slate-800">
                                                        {invoice.finance_provider || 'N/A'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold uppercase text-slate-400">
                                                        Down payment
                                                    </p>
                                                    <p className="mt-1 font-bold text-slate-800">
                                                        Rs. {downPayment.toLocaleString('en-LK')}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold uppercase text-slate-400">
                                                        Loan amount
                                                    </p>
                                                    <p className="mt-1 font-bold text-slate-800">
                                                        Rs. {loanAmount.toLocaleString('en-LK')}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </section>

                    <section className="mt-8 flex justify-end">
                        <div className="w-full rounded-2xl bg-slate-900 p-6 text-white sm:w-80">
                            <div className="flex items-center justify-between text-sm text-slate-300">
                                <span>Subtotal</span>
                                <span>Rs. {totalPrice.toLocaleString('en-LK')}</span>
                            </div>
                            <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-4">
                                <span className="font-bold">Total amount</span>
                                <span className="text-2xl font-black text-cyan-300">
                                    Rs. {totalPrice.toLocaleString('en-LK')}
                                </span>
                            </div>
                        </div>
                    </section>

                    <footer className="mt-12 border-t border-slate-200 pt-6 text-center">
                        <p className="font-bold text-slate-700">Thank you for choosing our dealership.</p>
                        <p className="mx-auto mt-2 max-w-2xl text-xs leading-5 text-slate-400">
                            This is a proforma invoice only. Final delivery is subject to finance
                            approval, availability, and receipt of full payment.
                        </p>
                    </footer>
                </div>
            </main>
        </div>
    );
}