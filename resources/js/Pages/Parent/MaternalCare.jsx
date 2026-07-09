import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState, useRef } from "react";

function getInitials(first, last) {
    return `${(first || "").charAt(0)}${(last || "").charAt(0)}`.toUpperCase();
}

const AVATAR_COLORS = [
    "bg-violet-500", "bg-indigo-500", "bg-pink-500", "bg-rose-500",
    "bg-purple-500", "bg-fuchsia-500", "bg-blue-500", "bg-cyan-500",
];

function avatarColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function formatDate(dateStr) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
    });
}

export default function MaternalCare({ records, filters = {} }) {
    const [search, setSearch] = useState(filters.search || "");
    const [ageGroup, setAgeGroup] = useState(filters.age_group || "all");

    const debounceTimer = useRef(null);

    const applyFilters = (s, ag) => {
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            router.get(route("parent.maternal-care"), {
                search: s || undefined,
                age_group: ag !== "all" ? ag : undefined,
            }, { preserveState: true, replace: true });
        }, 350);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        applyFilters(e.target.value, ageGroup);
    };

    const handleAgeGroup = (e) => {
        setAgeGroup(e.target.value);
        applyFilters(search, e.target.value);
    };

    const clearFilters = () => {
        setSearch("");
        setAgeGroup("all");
        router.get(route("parent.maternal-care"), {}, { preserveState: false, replace: true });
    };

    const hasFilters = search || ageGroup !== "all";

    return (
        <AuthenticatedLayout>
            <Head title="Maternal Care Records" />

            <div className="min-h-screen bg-gray-50/50">
                {/* Hero Header */}
                <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 px-6 py-8 lg:px-10">
                    <div className="mx-auto max-w-7xl flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">All Maternal Care Records</h1>
                            <p className="text-pink-100 text-sm mt-1">Complete list of registered patients</p>
                        </div>
                        <a
                            href={route("parent.maternal-care.bulk-pdf")}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-rose-600 text-sm font-semibold rounded-xl shadow-md hover:bg-rose-50 transition-colors border border-rose-100"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download All Records
                        </a>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-6">
                    {/* Search & Filters */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        {/* Search */}
                        <div className="relative flex-1 min-w-[260px]">
                            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                value={search}
                                onChange={handleSearch}
                                placeholder="Search by name, family serial, or age..."
                                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                            />
                        </div>

                        {/* Filter icon */}
                        <button className="p-2.5 bg-rose-500 text-white rounded-xl shadow-sm hover:bg-rose-600 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                            </svg>
                        </button>

                        {/* Status filter (UI only) */}
                        <div className="relative">
                            <select className="appearance-none pl-4 pr-9 py-2.5 text-sm bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 text-gray-700 transition cursor-pointer">
                                <option>All Status</option>
                                <option>Pending</option>
                                <option>Completed</option>
                            </select>
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {/* Age group filter */}
                        <div className="relative">
                            <select
                                value={ageGroup}
                                onChange={handleAgeGroup}
                                className="appearance-none pl-4 pr-9 py-2.5 text-sm bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 text-gray-700 transition cursor-pointer"
                            >
                                <option value="all">All Ages</option>
                                <option value="10-14">10–14</option>
                                <option value="15-19">15–19</option>
                                <option value="20-49">20–49</option>
                            </select>
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {hasFilters && (
                            <button onClick={clearFilters}
                                className="text-sm text-gray-500 hover:text-rose-500 transition-colors underline underline-offset-2">
                                Clear
                            </button>
                        )}
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-pink-100 bg-pink-50/60">
                                        <th className="px-5 py-3.5 text-left">
                                            <span className="flex items-center gap-1.5 text-xs font-bold text-rose-500 uppercase tracking-wider">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                                </svg>
                                                Family Serial
                                            </span>
                                        </th>
                                        <th className="px-5 py-3.5 text-left">
                                            <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Name
                                            </span>
                                        </th>
                                        <th className="px-5 py-3.5 text-left">
                                            <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Age
                                            </span>
                                        </th>
                                        <th className="px-5 py-3.5 text-left">
                                            <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                Registration Date
                                            </span>
                                        </th>
                                        <th className="px-5 py-3.5 text-left">
                                            <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                                EDD
                                            </span>
                                        </th>
                                        <th className="px-5 py-3.5 text-left">
                                            <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Status
                                            </span>
                                        </th>
                                        <th className="px-5 py-3.5 text-left">
                                            <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                </svg>
                                                Actions
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {records?.data?.length > 0 ? (
                                        records.data.map((record) => {
                                            const initials = getInitials(record.first_name, record.last_name);
                                            const color = avatarColor(record.last_name + record.first_name);
                                            return (
                                                <tr key={record.id} className="hover:bg-pink-50/30 transition-colors group">
                                                    {/* Family Serial */}
                                                    <td className="px-5 py-4">
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100">
                                                            {record.family_serial}
                                                        </span>
                                                    </td>

                                                    {/* Name with avatar */}
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                                                                {initials}
                                                            </div>
                                                            <span className="text-sm font-medium text-gray-800">
                                                                {record.last_name}, {record.first_name}{record.middle_initial ? ` ${record.middle_initial}` : ""}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* Age */}
                                                    <td className="px-5 py-4">
                                                        <div className="text-sm font-medium text-gray-800">{record.age}</div>
                                                        <div className="text-xs text-gray-400">({record.age_group})</div>
                                                    </td>

                                                    {/* Registration Date */}
                                                    <td className="px-5 py-4 text-sm text-gray-600">
                                                        {formatDate(record.date_of_registration)}
                                                    </td>

                                                    {/* EDD */}
                                                    <td className="px-5 py-4 text-sm text-gray-600">
                                                        {formatDate(record.expected_date_of_delivery)}
                                                    </td>

                                                    {/* Status */}
                                                    <td className="px-5 py-4">
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-yellow-50 text-yellow-700 border border-yellow-200">
                                                            Pending
                                                        </span>
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-5 py-4">
                                                        <Link
                                                            href={route("parent.maternal-care.edit", record.id)}
                                                            className="inline-flex items-center justify-center w-9 h-9 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl shadow-sm hover:from-indigo-600 hover:to-indigo-700 transition-all hover:shadow-md"
                                                            title="Edit record"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="px-5 py-16 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center">
                                                        <svg className="w-7 h-7 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-base font-semibold text-gray-700">No records found</p>
                                                    <p className="text-sm text-gray-400">
                                                        {hasFilters ? "Try adjusting your search or filters." : "Start by registering a new patient."}
                                                    </p>
                                                    {!hasFilters && (
                                                        <Link href={route("parent.maternal-care.register")}
                                                            className="mt-1 inline-flex items-center gap-2 px-4 py-2 bg-rose-500 text-white text-sm font-medium rounded-xl hover:bg-rose-600 transition-colors">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                            </svg>
                                                            New Registration
                                                        </Link>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {records?.data?.length > 0 && records.links && (
                            <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    Showing <span className="font-medium text-gray-700">{records.from}</span>–<span className="font-medium text-gray-700">{records.to}</span> of <span className="font-medium text-gray-700">{records.total}</span> records
                                </p>
                                <nav className="flex items-center gap-1">
                                    {records.links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.url || "#"}
                                            className={`inline-flex items-center justify-center min-w-[36px] h-9 px-2 rounded-lg text-sm font-medium transition-colors ${
                                                link.active
                                                    ? "bg-rose-500 text-white shadow-sm"
                                                    : link.url
                                                    ? "text-gray-600 hover:bg-gray-100"
                                                    : "text-gray-300 cursor-not-allowed pointer-events-none"
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
