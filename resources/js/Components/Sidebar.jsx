import { useState, useEffect, cloneElement, Children } from "react";
import { Link } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function Sidebar({
    children,
    header,
    footer,
    defaultOpen = true,
    position = "left",
    width = "w-64",
    collapsedWidth = "w-20",
    className = "",
    onToggle,
    userInitial = "U",
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [isHovering, setIsHovering] = useState(false);

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
        left: "left-0",
        right: "right-0",
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
                    className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40"
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
                    ${!isOpen && "lg:flex hidden"}
                    ${className}
                    shadow-lg lg:shadow-none
                `}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {/* Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className={`
                        absolute -right-3 top-6 bg-white
                        border-2 border-gray-200
                        rounded-full p-1.5 shadow-lg
                        hover:bg-indigo-50 hover:border-indigo-300
                        transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                        transform hover:scale-110
                        ${isHovering ? "opacity-100" : "opacity-0 lg:opacity-100"}
                    `}
                    aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                    <svg
                        className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                            isOpen ? "rotate-0" : "rotate-180"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d={
                                position === "left"
                                    ? "M15 19l-7-7 7-7"
                                    : "M9 5l7 7-7 7"
                            }
                        />
                    </svg>
                </button>

                {/* Sidebar Content */}
                <div className="flex flex-col h-full">
                    {/* Header */}
                    {header && (
                        <div className="flex-shrink-0 px-4 py-6 border-b border-gray-200 bg-gradient-to-br from-indigo-50 to-white">
                            <Transition
                                show={isOpen}
                                enter="transition-all duration-300 delay-100"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="transition-all duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                {header}
                            </Transition>
                            {!isOpen && (
                                <div className="flex justify-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl shadow-md flex items-center justify-center">
                                        <svg
                                            className="w-6 h-6 text-white"
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
                            )}
                        </div>
                    )}

                    {/* Main Content */}
                    <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        {childrenWithProps}
                    </nav>

                    {/* Footer */}
                    {footer && (
                        <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200 bg-gray-50">
                            {isOpen ? (
                                footer
                            ) : (
                                <div className="flex justify-center">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center text-white font-semibold text-sm shadow-md ring-2 ring-white">
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
    collapsed = false,
}) {
    const [showTooltip, setShowTooltip] = useState(false);

    const baseClasses = `
        group relative flex items-center gap-3 px-3 py-2.5 rounded-xl
        transition-all duration-200
        text-sm font-medium
        ${collapsed ? "justify-center" : ""}
        transform hover:scale-[1.02]
    `;

    const activeClasses = active
        ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md shadow-indigo-200"
        : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-sm";

    const content = (
        <>
            {icon && (
                <span
                    className={`flex-shrink-0 w-5 h-5 transition-transform duration-200 ${active ? "" : "group-hover:scale-110"}`}
                >
                    {icon}
                </span>
            )}
            {!collapsed && (
                <Transition
                    show={true}
                    enter="transition-all duration-300 delay-75"
                    enterFrom="opacity-0 translate-x-2"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition-all duration-200"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 translate-x-2"
                >
                    <span className="flex-1 truncate">{label}</span>
                </Transition>
            )}
            {!collapsed && badge && (
                <span
                    className={`
                    flex-shrink-0 px-2 py-0.5 text-xs font-semibold rounded-full
                    ${
                        active
                            ? "bg-white/20 text-white"
                            : "bg-indigo-100 text-indigo-600"
                    }
                    transition-all duration-200
                `}
                >
                    {badge}
                </span>
            )}

            {/* Tooltip for collapsed state */}
            {collapsed && showTooltip && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-50 pointer-events-none">
                    {label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                </div>
            )}
        </>
    );

    const handleMouseEnter = () => {
        if (collapsed) setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        if (collapsed) setShowTooltip(false);
    };

    if (href) {
        return (
            <Link
                href={href}
                className={`${baseClasses} ${activeClasses}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${activeClasses} w-full`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {content}
        </button>
    );
}

// Sidebar Group Component
export function SidebarGroup({ title, children, collapsed = false }) {
    // Pass collapsed state to children
    const childrenWithProps = Children.map(children, (child) => {
        if (child && typeof child === "object" && "type" in child) {
            return cloneElement(child, { collapsed });
        }
        return child;
    });

    return (
        <div className="mb-6">
            {!collapsed && title && (
                <Transition
                    show={true}
                    enter="transition-all duration-300 delay-100"
                    enterFrom="opacity-0 -translate-x-2"
                    enterTo="opacity-100 translate-x-0"
                >
                    <h3 className="px-3 mb-3 text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1 h-4 bg-indigo-600 rounded-full" />
                        {title}
                    </h3>
                </Transition>
            )}
            {collapsed && title && (
                <div className="relative h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-3 mb-4">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                </div>
            )}
            <div className="space-y-1">{childrenWithProps}</div>
        </div>
    );
}

// Sidebar Divider Component
export function SidebarDivider() {
    return (
        <div className="relative my-4">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>
    );
}
