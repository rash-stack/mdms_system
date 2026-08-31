import { Head, Link } from '@inertiajs/react';

export default function PrintReceipt({ receipt }) {
    const { invoice } = receipt;
    const { inquiry } = invoice;
    const { product, dealer } = inquiry;

    const amountPaid = Number(receipt.amount_paid || 0);
    const paymentMethod = receipt.payment_method?.replace('_', ' ');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-200 px-4 py-8 print:bg-white print:p-0">
            <Head title={`Receipt ${receipt.receipt_number}`} />

            <div className="mx-auto mb-6 flex max-w-3xl items-center justify-between print:hidden">
                <Link
                    href={route('dealer.invoices')}
                    className="text-sm font-bold text-indigo-600 transition hover:text-indigo-800"
                >
                    ← Back to invoices
                </Link>

                <button
                    type="button"
                    onClick={() => window.print()}
                    className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-700"
                >
                    🖨️ Print receipt
                </button>
            </div>

            <main className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl print:w-full print:rounded-none print:border-0 print:shadow-none">
                <div className="h-3 bg-gradient-to-r from-indigo-600 via-blue-500 to-emerald-500 print:h-2" />

                <div className="p-6 sm:p-12">
                    <header className="flex flex-col gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-indigo-700 print:bg-white print:p-0">
                                <span>✓</span>
                                Payment confirmed
                            </div>

                            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                                Official Receipt
                            </h1>

                            <div className="mt-4 space-y-1 text-sm text-slate-500">
                                <p>
                                    Receipt No:{' '}
                                    <span className="font-bold text-slate-800">
                                        {receipt.receipt_number}
                                    </span>
                                </p>
                                <p>
                                    Date:{' '}
                                    <span className="font-semibold text-slate-700">
                                        {new Date(receipt.created_at).toLocaleDateString('en-LK', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="sm:text-right">
                            <div className="mb-3 ml-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-500 text-2xl text-white shadow-lg shadow-indigo-200 print:hidden">
                                🏍️
                            </div>
                            <h2 className="text-xl font-black text-slate-900">{dealer.name}</h2>
                            <p className="mt-1 text-sm text-slate-500">{dealer.email}</p>
                        </div>
                    </header>

                    <section className="my-8 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-blue-50 p-6">
                        <p className="text-base leading-8 text-slate-600">
                            Received with thanks from{' '}
                            <strong className="text-slate-900">{inquiry.customer_name}</strong>{' '}
                            the sum of{' '}
                            <strong className="text-xl text-indigo-700">
                                Rs. {amountPaid.toLocaleString('en-LK')}
                            </strong>{' '}
                            via{' '}
                            <strong className="capitalize text-slate-900">{paymentMethod}</strong>.
                        </p>
                    </section>

                    <section className="overflow-hidden rounded-2xl border border-slate-200">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="bg-slate-900 text-white">
                                    <th className="px-5 py-4 text-xs font-black uppercase tracking-wider">
                                        Payment for
                                    </th>
                                    <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wider">
                                        Amount applied
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-5 py-6 text-sm font-bold text-slate-800">
                                        {product.name}
                                        <span className="mt-1 block text-xs font-medium text-slate-400">
                                            Invoice #{invoice.id}
                                        </span>
                                    </td>
                                    <td className="px-5 py-6 text-right text-base font-black text-emerald-600">
                                        Rs. {amountPaid.toLocaleString('en-LK')}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section className="mt-8 flex justify-end">
                        <div className="w-full rounded-2xl bg-slate-50 p-5 sm:w-72">
                            <div className="flex items-center justify-between text-sm text-slate-500">
                                <span>Payment method</span>
                                <span className="font-bold capitalize text-slate-800">
                                    {paymentMethod}
                                </span>
                            </div>
                            <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                                <span className="font-bold text-slate-700">Total paid</span>
                                <span className="text-xl font-black text-emerald-600">
                                    Rs. {amountPaid.toLocaleString('en-LK')}
                                </span>
                            </div>
                        </div>
                    </section>

                    <footer className="mt-12 border-t border-slate-200 pt-6 text-center">
                        <p className="font-bold text-slate-700">Thank you for your business!</p>
                        <p className="mt-1 text-xs text-slate-400">
                            This receipt was generated electronically.
                        </p>
                    </footer>
                </div>
            </main>
        </div>
    );
}