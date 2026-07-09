import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Toast from "@/Components/Toast";
import Breadcrumb from "@/Components/Breadcrumb";
import Stepper from "@/Components/Stepper";
import FormNavigation from "@/Components/FormNavigation";

export default function MaternalCareRegister() {
    const { flash } = usePage().props;
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 2;
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

    const steps = [
        { number: 1, title: "Registration", description: "Patient details" },
        { number: 2, title: "Medical Information", description: "Pregnancy history" },
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        date_of_registration: new Date().toISOString().split("T")[0],
        family_serial: "",
        last_name: "",
        first_name: "",
        middle_initial: "",
        address: "",
        age: "",
        age_group: "",
        vital_signs: {
            blood_pressure_systolic: "", blood_pressure_diastolic: "",
            heart_rate: "", temperature: "", respiratory_rate: "",
            weight: "", height: "", bmi: "", fetal_heart_tone: "",
            fundal_height: "", others: "",
        },
        last_menstrual_period: "",
        gravida: "",
        parity: "",
        expected_date_of_delivery: "",
        visits: {
            visit_1: "", visit_2: "", visit_3: "", visit_4: "",
            visit_5: "", visit_6: "", visit_7: "", visit_8: "",
        },
        completedVisits: [],
        nutritional_assessment: {
            height: "", weight_1st: "", weight_2nd: "", weight_3rd: "", bmi_1st: "", remarks: "",
        },
        immunization_status: {
            td1_tt1: "", td2_tt2: "", td3_tt3: "", td4_tt4: "", td5_tt5: "",
            fully_immunized: "", received_deworming: "",
        },
        prenatal_supplementation: {
            iron_folic_acid: Array(6).fill({ date: "", tablets: "" }),
        },
        completedSupplementVisits: [],
        micronutrient_supplementation: {
            completed: false, visits: Array(6).fill({ date: "", tablets: "" }),
        },
        high_risk_supplementation: {
            completed: false, visits: Array(4).fill({ date: "", tablets: "" }),
        },
        postpartum_supplementation: {
            completed_ifa: false, visits: Array(3).fill({ date: "", tablets: "" }),
            completed_ifa_1st: "", date_completed_1st: "",
            completed_ifa_2nd: "", date_completed_2nd: "", remarks: "",
        },
        laboratory_screening: {
            hepatitis_b: { completed: false, date: "", result: "" },
            cbc_hgb_hct: { completed: false, date: "", result: "" },
            gestational_diabetes: { completed: false, date: "", result: "" },
            syphilis: { completed: false, date: "", result: "" },
            hiv: { completed: false, date: "", result: "" },
        },
        pregnancy_outcome: { date_terminated: "", outcome_type: "", remarks: "" },
        delivery_info: {
            delivery_type: "", birth_weight: "", weight_category: "",
            place_of_delivery: { health_facility: { type: "", capable: "" }, non_health_facility: "" },
            birth_attendant: "", delivery_date: "", delivery_time: "",
        },
        postnatal_care: {
            contact_1: "", contact_2: "", contact_3: "", contact_4: "", completed_4pnc: false,
        },
    });

    // Auto-calculate age group
    useEffect(() => {
        const age = parseInt(data.age);
        let ageGroup = "";
        if (age >= 10 && age <= 14) ageGroup = "10-14";
        else if (age <= 19) ageGroup = "15-19";
        else if (age <= 49) ageGroup = "20-49";
        if (ageGroup && ageGroup !== data.age_group) {
            setData("age_group", ageGroup);
        }
    }, [data.age]);

    // Auto-calculate EDD from LMP using Naegele's Rule
    const calculateEDD = (lmpDate) => {
        if (!lmpDate) return "";
        const lmp = new Date(lmpDate);
        const m = lmp.getMonth() + 1;
        const d = lmp.getDate();
        const y = lmp.getFullYear();
        let em, ed, ey;
        if (m >= 1 && m <= 3) { em = m + 9; ed = d + 7; ey = y; }
        else { em = m - 3; ed = d + 7; ey = y + 1; }
        return new Date(ey, em - 1, ed).toISOString().split("T")[0];
    };

    useEffect(() => {
        if (data.last_menstrual_period) {
            setData("expected_date_of_delivery", calculateEDD(data.last_menstrual_period));
        }
    }, [data.last_menstrual_period]);

    // Flash messages
    useEffect(() => {
        if (flash?.success) { setToastMessage(flash.success); setToastType("success"); setShowToast(true); }
        else if (flash?.error) { setToastMessage(flash.error); setToastType("error"); setShowToast(true); }
    }, [flash]);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    const nextStep = () => { if (currentStep < totalSteps) { setCurrentStep(s => s + 1); scrollToTop(); } };
    const prevStep = () => { if (currentStep > 1) { setCurrentStep(s => s - 1); scrollToTop(); } };
    const goToStep = (n) => { if (n >= 1 && n <= totalSteps) { setCurrentStep(n); scrollToTop(); } };

    const handleSubmit = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (currentStep === totalSteps) {
            post(route("parent.maternal-care.store"), {
                onSuccess: () => {
                    setToastMessage("Patient registered successfully!");
                    setToastType("success");
                    setShowToast(true);
                    reset();
                    setCurrentStep(1);
                    scrollToTop();
                },
                onError: () => {
                    setToastMessage("Failed to register. Please check the form.");
                    setToastType("error");
                    setShowToast(true);
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <Breadcrumb
                    items={[
                        { label: "Maternal Care", href: route("parent.maternal-care") },
                        { label: "Registration", href: null, bold: true },
                    ]}
                />
            }
        >
            <Head title="Maternal Care Registration" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/20 py-8 lg:py-12">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                    {/* Page Header */}
                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Registration</h1>
                        <p className="text-gray-600">Register a new maternal care patient</p>
                    </div>

                    {/* Stepper */}
                    <Stepper steps={steps} currentStep={currentStep} onStepClick={goToStep} />

                    {/* Form Card */}
                    <div className="bg-white shadow-2xl rounded-3xl border border-gray-200 overflow-hidden">
                        <div className="p-6 lg:p-10">
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-8"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") e.preventDefault();
                                }}
                            >
                                {/* ── STEP 1: Registration Details + Patient Information ── */}
                                {currentStep === 1 && (
                                    <div className="space-y-6">
                                        {/* Registration Details */}
                                        <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-2xl p-8 border border-indigo-100 shadow-sm">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200/50">
                                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-gray-900">Registration Details</h4>
                                                    <p className="text-sm text-gray-600">Initial registration information</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <InputLabel htmlFor="date_of_registration" value="Date of Registration" required />
                                                    <TextInput id="date_of_registration" type="date"
                                                        value={data.date_of_registration}
                                                        onChange={(e) => setData("date_of_registration", e.target.value)}
                                                        required />
                                                    <InputError message={errors.date_of_registration} className="mt-2" />
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="family_serial" value="Family Serial Number" required />
                                                    <TextInput id="family_serial" type="text"
                                                        value={data.family_serial}
                                                        onChange={(e) => setData("family_serial", e.target.value)}
                                                        required />
                                                    <InputError message={errors.family_serial} className="mt-2" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Patient Information */}
                                        <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-2xl p-8 border border-purple-100 shadow-sm">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200/50">
                                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-gray-900">Patient Information</h4>
                                                    <p className="text-sm text-gray-600">Complete name and address</p>
                                                </div>
                                            </div>
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    <div>
                                                        <InputLabel htmlFor="last_name" value="Last Name" required />
                                                        <TextInput id="last_name" type="text" value={data.last_name}
                                                            onChange={(e) => setData("last_name", e.target.value)}
                                                            placeholder="Last name" required />
                                                        <InputError message={errors.last_name} className="mt-2" />
                                                    </div>
                                                    <div>
                                                        <InputLabel htmlFor="first_name" value="First Name" required />
                                                        <TextInput id="first_name" type="text" value={data.first_name}
                                                            onChange={(e) => setData("first_name", e.target.value)}
                                                            placeholder="First name" required />
                                                        <InputError message={errors.first_name} className="mt-2" />
                                                    </div>
                                                    <div>
                                                        <InputLabel htmlFor="middle_initial" value="Middle Initial" />
                                                        <TextInput id="middle_initial" type="text" value={data.middle_initial}
                                                            onChange={(e) => setData("middle_initial", e.target.value.toUpperCase())}
                                                            placeholder="M.I." maxLength="2" />
                                                        <InputError message={errors.middle_initial} className="mt-2" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="address" value="Complete Address" required />
                                                    <TextInput id="address" type="text" value={data.address}
                                                        onChange={(e) => setData("address", e.target.value)}
                                                        placeholder="Street, Barangay, City, Province" required />
                                                    <InputError message={errors.address} className="mt-2" />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <InputLabel htmlFor="age" value="Age" required />
                                                        <TextInput id="age" type="number" value={data.age}
                                                            onChange={(e) => setData("age", e.target.value)}
                                                            placeholder="Enter age" min="10" max="49" required />
                                                        <InputError message={errors.age} className="mt-2" />
                                                    </div>
                                                    <div>
                                                        <InputLabel htmlFor="age_group" value="Age Group" />
                                                        <div className="relative">
                                                            <TextInput id="age_group" type="text"
                                                                value={data.age_group ? `${data.age_group} years` : ""}
                                                                readOnly disabled placeholder="Auto-calculated"
                                                                className="bg-purple-50/50 border-purple-200" />
                                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <p className="mt-2 text-xs text-purple-600 flex items-center gap-1.5">
                                                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <span>Automatically calculated based on age</span>
                                                        </p>
                                                        <InputError message={errors.age_group} className="mt-2" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ── STEP 2: Medical Information ── */}
                                {currentStep === 2 && (
                                    <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-2xl p-8 border border-indigo-100 shadow-sm">
                                        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-indigo-100">
                                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200/50">
                                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-900">Medical Information</h4>
                                                <p className="text-sm text-gray-600">Pregnancy history and timeline</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* LMP */}
                                            <div>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h5 className="text-sm font-bold text-gray-900">Last Menstrual Period</h5>
                                                        <p className="text-xs text-gray-500">First day of last period</p>
                                                    </div>
                                                </div>
                                                <InputLabel htmlFor="last_menstrual_period" value="LMP Date" required />
                                                <TextInput id="last_menstrual_period" type="date"
                                                    value={data.last_menstrual_period}
                                                    onChange={(e) => setData("last_menstrual_period", e.target.value)}
                                                    required />
                                                <InputError message={errors.last_menstrual_period} className="mt-2" />
                                            </div>

                                            {/* EDD */}
                                            <div>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h5 className="text-sm font-bold text-gray-900">Expected Date of Delivery</h5>
                                                    </div>
                                                </div>
                                                <InputLabel htmlFor="edd" value="EDD" />
                                                <div className="relative">
                                                    <div className="w-full px-4 py-3 bg-indigo-50/50 border border-indigo-200 rounded-lg text-gray-700 text-sm">
                                                        {data.expected_date_of_delivery
                                                            ? new Date(data.expected_date_of_delivery).toLocaleDateString("en-US", {
                                                                month: "2-digit", day: "2-digit", year: "numeric",
                                                            })
                                                            : "Enter Last Menstrual Period to calculate"}
                                                    </div>
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <p className="mt-2 text-xs text-indigo-600 flex items-center gap-1.5">
                                                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>Automatically calculated from LMP</span>
                                                </p>
                                                <InputError message={errors.expected_date_of_delivery} className="mt-2" />
                                            </div>

                                            {/* Gravida */}
                                            <div>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h5 className="text-sm font-bold text-gray-900">Gravida</h5>
                                                        <p className="text-xs text-gray-500">Total number of pregnancies</p>
                                                    </div>
                                                </div>
                                                <InputLabel htmlFor="gravida" value="Number of Pregnancies" required />
                                                <TextInput id="gravida" type="number" value={data.gravida}
                                                    onChange={(e) => setData("gravida", e.target.value)}
                                                    placeholder="Enter number" min="1" required />
                                                <p className="mt-2 text-xs text-gray-500 flex items-center gap-1.5">
                                                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>Includes current pregnancy</span>
                                                </p>
                                                <InputError message={errors.gravida} className="mt-2" />
                                            </div>

                                            {/* Parity */}
                                            <div>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h5 className="text-sm font-bold text-gray-900">Parity</h5>
                                                        <p className="text-xs text-gray-500">Number of births after 20 weeks</p>
                                                    </div>
                                                </div>
                                                <InputLabel htmlFor="parity" value="Number of Births" required />
                                                <TextInput id="parity" type="number" value={data.parity}
                                                    onChange={(e) => setData("parity", e.target.value)}
                                                    placeholder="Enter number" min="0" required />
                                                <p className="mt-2 text-xs text-gray-500 flex items-center gap-1.5">
                                                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>Live or stillbirths ≥20 weeks gestation</span>
                                                </p>
                                                <InputError message={errors.parity} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation */}
                                <div className="pt-6 border-t border-gray-200">
                                    <FormNavigation
                                        currentStep={currentStep}
                                        totalSteps={totalSteps}
                                        onPrevious={prevStep}
                                        onNext={nextStep}
                                        onSubmit={handleSubmit}
                                        processing={processing}
                                        submitLabel="Register Patient"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Toast
                message={toastMessage}
                type={toastType}
                show={showToast}
                onClose={() => setShowToast(false)}
                duration={5000}
            />
        </AuthenticatedLayout>
    );
}
