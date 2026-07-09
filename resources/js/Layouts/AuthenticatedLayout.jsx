import ApplicationLogo from "@/Components/ApplicationLogo";
import Sidebar, { SidebarItem, SidebarGroup } from "@/Components/Sidebar";
import { usePage, router } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const settingsRef = useRef(null);

    // Close settings menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                settingsRef.current &&
                !settingsRef.current.contains(event.target)
            ) {
                setShowSettings(false);
            }
        }

        if (showSettings) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [showSettings]);

    // Icons
    const MenuIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );

    const HomeIcon = () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
        </svg>
    );

    const DashboardIcon = () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
        </svg>
    );

    const MaternalCareIcon = () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
        </svg>
    );

    const RegistrationIcon = () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
        </svg>
    );

    const BabyIcon = () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    );

    const UserIcon = () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
        </svg>
    );

    const SettingsIcon = () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
        </svg>
    );

    const LogoutIcon = () => (
        <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
        </svg>
    );

    const ChevronRightIcon = ({ className }) => (
        <svg
            className={className}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
            />
        </svg>
    );

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route("logout"));
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
                        {/* Logo/Icon */}
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-red-500 to-rose-600 rounded-2xl shadow-lg flex items-center justify-center transform transition-transform hover:scale-105">
                                <svg
                                    className="w-7 h-7 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="flex-1 min-w-0">
                            <h1 className="text-lg font-bold text-gray-900 truncate leading-tight">
                                Maternal Care
                            </h1>
                            <p className="text-xs text-gray-500 truncate">
                                Health Management System
                            </p>
                        </div>
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
                                <div className="absolute bottom-0 left-full ml-3 mb-2 w-64 bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 py-2 z-50 overflow-hidden">
                                    {/* Header */}
                                    <div className="px-4 py-3 border-b border-gray-100/50 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
                                        <p className="text-sm font-semibold text-gray-900">
                                            {user?.name}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {user?.email}
                                        </p>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-2">
                                        <a
                                            href={route("profile.edit")}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all group"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-indigo-100/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-indigo-200/80 transition-colors">
                                                <UserIcon />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium">
                                                    Profile Settings
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Manage your account
                                                </p>
                                            </div>
                                        </a>

                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50/50 transition-all w-full text-left group"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-red-100/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-red-200/80 transition-colors">
                                                <LogoutIcon />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium">
                                                    Logout
                                                </p>
                                                <p className="text-xs text-red-400">
                                                    Sign out of your account
                                                </p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* User Info - Clickable with Glassmorphism */}
                        <button
                            onClick={toggleSettings}
                            className="flex items-center gap-3 w-full rounded-xl p-3 transition-all group relative overflow-hidden bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-pink-50/50 backdrop-blur-sm border border-white/20 hover:border-indigo-200/50 shadow-sm hover:shadow-md"
                        >
                            {/* Hover effect background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Avatar */}
                            <div className="relative flex-shrink-0">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-white/50 group-hover:ring-indigo-200/80 transition-all backdrop-blur-sm">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                {/* Online indicator */}
                                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                            </div>

                            {/* User Info */}
                            <div className="flex-1 min-w-0 text-left">
                                <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                                    {user?.name}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {user?.email}
                                </p>
                            </div>

                            {/* Arrow Icon */}
                            <ChevronRightIcon
                                className={`w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-indigo-600 transition-all ${showSettings ? "rotate-90" : "rotate-0"}`}
                            />
                        </button>
                    </div>
                }
            >
                <SidebarGroup title="Main">
                    <SidebarItem
                        href={route("dashboard")}
                        icon={<DashboardIcon />}
                        label="Dashboard"
                        active={route().current("dashboard")}
                    />
                </SidebarGroup>

                <SidebarGroup title="Parent & Child Services">
                    <SidebarItem
                        href={route("parent.maternal-care")}
                        icon={<MaternalCareIcon />}
                        label="Maternal Care"
                        active={route().current('parent.maternal-care')}
                    />
                    <SidebarItem
                        href={route("parent.maternal-care.register")}
                        icon={<RegistrationIcon />}
                        label="Registration"
                        active={route().current('parent.maternal-care.register')}
                    />
                    <SidebarItem
                        href={route("child.immunization.index")}
                        icon={<BabyIcon />}
                        label="Child Immunization"
                        active={route().current('child.immunization.*')}
                    />
                </SidebarGroup>
            </Sidebar>

            {/* Main Content Area - Adjusts based on sidebar state */}
            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1">
                    {header && (
                        <header className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-b border-indigo-100 shadow-sm sticky top-0 z-40 backdrop-blur-sm bg-white/80">
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
