// Full Page Skeleton Loader - Shows after login while dashboard loads

export default function FullPageLoader() {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar Skeleton */}
            <div className="w-64 bg-white border-r border-gray-200 flex flex-col animate-pulse">
                {/* Logo/Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-rose-200 rounded-2xl"></div>
                        <div className="flex-1">
                            <div className="w-32 h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="w-40 h-3 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 p-4 space-y-2">
                    <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
                    <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
                    <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
                </div>

                {/* User Section */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-xl"></div>
                        <div className="flex-1">
                            <div className="w-24 h-3 bg-gray-200 rounded mb-2"></div>
                            <div className="w-32 h-3 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 py-6">
                    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
                        {/* Metric Cards Skeleton */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
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
                            ))}
                        </div>

                        {/* Tabs Skeleton */}
                        <div className="mb-6">
                            <div className="bg-white rounded-xl shadow-md p-2 inline-flex gap-2 animate-pulse">
                                <div className="w-24 h-10 bg-gray-200 rounded-lg"></div>
                                <div className="w-24 h-10 bg-gray-200 rounded-lg"></div>
                            </div>
                        </div>

                        {/* Content Panels Skeleton */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {[1, 2].map((i) => (
                                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                                    <div className="bg-gradient-to-r from-indigo-200 to-purple-200 px-6 py-4">
                                        <div className="w-40 h-5 bg-white/30 rounded mb-2"></div>
                                        <div className="w-48 h-3 bg-white/20 rounded"></div>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        {[1, 2, 3].map((j) => (
                                            <div key={j} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                                                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="w-32 h-4 bg-gray-200 rounded"></div>
                                                    <div className="w-24 h-3 bg-gray-200 rounded"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading Indicator */}
            <div className="fixed bottom-8 right-8 bg-white rounded-full shadow-2xl px-6 py-3 flex items-center gap-3 animate-pulse">
                <div className="w-5 h-5 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
                <span className="text-sm font-medium text-gray-700">Loading your dashboard...</span>
            </div>
        </div>
    );
}
