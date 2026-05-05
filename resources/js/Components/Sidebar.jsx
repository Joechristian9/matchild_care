import { useState, useEffect, cloneElement, Children } from 'react';
import { Link } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function Sidebar({ 
    children, 
    header, 
    footer,
    defaultOpen = true,
    position = 'left',
    width = 'w-64',
    collapsedWidth = 'w-16',
    className = '',
    onToggle,
    userInitial = 'U'
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Notify parent component when sidebar state changes
    useEffect(() => {
        if (onToggle) {
            onToggle(isOpen);
        }
    }, [isOpen, onToggle]);

    const positionClasses = {
        left: 'left-0',
        right: 'right-0'
    };

    // Pass collapsed state to children
    const childrenWithProps = Children.map(children, child => {
        if (child && typeof child === 'object' && 'type' in child) {
            return cloneElement(child, { collapsed: !isOpen });
        }
        return child;
    });

    return (
        <>
            {/* Mobile Overlay */}
            <Transition
                show={isOpen}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="lg:hidden"
            >
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                />
            </Transition>

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:sticky top-0 ${positionClasses[position]} h-screen
                    bg-white
                    border-r border-gray-200
                    transition-all duration-300 ease-in-out
                    z-50 lg:z-30
                    flex-shrink-0
                    ${isOpen ? width : collapsedWidth}
                    ${!isOpen && 'lg:flex hidden'}
                    ${className}
                `}
            >
                {/* Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className="absolute -right-3 top-6 bg-white
                        border border-gray-200
                        rounded-full p-1.5 shadow-md
                        hover:bg-gray-50
                        transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                >
                    <svg
                        className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                            isOpen ? 'rotate-0' : 'rotate-180'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={position === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
                        />
                    </svg>
                </button>

                {/* Sidebar Content */}
                <div className="flex flex-col h-full">
                    {/* Header */}
                    {header && (
                        <div className="flex-shrink-0 px-4 py-6 border-b border-gray-200">
                            <Transition
                                show={isOpen}
                                enter="transition-opacity duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                {header}
                            </Transition>
                            {!isOpen && (
                                <div className="flex justify-center">
                                    <div className="w-8 h-8 bg-indigo-600 rounded-lg" />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Main Content */}
                    <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
                        {childrenWithProps}
                    </nav>

                    {/* Footer */}
                    {footer && (
                        <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200">
                            {isOpen ? (
                                footer
                            ) : (
                                <div className="flex justify-center">
                                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-xs">
                                        {userInitial}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}

// Sidebar Item Component
export function SidebarItem({ 
    href, 
    icon, 
    label, 
    active = false, 
    badge,
    onClick,
    collapsed = false 
}) {
    const baseClasses = `
        flex items-center gap-3 px-3 py-2.5 rounded-lg
        transition-colors duration-200
        text-sm font-medium
        ${collapsed ? 'justify-center' : ''}
    `;

    const activeClasses = active
        ? 'bg-indigo-50 text-indigo-600'
        : 'text-gray-700 hover:bg-gray-100';

    const content = (
        <>
            {icon && (
                <span className="flex-shrink-0 w-5 h-5">
                    {icon}
                </span>
            )}
            {!collapsed && (
                <>
                    <span className="flex-1 truncate">{label}</span>
                    {badge && (
                        <span className="flex-shrink-0 px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-600">
                            {badge}
                        </span>
                    )}
                </>
            )}
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                className={`${baseClasses} ${activeClasses}`}
                title={collapsed ? label : undefined}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${activeClasses} w-full`}
            title={collapsed ? label : undefined}
        >
            {content}
        </button>
    );
}

// Sidebar Group Component
export function SidebarGroup({ title, children, collapsed = false }) {
    // Pass collapsed state to children
    const childrenWithProps = Children.map(children, child => {
        if (child && typeof child === 'object' && 'type' in child) {
            return cloneElement(child, { collapsed });
        }
        return child;
    });

    return (
        <div className="mb-6">
            {!collapsed && title && (
                <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {title}
                </h3>
            )}
            {collapsed && title && (
                <div className="h-px bg-gray-200 mx-3 mb-4" />
            )}
            <div className="space-y-1">
                {childrenWithProps}
            </div>
        </div>
    );
}

// Sidebar Divider Component
export function SidebarDivider() {
    return <hr className="my-4 border-gray-200" />;
}
