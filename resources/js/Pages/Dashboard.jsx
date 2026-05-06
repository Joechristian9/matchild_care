import AdminLayout from '@/Layouts/AdminLayout';
import HealthWorkerLayout from '@/Layouts/HealthWorkerLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ stats }) {
    const { auth } = usePage().props;
    
    // Determine which layout to use based on user role
    const Layout = auth.user.roles.includes('admin') ? AdminLayout : HealthWorkerLayout;
    const userRole = auth.user.roles.includes('admin') ? 'Admin' : 'Health Worker';

    return (
        <Layout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
                    {/* Welcome Section */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-2">Welcome, {auth.user.name} ({userRole})</h3>
                            <p className="text-gray-600">Monitor and manage maternal health records efficiently.</p>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        {/* Total Maternal Records */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-sm font-medium text-gray-600">Total Records</h4>
                                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <p className="text-3xl font-bold text-gray-900">{stats?.total_records || 0}</p>
                                <p className="text-sm text-gray-500 mt-2">Maternal care records</p>
                            </div>
                        </div>

                        {/* Active Pregnancies */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-sm font-medium text-gray-600">Active Pregnancies</h4>
                                    <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <p className="text-3xl font-bold text-gray-900">{stats?.active_pregnancies || 0}</p>
                                <p className="text-sm text-gray-500 mt-2">Ongoing pregnancies</p>
                            </div>
                        </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {isLoading ? (
                            // Show skeleton loading for metric cards
                            <>
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                            </>
                        ) : (
                            <>
                                <MetricCard
                                    icon={
                                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    }
                                    badge="Total"
                                    value={stats?.total_records || 0}
                                    label="Maternal Records"
                                    description="All registered patients"
                                    bgColor="bg-indigo-100"
                                    badgeColor="text-indigo-600 bg-indigo-50"
                                />
                                
                                <MetricCard
                                    icon={
                                        <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    }
                                    badge="Active"
                                    value={stats?.active_pregnancies || 0}
                                    label="Active Pregnancies"
                                    description="Ongoing care required"
                                    bgColor="bg-pink-100"
                                    badgeColor="text-pink-600 bg-pink-50"
                                />
                                
                                <MetricCard
                                    icon={
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    }
                                    badge="Complete"
                                    value={stats?.completed_4pnc || 0}
                                    label="Completed 4PNC"
                                    description="Postnatal care finished"
                                    bgColor="bg-green-100"
                                    badgeColor="text-green-600 bg-green-50"
                                />
                                
                                <MetricCard
                                    icon={
                                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    }
                                    badge="New"
                                    value={stats?.this_month || 0}
                                    label="This Month"
                                    description="New registrations"
                                    bgColor="bg-blue-100"
                                    badgeColor="text-blue-600 bg-blue-50"
                                />
                            </>
                        )}
                    </div>

                    {/* Tabs Navigation */}
                    <div className="mb-6">
                        <div className="bg-white rounded-xl shadow-md p-2 inline-flex gap-2">
                            <button
                                onClick={() => handleTabChange('overview')}
                                className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                                    activeTab === 'overview'
                                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => handleTabChange('records')}
                                className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                                    activeTab === 'records'
                                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                All Records
                            </button>
                        </div>
                    </div>

                    {/* Overview Tab Content */}
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {isLoading ? (
                                // Show skeleton loading for overview panels
                                <>
                                    <SkeletonPanel items={5} />
                                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                        <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4">
                                            <div className="w-32 h-5 bg-white/30 rounded mb-2 animate-pulse"></div>
                                            <div className="w-48 h-3 bg-white/20 rounded animate-pulse"></div>
                                        </div>
                                        <div className="p-6 space-y-4">
                                            <SkeletonInsightCard />
                                            <SkeletonInsightCard />
                                            <SkeletonInsightCard />
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="p-3 rounded-lg bg-gray-100 animate-pulse h-16"></div>
                                                <div className="p-3 rounded-lg bg-gray-100 animate-pulse h-16"></div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                        {/* Recent Registrations */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4">
                                <h3 className="text-lg font-bold text-white">Recent Registrations</h3>
                                <p className="text-indigo-100 text-sm">Latest maternal care records</p>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {stats?.recent_registrations && stats.recent_registrations.length > 0 ? (
                                        stats.recent_registrations.map((record) => (
                                            <RecentRegistrationItem key={record.id} record={record} />
                                        ))
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-900 font-semibold mb-2">No records yet</p>
                                            <p className="text-sm text-gray-500">Start by adding your first maternal care record</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Health Insights */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4">
                                <h3 className="text-lg font-bold text-white">Health Insights</h3>
                                <p className="text-pink-100 text-sm">Key maternal care indicators</p>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {/* Completion Rate */}
                                    <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-semibold text-gray-700">4PNC Completion Rate</span>
                                            <span className="text-lg font-bold text-green-600">
                                                {stats?.total_records > 0 
                                                    ? Math.round((stats.completed_4pnc / stats.total_records) * 100) 
                                                    : 0}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-green-200 rounded-full h-2.5">
                                            <div 
                                                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full transition-all duration-500"
                                                style={{ 
                                                    width: `${stats?.total_records > 0 
                                                        ? (stats.completed_4pnc / stats.total_records) * 100 
                                                        : 0}%` 
                                                }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-gray-600 mt-2">
                                            {stats?.completed_4pnc || 0} of {stats?.total_records || 0} completed postnatal care
                                        </p>
                                    </div>

                                    {/* Active Care */}
                                    <div className="p-4 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-semibold text-gray-700">Active Pregnancy Rate</span>
                                            <span className="text-lg font-bold text-pink-600">
                                                {stats?.total_records > 0 
                                                    ? Math.round((stats.active_pregnancies / stats.total_records) * 100) 
                                                    : 0}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-pink-200 rounded-full h-2.5">
                                            <div 
                                                className="bg-gradient-to-r from-pink-500 to-rose-500 h-2.5 rounded-full transition-all duration-500"
                                                style={{ 
                                                    width: `${stats?.total_records > 0 
                                                        ? (stats.active_pregnancies / stats.total_records) * 100 
                                                        : 0}%` 
                                                }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-gray-600 mt-2">
                                            {stats?.active_pregnancies || 0} ongoing pregnancies requiring care
                                        </p>
                                    </div>

                                    {/* Monthly Growth */}
                                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-sm font-semibold text-gray-700 block mb-1">This Month's Growth</span>
                                                <span className="text-2xl font-bold text-blue-600">
                                                    +{stats?.this_month || 0}
                                                </span>
                                                <span className="text-sm text-gray-600 ml-2">new records</span>
                                            </div>
                                            <div className="p-3 bg-blue-100 rounded-xl">
                                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                                            <p className="text-xs text-gray-600 mb-1">Total Care</p>
                                            <p className="text-xl font-bold text-purple-600">{stats?.total_records || 0}</p>
                                        </div>
                                        <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                                            <p className="text-xs text-gray-600 mb-1">Pending</p>
                                            <p className="text-xl font-bold text-orange-600">
                                                {(stats?.total_records || 0) - (stats?.completed_4pnc || 0)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                                </>
                            )}
                    </div>
                    )}

                    {/* Records Tab Content */}
                    {activeTab === 'records' && (
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            {/* Enhanced Header Section */}
                            <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 px-6 py-6">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-white mb-2">All Maternal Care Records</h3>
                                        <p className="text-pink-100 text-sm">Complete list of registered patients</p>
                                    </div>
                                    <a
                                        href={route('parent.maternal-care.bulk-pdf')}
                                        className="inline-flex items-center px-5 py-2.5 bg-white text-rose-600 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Download All Records
                                    </a>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Search Bar and Filters in one row */}
                                <div className="mb-6 flex flex-col lg:flex-row gap-3 items-start lg:items-center">
                                    {/* Search Bar */}
                                    <div className="flex-1 w-full lg:w-auto lg:max-w-md">
                                        <Suspense fallback={
                                            <div className="w-full h-10 bg-gray-100 rounded-lg animate-pulse"></div>
                                        }>
                                            <SearchBar 
                                                placeholder="Search by name, family serial, or age..."
                                                onSearch={handleSearch}
                                                className="w-full"
                                            />
                                        </Suspense>
                                    </div>

                                    {/* Filter Bar */}
                                    <FilterBar
                                        statusFilter={statusFilter}
                                        setStatusFilter={setStatusFilter}
                                        ageGroupFilter={ageGroupFilter}
                                        setAgeGroupFilter={setAgeGroupFilter}
                                        onClearFilters={() => {
                                            setStatusFilter('all');
                                            setAgeGroupFilter('all');
                                            setSearchQuery('');
                                        }}
                                        resultCount={filteredRecords?.length || 0}
                                    />
                                </div>

                                {/* Enhanced Table */}
                                {isLoading ? (
                                    <SkeletonTable rows={10} />
                                ) : (
                                <div className="overflow-x-auto rounded-lg border border-gray-200">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gradient-to-r from-pink-50 to-rose-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                                        </svg>
                                                        Family Serial
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        Name
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Age
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        Registration Date
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                        </svg>
                                                        EDD
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Status
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                                        </svg>
                                                        Actions
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredRecords && filteredRecords.length > 0 ? (
                                                filteredRecords.map((record) => (
                                                    <TableRow key={record.id} record={record} />
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className="px-6 py-12 text-center">
                                                        <div className="flex flex-col items-center justify-center">
                                                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                </svg>
                                                            </div>
                                                            {searchQuery ? (
                                                                <>
                                                                    <p className="text-lg font-semibold text-gray-900 mb-2">No results found</p>
                                                                    <p className="text-sm text-gray-500">Try adjusting your search terms</p>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <p className="text-lg font-semibold text-gray-900 mb-2">No records found</p>
                                                                    <p className="text-sm text-gray-500">Get started by creating a new maternal care registration.</p>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                )}

                                {/* Pagination */}
                                {!isLoading && records?.data && records.data.length > 0 && (
                                    <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
                                        <div className="flex-1 flex justify-between sm:hidden">
                                            {records.prev_page_url && (
                                                <Link
                                                    href={`${records.prev_page_url}&tab=records`}
                                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                >
                                                    Previous
                                                </Link>
                                            )}
                                            {records.next_page_url && (
                                                <Link
                                                    href={`${records.next_page_url}&tab=records`}
                                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                >
                                                    Next
                                                </Link>
                                            )}
                                        </div>
                                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-sm text-gray-700">
                                                    Showing <span className="font-medium">{records.from || 0}</span> to{' '}
                                                    <span className="font-medium">{records.to || 0}</span> of{' '}
                                                    <span className="font-medium">{records.total || 0}</span> results
                                                </p>
                                            </div>
                                            <div>
                                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                                    {records.links?.map((link, index) => {
                                                        // Add tab parameter to pagination links
                                                        let href = link.url || '#';
                                                        if (href !== '#' && !href.includes('tab=')) {
                                                            href += (href.includes('?') ? '&' : '?') + 'tab=records';
                                                        }
                                                        
                                                        return (
                                                            <Link
                                                                key={index}
                                                                href={href}
                                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                                    link.active
                                                                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                                } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                                    index === records.links.length - 1 ? 'rounded-r-md' : ''
                                                                }`}
                                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                            />
                                                        );
                                                    })}
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
