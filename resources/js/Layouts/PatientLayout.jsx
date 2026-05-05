import { useState } from 'react';
import PatientSidebar from '@/Components/PatientSidebar';
import { usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';

export default function PatientLayout({ header, children }) {
    const { auth } = usePage().props;
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
                <div className="flex items-center justify-between px-4 py-3">
                    <h1 className="text-lg font-bold text-gray-900">Patient Portal</h1>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <div className="flex">
                {/* Desktop Sidebar */}
                <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 z-50">
                    <PatientSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                </div>

                {/* Mobile Sidebar */}
                <div
                    className={`fixed inset-y-0 left-0 z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
                        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <PatientSidebar 
                        isCollapsed={false} 
                        setIsCollapsed={setIsCollapsed}
                        onNavigate={() => setIsMobileMenuOpen(false)}
                    />
                </div>

                {/* Main content */}
                <div className={`flex flex-1 flex-col transition-all duration-300 ${isCollapsed ? 'md:pl-16' : 'md:pl-64'} pt-14 md:pt-0`}>
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
