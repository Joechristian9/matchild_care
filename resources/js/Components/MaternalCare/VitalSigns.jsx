import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useEffect } from 'react';

export default function VitalSigns({ data, setData, errors }) {
    // Auto-calculate BMI when height and weight change
    useEffect(() => {
        const height = parseFloat(data.vital_signs?.height);
        const weight = parseFloat(data.vital_signs?.weight);
        
        if (height > 0 && weight > 0) {
            // BMI = weight (kg) / (height (m))^2
            const heightInMeters = height / 100;
            const bmi = weight / (heightInMeters * heightInMeters);
            const roundedBMI = Math.round(bmi * 10) / 10; // Round to 1 decimal
            
            // Auto-fill BMI
            setData('vital_signs', {
                ...data.vital_signs,
                bmi: roundedBMI.toString()
            });
        }
    }, [data.vital_signs?.height, data.vital_signs?.weight]);

    // Get BMI status color and label
    const getBMIStatus = () => {
        const bmi = parseFloat(data.vital_signs?.bmi);
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
        <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl p-8 border border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6 pb-5 border-b border-emerald-200">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold text-gray-900">Vital Signs</h3>
                    <p className="text-sm text-gray-600 mt-1">Record vital signs measurements</p>
                </div>
            </div>
            
            <div className="space-y-4 max-w-2xl">
                {/* Weight */}
                <div className="flex items-center gap-4">
                    <div className="w-32 flex-shrink-0">
                        <InputLabel htmlFor="weight" value="Weight" className="text-sm font-semibold text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <TextInput
                            id="weight"
                            type="number"
                            step="0.1"
                            value={data.vital_signs?.weight || ''}
                            onChange={(e) => setData('vital_signs', {
                                ...data.vital_signs,
                                weight: e.target.value
                            })}
                            placeholder="kg"
                            min="0"
                            max="300"
                            className="w-full"
                        />
                        <InputError message={errors['vital_signs.weight']} className="mt-1" />
                    </div>
                </div>

                {/* Height */}
                <div className="flex items-center gap-4">
                    <div className="w-32 flex-shrink-0">
                        <InputLabel htmlFor="height" value="Height" className="text-sm font-semibold text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <TextInput
                            id="height"
                            type="number"
                            step="0.1"
                            value={data.vital_signs?.height || ''}
                            onChange={(e) => setData('vital_signs', {
                                ...data.vital_signs,
                                height: e.target.value
                            })}
                            placeholder="cm"
                            min="0"
                            max="250"
                            className="w-full"
                        />
                        <InputError message={errors['vital_signs.height']} className="mt-1" />
                    </div>
                </div>

                {/* BMI */}
                <div className="flex items-center gap-4">
                    <div className="w-32 flex-shrink-0">
                        <InputLabel htmlFor="bmi" value="BMI" className="text-sm font-semibold text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <div className="relative">
                            <TextInput
                                id="bmi"
                                type="number"
                                step="0.1"
                                value={data.vital_signs?.bmi || ''}
                                readOnly
                                placeholder="Auto-calculated"
                                min="0"
                                max="100"
                                className={`w-full ${bmiStatus ? `${bmiStatus.bgColor} ${bmiStatus.borderColor} border-2` : ''}`}
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
                        <InputError message={errors['vital_signs.bmi']} className="mt-1" />
                    </div>
                </div>

                {/* Blood Pressure */}
                <div className="flex items-center gap-4">
                    <div className="w-32 flex-shrink-0">
                        <InputLabel htmlFor="blood_pressure_systolic" value="BP" className="text-sm font-semibold text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <div className="flex gap-3 items-center">
                            <TextInput
                                id="blood_pressure_systolic"
                                type="number"
                                value={data.vital_signs?.blood_pressure_systolic || ''}
                                onChange={(e) => setData('vital_signs', {
                                    ...data.vital_signs,
                                    blood_pressure_systolic: e.target.value
                                })}
                                placeholder="Systolic"
                                min="0"
                                max="300"
                                className="flex-1"
                            />
                            <span className="text-gray-500 font-medium">/</span>
                            <TextInput
                                id="blood_pressure_diastolic"
                                type="number"
                                value={data.vital_signs?.blood_pressure_diastolic || ''}
                                onChange={(e) => setData('vital_signs', {
                                    ...data.vital_signs,
                                    blood_pressure_diastolic: e.target.value
                                })}
                                placeholder="Diastolic"
                                min="0"
                                max="200"
                                className="flex-1"
                            />
                            <span className="text-gray-500 text-sm">mmHg</span>
                        </div>
                        <InputError message={errors['vital_signs.blood_pressure_systolic'] || errors['vital_signs.blood_pressure_diastolic']} className="mt-1" />
                    </div>
                </div>

                {/* Temperature */}
                <div className="flex items-center gap-4">
                    <div className="w-32 flex-shrink-0">
                        <InputLabel htmlFor="temperature" value="Temp" className="text-sm font-semibold text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <TextInput
                            id="temperature"
                            type="number"
                            step="0.1"
                            value={data.vital_signs?.temperature || ''}
                            onChange={(e) => setData('vital_signs', {
                                ...data.vital_signs,
                                temperature: e.target.value
                            })}
                            placeholder="°C"
                            min="30"
                            max="45"
                            className="w-full"
                        />
                        <InputError message={errors['vital_signs.temperature']} className="mt-1" />
                    </div>
                </div>

                {/* Pulse Rate (PR) */}
                <div className="flex items-center gap-4">
                    <div className="w-32 flex-shrink-0">
                        <InputLabel htmlFor="heart_rate" value="PR" className="text-sm font-semibold text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <TextInput
                            id="heart_rate"
                            type="number"
                            value={data.vital_signs?.heart_rate || ''}
                            onChange={(e) => setData('vital_signs', {
                                ...data.vital_signs,
                                heart_rate: e.target.value
                            })}
                            placeholder="bpm"
                            min="0"
                            max="250"
                            className="w-full"
                        />
                        <InputError message={errors['vital_signs.heart_rate']} className="mt-1" />
                    </div>
                </div>

                {/* Respiratory Rate */}
                <div className="flex items-center gap-4">
                    <div className="w-32 flex-shrink-0">
                        <InputLabel htmlFor="respiratory_rate" value="RR" className="text-sm font-semibold text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <TextInput
                            id="respiratory_rate"
                            type="number"
                            value={data.vital_signs?.respiratory_rate || ''}
                            onChange={(e) => setData('vital_signs', {
                                ...data.vital_signs,
                                respiratory_rate: e.target.value
                            })}
                            placeholder="breaths/min"
                            min="0"
                            max="100"
                            className="w-full"
                        />
                        <InputError message={errors['vital_signs.respiratory_rate']} className="mt-1" />
                    </div>
                </div>

                {/* Fetal Heart Tone (FHT) */}
                <div className="flex items-center gap-4">
                    <div className="w-32 flex-shrink-0">
                        <InputLabel htmlFor="fetal_heart_tone" value="FHT" className="text-sm font-semibold text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <TextInput
                            id="fetal_heart_tone"
                            type="number"
                            value={data.vital_signs?.fetal_heart_tone || ''}
                            onChange={(e) => setData('vital_signs', {
                                ...data.vital_signs,
                                fetal_heart_tone: e.target.value
                            })}
                            placeholder="bpm"
                            min="0"
                            max="200"
                            className="w-full"
                        />
                        <InputError message={errors['vital_signs.fetal_heart_tone']} className="mt-1" />
                    </div>
                </div>

                {/* Fundal Height (FH) */}
                <div className="flex items-center gap-4">
                    <div className="w-32 flex-shrink-0">
                        <InputLabel htmlFor="fundal_height" value="FH" className="text-sm font-semibold text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <TextInput
                            id="fundal_height"
                            type="number"
                            step="0.1"
                            value={data.vital_signs?.fundal_height || ''}
                            onChange={(e) => setData('vital_signs', {
                                ...data.vital_signs,
                                fundal_height: e.target.value
                            })}
                            placeholder="cm"
                            min="0"
                            max="50"
                            className="w-full"
                        />
                        <InputError message={errors['vital_signs.fundal_height']} className="mt-1" />
                    </div>
                </div>

                {/* Others */}
                <div className="flex items-center gap-4">
                    <div className="w-32 flex-shrink-0">
                        <InputLabel htmlFor="vital_signs_others" value="Others" className="text-sm font-semibold text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <TextInput
                            id="vital_signs_others"
                            type="text"
                            value={data.vital_signs?.others || ''}
                            onChange={(e) => setData('vital_signs', {
                                ...data.vital_signs,
                                others: e.target.value
                            })}
                            placeholder="Additional notes"
                            className="w-full"
                        />
                        <InputError message={errors['vital_signs.others']} className="mt-1" />
                    </div>
                </div>
            </div>
        </div>
    );
}
