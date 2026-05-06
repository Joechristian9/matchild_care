import AdminLayout from '@/Layouts/AdminLayout';
import HealthWorkerLayout from '@/Layouts/HealthWorkerLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Stepper from '@/Components/Stepper';
import FormNavigation from '@/Components/FormNavigation';
import BasicInformationStep from '@/Components/MaternalCare/BasicInformationStep';
import MedicalInformationStep from '@/Components/MaternalCare/MedicalInformationStep';
import PrenatalCheckupsStep from '@/Components/MaternalCare/PrenatalCheckupsStep';
import AdditionalInformationStep from '@/Components/MaternalCare/AdditionalInformationStep';
import SupplementationScreeningStep from '@/Components/MaternalCare/SupplementationScreeningStep';
import DeliveryPostnatalStep from '@/Components/MaternalCare/DeliveryPostnatalStep';

export default function MaternalCare() {
    const { auth, flash } = usePage().props;
    const [currentStep, setCurrentStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);
    const totalSteps = 6;
    
    // Determine which layout to use based on user role
    const Layout = auth.user.roles.includes('admin') ? AdminLayout : HealthWorkerLayout;

    const { data, setData, post, processing, errors, reset } = useForm({
        date_of_registration: new Date().toISOString().split('T')[0],
        family_serial: '',
        last_name: '',
        first_name: '',
        middle_initial: '',
        address: '',
        age: '',
        age_group: '',

        last_menstrual_period: '',
        gravida: '',
        parity: '',
        expected_date_of_delivery: '',

        visits: {
            visit_1: '', visit_2: '', visit_3: '', visit_4: '',
            visit_5: '', visit_6: '', visit_7: '', visit_8: '',
        },

        nutritional_assessment: {
            height: '', weight_1st: '', weight_2nd: '',
            weight_3rd: '', bmi_1st: '', remarks: '',
        },

        immunization_status: {
            td1_tt1: '', td2_tt2: '', td3_tt3: '',
            td4_tt4: '', td5_tt5: '',
            fully_immunized: '', received_deworming: '',
        },

        prenatal_supplementation: {
            iron_folic_acid: Array(6).fill({ date: '', tablets: '' }),
        },

        micronutrient_supplementation: {
            completed: false,
            visits: Array(6).fill({ date: '', tablets: '' }),
        },

        high_risk_supplementation: {
            completed: false,
            visits: Array(4).fill({ date: '', tablets: '' }),
        },

        postpartum_supplementation: {
            completed_ifa: false,
            visits: Array(3).fill({ date: '', tablets: '' }),
            completed_ifa_1st: '',
            date_completed_1st: '',
            completed_ifa_2nd: '',
            date_completed_2nd: '',
            remarks: '',
        },

        laboratory_screening: {
            hepatitis_b: { completed: false, date: '', result: '' },
            cbc_hgb_hct: { completed: false, date: '', result: '' },
            gestational_diabetes: { completed: false, date: '', result: '' },
        },

        pregnancy_outcome: {
            date_terminated: '',
            outcome_type: '',
            remarks: '',
        },

        delivery_info: {
            delivery_type: '',
            birth_weight: '',
            weight_category: '',
            place_of_delivery: {
                health_facility: { type: '', capable: '' },
                non_health_facility: '',
            },
            birth_attendant: '',
            delivery_date: '',
            delivery_time: '',
        },

        postnatal_care: {
            contact_1: '',
            contact_2: '',
            contact_3: '',
            contact_4: '',
            completed_4pnc: false,
        },
    });

    const calculateEDD = (lmpDate) => {
        if (!lmpDate) return '';
        const lmp = new Date(lmpDate);
        const edd = new Date(lmp.setDate(lmp.getDate() + 280));
        return edd.toISOString().split('T')[0];
    };

    useEffect(() => {
        if (data.last_menstrual_period) {
            setData('expected_date_of_delivery', calculateEDD(data.last_menstrual_period));
        }
    }, [data.last_menstrual_period]);

    useEffect(() => {
        const age = parseInt(data.age);
        let ageGroup = '';

        if (age >= 10 && age <= 14) ageGroup = '10-14';
        else if (age <= 19) ageGroup = '15-19';
        else if (age <= 49) ageGroup = '20-49';

        if (ageGroup && ageGroup !== data.age_group) {
            setData('age_group', ageGroup);
        }
    }, [data.age]);

    useEffect(() => {
        if (flash?.success) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
        }
    }, [flash]);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
            scrollToTop();
        }
    };
    
    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            scrollToTop();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentStep === totalSteps) {
            post(route('parent.maternal-care.store'), {
                onSuccess: () => {
                    reset();
                    setCurrentStep(1);
                },
            });
        }
    };

    const steps = [
        { number: 1, title: 'Basic Information', description: 'Personal details' },
        { number: 2, title: 'Medical Information', description: 'Pregnancy details' },
        { number: 3, title: 'Prenatal Check-ups', description: 'Visit schedule' },
        { number: 4, title: 'Additional Info', description: 'Nutrition & Immunization' },
        { number: 5, title: 'Supplementation & Screening', description: 'Lab & Outcome' },
        { number: 6, title: 'Delivery & Postnatal', description: 'Birth & Care' },
    ];

    return (
        <Layout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Maternal Care Registration
                </h2>
            }
        >
            <Head title="Maternal Care" />

            {/* Success Message */}
            {showSuccess && (
                <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
                    {flash.success}
                </div>
            )}

            {/* Page Background with Gradient */}
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/20 py-8 lg:py-12">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                    {/* Page Header */}
                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Maternal Care Registration</h1>
                        <p className="text-gray-600">Complete the form to register a new maternal care record</p>
                    </div>

                    {/* Stepper */}
                    <Stepper steps={steps} currentStep={currentStep} />

                    {/* Form Card */}
                    <div className="bg-white shadow-2xl rounded-3xl border border-gray-200 overflow-hidden">
                        <div className="p-6 lg:p-10">

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-8"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                                        e.preventDefault();
                                    }
                                }}
                            >

                                {currentStep === 1 && <BasicInformationStep data={data} setData={setData} errors={errors} />}
                                {currentStep === 2 && <MedicalInformationStep data={data} setData={setData} errors={errors} />}
                                {currentStep === 3 && <PrenatalCheckupsStep data={data} setData={setData} />}
                                {currentStep === 4 && <AdditionalInformationStep data={data} setData={setData} />}
                                {currentStep === 5 && <SupplementationScreeningStep data={data} setData={setData} />}
                                {currentStep === 6 && <DeliveryPostnatalStep data={data} setData={setData} />}

                                {/* Navigation */}
                                <div className="pt-6 border-t border-gray-200">
                                    <FormNavigation
                                        currentStep={currentStep}
                                        totalSteps={totalSteps}
                                        onPrevious={prevStep}
                                        onNext={nextStep}
                                        processing={processing}
                                        submitLabel="Submit Registration"
                                    />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
