import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { memo } from "react";

// Memoized metric card component
const MetricCard = memo(
    ({
        icon,
        badge,
        value,
        label,
        description,
        bgColor,
        iconColor,
        badgeColor,
    }) => (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 ${bgColor} rounded-xl`}>{icon}</div>
                    <span
                        className={`text-xs font-semibold ${badgeColor} px-3 py-1 rounded-full`}
                    >
                        {badge}
                    </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">
                    {value}
                </h3>
                <p className="text-sm text-gray-600 font-medium">{label}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">{description}</p>
                </div>
            </div>
        </div>
    ),
);

MetricCard.displayName = "MetricCard";

// Memoized recent registration item
const RecentRegistrationItem = memo(({ record }) => (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">
                {record.first_name?.charAt(0)}
                {record.last_name?.charAt(0)}
            </span>
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
                {record.first_name} {record.last_name}
            </p>
            <p className="text-xs text-gray-600 mt-0.5">
                Age: {record.age} • {record.age_group}
            </p>
            <p className="text-xs text-gray-500 mt-1">
                {new Date(record.date_of_registration).toLocaleDateString(
                    "en-US",
                    {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    },
                )}
            </p>
        </div>
        <div className="flex-shrink-0">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Pending
            </span>
        </div>
    </div>
));

RecentRegistrationItem.displayName = "RecentRegistrationItem";

export default function Dashboard({ stats }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <MetricCard
                            icon={
                                <svg
                                    className="w-6 h-6 text-indigo-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
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
                                <svg
                                    className="w-6 h-6 text-pink-600"
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
                                <svg
                                    className="w-6 h-6 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
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
                                <svg
                                    className="w-6 h-6 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            }
                            badge="New"
                            value={stats?.this_month || 0}
                            label="This Month"
                            description="New registrations"
                            bgColor="bg-blue-100"
                            badgeColor="text-blue-600 bg-blue-50"
                        />
                    </div>

                    {/* Overview Content - Recent Registrations and Health Insights */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* Recent Registrations */}
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4">
                                    <h3 className="text-lg font-bold text-white">
                                        Recent Registrations
                                    </h3>
                                    <p className="text-indigo-100 text-sm">
                                        Latest maternal care records
                                    </p>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                                {stats?.recent_registrations &&
                                                stats.recent_registrations
                                                    .length > 0 ? (
                                                    stats.recent_registrations.map(
                                                        (record) => (
                                                            <RecentRegistrationItem
                                                                key={record.id}
                                                                record={record}
                                                            />
                                                        ),
                                                    )
                                                ) : (
                                                    <div className="text-center py-12">
                                                        <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                                            <svg
                                                                className="w-10 h-10 text-gray-400"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <p className="text-gray-900 font-semibold mb-2">
                                                            No records yet
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Start by adding your
                                                            first maternal care
                                                            record
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Health Insights */}
                                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                        <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4">
                                            <h3 className="text-lg font-bold text-white">
                                                Health Insights
                                            </h3>
                                            <p className="text-pink-100 text-sm">
                                                Key maternal care indicators
                                            </p>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-4">
                                                {/* Completion Rate */}
                                                <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-semibold text-gray-700">
                                                            4PNC Completion Rate
                                                        </span>
                                                        <span className="text-lg font-bold text-green-600">
                                                            {stats?.total_records >
                                                            0
                                                                ? Math.round(
                                                                      (stats.completed_4pnc /
                                                                          stats.total_records) *
                                                                          100,
                                                                  )
                                                                : 0}
                                                            %
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-green-200 rounded-full h-2.5">
                                                        <div
                                                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full transition-all duration-500"
                                                            style={{
                                                                width: `${
                                                                    stats?.total_records >
                                                                    0
                                                                        ? (stats.completed_4pnc /
                                                                              stats.total_records) *
                                                                          100
                                                                        : 0
                                                                }%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <p className="text-xs text-gray-600 mt-2">
                                                        {stats?.completed_4pnc ||
                                                            0}{" "}
                                                        of{" "}
                                                        {stats?.total_records ||
                                                            0}{" "}
                                                        completed postnatal care
                                                    </p>
                                                </div>

                                                {/* Active Care */}
                                                <div className="p-4 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-semibold text-gray-700">
                                                            Active Pregnancy
                                                            Rate
                                                        </span>
                                                        <span className="text-lg font-bold text-pink-600">
                                                            {stats?.total_records >
                                                            0
                                                                ? Math.round(
                                                                      (stats.active_pregnancies /
                                                                          stats.total_records) *
                                                                          100,
                                                                  )
                                                                : 0}
                                                            %
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-pink-200 rounded-full h-2.5">
                                                        <div
                                                            className="bg-gradient-to-r from-pink-500 to-rose-500 h-2.5 rounded-full transition-all duration-500"
                                                            style={{
                                                                width: `${
                                                                    stats?.total_records >
                                                                    0
                                                                        ? (stats.active_pregnancies /
                                                                              stats.total_records) *
                                                                          100
                                                                        : 0
                                                                }%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <p className="text-xs text-gray-600 mt-2">
                                                        {stats?.active_pregnancies ||
                                                            0}{" "}
                                                        ongoing pregnancies
                                                        requiring care
                                                    </p>
                                                </div>

                                                {/* Monthly Growth */}
                                                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <span className="text-sm font-semibold text-gray-700 block mb-1">
                                                                This Month's
                                                                Growth
                                                            </span>
                                                            <span className="text-2xl font-bold text-blue-600">
                                                                +
                                                                {stats?.this_month ||
                                                                    0}
                                                            </span>
                                                            <span className="text-sm text-gray-600 ml-2">
                                                                new records
                                                            </span>
                                                        </div>
                                                        <div className="p-3 bg-blue-100 rounded-xl">
                                                            <svg
                                                                className="w-8 h-8 text-blue-600"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Quick Stats */}
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                                                        <p className="text-xs text-gray-600 mb-1">
                                                            Total Care
                                                        </p>
                                                        <p className="text-xl font-bold text-purple-600">
                                                            {stats?.total_records ||
                                                                0}
                                                        </p>
                                                    </div>
                                                    <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                                                        <p className="text-xs text-gray-600 mb-1">
                                                            Pending
                                                        </p>
                                                        <p className="text-xl font-bold text-orange-600">
                                                            {(stats?.total_records ||
                                                                0) -
                                                                (stats?.completed_4pnc ||
                                                                    0)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
