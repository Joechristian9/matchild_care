import { Link } from '@inertiajs/react';

export default function Breadcrumb({ items }) {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {items.map((item, index) => (
                    <li key={index} className="inline-flex items-center">
                        {index > 0 && (
                            <svg
                                className="w-4 h-4 text-gray-400 mx-2"
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
                        )}
                        {item.href ? (
                            <Link
                                href={item.href}
                                className={`inline-flex items-center text-sm transition-colors ${
                                    item.bold 
                                        ? 'font-bold text-gray-700 hover:text-indigo-600' 
                                        : 'font-medium text-gray-600 hover:text-indigo-600'
                                }`}
                            >
                                {item.icon && (
                                    <span className="mr-2">{item.icon}</span>
                                )}
                                {item.label}
                            </Link>
                        ) : (
                            <span className={`inline-flex items-center text-sm ${
                                item.bold 
                                    ? 'font-bold text-gray-900' 
                                    : 'font-medium text-gray-800'
                            }`}>
                                {item.icon && (
                                    <span className="mr-2">{item.icon}</span>
                                )}
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
