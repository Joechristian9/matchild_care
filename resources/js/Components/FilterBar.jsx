import { memo } from 'react';

const FilterBar = memo(({ 
    statusFilter, 
    setStatusFilter, 
    ageGroupFilter, 
    setAgeGroupFilter,
    onClearFilters,
    resultCount 
}) => {
    const hasActiveFilters = statusFilter !== 'all' || ageGroupFilter !== 'all';

    return (
        <div className="flex flex-wrap gap-3 items-center">
            {/* Filter Icon Label */}
            <div className="flex items-center gap-2 text-gray-700">
                <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center shadow-sm">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                </div>
            </div>

            {/* Status Filter */}
            <div className="relative">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none text-sm font-medium border-2 border-gray-200 rounded-xl pl-4 pr-10 py-2.5 bg-white hover:border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all cursor-pointer shadow-sm hover:shadow"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                {statusFilter !== 'all' && (
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></div>
                )}
            </div>

            {/* Age Group Filter */}
            <div className="relative">
                <select
                    value={ageGroupFilter}
                    onChange={(e) => setAgeGroupFilter(e.target.value)}
                    className="appearance-none text-sm font-medium border-2 border-gray-200 rounded-xl pl-4 pr-10 py-2.5 bg-white hover:border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all cursor-pointer shadow-sm hover:shadow"
                >
                    <option value="all">All Ages</option>
                    <option value="10-14">10-14 years</option>
                    <option value="15-19">15-19 years</option>
                    <option value="20-49">20-49 years</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                {ageGroupFilter !== 'all' && (
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></div>
                )}
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
                <button
                    onClick={onClearFilters}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border-2 border-rose-200 rounded-xl transition-all shadow-sm hover:shadow"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear
                </button>
            )}
        </div>
    );
});

FilterBar.displayName = 'FilterBar';

export default FilterBar;
