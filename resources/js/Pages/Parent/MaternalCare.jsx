import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
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
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 6;

    const { data, setData, post, processing, errors, reset } = useForm({
        // Step 1: Basic Information
        date_of_registration: new Date().toISOString().split('T')[0],
        family_serial: '',
        last_name: '',
        first_name: '',
        middle_initial: '',
        address: '',
        age: '',
        age_group: '',
        
        // Step 2: Medical Information
        last_menstrual_period: '',
        gravida: '',
        parity: '',
        expected_date_of_delivery: '',
        
        // Step 3: Prenatal Check-up Visits
        visits: {
            visit_1: '',
            visit_2: '',
            visit_3: '',
            visit_4: '',
            visit_5: '',
            visit_6: '',
            visit_7: '',
            visit_8: '',
        },
        
        // Step 4: Additional Information
        nutritional_assessment: {
            height: '',
            weight_1st: '',
            weight_2nd: '',
            weight_3rd: '',
            bmi_1st: '',
            remarks: '',
        },
        immunization_status: {
            td1_tt1: '',
            td2_tt2: '',
            td3_tt3: '',
            td4_tt4: '',
            td5_tt5: '',
            fully_immunized: '',
            received_deworming: '',
        },
        prenatal_supplementation: {
            iron_folic_acid: Array(6).fill({ date: '', tablets: '' }),
        },
        
        // Step 5: Supplementation & Screening
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
        
        // Step 6: Delivery and Postnatal Care
        delivery_info: {
            delivery_type: '',
            birth_weight: '',
            weight_category: '',
            place_of_delivery: {
                health_facility: {
                    type: '',
                    capable: '',
                },
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

    // Calculate Expected Date of Delivery based on Last Menstrual Period
    const calculateEDD = (lmpDate) => {
        if (!lmpDate) return '';

        const lmp = new Date(lmpDate);
        const month = lmp.getMonth();
        const day = lmp.getDate();
        const year = lmp.getFullYear();

        let eddMonth, eddDay, eddYear;

        if (month >= 0 && month <= 2) {
            eddMonth = month + 9;
            eddDay = day + 7;
            eddYear = year;
        } else {
            eddMonth = month - 3;
            eddDay = day + 7;
            eddYear = year + 1;
        }

        const edd = new Date(eddYear, eddMonth, eddDay);
        const formattedMonth = String(edd.getMonth() + 1).padStart(2, '0');
        const formattedDay = String(edd.getDate()).padStart(2, '0');
        const formattedYear = edd.getFullYear();

        return `${formattedMonth}/${formattedDay}/${formattedYear}`;
    };

    useEffect(() => {
        if (data.last_menstrual_period) {
            const edd = calculateEDD(data.last_menstrual_period);
            setData('expected_date_of_delivery', edd);
        }
    }, [data.last_menstrual_period]);

    useEffect(() => {
        const age = parseInt(data.age);
        let ageGroup = '';
        
        if (age >= 10 && age <= 14) {
            ageGroup = '10-14';
        } else if (age >= 15 && age <= 19) {
            ageGroup = '15-19';
        } else if (age >= 20 && age <= 49) {
            ageGroup = '20-49';
        }
        
        if (ageGroup && ageGroup !== data.age_group) {
            setData('age_group', ageGroup);
        }
    }, [data.age]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Only submit if we're on the last step
        if (currentStep === totalSteps) {
            post(route('parent.maternal-care.store'), {
                onSuccess: () => {
                    reset();
                    setCurrentStep(1); // Reset to first step after successful submission
                },
            });
        } else {
            // If not on last step, do nothing (prevent form submission)
            return false;
        }
    };

    const handleFormSubmit = () => {
        // This function is called only when the submit button is clicked
        if (currentStep === totalSteps) {
            post(route('parent.maternal-care.store'), {
                onSuccess: () => {
                    reset();
                    setCurrentStep(1);
                },
            });
        }
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
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
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Maternal Care Registration
                </h2>
            }
        >
            <Head title="Maternal Care" />

            <div className="py-8">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    {/* Stepper */}
                    <Stepper steps={steps} currentStep={currentStep} />

                    {/* Form */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} onKeyDown={(e) => {
                                // Prevent form submission on Enter key
                                if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                                    e.preventDefault();
                                }
                            }}>
                                {/* Step 1: Basic Information */}
                                {currentStep === 1 && (
                                    <BasicInformationStep 
                                        data={data} 
                                        setData={setData} 
                                        errors={errors} 
                                    />
                                )}

                                {/* Step 2: Medical Information */}
                                {currentStep === 2 && (
                                    <MedicalInformationStep 
                                        data={data} 
                                        setData={setData} 
                                        errors={errors} 
                                    />
                                )}

                                {/* Step 3: Prenatal Check-ups */}
                                {currentStep === 3 && (
                                    <PrenatalCheckupsStep 
                                        data={data} 
                                        setData={setData} 
                                    />
                                )}

                                {/* Step 4: Additional Information */}
                                {currentStep === 4 && (
                                    <AdditionalInformationStep 
                                        data={data} 
                                        setData={setData} 
                                    />
                                )}

                                {/* Step 5: Supplementation & Screening */}
                                {currentStep === 5 && (
                                    <SupplementationScreeningStep 
                                        data={data} 
                                        setData={setData} 
                                    />
                                )}

                                {/* Step 6: Delivery & Postnatal Care */}
                                {currentStep === 6 && (
                                    <DeliveryPostnatalStep 
                                        data={data} 
                                        setData={setData} 
                                    />
                                )}

                                {/* Navigation Buttons */}
                                <FormNavigation
                                    currentStep={currentStep}
                                    totalSteps={totalSteps}
                                    onPrevious={prevStep}
                                    onNext={nextStep}
                                    processing={processing}
                                    submitLabel="Submit Registration"
                                    onSubmit={handleFormSubmit}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
