import { Link, usePage } from '@inertiajs/react';
import { Home, FileText, Settings, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function PatientSidebar({ isCollapsed, setIsCollapsed, onNavigate }) {
    const { auth } = usePage().props;
    const [showUserMenu, setShowUserMenu] = useState(false);
    
    const navigation = [
        { name: 'Dashboard', href: route('patient.dashboard'), icon: Home },
        { name: 'My Records', href: route('patient.my-records'), icon: FileText },
    ];

    const handleNavClick = () => {
        if (onNavigate) {
            onNavigate();
        }
    };

    return (
        <div className={`flex h-screen flex-col bg-white border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
                {!isCollapsed && <h1 className="text-xl font-bold text-gray-900">Patient Portal</h1>}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1 rounded-md hover:bg-gray-100 text-gray-600 hidden md:block"
                >
                    {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                </button>
            </div>
            
            <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = route().current() === item.href.replace(route().t.url, '');
                    
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={handleNavClick}
                            className={`
                                group flex items-center px-2 py-2 text-sm font-medium rounded-md
                                ${isCollapsed ? 'justify-center' : ''}
                                ${isActive
                                    ? 'bg-pink-50 text-pink-600'
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
                                <div className="h-8 w-8 rounded-full bg-pink-600 flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-3 flex-1 text-left">
                                <p className="text-sm font-medium text-gray-900 truncate">{auth.user.name}</p>
                                <p className="text-xs text-gray-500">Patient</p>
                            </div>
                            {showUserMenu ? (
                                <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            ) : (
                                <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            )}
                        </button>
                        
                        {showUserMenu && (
                            <div className="space-y-1 pl-2">
                                <Link
                                    href={route('profile.edit')}
                                    onClick={handleNavClick}
                                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                                >
                                    Profile Settings
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    onClick={handleNavClick}
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
                            className="h-8 w-8 rounded-full bg-pink-600 flex items-center justify-center hover:bg-pink-700 transition-colors"
                            title={auth.user.name}
                        >
                            <span className="text-white text-sm font-medium">
                                {auth.user.name.charAt(0).toUpperCase()}
                            </span>
                        </button>
                        {showUserMenu && (
                            <div className="flex flex-col items-center space-y-1">
                                <Link
                                    href={route('profile.edit')}
                                    onClick={handleNavClick}
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
