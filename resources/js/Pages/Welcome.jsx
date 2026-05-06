import { Head, Link } from "@inertiajs/react";
import {
    Baby,
    HeartPulse,
    ShieldCheck,
    CalendarCheck,
    Stethoscope,
    Users,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";

export default function Welcome({ auth }) {
    const features = [
        {
            icon: HeartPulse,
            title: "Maternal Health Monitoring",
            desc: "Track prenatal visits, health records, and pregnancy-related care information.",
        },
        {
            icon: Baby,
            title: "Child Care Records",
            desc: "Manage child profiles, immunization status, and growth monitoring details.",
        },
        {
            icon: CalendarCheck,
            title: "Appointment Scheduling",
            desc: "Organize consultations, checkups, and follow-up schedules efficiently.",
        },
        {
            icon: ShieldCheck,
            title: "Secure Health Data",
            desc: "Keep maternal and child care records organized, private, and accessible.",
        },
    ];

    return (
        <>
            <Head title="Maternal and Child Care System" />

            <div className="min-h-screen overflow-hidden bg-white text-slate-900">
                {/* Background */}
                <div className="pointer-events-none fixed inset-0">
                    <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-200/60 blur-3xl" />
                    <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-purple-300/40 blur-3xl" />
                    <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-fuchsia-200/40 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    {/* Header */}
                    <header className="flex items-center justify-between py-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-700 text-white shadow-lg shadow-violet-200">
                                <HeartPulse className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-violet-950">
                                    MCCS
                                </h1>
                                <p className="text-xs font-medium text-slate-500">
                                    Maternal & Child Care System
                                </p>
                            </div>
                        </div>

                        <nav className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="rounded-full bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-800"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="rounded-full px-5 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
                                    >
                                        Log in
                                    </Link>

                                    <Link
                                        href={route("register")}
                                        className="rounded-full bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-800"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>

                    {/* Hero */}
                    <main>
                        <section className="grid min-h-[calc(100vh-96px)] items-center gap-12 py-12 lg:grid-cols-2">
                            <div>
                                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm font-medium text-violet-700 shadow-sm">
                                    <Stethoscope className="h-4 w-4" />
                                    Community-based health record management
                                </div>

                                <h2 className="max-w-3xl text-4xl font-extrabold tracking-tight text-violet-950 sm:text-5xl lg:text-6xl">
                                    Maternal and Child Care Management System
                                </h2>

                                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                                    A modern platform designed to help health
                                    workers manage maternal records, child care
                                    profiles, appointments, and essential health
                                    monitoring in one secure and organized
                                    system.
                                </p>

                                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                    {auth.user ? (
                                        <Link
                                            href={route("dashboard")}
                                            className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-700 px-7 py-3 text-sm font-semibold text-white shadow-xl shadow-violet-200 transition hover:bg-violet-800"
                                        >
                                            Go to Dashboard
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route("login")}
                                            className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-700 px-7 py-3 text-sm font-semibold text-white shadow-xl shadow-violet-200 transition hover:bg-violet-800"
                                        >
                                            Access System
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    )}

                                    <a
                                        href="#features"
                                        className="inline-flex items-center justify-center rounded-full border border-violet-200 bg-white px-7 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
                                    >
                                        View Features
                                    </a>
                                </div>

                                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                                    {[
                                        "Prenatal Records",
                                        "Child Monitoring",
                                        "Secure Reports",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-2 text-sm font-medium text-slate-600"
                                        >
                                            <CheckCircle2 className="h-5 w-5 text-violet-600" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Hero Card */}
                            <div className="relative">
                                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-violet-200 to-fuchsia-100 blur-2xl" />

                                <div className="relative rounded-[2rem] border border-violet-100 bg-white p-6 shadow-xl shadow-violet-100">
                                    {/* Top Gradient Header */}
                                    <div className="rounded-[1.5rem] bg-gradient-to-br from-violet-700 to-purple-600 p-6 text-white">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-violet-100">
                                                    System Overview
                                                </p>
                                                <h3 className="mt-1 text-xl font-semibold">
                                                    Maternal & Child Care
                                                </h3>
                                            </div>

                                            <div className="rounded-xl bg-white/20 p-3">
                                                <Users className="h-6 w-6" />
                                            </div>
                                        </div>

                                        {/* Replace stats with meaningful info */}
                                        <div className="mt-6 space-y-2 text-sm text-violet-100">
                                            <p>• Centralized health records</p>
                                            <p>
                                                • Real-time monitoring of
                                                patients
                                            </p>
                                            <p>
                                                • Organized and accessible data
                                            </p>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="mt-6 space-y-3">
                                        {[
                                            {
                                                title: "Prenatal Monitoring",
                                                desc: "Track checkups, maternal conditions, and pregnancy progress.",
                                            },
                                            {
                                                title: "Child Health Records",
                                                desc: "Manage immunizations, growth data, and child profiles.",
                                            },
                                            {
                                                title: "Appointments & Follow-ups",
                                                desc: "Schedule and monitor consultations and visits.",
                                            },
                                        ].map((item) => (
                                            <div
                                                key={item.title}
                                                className="flex gap-3 rounded-xl border border-violet-100 bg-violet-50/60 p-4"
                                            >
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-violet-600">
                                                    <CheckCircle2 className="h-5 w-5" />
                                                </div>

                                                <div>
                                                    <p className="text-sm font-semibold text-violet-900">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-xs text-slate-600">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Features */}
                        <section id="features" className="py-20">
                            <div className="mx-auto max-w-3xl text-center">
                                <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                                    System Features
                                </p>
                                <h2 className="mt-3 text-3xl font-bold text-violet-950 sm:text-4xl">
                                    Built for reliable health care management
                                </h2>
                                <p className="mt-4 text-slate-600">
                                    Designed to support organized maternal and
                                    child care services with clean records,
                                    monitoring, and reporting.
                                </p>
                            </div>

                            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {features.map((feature) => {
                                    const Icon = feature.icon;

                                    return (
                                        <div
                                            key={feature.title}
                                            className="rounded-3xl border border-violet-100 bg-white p-6 shadow-lg shadow-violet-50 transition hover:-translate-y-1 hover:shadow-xl"
                                        >
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                                                <Icon className="h-7 w-7" />
                                            </div>

                                            <h3 className="mt-5 text-lg font-bold text-violet-950">
                                                {feature.title}
                                            </h3>

                                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                                {feature.desc}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </main>

                    <footer className="border-t border-violet-100 py-8 text-center text-sm text-slate-500">
                        © {new Date().getFullYear()} Maternal and Child Care
                        System. All rights reserved.
                    </footer>
                </div>
            </div>
        </>
    );
}
