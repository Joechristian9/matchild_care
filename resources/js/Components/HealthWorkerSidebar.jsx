import { Link } from '@inertiajs/react';
import { Home, Users, FileText, Activity, ClipboardList, Settings, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function HealthWorkerSidebar({ isCollapsed, setIsCollapsed }) {
    const [showUserMenu, setShowUserMenu] = useState(false);
    
    const navigation = [
        { name: 'Dashboard', href: route('dashboard'), icon: Home },
        { name: 'Maternal Care', href: route('parent.maternal-care'), icon: Activity },
        { name: 'Patients', href: '#', icon: Users, disabled: true },
        { name: 'Reports', href: '#', icon: FileText, disabled: true },
        { name: 'Appointments', href: '#', icon: ClipboardList, disabled: true },
    ];

    return (
        <div className={`flex h-screen flex-col bg-white border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
                {!isCollapsed && <h1 className="text-xl font-bold text-gray-900">Health Worker</h1>}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1 rounded-md hover:bg-gray-100 text-gray-600"
                >
                    {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                </button>
            </div>
            
            <nav className="flex-1 space-y-1 px-2 py-4">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = route().current() === item.href.replace(route().t.url, '');
                    
                    if (item.disabled) {
                        return (
                            <div
                                key={item.name}
                                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-400 cursor-not-allowed ${isCollapsed ? 'justify-center' : ''}`}
                                title={isCollapsed ? item.name : ''}
                            >
                                <Icon className={`h-6 w-6 flex-shrink-0 ${!isCollapsed && 'mr-3'}`} />
                                {!isCollapsed && (
                                    <>
                                        {item.name}
                                        <span className="ml-auto text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">Soon</span>
                                    </>
                                )}
                            </div>
                        );
                    }
                    
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`
                                group flex items-center px-2 py-2 text-sm font-medium rounded-md
                                ${isCollapsed ? 'justify-center' : ''}
                                ${isActive
                                    ? 'bg-green-50 text-green-600'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                }
                            `}
                            title={isCollapsed ? item.name : ''}
                        >
                            <Icon className={`h-6 w-6 flex-shrink-0 ${!isCollapsed && 'mr-3'}`} />
                            {!isCollapsed && item.name}
                        </Link>
                    );
                })}
            </nav>
            
            <div className="border-t border-gray-200 p-4">
                {!isCollapsed ? (
                    <>
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center w-full mb-3 hover:bg-gray-50 rounded-md p-2 transition-colors"
                        >
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">HW</span>
                                </div>
                            </div>
                            <div className="ml-3 flex-1 text-left">
                                <p className="text-sm font-medium text-gray-900">Health Worker</p>
                                <p className="text-xs text-gray-500">Medical Staff</p>
                            </div>
                            {showUserMenu ? (
                                <ChevronUp className="h-4 w-4 text-gray-400" />
                            ) : (
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            )}
                        </button>
                        
                        {showUserMenu && (
                            <div className="space-y-1 pl-2">
                                <Link
                                    href={route('profile.edit')}
                                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                                >
                                    Profile Settings
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                                >
                                    Sign out
                                </Link>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center space-y-2">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-700 transition-colors"
                            title="Health Worker"
                        >
                            <span className="text-white text-sm font-medium">HW</span>
                        </button>
                        {showUserMenu && (
                            <div className="flex flex-col items-center space-y-1">
                                <Link
                                    href={route('profile.edit')}
                                    className="p-2 text-gray-700 hover:bg-gray-50 rounded-md"
                                    title="Profile Settings"
                                >
                                    <Settings className="h-5 w-5" />
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
