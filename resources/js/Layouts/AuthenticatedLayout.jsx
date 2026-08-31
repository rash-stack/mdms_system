import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function AuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100/50 to-slate-100">
            {/* Navigation Bar */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            {/* Logo */}
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-slate-800" />
                                </Link>
                            </div>

                            {/* Navigation Links */}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                {user.role === 'distributor' ? (
                                    <>
                                        <NavLink href={route('distributor.dashboard')} active={route().current('distributor.dashboard')}>
                                            Dashboard
                                        </NavLink>
                                        <NavLink href={route('distributor.inventory')} active={route().current('distributor.inventory')}>
                                            Inventory
                                        </NavLink>
                                        <NavLink href={route('distributor.orders')} active={route().current('distributor.orders')}>
                                            Orders
                                        </NavLink>
                                        <NavLink href={route('distributor.dealers')} active={route().current('distributor.dealers')}>
                                            Dealers
                                        </NavLink>
                                    </>
                                    ) : user.role === 'sales_admin' ? (
    <>
                                    <NavLink href={route('sales_admin.dashboard')} active={route().current('sales_admin.dashboard')}>Performance Dashboard</NavLink>

    </>
                                ) : (
                                    <>
                                        <NavLink href={route('dealer.dashboard')} active={route().current('dealer.dashboard')}>
                                            Dashboard
                                        </NavLink>
                                        <NavLink href={route('dealer.catalog')} active={route().current('dealer.catalog')}>
                                            Catalog & Orders
                                        </NavLink>
                                        <NavLink href={route('dealer.inventory')} active={route().current('dealer.inventory')}>
                                            Showroom Inventory
                                        </NavLink>
                                        <NavLink href={route('dealer.inquiries')} active={route().current('dealer.inquiries')}>
                                            Customer Inquiries
                                        </NavLink>
                                        <NavLink href={route('dealer.invoices')} active={route().current('dealer.invoices')}>
                                            Customer Invoices
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Settings Dropdown */}
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-full">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-slate-200 text-sm leading-4 font-bold rounded-full text-slate-700 bg-slate-50 hover:bg-slate-100 focus:outline-none transition ease-in-out duration-150 shadow-2xs"
                                            >
                                                {user.name}
                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4 text-slate-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Hamburger */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previous) => !previous)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Responsive Navigation Menu */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-white border-b border-slate-200'}>
                    <div className="pt-2 pb-3 space-y-1">
                        {user.role === 'distributor' ? (
                            <>
                                <ResponsiveNavLink href={route('distributor.dashboard')} active={route().current('distributor.dashboard')}>
                                    Dashboard
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('distributor.inventory')} active={route().current('distributor.inventory')}>
                                    Inventory
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('distributor.orders')} active={route().current('distributor.orders')}>
                                    Orders
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('distributor.dealers')} active={route().current('distributor.dealers')}>
                                    Dealers
                                </ResponsiveNavLink>
                            </>
                        ) : (
                            <>
                                <ResponsiveNavLink href={route('dealer.dashboard')} active={route().current('dealer.dashboard')}>
                                    Dashboard
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('dealer.catalog')} active={route().current('dealer.catalog')}>
                                    Catalog & Orders
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('dealer.inventory')} active={route().current('dealer.inventory')}>
                                    Showroom Inventory
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('dealer.inquiries')} active={route().current('dealer.inquiries')}>
                                    Customer Inquiries
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('dealer.invoices')} active={route().current('dealer.invoices')}>
                                    Customer Invoices
                                </ResponsiveNavLink>
                            </>
                        )}
                    </div>

                    <div className="pt-4 pb-1 border-t border-slate-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-slate-800">{user.name}</div>
                            <div className="font-medium text-sm text-slate-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Heading */}
            {header && (
                <header className="bg-white/50 backdrop-blur-xs border-b border-slate-200/60 shadow-2xs">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            {/* Page Content */}
            <main>{children}</main>
        </div>
    );
}