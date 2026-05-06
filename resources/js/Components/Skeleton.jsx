// Reusable Skeleton Loading Components

export const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gray-200 rounded-xl"></div>
                <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
            </div>
            <div className="w-20 h-8 bg-gray-200 rounded mb-2"></div>
            <div className="w-32 h-4 bg-gray-200 rounded mb-4"></div>
            <div className="pt-4 border-t border-gray-100">
                <div className="w-full h-3 bg-gray-200 rounded"></div>
            </div>
        </div>
    </div>
);

export const SkeletonListItem = () => (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 animate-pulse">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200"></div>
        <div className="flex-1 space-y-2">
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
            <div className="w-24 h-3 bg-gray-200 rounded"></div>
            <div className="w-28 h-3 bg-gray-200 rounded"></div>
        </div>
        <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
    </div>
);

export const SkeletonTable = ({ rows = 5 }) => (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-pink-50 to-rose-50">
                <tr>
                    {[1, 2, 3, 4, 5].map((col) => (
                        <th key={col} className="px-6 py-4">
                            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {Array.from({ length: rows }).map((_, index) => (
                    <tr key={index} className="animate-pulse">
                        <td className="px-6 py-4">
                            <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                <div className="w-32 h-4 bg-gray-200 rounded"></div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="w-12 h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="w-24 h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="w-24 h-4 bg-gray-200 rounded"></div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export const SkeletonInsightCard = () => (
    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 animate-pulse">
        <div className="flex items-center justify-between mb-2">
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
            <div className="w-12 h-6 bg-gray-200 rounded"></div>
        </div>
        <div className="w-full h-2.5 bg-gray-200 rounded-full mb-2"></div>
        <div className="w-full h-3 bg-gray-200 rounded"></div>
    </div>
);

export const SkeletonPanel = ({ title = true, items = 3 }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4">
            {title && (
                <>
                    <div className="w-40 h-5 bg-white/30 rounded mb-2 animate-pulse"></div>
                    <div className="w-48 h-3 bg-white/20 rounded animate-pulse"></div>
                </>
            )}
        </div>
        <div className="p-6 space-y-4">
            {Array.from({ length: items }).map((_, index) => (
                <SkeletonListItem key={index} />
            ))}
        </div>
    </div>
);
