import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { HeartPulse } from "lucide-react";

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-100 via-white to-purple-100 px-4">
            {/* Background Glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-violet-300/40 blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-300/40 blur-3xl animate-pulse" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo + Title */}
                <div className="mb-6 text-center">
                    <Link
                        href="/"
                        className="inline-flex flex-col items-center gap-3"
                    >
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-200">
                            <HeartPulse className="h-8 w-8" />
                        </div>

                        <div>
                            <h1 className="text-lg font-bold text-violet-900">
                                Maternal & Child Care
                            </h1>
                            <p className="text-xs text-slate-500">
                                Health Monitoring System
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Card */}
                <div className="overflow-hidden rounded-3xl border border-violet-100 bg-white/80 px-6 py-6 shadow-2xl shadow-violet-100 backdrop-blur-xl">
                    {children}
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-slate-500">
                    © {new Date().getFullYear()} MCCS
                </p>
            </div>
        </div>
    );
}
