import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrenatalSupplementationVisits from '@/Components/MaternalCare/PrenatalSupplementationVisits';
import { useEffect } from 'react';

export default function AdditionalInformationStep({ data, setData, errors }) {
    // Auto-calculate BMI when height and weight change
    useEffect(() => {
        const height = parseFloat(data.nutritional_assessment.height);
        const weight = parseFloat(data.nutritional_assessment.weight_1st);
        
        if (height > 0 && weight > 0) {
            // BMI = weight (kg) / (height (m))^2
            const heightInMeters = height / 100;
            const bmi = weight / (heightInMeters * heightInMeters);
            const roundedBMI = Math.round(bmi * 10) / 10; // Round to 1 decimal
            
            // Auto-fill BMI
            setData('nutritional_assessment', {
                ...data.nutritional_assessment,
                bmi_1st: roundedBMI.toString()
            });
            
            // Auto-fill remarks based on BMI
            let remarks = '';
            if (roundedBMI < 18.5) {
                remarks = 'U'; // Underweight
            } else if (roundedBMI >= 18.5 && roundedBMI < 25) {
                remarks = 'N'; // Normal
            } else if (roundedBMI >= 25) {
                remarks = 'O'; // Overweight
            }
            
            // Only auto-fill if remarks is empty or is N/U/O (not A or B)
            if (!data.nutritional_assessment.remarks || ['N', 'U', 'O'].includes(data.nutritional_assessment.remarks)) {
                setData('nutritional_assessment', {
                    ...data.nutritional_assessment,
                    bmi_1st: roundedBMI.toString(),
                    remarks: remarks
                });
            }
        }
    }, [data.nutritional_assessment.height, data.nutritional_assessment.weight_1st]);

    // Get BMI status color and label
    const getBMIStatus = () => {
        const bmi = parseFloat(data.nutritional_assessment.bmi_1st);
        if (!bmi) return null;
        
        if (bmi < 18.5) {
            return { label: 'Underweight', color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-300' };
        } else if (bmi >= 18.5 && bmi < 25) {
            return { label: 'Normal', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-300' };
        } else if (bmi >= 25 && bmi < 30) {
            return { label: 'Overweight', color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-300' };
        } else {
            return { label: 'Obese', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-300' };
        }
    };

    const bmiStatus = getBMIStatus();

    return (
        <div className="space-y-6">

            {/* NUTRITIONAL ASSESSMENT */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-base font-bold text-gray-900 truncate">Nutritional Assessment</h4>
                        <p className="text-xs text-gray-500 truncate">BMI and weight monitoring across trimesters</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <InputLabel htmlFor="height" value="Height (cm)" required />
                        <TextInput
                            id="height"
                            type="number"
                            step="0.1"
                            className="mt-2 block w-full"
                            value={data.nutritional_assessment.height}
                            onChange={(e) => setData('nutritional_assessment', {
                                ...data.nutritional_assessment,
                                height: e.target.value
                            })}
                            placeholder="Enter height"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="weight_1st" value="Weight 1st Trimester (kg)" required />
                        <TextInput
                            id="weight_1st"
                            type="number"
                            step="0.1"
                            className="mt-2 block w-full"
                            value={data.nutritional_assessment.weight_1st}
                            onChange={(e) => setData('nutritional_assessment', {
                                ...data.nutritional_assessment,
                                weight_1st: e.target.value
                            })}
                            placeholder="Enter weight"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="bmi_1st" value="BMI (1st Trimester)" />
                        <div className="relative">
                            <TextInput
                                id="bmi_1st"
                                type="number"
                                step="0.1"
                                className={`mt-2 block w-full ${bmiStatus ? `${bmiStatus.bgColor} ${bmiStatus.borderColor} border-2` : ''}`}
                                value={data.nutritional_assessment.bmi_1st}
                                readOnly
                                placeholder="Auto-calculated"
                            />
                            {bmiStatus && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <span className={`text-xs font-semibold ${bmiStatus.color}`}>
                                        {bmiStatus.label}
                                    </span>
                                </div>
                            )}
                        </div>
                        <p className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Auto-calculated from height and weight
                        </p>
                    </div>

                    <div>
                        <InputLabel htmlFor="remarks" value="Remarks" />
                        <select
                            id="remarks"
                            className="mt-2 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
                            value={data.nutritional_assessment.remarks}
                            onChange={(e) => setData('nutritional_assessment', {
                                ...data.nutritional_assessment,
                                remarks: e.target.value
                            })}
                        >
                            <option value="">Select status</option>
                            <option value="N">N - Normal</option>
                            <option value="U">U - Underweight</option>
                            <option value="O">O - Overweight</option>
                            <option value="A">A - Receiving 8 ANC</option>
                            <option value="B">B - Trans Out before receiving 8 ANC</option>
                        </select>
                        <p className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Auto-filled based on BMI (can be changed)
                        </p>
                    </div>

                    <div>
                        <InputLabel htmlFor="weight_2nd" value="Weight 2nd Trimester (kg)" />
                        <TextInput
                            id="weight_2nd"
                            type="number"
                            step="0.1"
                            className="mt-2 block w-full"
                            value={data.nutritional_assessment.weight_2nd}
                            onChange={(e) => setData('nutritional_assessment', {
                                ...data.nutritional_assessment,
                                weight_2nd: e.target.value
                            })}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="weight_3rd" value="Weight 3rd Trimester (kg)" />
                        <TextInput
                            id="weight_3rd"
                            type="number"
                            step="0.1"
                            className="mt-2 block w-full"
                            value={data.nutritional_assessment.weight_3rd}
                            onChange={(e) => setData('nutritional_assessment', {
                                ...data.nutritional_assessment,
                                weight_3rd: e.target.value
                            })}
                        />
                    </div>

                </div>
            </div>

            {/* IMMUNIZATION */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-base font-bold text-gray-900 truncate">Immunization Status</h4>
                        <p className="text-xs text-gray-500 truncate">Tetanus Diphtheria (Td) vaccination records (4 weeks apart)</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-6">
                    {['td1_tt1', 'td2_tt2', 'td3_tt3', 'td4_tt4', 'td5_tt5'].map((field, index) => {
                        const hasDate = data.immunization_status[field];
                        
                        // Get suggested date for next dose
                        const getSuggestedTdDate = () => {
                            if (index === 0) return null;
                            const prevField = ['td1_tt1', 'td2_tt2', 'td3_tt3', 'td4_tt4'][index - 1];
                            const prevDate = data.immunization_status[prevField];
                            
                            if (prevDate && !hasDate) {
                                const prev = new Date(prevDate);
                                const suggested = new Date(prev);
                                suggested.setDate(prev.getDate() + 28); // 4 weeks
                                return suggested.toISOString().split('T')[0];
                            }
                            return null;
                        };
                        
                        const suggestedDate = getSuggestedTdDate();
                        
                        return (
                            <div key={field} className={`p-3 rounded-lg border-2 ${hasDate ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300' : 'bg-white border-green-100'}`}>
                                <InputLabel htmlFor={field} value={`Td${index + 1}/TT${index + 1}`} />
                                <TextInput
                                    id={field}
                                    type="date"
                                    className={`mt-2 block w-full ${hasDate ? 'border-green-300' : ''}`}
                                    value={data.immunization_status[field]}
                                    onChange={(e) => setData('immunization_status', {
                                        ...data.immunization_status,
                                        [field]: e.target.value
                                    })}
                                />
                                {suggestedDate && (
                                    <div className="mt-1 p-1.5 bg-blue-50 border border-blue-200 rounded">
                                        <p className="text-xs text-blue-700">
                                            💡 {new Date(suggestedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="fully_immunized" value="Fully Immunized Mother (FIM)" />
                        <select
                            id="fully_immunized"
                            className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm"
                            value={data.immunization_status.fully_immunized}
                            onChange={(e) => setData('immunization_status', {
                                ...data.immunization_status,
                                fully_immunized: e.target.value
                            })}
                        >
                            <option value="">Select</option>
                            <option value="Y">Yes</option>
                            <option value="N">No</option>
                            <option value="X">Unknown</option>
                        </select>
                    </div>

                    <div>
                        <InputLabel htmlFor="received_deworming" value="Deworming Date" />
                        <TextInput
                            id="received_deworming"
                            type="date"
                            className="mt-2 block w-full"
                            value={data.immunization_status.received_deworming}
                            onChange={(e) => setData('immunization_status', {
                                ...data.immunization_status,
                                received_deworming: e.target.value
                            })}
                        />
                    </div>
                </div>
            </div>

            {/* PRENATAL SUPPLEMENTATION WITH VISIT LOGIC */}
            <PrenatalSupplementationVisits data={data} setData={setData} errors={errors} />

        </div>
    );
}