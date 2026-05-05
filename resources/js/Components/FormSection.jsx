export default function FormSection({ title, description, children, className = '' }) {
    return (
        <div className={`border border-gray-200 rounded-lg p-3 ${className}`}>
            {title && (
                <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
            )}
            {description && (
                <p className="text-xs text-gray-500 mb-3">{description}</p>
            )}
            {children}
        </div>
    );
}
