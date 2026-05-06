import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Baby, HeartPulse, ShieldCheck, Save } from "lucide-react";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";

const Field = ({ label, children, error, hint, required = false }) => (
    <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
        </label>

        {children}

        {hint && !error && (
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
                {hint}
            </p>
        )}

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);

const Input = ({ value, ...props }) => (
    <input
        {...props}
        value={value ?? ""}
        className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 ${
            props.className ?? ""
        }`}
    />
);

const Select = ({ value, ...props }) => (
    <select
        {...props}
        value={value ?? ""}
        className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 ${
            props.className ?? ""
        }`}
    />
);

const Section = ({ icon: Icon, title, description, children }) => (
    <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start gap-3">
            <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-slate-900">
                    {title}
                </h3>
                <p className="text-sm text-slate-500">{description}</p>
            </div>
        </div>

        {children}
    </div>
);

const InfoNote = ({ title, children }) => (
    <div className="mb-5 rounded-2xl border border-violet-100 bg-violet-50 px-4 py-3 text-sm text-violet-800">
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-violet-700">{children}</p>
    </div>
);

const MiniStat = ({ label, value }) => (
    <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
        <p className="text-xs text-violet-100">{label}</p>
        <p className="mt-1 text-lg font-bold text-white">{value}</p>
    </div>
);

const defaultImmunization = {
    protected_at_birth_tt2: false,
    protected_at_birth_tt3_tt5: false,

    bcg_0_28_days: "",
    bcg_29_days_to_1_year: "",

    hepa_b_within_24_hours: "",
    hepa_b_more_than_24_hours: "",

    pentavalent_1: "",
    pentavalent_2: "",
    pentavalent_3: "",

    opv_1: "",
    opv_2: "",
    opv_3: "",

    ipv_1: "",
    ipv_2: "",

    pcv_1: "",
    pcv_2: "",
    pcv_3: "",

    mmr_1: "",
    mmr_2: "",

    fic: false,
    cic: false,

    remarks_action_taken: "",
};

const immunizationDateFields = [
    ["bcg_0_28_days", "BCG 0–28 Days"],
    ["bcg_29_days_to_1_year", "BCG 29 Days to 1 Year"],
    ["hepa_b_within_24_hours", "Hepatitis B Within 24 Hours"],
    ["hepa_b_more_than_24_hours", "Hepatitis B More Than 24 Hours"],
    ["pentavalent_1", "Pentavalent 1"],
    ["pentavalent_2", "Pentavalent 2"],
    ["pentavalent_3", "Pentavalent 3"],
    ["opv_1", "OPV 1"],
    ["opv_2", "OPV 2"],
    ["opv_3", "OPV 3"],
    ["ipv_1", "IPV 1"],
    ["ipv_2", "IPV 2"],
    ["pcv_1", "PCV 1"],
    ["pcv_2", "PCV 2"],
    ["pcv_3", "PCV 3"],
    ["mmr_1", "MMR 1"],
    ["mmr_2", "MMR 2"],
];

export default function Create({ records = [], children = [] }) {
    const { flash } = usePage().props;
    const { url } = usePage();

    const params = new URLSearchParams(url.split("?")[1]);

    const selectedChildId = params.get("child_id");

    const { data, setData, post, processing, errors } = useForm({
        mode: "existing",

        child_id: "",
        child_last_name: "",
        child_first_name: "",
        child_middle_initial: "",
        child_sex: "",
        child_date_of_birth: "",

        maternal_record_id: "",
        date_of_registration: "",
        family_serial: "",
        mother_name: "",
        address: "",

        immunization: { ...defaultImmunization },
    });

    const updateNested = (group, field, value) => {
        setData(group, {
            ...data[group],
            [field]: value,
        });
    };

    const resetChildFields = (mode) => {
        setData({
            ...data,
            mode,
            child_id: "",
            child_last_name: "",
            child_first_name: "",
            child_middle_initial: "",
            child_sex: "",
            child_date_of_birth: "",
            maternal_record_id: "",
            date_of_registration: "",
            family_serial: "",
            mother_name: "",
            address: "",
            immunization: { ...defaultImmunization },
        });
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("child.immunization.store"), {
            preserveScroll: true,
            onError: () => {
                toast.error("Please check the form fields.");
            },
        });
    };
    useEffect(() => {
        if (!selectedChildId || children.length === 0) return;

        const selected = children.find(
            (child) => String(child.id) === String(selectedChildId),
        );

        if (!selected) return;

        setData((prev) => ({
            ...prev,
            mode: "existing",
            child_id: selected.id,

            child_last_name: selected?.last_name ?? "",
            child_first_name: selected?.first_name ?? "",
            child_middle_initial: selected?.middle_initial ?? "",
            child_sex: selected?.sex ?? "",
            child_date_of_birth: selected?.date_of_birth ?? "",

            maternal_record_id: selected?.maternal_record_id ?? "",

            date_of_registration: selected?.date_of_registration ?? "",

            family_serial: selected?.family_serial ?? "",

            mother_name: selected?.mother_name ?? "",

            address: selected?.address ?? "",

            immunization: {
                ...defaultImmunization,
                ...(selected?.immunization ?? {}),
            },
        }));
    }, [selectedChildId, children]);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash?.success]);

    useEffect(() => {
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash?.error]);

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold text-slate-800">
                        Child Immunization Record
                    </h2>
                    <p className="text-sm text-slate-500">
                        Select an existing child or register a new child, then
                        encode vaccine records.
                    </p>
                </div>
            }
        >
            <Head title="Child Immunization Record" />
            <Toaster richColors position="bottom-right" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/40 to-purple-50/40 py-8">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-gradient-to-br from-violet-700 to-purple-700 p-6 text-white shadow-xl shadow-violet-100">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="rounded-2xl bg-white/15 p-4">
                                    <HeartPulse className="h-7 w-7" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">
                                        Maternal and Child Care System
                                    </h1>
                                    <p className="mt-1 max-w-2xl text-sm text-violet-100">
                                        Encode child vaccination records,
                                        monitor completion status, and keep
                                        maternal-linked child health information
                                        updated.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                <MiniStat
                                    label="Entry Mode"
                                    value={
                                        data.mode === "existing"
                                            ? "Existing"
                                            : "New"
                                    }
                                />
                                <MiniStat
                                    label="FIC Status"
                                    value={data.immunization.fic ? "Yes" : "No"}
                                />
                                <MiniStat
                                    label="CIC Status"
                                    value={data.immunization.cic ? "Yes" : "No"}
                                />
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <Section
                            icon={Baby}
                            title="Child Information"
                            description="Select an existing child or encode a new child record."
                        >
                            <div className="mb-5 inline-flex rounded-2xl border border-violet-100 bg-violet-50 p-1">
                                {[
                                    ["existing", "Select Existing Child"],
                                    ["new", "Enter New Child"],
                                ].map(([value, label]) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => resetChildFields(value)}
                                        className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                                            data.mode === value
                                                ? "bg-white text-violet-700 shadow-sm"
                                                : "text-slate-500 hover:text-violet-700"
                                        }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>

                            <InfoNote title="Child record setup">
                                Use “Select Existing Child” if the child is
                                already registered. Use “Enter New Child” if the
                                child needs to be linked to a maternal record
                                before saving immunization details.
                            </InfoNote>

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {data.mode === "existing" ? (
                                    <Field
                                        label="Select Child"
                                        error={errors.child_id}
                                        hint="Choose the child whose immunization record will be encoded or updated."
                                        required
                                    >
                                        <Select
                                            value={data.child_id}
                                            onChange={(e) => {
                                                const id = e.target.value;

                                                const selected = children.find(
                                                    (child) =>
                                                        String(child.id) ===
                                                        String(id),
                                                );

                                                setData({
                                                    ...data,
                                                    mode: "existing",
                                                    child_id: id ?? "",

                                                    child_last_name:
                                                        selected?.last_name ??
                                                        "",
                                                    child_first_name:
                                                        selected?.first_name ??
                                                        "",
                                                    child_middle_initial:
                                                        selected?.middle_initial ??
                                                        "",
                                                    child_sex:
                                                        selected?.sex ?? "",
                                                    child_date_of_birth:
                                                        selected?.date_of_birth ??
                                                        "",

                                                    maternal_record_id:
                                                        selected?.maternal_record_id ??
                                                        "",
                                                    date_of_registration:
                                                        selected?.date_of_registration ??
                                                        "",
                                                    family_serial:
                                                        selected?.family_serial ??
                                                        "",
                                                    mother_name:
                                                        selected?.mother_name ??
                                                        "",
                                                    address:
                                                        selected?.address ?? "",

                                                    immunization: {
                                                        ...defaultImmunization,
                                                        ...(selected?.immunization ??
                                                            {}),
                                                    },
                                                });
                                            }}
                                        >
                                            <option value="">
                                                Select child
                                            </option>

                                            {children.map((child) => (
                                                <option
                                                    key={child.id}
                                                    value={child.id}
                                                >
                                                    {child.label}
                                                </option>
                                            ))}
                                        </Select>
                                    </Field>
                                ) : (
                                    <Field
                                        label="Select Mother / Maternal Record"
                                        error={errors.maternal_record_id}
                                        hint="Choose the maternal record where this new child will be linked."
                                        required
                                    >
                                        <Select
                                            value={data.maternal_record_id}
                                            onChange={(e) => {
                                                const id = e.target.value;

                                                const selected = records.find(
                                                    (record) =>
                                                        String(record.id) ===
                                                        String(id),
                                                );

                                                setData({
                                                    ...data,
                                                    mode: "new",
                                                    maternal_record_id:
                                                        id ?? "",
                                                    date_of_registration:
                                                        selected?.date_of_registration ??
                                                        "",
                                                    family_serial:
                                                        selected?.family_serial ??
                                                        "",
                                                    mother_name:
                                                        selected?.mother_name ??
                                                        "",
                                                    address:
                                                        selected?.address ?? "",
                                                });
                                            }}
                                        >
                                            <option value="">
                                                Select mother
                                            </option>

                                            {records.map((record) => (
                                                <option
                                                    key={record.id}
                                                    value={record.id}
                                                >
                                                    {record.label}
                                                </option>
                                            ))}
                                        </Select>
                                    </Field>
                                )}

                                <Field
                                    label="Date of Registration"
                                    hint="Automatically taken from the selected child or maternal record."
                                >
                                    <Input
                                        value={data.date_of_registration}
                                        readOnly
                                        className="bg-slate-50"
                                    />
                                </Field>

                                <Field
                                    label="Family Serial No."
                                    hint="Used to identify the family record connected to the mother and child."
                                >
                                    <Input
                                        value={data.family_serial}
                                        readOnly
                                        className="bg-slate-50"
                                    />
                                </Field>

                                <Field
                                    label="Mother Name"
                                    hint="This helps verify that the selected child is linked to the correct mother."
                                >
                                    <Input
                                        value={data.mother_name}
                                        readOnly
                                        className="bg-slate-50"
                                    />
                                </Field>

                                <Field
                                    label="Child Last Name"
                                    error={errors.child_last_name}
                                    hint={
                                        data.mode === "existing"
                                            ? "This field is locked because the child already exists."
                                            : "Enter the child’s legal last name."
                                    }
                                    required
                                >
                                    <Input
                                        value={data.child_last_name}
                                        readOnly={data.mode === "existing"}
                                        className={
                                            data.mode === "existing"
                                                ? "bg-slate-50"
                                                : ""
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "child_last_name",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="e.g. Dela Cruz"
                                    />
                                </Field>

                                <Field
                                    label="Child First Name"
                                    error={errors.child_first_name}
                                    hint={
                                        data.mode === "existing"
                                            ? "This field is locked because the child already exists."
                                            : "Enter the child’s given name."
                                    }
                                    required
                                >
                                    <Input
                                        value={data.child_first_name}
                                        readOnly={data.mode === "existing"}
                                        className={
                                            data.mode === "existing"
                                                ? "bg-slate-50"
                                                : ""
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "child_first_name",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="e.g. Juan"
                                    />
                                </Field>

                                <Field
                                    label="Middle Initial"
                                    error={errors.child_middle_initial}
                                    hint="Use one or two letters only, if applicable."
                                >
                                    <Input
                                        value={data.child_middle_initial}
                                        readOnly={data.mode === "existing"}
                                        className={
                                            data.mode === "existing"
                                                ? "bg-slate-50"
                                                : ""
                                        }
                                        maxLength={2}
                                        onChange={(e) =>
                                            setData(
                                                "child_middle_initial",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="e.g. M"
                                    />
                                </Field>

                                <Field
                                    label="Sex"
                                    error={errors.child_sex}
                                    hint="Select the child’s biological sex for health record classification."
                                    required
                                >
                                    <Select
                                        value={data.child_sex}
                                        disabled={data.mode === "existing"}
                                        className={
                                            data.mode === "existing"
                                                ? "bg-slate-50"
                                                : ""
                                        }
                                        onChange={(e) =>
                                            setData("child_sex", e.target.value)
                                        }
                                    >
                                        <option value="">Select sex</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </Select>
                                </Field>

                                <Field
                                    label="Date of Birth"
                                    error={errors.child_date_of_birth}
                                    hint="Used to determine age-based immunization status such as FIC or CIC."
                                    required
                                >
                                    <Input
                                        type="date"
                                        value={data.child_date_of_birth}
                                        readOnly={data.mode === "existing"}
                                        className={
                                            data.mode === "existing"
                                                ? "bg-slate-50"
                                                : ""
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "child_date_of_birth",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </Field>

                                <div className="md:col-span-2 lg:col-span-3">
                                    <Field
                                        label="Complete Address"
                                        hint="Address is displayed for verification and is based on the linked maternal or child record."
                                    >
                                        <textarea
                                            value={data.address ?? ""}
                                            readOnly
                                            rows="2"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none"
                                        />
                                    </Field>
                                </div>
                            </div>
                        </Section>

                        <Section
                            icon={ShieldCheck}
                            title="Child Immunization"
                            description="Record tetanus protection, vaccine dates, immunization status, and remarks."
                        >
                            <InfoNote title="Immunization tracking guide">
                                Enter only the vaccines already administered.
                                Leave the date blank if the dose has not yet
                                been given. Mark FIC or CIC only when the child
                                has completed the required doses for the
                                applicable age range.
                            </InfoNote>

                            <div className="mb-6 grid gap-4 md:grid-cols-2">
                                <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <input
                                        type="checkbox"
                                        checked={
                                            data.immunization
                                                .protected_at_birth_tt2
                                        }
                                        onChange={(e) =>
                                            updateNested(
                                                "immunization",
                                                "protected_at_birth_tt2",
                                                e.target.checked,
                                            )
                                        }
                                        className="mt-1 h-4 w-4 rounded border-slate-300 text-violet-700 focus:ring-violet-500"
                                    />

                                    <span className="text-sm font-medium text-slate-700">
                                        Protected at Birth - TT2
                                        <span className="block text-xs font-normal text-slate-500">
                                            Mother received at least TT2
                                            protection during pregnancy.
                                        </span>
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <input
                                        type="checkbox"
                                        checked={
                                            data.immunization
                                                .protected_at_birth_tt3_tt5
                                        }
                                        onChange={(e) =>
                                            updateNested(
                                                "immunization",
                                                "protected_at_birth_tt3_tt5",
                                                e.target.checked,
                                            )
                                        }
                                        className="mt-1 h-4 w-4 rounded border-slate-300 text-violet-700 focus:ring-violet-500"
                                    />

                                    <span className="text-sm font-medium text-slate-700">
                                        Protected at Birth - TT3 to TT5
                                        <span className="block text-xs font-normal text-slate-500">
                                            Child is protected through mother’s
                                            completed tetanus toxoid doses.
                                        </span>
                                    </span>
                                </label>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {immunizationDateFields.map(
                                    ([field, label]) => (
                                        <Field
                                            key={field}
                                            label={label}
                                            error={
                                                errors[`immunization.${field}`]
                                            }
                                            hint="Enter the date when this vaccine dose was given. Leave blank if not yet administered."
                                        >
                                            <Input
                                                type="date"
                                                value={data.immunization[field]}
                                                onChange={(e) =>
                                                    updateNested(
                                                        "immunization",
                                                        field,
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </Field>
                                    ),
                                )}

                                <Field
                                    label="FIC - Fully Immunized Child"
                                    error={errors["immunization.fic"]}
                                    hint="Mark Yes only if the child completed the required immunization doses from 0 to 12 months."
                                >
                                    <Select
                                        value={
                                            data.immunization.fic ? "1" : "0"
                                        }
                                        onChange={(e) =>
                                            updateNested(
                                                "immunization",
                                                "fic",
                                                e.target.value === "1",
                                            )
                                        }
                                    >
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </Select>
                                </Field>

                                <Field
                                    label="CIC - Completely Immunized Child"
                                    error={errors["immunization.cic"]}
                                    hint="Mark Yes only if the child completed the required immunization doses from 13 to 23 months."
                                >
                                    <Select
                                        value={
                                            data.immunization.cic ? "1" : "0"
                                        }
                                        onChange={(e) =>
                                            updateNested(
                                                "immunization",
                                                "cic",
                                                e.target.value === "1",
                                            )
                                        }
                                    >
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </Select>
                                </Field>

                                <div className="md:col-span-2 lg:col-span-4">
                                    <Field
                                        label="Remarks / Action Taken"
                                        error={
                                            errors[
                                                "immunization.remarks_action_taken"
                                            ]
                                        }
                                        hint="Write follow-up instructions, missed schedules, referrals, or actions taken."
                                    >
                                        <textarea
                                            value={
                                                data.immunization
                                                    .remarks_action_taken ?? ""
                                            }
                                            rows="3"
                                            onChange={(e) =>
                                                updateNested(
                                                    "immunization",
                                                    "remarks_action_taken",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Example: Missed OPV 2 schedule, advised mother to return next immunization day."
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                        />
                                    </Field>
                                </div>
                            </div>
                        </Section>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 rounded-2xl bg-violet-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                <Save className="h-4 w-4" />
                                {processing ? "Saving..." : "Save Record"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
