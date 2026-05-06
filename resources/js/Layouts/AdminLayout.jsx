import { useState } from 'react';
import AdminSidebar from '@/Components/AdminSidebar';
import { usePage } from '@inertiajs/react';

export default function AdminLayout({ header, children }) {
    const { auth } = usePage().props;
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex">
                {/* Sidebar */}
                <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0">
                    <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                </div>

                {/* Main content */}
                <div className={`flex flex-1 flex-col transition-all duration-300 ${isCollapsed ? 'md:pl-16' : 'md:pl-64'}`}>
                    {/* Header */}
                    {header && (
                        <header className="bg-white shadow">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}

                    {/* Page content */}
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
