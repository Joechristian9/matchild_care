import ApplicationLogo from '@/Components/ApplicationLogo';
import Sidebar, { SidebarItem, SidebarGroup } from '@/Components/Sidebar';
import { usePage, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const settingsRef = useRef(null);

    // Close settings menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (settingsRef.current && !settingsRef.current.contains(event.target)) {
                setShowSettings(false);
            }
        }

        if (showSettings) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [showSettings]);

    // Icons
    const HomeIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
    );

    const DashboardIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    );

    const MaternalCareIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    );

    const UserIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );

    const SettingsIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );

    const LogoutIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
    );

    const ChevronRightIcon = ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    );

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar
                defaultOpen={true}
                position="left"
                width="w-64"
                collapsedWidth="w-16"
                onToggle={setSidebarOpen}
                userInitial={user?.name?.charAt(0).toUpperCase()}
                header={
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-gray-900">
                            Maternal Care & Services
                        </span>
                    </div>
                }
                footer={
                    <div className="relative" ref={settingsRef}>
                        {/* Settings Menu - Shows on the right side */}
                        {showSettings && (
                            <>
                                {/* Backdrop for mobile */}
                                <div 
                                    className="fixed inset-0 z-40 lg:hidden" 
                                    onClick={toggleSettings}
                                />
                                
                                {/* Settings Dropdown */}
                                <div className="absolute bottom-0 left-full ml-2 mb-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                    <a
                                        href={route('profile.edit')}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        <UserIcon />
                                        <span>Profile</span>
                                    </a>
                                    <hr className="my-2 border-gray-200" />
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                                    >
                                        <LogoutIcon />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </>
                        )}
                        
                        {/* User Info - Clickable */}
                        <button
                            onClick={toggleSettings}
                            className="flex items-center gap-3 w-full hover:bg-gray-50 rounded-lg p-2 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {user?.name}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {user?.email}
                                </p>
                            </div>
                            <ChevronRightIcon 
                                className={`w-4 h-4 flex-shrink-0 text-gray-400 transition-transform ${showSettings ? 'rotate-180' : ''}`} 
                            />
                        </button>
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
                    <SidebarItem
                        href="/"
                        icon={<HomeIcon />}
                        label="Home"
                        active={route().current('welcome')}
                    />
                </SidebarGroup>

                <SidebarGroup title="Parent Services">
                    <SidebarItem
                        href={route('parent.maternal-care')}
                        icon={<MaternalCareIcon />}
                        label="Maternal Care"
                        active={route().current('parent.maternal-care')}
                    />
                </SidebarGroup>
            </Sidebar>

            {/* Main Content Area - Adjusts based on sidebar state */}
            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1">
                    {header && (
                        <header className="bg-white shadow sticky top-0 z-10">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}

                    {children}
                </main>
            </div>
        </div>
    );
}
