export default function FormSection({ title, description, children, className = '' }) {
    return (
        <div className={`bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
            {title && (
                <div className="mb-5 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-full" />
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                            {description && (
                                <p className="text-sm text-gray-600 mt-0.5">{description}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {children}
        </div>
    );
}
