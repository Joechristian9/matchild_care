import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { SkeletonTable } from "@/Components/Skeleton";
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

const MiniStat = ({ label, value, icon: Icon }) => (
    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-violet-100" />
            <p className="text-xs font-medium uppercase tracking-wide text-violet-100">
                {label}
            </p>
        </div>

        <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
);

export default function Index({ records = [] }) {
    const totalRecords = records.length;

    const ficCount = records.filter((r) => r.fic).length;

    const cicCount = records.filter((r) => r.cic).length;

    const incompleteCount = records.filter((r) => !r.fic && !r.cic).length;

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
                </div>
            }
        >
            <Head title="Child Immunization" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/40 to-purple-50/30 py-8 lg:py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-violet-700 to-purple-700 text-white shadow-xl shadow-violet-100">
                        <div className="p-6">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-3xl bg-white/15 p-4 backdrop-blur-sm">
                                        <Baby className="h-8 w-8" />
                                    </div>

                                    <div>
                                        <h1 className="text-2xl font-bold tracking-tight">
                                            Child Immunization Records
                                        </h1>

                                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-violet-100">
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

                                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                                    <MiniStat
                                        label="Total Records"
                                        value={totalRecords}
                                        icon={Baby}
                                    />

                                    <MiniStat
                                        label="FIC"
                                        value={ficCount}
                                        icon={ShieldCheck}
                                    />

                                    <MiniStat
                                        label="CIC"
                                        value={cicCount}
                                        icon={CheckCircle2}
                                    />

                                    <MiniStat
                                        label="Incomplete"
                                        value={incompleteCount}
                                        icon={AlertCircle}
                                    />
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
                                        {records.length}
                                    </span>{" "}
                                    active immunization record
                                    {records.length === 1 ? "" : "s"}
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1150px] text-left text-sm">
                                <thead>
                                    <tr className="border-b border-violet-100 bg-violet-50/80 text-xs uppercase tracking-wide text-violet-700">
                                        <th className="px-6 py-4">Child</th>

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
                                    {records.length > 0 ? (
                                        records.map((record) => (
                                            <tr
                                                key={record.id}
                                                className="transition hover:bg-violet-50/40"
                                            >
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                                                            <Baby className="h-6 w-6" />
                                                        </div>

                                                        <div>
                                                            <p className="font-semibold text-slate-800">
                                                                {record.child_name ??
                                                                    "—"}
                                                            </p>

                                                            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                                                <span>
                                                                    Sex:{" "}
                                                                    {record.sex ??
                                                                        "—"}
                                                                </span>

                                                                <span className="text-slate-300">
                                                                    •
                                                                </span>

                                                                <span>
                                                                    Child ID:{" "}
                                                                    {record.id}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <div className="flex items-start gap-2 text-slate-700">
                                                        <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

                                                        <div>
                                                            <p className="font-medium">
                                                                {record.mother_name ??
                                                                    "—"}
                                                            </p>

                                                            <p className="mt-1 text-xs text-slate-500">
                                                                Linked maternal
                                                                record
                                                            </p>
                                                        </div>
                                                    </div>
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

                                                        <div>
                                                            <p>
                                                                {record.date_of_birth ??
                                                                    "—"}
                                                            </p>

                                                            <p className="text-xs text-slate-400">
                                                                Registered child
                                                                birthdate
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <div className="space-y-2">
                                                        <StatusBadge
                                                            fic={record.fic}
                                                            cic={record.cic}
                                                            has_record={
                                                                record.has_record
                                                            }
                                                        />

                                                        <p className="text-xs text-slate-500">
                                                            {record.immunization_status ??
                                                                "No Status"}
                                                        </p>
                                                    </div>
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
                                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-3 py-2 text-xs font-semibold text-violet-700 transition hover:bg-violet-50"
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
                                                colSpan="7"
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
