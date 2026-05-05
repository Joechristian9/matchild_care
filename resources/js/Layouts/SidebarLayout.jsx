import { useState } from 'react';
import Sidebar, { SidebarItem, SidebarGroup, SidebarDivider } from '@/Components/Sidebar';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function SidebarLayout({ user, header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Example icons (you can replace with your preferred icon library)
    const HomeIcon = () => (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
    );

    const DashboardIcon = () => (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    );

    const UserIcon = () => (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );

    const SettingsIcon = () => (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );

    const LogoutIcon = () => (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar
                defaultOpen={true}
                position="left"
                width="w-64"
                collapsedWidth="w-16"
                header={
                    <div className="flex items-center gap-3">
                        <ApplicationLogo className="w-8 h-8" />
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            MyApp
                        </span>
                    </div>
                }
                footer={
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {user?.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                }
            >
                <SidebarGroup title="Main">
                    <SidebarItem
                        href={route('dashboard')}
                        icon={<DashboardIcon />}
                        label="Dashboard"
                        active={route().current('dashboard')}
                    />
                    {/* <SidebarItem
                        href="/"
                        icon={<HomeIcon />}
                        label="Home"
                        active={route().current('welcome')}
                    /> */}
                </SidebarGroup>

                <SidebarDivider />

                <SidebarGroup title="Account">
                    <SidebarItem
                        href={route('profile.edit')}
                        icon={<UserIcon />}
                        label="Profile"
                        active={route().current('profile.edit')}
                    />
                    <SidebarItem
                        href="#"
                        icon={<SettingsIcon />}
                        label="Settings"
                    />
                </SidebarGroup>

                <SidebarDivider />

                <SidebarItem
                    href={route('logout')}
                    icon={<LogoutIcon />}
                    label="Logout"
                    onClick={(e) => {
                        e.preventDefault();
                        // Handle logout
                    }}
                />
            </Sidebar>

            {/* Main Content */}
            <main className="min-h-screen">
                {header && (
                    <header className="bg-white dark:bg-gray-800 shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
