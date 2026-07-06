import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useState, useEffect } from 'react';

export default function PrenatalSupplementationVisits({ data, setData, errors }) {
    const [selectedVisit, setSelectedVisit] = useState(null);

    // Initialize completedSupplementVisits array if it doesn't exist
    useEffect(() => {
        if (!data.completedSupplementVisits) {
            setData('completedSupplementVisits', []);
        }
    }, []);

    // Close modal function
    const closeModal = () => {
        setSelectedVisit(null);
    };

    // Determine which visits are completed and which is the active visit
    const getVisitStatus = () => {
        const completed = data.completedSupplementVisits || [];
        let activeVisit = null;

        // Find the first visit that's not completed (up to 6 visits)
        for (let i = 1; i <= 6; i++) {
            if (!completed.includes(i)) {
                activeVisit = i;
                break;
            }
        }

        return { completed, activeVisit };
    };

    const { completed, activeVisit } = getVisitStatus();

    // Handle submit button - mark visit as complete
    const handleSubmitVisit = async (visitNum) => {
        const visitData = data.prenatal_supplementation.iron_folic_acid[visitNum - 1];
        if (!visitData?.date) {
            alert('Please enter a visit date before submitting.');
            return;
        }
        
        // Get vital signs for this visit
        const vitalSigns = getSupplementVitalSigns(visitNum);
        
        // If we're in edit mode and have a record ID, save to database
        if (data.id) {
            try {
                const response = await fetch(`/parent/maternal-care/${data.id}/supplementation/${visitNum}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                    body: JSON.stringify({
                        visit_date: visitData.date,
                        tablets: visitData.tablets,
                        vital_signs: vitalSigns,
                        is_completed: true,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to save supplementation visit');
                }
            } catch (error) {
                console.error('Error saving supplementation visit:', error);
                alert('Failed to save supplementation visit. Please try again.');
                return;
            }
        }
        
        // Add this visit to completed list in frontend state
        const updatedCompleted = [...(data.completedSupplementVisits || []), visitNum];
        setData('completedSupplementVisits', updatedCompleted);
    };

    // Helper to get visit vital signs data for supplementation visits
    const getSupplementVitalSigns = (visitNum) => {
        return data[`supplement_visit_${visitNum}_vital_signs`] || {};
    };

    // Helper to update visit vital signs for supplementation visits
    const setSupplementVitalSigns = (visitNum, field, value) => {
        setData(`supplement_visit_${visitNum}_vital_signs`, {
            ...getSupplementVitalSigns(visitNum),
            [field]: value
        });
    };

    // Render vital signs form
    const renderVitalSignsForm = (visitNum) => {
        const vitalSigns = getSupplementVitalSigns(visitNum);
        
        return (
            <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-xl p-5 border border-emerald-200 mt-4">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-emerald-200">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-900">Vital Signs</h4>
                        <p className="text-xs text-gray-600">Record vital signs for Visit {visitNum}</p>
                    </div>
                </div>

                <div className="space-y-3 max-w-2xl">
                    {/* Weight */}
                    <div className="flex items-center gap-3">
                        <div className="w-24 flex-shrink-0">
                            <InputLabel value="Weight" className="text-xs font-semibold text-gray-700" />
                        </div>
                        <div className="flex-1">
                            <TextInput
                                type="number"
                                step="0.1"
                                value={vitalSigns.weight || ''}
                                onChange={(e) => setSupplementVitalSigns(visitNum, 'weight', e.target.value)}
                                placeholder="kg"
                                min="0"
                                max="300"
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Height */}
                    <div className="flex items-center gap-3">
                        <div className="w-24 flex-shrink-0">
                            <InputLabel value="Height" className="text-xs font-semibold text-gray-700" />
                        </div>
                        <div className="flex-1">
                            <TextInput
                                type="number"
                                step="0.1"
                                value={vitalSigns.height || ''}
                                onChange={(e) => setSupplementVitalSigns(visitNum, 'height', e.target.value)}
                                placeholder="cm"
                                min="0"
                                max="250"
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Blood Pressure */}
                    <div className="flex items-center gap-3">
                        <div className="w-24 flex-shrink-0">
                            <InputLabel value="BP" className="text-xs font-semibold text-gray-700" />
                        </div>
                        <div className="flex-1">
                            <div className="flex gap-2 items-center">
                                <TextInput
                                    type="number"
                                    value={vitalSigns.blood_pressure_systolic || ''}
                                    onChange={(e) => setSupplementVitalSigns(visitNum, 'blood_pressure_systolic', e.target.value)}
                                    placeholder="Systolic"
                                    min="0"
                                    max="300"
                                    className="flex-1"
                                />
                                <span className="text-gray-500 font-medium">/</span>
                                <TextInput
                                    type="number"
                                    value={vitalSigns.blood_pressure_diastolic || ''}
                                    onChange={(e) => setSupplementVitalSigns(visitNum, 'blood_pressure_diastolic', e.target.value)}
                                    placeholder="Diastolic"
                                    min="0"
                                    max="200"
                                    className="flex-1"
                                />
                                <span className="text-gray-500 text-xs">mmHg</span>
                            </div>
                        </div>
                    </div>

                    {/* Temperature */}
                    <div className="flex items-center gap-3">
                        <div className="w-24 flex-shrink-0">
                            <InputLabel value="Temp" className="text-xs font-semibold text-gray-700" />
                        </div>
                        <div className="flex-1">
                            <TextInput
                                type="number"
                                step="0.1"
                                value={vitalSigns.temperature || ''}
                                onChange={(e) => setSupplementVitalSigns(visitNum, 'temperature', e.target.value)}
                                placeholder="°C"
                                min="30"
                                max="45"
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Pulse Rate */}
                    <div className="flex items-center gap-3">
                        <div className="w-24 flex-shrink-0">
                            <InputLabel value="PR" className="text-xs font-semibold text-gray-700" />
                        </div>
                        <div className="flex-1">
                            <TextInput
                                type="number"
                                value={vitalSigns.heart_rate || ''}
                                onChange={(e) => setSupplementVitalSigns(visitNum, 'heart_rate', e.target.value)}
                                placeholder="bpm"
                                min="0"
                                max="250"
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Respiratory Rate */}
                    <div className="flex items-center gap-3">
                        <div className="w-24 flex-shrink-0">
                            <InputLabel value="RR" className="text-xs font-semibold text-gray-700" />
                        </div>
                        <div className="flex-1">
                            <TextInput
                                type="number"
                                value={vitalSigns.respiratory_rate || ''}
                                onChange={(e) => setSupplementVitalSigns(visitNum, 'respiratory_rate', e.target.value)}
                                placeholder="breaths/min"
                                min="0"
                                max="100"
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Fetal Heart Tone */}
                    <div className="flex items-center gap-3">
                        <div className="w-24 flex-shrink-0">
                            <InputLabel value="FHT" className="text-xs font-semibold text-gray-700" />
                        </div>
                        <div className="flex-1">
                            <TextInput
                                type="number"
                                value={vitalSigns.fetal_heart_tone || ''}
                                onChange={(e) => setSupplementVitalSigns(visitNum, 'fetal_heart_tone', e.target.value)}
                                placeholder="bpm"
                                min="0"
                                max="200"
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Fundal Height */}
                    <div className="flex items-center gap-3">
                        <div className="w-24 flex-shrink-0">
                            <InputLabel value="FH" className="text-xs font-semibold text-gray-700" />
                        </div>
                        <div className="flex-1">
                            <TextInput
                                type="number"
                                step="0.1"
                                value={vitalSigns.fundal_height || ''}
                                onChange={(e) => setSupplementVitalSigns(visitNum, 'fundal_height', e.target.value)}
                                placeholder="cm"
                                min="0"
                                max="50"
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Others */}
                    <div className="flex items-center gap-3">
                        <div className="w-24 flex-shrink-0">
                            <InputLabel value="Others" className="text-xs font-semibold text-gray-700" />
                        </div>
                        <div className="flex-1">
                            <TextInput
                                type="text"
                                value={vitalSigns.others || ''}
                                onChange={(e) => setSupplementVitalSigns(visitNum, 'others', e.target.value)}
                                placeholder="Additional notes"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-gray-900 truncate">Prenatal Supplementation</h4>
                    <p className="text-xs text-gray-500 truncate">Iron Folic Acid (IFA) distribution tracking (4 weeks apart)</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Completed Visits */}
                {completed.length > 0 && (
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3">Completed Visits</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                            {completed.map((visitNum) => {
                                const visitData = data.prenatal_supplementation.iron_folic_acid[visitNum - 1];
                                return (
                                    <button
                                        key={visitNum}
                                        onClick={() => setSelectedVisit(visitNum)}
                                        className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-3 hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer"
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-xs font-bold text-gray-900">Visit {visitNum}</p>
                                                <p className="text-xs text-gray-600 mt-0.5">
                                                    {visitData?.date ? new Date(visitData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Active Visit */}
                {activeVisit && (
                    <div className="bg-white rounded-xl border-2 border-orange-200 shadow-lg overflow-hidden">
                        {/* Visit Header */}
                        <div className="p-5 bg-gradient-to-r from-orange-50 to-amber-50 border-b-2 border-orange-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                                    <span className="text-base font-bold text-white">{activeVisit}</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Visit {activeVisit}</h3>
                                    <p className="text-xs text-gray-600">Current IFA Distribution</p>
                                </div>
                            </div>
                        </div>

                        {/* Visit Content */}
                        <div className="p-5 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel value="Date" required />
                                    <TextInput
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.prenatal_supplementation.iron_folic_acid[activeVisit - 1]?.date || ''}
                                        onChange={(e) => {
                                            const newIFA = [...data.prenatal_supplementation.iron_folic_acid];
                                            newIFA[activeVisit - 1] = {
                                                ...newIFA[activeVisit - 1],
                                                date: e.target.value
                                            };
                                            setData('prenatal_supplementation', {
                                                ...data.prenatal_supplementation,
                                                iron_folic_acid: newIFA
                                            });
                                        }}
                                    />
                                    <InputError message={errors?.[`prenatal_supplementation.iron_folic_acid.${activeVisit - 1}.date`]} className="mt-1" />
                                </div>

                                <div>
                                    <InputLabel value="Number of Tablets" required />
                                    <TextInput
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.prenatal_supplementation.iron_folic_acid[activeVisit - 1]?.tablets || ''}
                                        onChange={(e) => {
                                            const newIFA = [...data.prenatal_supplementation.iron_folic_acid];
                                            newIFA[activeVisit - 1] = {
                                                ...newIFA[activeVisit - 1],
                                                tablets: e.target.value
                                            };
                                            setData('prenatal_supplementation', {
                                                ...data.prenatal_supplementation,
                                                iron_folic_acid: newIFA
                                            });
                                        }}
                                        placeholder="Enter number"
                                        min="0"
                                    />
                                    <InputError message={errors?.[`prenatal_supplementation.iron_folic_acid.${activeVisit - 1}.tablets`]} className="mt-1" />
                                </div>
                            </div>

                            {/* Vital Signs for active visit */}
                            {renderVitalSignsForm(activeVisit)}

                            {/* Submit Button */}
                            <div className="mt-4 pt-4 border-t border-orange-100 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => handleSubmitVisit(activeVisit)}
                                    className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-amber-700 transition-all duration-200 flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Complete Visit {activeVisit}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal for viewing/editing completed visit */}
            {selectedVisit && (
                <div className="fixed inset-0 z-50 overflow-y-auto" onClick={closeModal}>
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
                        {/* Background overlay */}
                        <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" aria-hidden="true"></div>

                        {/* Modal panel */}
                        <div 
                            className="inline-block w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">Visit {selectedVisit}</h3>
                                            <p className="text-xs text-gray-600">
                                                {data.prenatal_supplementation.iron_folic_acid[selectedVisit - 1]?.date 
                                                    ? new Date(data.prenatal_supplementation.iron_folic_acid[selectedVisit - 1].date).toLocaleDateString('en-US', { 
                                                        month: 'long', 
                                                        day: 'numeric', 
                                                        year: 'numeric' 
                                                    })
                                                    : 'No date recorded'
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
                                <div className="space-y-4 mb-4">
                                    <div>
                                        <InputLabel value="Date" />
                                        <TextInput
                                            type="date"
                                            className="mt-1 block w-full"
                                            value={data.prenatal_supplementation.iron_folic_acid[selectedVisit - 1]?.date || ''}
                                            onChange={(e) => {
                                                const newIFA = [...data.prenatal_supplementation.iron_folic_acid];
                                                newIFA[selectedVisit - 1] = {
                                                    ...newIFA[selectedVisit - 1],
                                                    date: e.target.value
                                                };
                                                setData('prenatal_supplementation', {
                                                    ...data.prenatal_supplementation,
                                                    iron_folic_acid: newIFA
                                                });
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel value="Number of Tablets" />
                                        <TextInput
                                            type="number"
                                            className="mt-1 block w-full"
                                            value={data.prenatal_supplementation.iron_folic_acid[selectedVisit - 1]?.tablets || ''}
                                            onChange={(e) => {
                                                const newIFA = [...data.prenatal_supplementation.iron_folic_acid];
                                                newIFA[selectedVisit - 1] = {
                                                    ...newIFA[selectedVisit - 1],
                                                    tablets: e.target.value
                                                };
                                                setData('prenatal_supplementation', {
                                                    ...data.prenatal_supplementation,
                                                    iron_folic_acid: newIFA
                                                });
                                            }}
                                            placeholder="Enter number"
                                            min="0"
                                        />
                                    </div>
                                </div>

                                {/* Vital Signs in Modal */}
                                {renderVitalSignsForm(selectedVisit)}
                            </div>

                            {/* Modal Footer */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                                <button
                                    onClick={closeModal}
                                    className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
