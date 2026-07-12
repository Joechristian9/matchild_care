import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Stepper from "@/Components/Stepper";
import FormNavigation from "@/Components/FormNavigation";
import Breadcrumb from "@/Components/Breadcrumb";
import Toast from "@/Components/Toast";
import PrenatalCheckupsStep from "@/Components/MaternalCare/PrenatalCheckupsStep";
import AdditionalInformationStep from "@/Components/MaternalCare/AdditionalInformationStep";
import SupplementationScreeningStep from "@/Components/MaternalCare/SupplementationScreeningStep";
import DeliveryPostnatalStep from "@/Components/MaternalCare/DeliveryPostnatalStep";

export default function MaternalCareEdit({ record = null, isEdit = false }) {
    const { flash } = usePage().props;
    const [currentStep, setCurrentStep] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const totalSteps = 4;

    const steps = [
        { number: 1, title: "Prenatal Check-ups",         description: "Visit schedule" },
        { number: 2, title: "Additional Info",             description: "Nutrition & Immunization" },
        { number: 3, title: "Supplementation & Screening", description: "Lab & Outcome" },
        { number: 4, title: "Delivery & Postnatal",        description: "Birth & Care" },
    ];

    const { data, setData, put, processing, errors, reset } = useForm({
        id: record?.id || null,
        date_of_registration: record?.date_of_registration || new Date().toISOString().split("T")[0],
        family_serial:   record?.family_serial   || "",
        last_name:       record?.last_name        || "",
        first_name:      record?.first_name       || "",
        middle_initial:  record?.middle_initial   || "",
        address:         record?.address          || "",
        age:             record?.age              || "",
        age_group:       record?.age_group        || "",

        vital_signs: record?.vital_signs ? {
            blood_pressure_systolic:  record.vital_signs.blood_pressure_systolic  || "",
            blood_pressure_diastolic: record.vital_signs.blood_pressure_diastolic || "",
            heart_rate:        record.vital_signs.heart_rate        || "",
            temperature:       record.vital_signs.temperature       || "",
            respiratory_rate:  record.vital_signs.respiratory_rate  || "",
            weight:            record.vital_signs.weight            || "",
            height:            record.vital_signs.height            || "",
            bmi:               record.vital_signs.bmi               || "",
            fetal_heart_tone:  record.vital_signs.fetal_heart_tone  || "",
            fundal_height:     record.vital_signs.fundal_height     || "",
            others:            record.vital_signs.others            || "",
        } : {
            blood_pressure_systolic: "", blood_pressure_diastolic: "",
            heart_rate: "", temperature: "", respiratory_rate: "",
            weight: "", height: "", bmi: "", fetal_heart_tone: "", fundal_height: "", others: "",
        },

        last_menstrual_period:    record?.last_menstrual_period    || "",
        gravida:                  record?.gravida                  || "",
        parity:                   record?.parity                   || "",
        expected_date_of_delivery: record?.expected_date_of_delivery || "",

        visits: record?.visits || { visit_1:"",visit_2:"",visit_3:"",visit_4:"",visit_5:"",visit_6:"",visit_7:"",visit_8:"" },

        completedVisits: record?.completedVisits || [],
        
        // Spread all visit vital signs from record (visit_1_vital_signs, visit_2_vital_signs, etc.)
        ...(record ? Object.keys(record).filter(key => key.includes('_vital_signs')).reduce((acc, key) => {
            acc[key] = record[key] || {};
            return acc;
        }, {}) : {}),

        nutritional_assessment: record?.nutritional_assessment ? {
            height:    record.nutritional_assessment.height              || "",
            weight_1st: record.nutritional_assessment.weight_1st_trimester || "",
            weight_2nd: record.nutritional_assessment.weight_2nd_trimester || "",
            weight_3rd: record.nutritional_assessment.weight_3rd_trimester || "",
            bmi_1st:   record.nutritional_assessment.bmi_1st_trimester   || "",
            remarks:   record.nutritional_assessment.remarks             || "",
        } : { height:"", weight_1st:"", weight_2nd:"", weight_3rd:"", bmi_1st:"", remarks:"" },

        immunization_status: record?.immunization_record ? {
            td1_tt1: record.immunization_record.td1_tt1 || "",
            td2_tt2: record.immunization_record.td2_tt2 || "",
            td3_tt3: record.immunization_record.td3_tt3 || "",
            td4_tt4: record.immunization_record.td4_tt4 || "",
            td5_tt5: record.immunization_record.td5_tt5 || "",
            fully_immunized:    record.immunization_record.fully_immunized_status || "",
            received_deworming: record.immunization_record.deworming_date || "",
        } : { td1_tt1:"", td2_tt2:"", td3_tt3:"", td4_tt4:"", td5_tt5:"", fully_immunized:"", received_deworming:"" },

        prenatal_supplementation: {
            iron_folic_acid: record?.prenatal_supplementations?.length > 0
                ? record.prenatal_supplementations.map(s => ({ date: s.supplementation_date || "", tablets: s.tablets_given || "" }))
                : Array(6).fill({ date: "", tablets: "" }),
        },
        completedSupplementVisits: record?.prenatal_supplementations?.filter(s => s.is_completed).map(s => s.visit_number) || [],
        ...(record?.prenatal_supplementations?.reduce((acc, s) => {
            acc[`supplement_visit_${s.visit_number}_vital_signs`] = s.vital_signs || {};
            return acc;
        }, {}) || {}),

        micronutrient_supplementation: {
            completed: record?.micronutrient_supplementations?.[0]?.completed_mms_supplementation || false,
            visits: record?.micronutrient_supplementations?.length > 0
                ? record.micronutrient_supplementations.map(s => ({ date: s.supplementation_date || "", tablets: s.tablets_given || "" }))
                : Array(6).fill({ date: "", tablets: "" }),
        },
        high_risk_supplementation: {
            completed: record?.high_risk_supplementations?.[0]?.completed_calcium_supplementation || false,
            visits: record?.high_risk_supplementations?.length > 0
                ? record.high_risk_supplementations.map(s => ({ date: s.supplementation_date || "", tablets: s.tablets_given || "" }))
                : Array(4).fill({ date: "", tablets: "" }),
        },
        postpartum_supplementation: {
            completed_ifa: record?.postpartum_supplementations?.[0]?.completed_ifa || false,
            visits: record?.postpartum_supplementations?.length > 0
                ? record.postpartum_supplementations.map(s => ({ date: s.visit_date || "", tablets: s.tablets_given || "" }))
                : Array(3).fill({ date: "", tablets: "" }),
            completed_ifa_1st: "", date_completed_1st: "",
            completed_ifa_2nd: "", date_completed_2nd: "", remarks: "",
        },

        laboratory_screening: record?.laboratory_screening ? {
            hepatitis_b:          { completed: record.laboratory_screening.completed_hepatitis_b         || false, date: record.laboratory_screening.hepatitis_b_date         || "", result: record.laboratory_screening.hepatitis_b_result         || "" },
            cbc_hgb_hct:          { completed: record.laboratory_screening.completed_cbc_hgb_hct         || false, date: record.laboratory_screening.cbc_hgb_hct_date         || "", result: record.laboratory_screening.cbc_hgb_hct_result         || "" },
            gestational_diabetes: { completed: record.laboratory_screening.completed_gestational_diabetes || false, date: record.laboratory_screening.gestational_diabetes_date || "", result: record.laboratory_screening.gestational_diabetes_result || "" },
            syphilis:             { completed: record.laboratory_screening.completed_syphilis             || false, date: record.laboratory_screening.syphilis_date             || "", result: record.laboratory_screening.syphilis_result             || "" },
            hiv:                  { completed: record.laboratory_screening.completed_hiv                 || false, date: record.laboratory_screening.hiv_date                 || "", result: record.laboratory_screening.hiv_result                 || "" },
        } : {
            hepatitis_b: { completed:false,date:"",result:"" }, cbc_hgb_hct: { completed:false,date:"",result:"" },
            gestational_diabetes: { completed:false,date:"",result:"" }, syphilis: { completed:false,date:"",result:"" },
            hiv: { completed:false,date:"",result:"" },
        },

        pregnancy_outcome: record?.pregnancy_outcome ? {
            date_terminated: record.pregnancy_outcome.date_terminated   || "",
            outcome_type:    record.pregnancy_outcome.outcome_type       || "",
            remarks:         record.pregnancy_outcome.remarks_action_taken || "",
        } : { date_terminated:"", outcome_type:"", remarks:"" },

        delivery_info: record?.delivery_information ? {
            delivery_type:   record.delivery_information.delivery_type   || "",
            birth_weight:    record.delivery_information.birth_weight    || "",
            weight_category: record.delivery_information.weight_category || "",
            place_of_delivery: {
                health_facility: {
                    type:    record.delivery_information.health_facility_type    || "",
                    capable: record.delivery_information.health_facility_capable || "",
                },
                non_health_facility: record.delivery_information.non_health_facility || "",
            },
            birth_attendant: record.delivery_information.birth_attendant || "",
            delivery_date:   record.delivery_information.delivery_date   || "",
            delivery_time:   record.delivery_information.delivery_time   || "",
        } : {
            delivery_type:"", birth_weight:"", weight_category:"",
            place_of_delivery: { health_facility:{ type:"",capable:"" }, non_health_facility:"" },
            birth_attendant:"", delivery_date:"", delivery_time:"",
        },

        postnatal_care: record?.postnatal_care ? {
            contact_1: record.postnatal_care.contact_1 || "",
            contact_2: record.postnatal_care.contact_2 || "",
            contact_3: record.postnatal_care.contact_3 || "",
            contact_4: record.postnatal_care.contact_4 || "",
            completed_4pnc: record.postnatal_care.completed_4pnc || false,
        } : { contact_1:"", contact_2:"", contact_3:"", contact_4:"", completed_4pnc:false },
    });

    useEffect(() => {
        if (flash?.success) { setToastMessage(flash.success); setToastType("success"); setShowToast(true); }
        else if (flash?.error) { setToastMessage(flash.error); setToastType("error"); setShowToast(true); }
    }, [flash]);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    const nextStep = () => { if (currentStep < totalSteps) { setCurrentStep(s => s + 1); scrollToTop(); } };
    const prevStep = () => { if (currentStep > 1)          { setCurrentStep(s => s - 1); scrollToTop(); } };
    const goToStep = (n) => { if (n >= 1 && n <= totalSteps) { setCurrentStep(n); scrollToTop(); } };

    const handleSubmit = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (currentStep === totalSteps) {
            put(route("parent.maternal-care.update", record.id), {
                onSuccess: () => {
                    setToastMessage("Record updated successfully!");
                    setToastType("success");
                    setShowToast(true);
                    scrollToTop();
                },
                onError: () => {
                    setToastMessage("Failed to update. Please check the form.");
                    setToastType("error");
                    setShowToast(true);
                },
            });
        }
    };

    const patientName = record
        ? `${record.last_name}, ${record.first_name}${record.middle_initial ? " " + record.middle_initial : ""}`
        : "";

    return (
        <AuthenticatedLayout
            header={
                <Breadcrumb
                    items={[
                        { label: "Maternal Care", href: route("parent.maternal-care") },
                        { label: patientName || "Edit Record", href: null, bold: true },
                        { label: steps[currentStep - 1]?.title, href: null },
                    ]}
                />
            }
        >
            <Head title="Edit Maternal Care Record" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/20 py-8 lg:py-12">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                    {/* Page Header */}
                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">
                            {patientName || "Edit Record"}
                        </h1>
                        <p className="text-gray-500 text-sm">
                            {record?.family_serial && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-semibold border border-indigo-100 mr-2">
                                    {record.family_serial}
                                </span>
                            )}
                            Update the maternal care record
                        </p>
                    </div>

                    {/* Stepper */}
                    <Stepper steps={steps} currentStep={currentStep} onStepClick={goToStep} />

                    {/* Form Card */}
                    <div className="bg-white shadow-2xl rounded-3xl border border-gray-200 overflow-hidden">
                        <div className="p-6 lg:p-10">
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-8"
                                onKeyDown={(e) => { if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") e.preventDefault(); }}
                            >
                                {currentStep === 1 && (
                                    <PrenatalCheckupsStep data={data} setData={setData} errors={errors} />
                                )}
                                {currentStep === 2 && (
                                    <AdditionalInformationStep data={data} setData={setData} errors={errors} />
                                )}
                                {currentStep === 3 && (
                                    <SupplementationScreeningStep data={data} setData={setData} errors={errors} />
                                )}
                                {currentStep === 4 && (
                                    <DeliveryPostnatalStep data={data} setData={setData} errors={errors} />
                                )}

                                <div className="pt-6 border-t border-gray-200">
                                    <FormNavigation
                                        currentStep={currentStep}
                                        totalSteps={totalSteps}
                                        onPrevious={prevStep}
                                        onNext={nextStep}
                                        onSubmit={handleSubmit}
                                        processing={processing}
                                        submitLabel="Save Changes"
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
