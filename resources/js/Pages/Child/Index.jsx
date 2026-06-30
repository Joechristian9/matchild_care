import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
    Plus,
    Baby,
    Eye,
    CalendarDays,
    MapPin,
    UserRound,
    ShieldCheck,
    Syringe,
    CheckCircle2,
    AlertCircle,
    Shield,
    Search,
    Filter,
    X,
} from "lucide-react";

const StatusBadge = ({ fic, cic, has_record }) => {
    if (!has_record) {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                <AlertCircle className="h-3.5 w-3.5" />
                No Record
            </span>
        );
    }

    if (fic && cic) {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-green-100">
                <CheckCircle2 className="h-3.5 w-3.5" />
                FIC / CIC Complete
            </span>
        );
    }

    if (fic) {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                <Shield className="h-3.5 w-3.5" />
                FIC
            </span>
        );
    }

    if (cic) {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                <Shield className="h-3.5 w-3.5" />
                CIC
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
            <AlertCircle className="h-3.5 w-3.5" />
            Incomplete
        </span>
    );
};

export default function Index({ records = { data: [] }, filters = {} }) {
    const [searchQuery, setSearchQuery] = useState(filters.search || "");
    const [sexFilter, setSexFilter] = useState(filters.sex || "all");
    const [statusFilter, setStatusFilter] = useState(filters.status || "all");
    const [showFilters, setShowFilters] = useState(false);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            handleFilter();
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, sexFilter, statusFilter]);

    const handleFilter = () => {
        const params = {};
        
        // Only add search if it has a value
        if (searchQuery && searchQuery.trim() !== "") {
            params.search = searchQuery;
        }
        
        // Only add sex if it's not "all"
        if (sexFilter && sexFilter !== "all") {
            params.sex = sexFilter;
        }
        
        // Only add status if it's not "all"
        if (statusFilter && statusFilter !== "all") {
            params.status = statusFilter;
        }

        router.get(
            route("child.immunization.index"),
            params,
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleReset = () => {
        setSearchQuery("");
        setSexFilter("all");
        setStatusFilter("all");
        router.get(route("child.immunization.index"));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-800">
                            Child Immunization
                        </h2>

                        <p className="text-sm text-slate-500">
                            Monitor vaccine completion, maternal-linked child
                            records, and immunization progress.
                        </p>
                    </div>

                    <Link
                        href={route("child.immunization.create")}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
                    >
                        <Plus className="h-4 w-4" />
                        New Record
                    </Link>
                </div>
            }
        >
            <Head title="Child Immunization" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/40 to-purple-50/30 py-8 lg:py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-violet-700 to-purple-700 text-white shadow-xl shadow-violet-100">
                        <div className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="rounded-3xl bg-white/15 p-4 backdrop-blur-sm">
                                    <Baby className="h-8 w-8" />
                                </div>

                                <div className="flex-1">
                                    <h1 className="text-2xl font-bold tracking-tight">
                                        Child Immunization Records
                                    </h1>

                                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-violet-100">
                                        Track child vaccination history,
                                        monitor Fully Immunized Child (FIC)
                                        and Completely Immunized Child (CIC)
                                        compliance, and maintain
                                        maternal-linked healthcare records
                                        for barangay monitoring and public
                                        health reporting.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-white/10 bg-black/10 px-6 py-4">
                            <div className="flex flex-col gap-3 text-sm text-violet-100 md:flex-row md:items-center md:justify-between">
                                <p>
                                    Keep immunization records updated to ensure
                                    accurate monitoring of vaccine coverage and
                                    child healthcare services.
                                </p>

                                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                                    <Syringe className="h-4 w-4" />
                                    Vaccine Monitoring System
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm">
                        <div className="border-b border-violet-100 px-6 py-5">
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h3 className="text-base font-semibold text-slate-900">
                                        Registered Children
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Review child profiles, vaccine progress,
                                        and immunization completion status.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-violet-50 px-4 py-3 text-sm text-violet-700 ring-1 ring-violet-100">
                                    <span className="font-semibold">
                                        {records.total || 0}
                                    </span>{" "}
                                    active immunization record
                                    {records.total === 1 ? "" : "s"}
                                </div>
                            </div>
                        </div>

                        {/* Search and Filter Section */}
                        <div className="border-b border-violet-100 bg-violet-50/30 px-6 py-4">
                            <div className="flex flex-col gap-4">
                                {/* Search Bar */}
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                            placeholder="Search by child name, mother name, or family serial..."
                                            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                                        />
                                    </div>

                                    <button
                                        onClick={() =>
                                            setShowFilters(!showFilters)
                                        }
                                        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                                            showFilters
                                                ? "border-violet-600 bg-violet-600 text-white"
                                                : "border-slate-200 bg-white text-slate-700 hover:bg-violet-50"
                                        }`}
                                    >
                                        <Filter className="h-4 w-4" />
                                        Filters
                                    </button>

                                    {(searchQuery ||
                                        sexFilter !== "all" ||
                                        statusFilter !== "all") && (
                                        <button
                                            onClick={handleReset}
                                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                        >
                                            <X className="h-4 w-4" />
                                            Reset
                                        </button>
                                    )}
                                </div>

                                {/* Filter Options */}
                                {showFilters && (
                                    <div className="grid grid-cols-1 gap-4 rounded-xl border border-violet-200 bg-white p-4 sm:grid-cols-2">
                                        {/* Sex Filter */}
                                        <div>
                                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-700">
                                                Sex
                                            </label>
                                            <select
                                                value={sexFilter}
                                                onChange={(e) =>
                                                    setSexFilter(e.target.value)
                                                }
                                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                                            >
                                                <option value="all">
                                                    All Sexes
                                                </option>
                                                <option value="M">Male</option>
                                                <option value="F">
                                                    Female
                                                </option>
                                            </select>
                                        </div>

                                        {/* Status Filter */}
                                        <div>
                                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-700">
                                                Immunization Status
                                            </label>
                                            <select
                                                value={statusFilter}
                                                onChange={(e) =>
                                                    setStatusFilter(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                                            >
                                                <option value="all">
                                                    All Status
                                                </option>
                                                <option value="fic_cic">
                                                    FIC / CIC Complete
                                                </option>
                                                <option value="fic">
                                                    FIC Only
                                                </option>
                                                <option value="cic">
                                                    CIC Only
                                                </option>
                                                <option value="incomplete">
                                                    Incomplete
                                                </option>
                                                <option value="no_record">
                                                    No Record
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            {/* Desktop Table View */}
                            <table className="hidden w-full min-w-[1150px] text-left text-sm lg:table">
                                <thead>
                                    <tr className="border-b border-violet-100 bg-violet-50/80 text-xs uppercase tracking-wide text-violet-700">
                                        <th className="px-6 py-4">Child</th>

                                        <th className="px-6 py-4">Sex</th>

                                        <th className="px-6 py-4">
                                            Mother / Guardian
                                        </th>

                                        <th className="px-6 py-4">
                                            Family Serial
                                        </th>

                                        <th className="px-6 py-4">
                                            Date of Birth
                                        </th>

                                        <th className="px-6 py-4">
                                            Immunization Status
                                        </th>

                                        <th className="px-6 py-4">Address</th>

                                        <th className="px-6 py-4 text-right">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {records.data && records.data.length > 0 ? (
                                        records.data.map((record) => (
                                            <tr
                                                key={record.id}
                                                className="transition hover:bg-violet-50/40"
                                            >
                                                <td className="px-6 py-5">
                                                    <p className="font-semibold text-slate-800">
                                                        {record.child_name ?? "—"}
                                                    </p>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <p className="text-sm text-slate-700">
                                                        {record.sex ?? "—"}
                                                    </p>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <p className="text-sm font-medium text-slate-700">
                                                        {record.mother_name ?? "—"}
                                                    </p>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <span className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 ring-1 ring-violet-100">
                                                        {record.family_serial ??
                                                            "—"}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-5 text-slate-600">
                                                    <div className="flex items-center gap-2">
                                                        <CalendarDays className="h-4 w-4 text-slate-400" />
                                                        <p className="text-sm">
                                                            {record.date_of_birth ?? "—"}
                                                        </p>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <StatusBadge
                                                        fic={record.fic}
                                                        cic={record.cic}
                                                        has_record={
                                                            record.has_record
                                                        }
                                                    />
                                                </td>

                                                <td className="px-6 py-5">
                                                    <div className="flex max-w-sm items-start gap-2 text-slate-600">
                                                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

                                                        <span className="line-clamp-2 text-sm">
                                                            {record.address ??
                                                                "—"}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5 text-right">
                                                    <Link
                                                        href={route(
                                                            "child.immunization.create",
                                                            {
                                                                child_id:
                                                                    record.id,
                                                            },
                                                        )}
                                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-violet-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        View / Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="px-6 py-20 text-center"
                                            >
                                                <div className="mx-auto flex max-w-md flex-col items-center">
                                                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-100 text-violet-600">
                                                        <ShieldCheck className="h-10 w-10" />
                                                    </div>

                                                    <h3 className="text-lg font-semibold text-slate-800">
                                                        No child immunization
                                                        records yet
                                                    </h3>

                                                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                                                        Start building your
                                                        barangay immunization
                                                        database by creating a
                                                        child vaccination
                                                        record.
                                                    </p>

                                                    <Link
                                                        href={route(
                                                            "child.immunization.create",
                                                        )}
                                                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-100 transition hover:bg-violet-700"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                        Create New Record
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* Mobile Card View */}
                            <div className="block lg:hidden">
                                {records.data && records.data.length > 0 ? (
                                    <div className="divide-y divide-slate-200">
                                        {records.data.map((record) => (
                                            <div
                                                key={record.id}
                                                className="bg-white p-5 transition hover:bg-violet-50/40"
                                            >
                                                {/* Form-like Layout */}
                                                <div className="space-y-4">
                                                    {/* Child Name - Primary */}
                                                    <div>
                                                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                                                            CHILD NAME
                                                        </label>
                                                        <p className="text-base font-bold text-slate-900">
                                                            {record.child_name ?? "—"}
                                                        </p>
                                                    </div>

                                                    {/* Two Column Grid */}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {/* Sex */}
                                                        <div>
                                                            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                                                                SEX
                                                            </label>
                                                            <p className="text-sm text-slate-900">
                                                                {record.sex ?? "—"}
                                                            </p>
                                                        </div>

                                                        {/* Family Serial */}
                                                        <div>
                                                            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                                                                FAMILY SERIAL
                                                            </label>
                                                            <span className="inline-block rounded-md bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700 ring-1 ring-violet-200">
                                                                {record.family_serial ?? "—"}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Mother/Guardian */}
                                                    <div>
                                                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                                                            MOTHER / GUARDIAN
                                                        </label>
                                                        <p className="text-sm font-medium text-slate-900">
                                                            {record.mother_name ?? "—"}
                                                        </p>
                                                    </div>

                                                    {/* Date of Birth */}
                                                    <div>
                                                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                                                            DATE OF BIRTH
                                                        </label>
                                                        <div className="flex items-center gap-2">
                                                            <CalendarDays className="h-4 w-4 text-slate-400" />
                                                            <p className="text-sm text-slate-900">
                                                                {record.date_of_birth ?? "—"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Immunization Status */}
                                                    <div>
                                                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                                                            IMMUNIZATION STATUS
                                                        </label>
                                                        <StatusBadge
                                                            fic={record.fic}
                                                            cic={record.cic}
                                                            has_record={record.has_record}
                                                        />
                                                    </div>

                                                    {/* Address */}
                                                    <div>
                                                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                                                            ADDRESS
                                                        </label>
                                                        <div className="flex items-start gap-2">
                                                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                                                            <p className="text-sm text-slate-700 line-clamp-2">
                                                                {record.address ?? "—"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action Button */}
                                                <div className="mt-5 pt-5 border-t border-slate-200">
                                                    <Link
                                                        href={route(
                                                            "child.immunization.create",
                                                            {
                                                                child_id: record.id,
                                                            },
                                                        )}
                                                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-violet-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        View / Edit
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="px-6 py-20 text-center">
                                        <div className="mx-auto flex max-w-md flex-col items-center">
                                            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-100 text-violet-600">
                                                <ShieldCheck className="h-10 w-10" />
                                            </div>

                                            <h3 className="text-lg font-semibold text-slate-800">
                                                No child immunization records yet
                                            </h3>

                                            <p className="mt-2 text-sm leading-relaxed text-slate-500">
                                                Start building your barangay
                                                immunization database by creating
                                                a child vaccination record.
                                            </p>

                                            <Link
                                                href={route(
                                                    "child.immunization.create",
                                                )}
                                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-100 transition hover:bg-violet-700"
                                            >
                                                <Plus className="h-4 w-4" />
                                                Create New Record
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Pagination */}
                        {records.data && records.data.length > 0 && (
                            <div className="border-t border-violet-100 bg-violet-50/30 px-4 py-4 sm:px-6">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    {/* Pagination Info */}
                                    <div className="text-center text-sm text-slate-600 sm:text-left">
                                        Showing{" "}
                                        <span className="font-semibold text-slate-900">
                                            {records.from || 0}
                                        </span>{" "}
                                        to{" "}
                                        <span className="font-semibold text-slate-900">
                                            {records.to || 0}
                                        </span>{" "}
                                        of{" "}
                                        <span className="font-semibold text-slate-900">
                                            {records.total || 0}
                                        </span>{" "}
                                        results
                                    </div>

                                    {/* Pagination Links */}
                                    <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
                                        {records.links?.map((link, index) => {
                                            if (link.url === null) {
                                                return (
                                                    <span
                                                        key={index}
                                                        className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-400"
                                                        dangerouslySetInnerHTML={{
                                                            __html: link.label,
                                                        }}
                                                    />
                                                );
                                            }

                                            return (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                                                        link.active
                                                            ? "border-violet-600 bg-violet-600 text-white"
                                                            : "border-slate-200 bg-white text-slate-700 hover:bg-violet-50 hover:border-violet-200"
                                                    }`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
