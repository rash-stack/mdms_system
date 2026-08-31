import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Dealers({ auth, dealers = [] }) {
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('distributor.dealers.store'), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    const closeModal = () => {
        setShowModal(false);
        reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                        Distributor portal
                    </p>
                    <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-800">
                        Dealer Network
                    </h2>
                </div>
            }
        >
            <Head title="Manage Dealers" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 py-8">
                <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
                    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 p-8 text-white shadow-2xl shadow-indigo-200 sm:p-10">
                        <div className="relative z-10 max-w-2xl">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-100">
                                Partner management
                            </p>
                            <h1 className="mt-3 text-3xl font-black sm:text-4xl">
                                Grow your dealer network.
                            </h1>
                            <p className="mt-3 text-blue-100">
                                Manage showroom accounts and build stronger relationships with
                                your distribution partners.
                            </p>
                            <button
                                type="button"
                                onClick={() => setShowModal(true)}
                                className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
                            >
                                + Add new dealer
                            </button>
                        </div>

                        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white/10" />
                        <div className="absolute -bottom-40 right-24 h-96 w-96 rounded-full border-[40px] border-white/10" />
                    </section>

                    <section className="grid gap-5 sm:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 border-t-4 border-indigo-500 bg-white p-6 shadow-sm">
                            <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                                Total dealers
                            </p>
                            <p className="mt-3 text-3xl font-black text-slate-800">
                                {dealers.length}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">Registered partners</p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 border-t-4 border-emerald-500 bg-white p-6 shadow-sm">
                            <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                                Active accounts
                            </p>
                            <p className="mt-3 text-3xl font-black text-slate-800">
                                {dealers.length}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">Currently operational</p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 border-t-4 border-amber-500 bg-white p-6 shadow-sm">
                            <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                                Network status
                            </p>
                            <p className="mt-3 text-3xl font-black text-emerald-600">Healthy</p>
                            <p className="mt-1 text-sm text-slate-500">All systems operational</p>
                        </div>
                    </section>

                    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-col gap-2 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-xl font-black text-slate-800">
                                    Registered dealers
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    Manage your authorized showroom partners.
                                </p>
                            </div>

                            <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                                {dealers.length} account{dealers.length === 1 ? '' : 's'}
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-slate-50">
                                    <tr>
                                        {['Dealer', 'Email login', 'Joined date', 'Status'].map(
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
                                    {dealers.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-16 text-center">
                                                <div className="text-4xl">🏪</div>
                                                <p className="mt-3 font-bold text-slate-700">
                                                    No dealers registered yet
                                                </p>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    Add your first dealer to build your network.
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        dealers.map((dealer) => (
                                            <tr
                                                key={dealer.id}
                                                className="transition hover:bg-indigo-50/40"
                                            >
                                                <td className="whitespace-nowrap px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 font-black text-indigo-700">
                                                            {dealer.name?.charAt(0)?.toUpperCase()}
                                                        </div>
                                                        <span className="font-bold text-slate-800">
                                                            {dealer.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-5 text-sm font-medium text-slate-500">
                                                    {dealer.email}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-5 text-sm font-medium text-slate-500">
                                                    {new Date(dealer.created_at).toLocaleDateString(
                                                        'en-LK',
                                                    )}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-5">
                                                    <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                                                        ● Active
                                                    </span>
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

            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) closeModal();
                    }}
                >
                    <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
                            <h3 className="text-2xl font-black">Register new dealer</h3>
                            <p className="mt-1 text-sm text-blue-100">
                                Create secure login credentials for a showroom.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5 p-6">
                            {['name', 'email', 'password'].map((field) => (
                                <div key={field}>
                                    <label className="mb-1.5 block text-sm font-bold text-slate-700">
                                        {field === 'name' ? 'Showroom / Dealer Name' : field === 'email' ? 'Email Address (Login ID)' : 'Initial Password'}
                                    </label>
                                    <input
                                        type={field === 'password' ? 'password' : 'text'}
                                        value={data[field]}
                                        onChange={(e) => setData(field, e.target.value)}
                                        minLength={field === 'password' ? 8 : undefined}
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
                                    onClick={closeModal}
                                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? 'Creating...' : 'Create dealer account'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}