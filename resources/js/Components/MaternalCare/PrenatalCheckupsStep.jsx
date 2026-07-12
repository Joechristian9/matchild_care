import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useState, useEffect } from 'react';

export default function PrenatalCheckupsStep({ data, setData, errors }) {
    const [selectedVisit, setSelectedVisit] = useState(null);

    // Initialize completedVisits array if it doesn't exist
    useEffect(() => {
        if (!data.completedVisits) {
            setData('completedVisits', []);
        }
    }, []);

    // Determine which visits are completed and which is the active visit
    const getVisitStatus = () => {
        const completed = data.completedVisits || [];
        let activeVisit = null;

        // Find the first visit that's not completed (up to 8 visits)
        for (let i = 1; i <= 8; i++) {
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
        if (!data.visits?.[`visit_${visitNum}`]) {
            alert('Please enter a visit date before submitting.');
            return;
        }
        
        // Get vital signs for this visit and clean empty values
        const rawVitalSigns = getVisitVitalSigns(visitNum);
        console.log('Raw vital signs before cleaning:', rawVitalSigns);
        
        const vitalSigns = {};
        
        // Only include non-empty values
        Object.keys(rawVitalSigns).forEach(key => {
            const value = rawVitalSigns[key];
            if (value !== null && value !== undefined && value !== '') {
                vitalSigns[key] = value;
            }
        });
        
        console.log('Cleaned vital signs:', vitalSigns);
        
        // If we're in edit mode and have a record ID, save to database
        if (data.id) {
            try {
                // Get CSRF token
                const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
                if (!csrfToken) {
                    throw new Error('CSRF token not found. Please refresh the page.');
                }
                
                console.log('Sending visit data:', {
                    visit_date: data.visits[`visit_${visitNum}`],
                    vital_signs: vitalSigns,
                    is_completed: true,
                });
                
                const response = await fetch(`/parent/maternal-care/${data.id}/visit/${visitNum}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                    body: JSON.stringify({
                        visit_date: data.visits[`visit_${visitNum}`],
                        vital_signs: vitalSigns,
                        is_completed: true,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: `HTTP ${response.status}: ${response.statusText}` }));
                    console.error('Server error:', errorData);
                    
                    // Show validation errors if present
                    if (errorData.errors) {
                        const errorMessages = Object.values(errorData.errors).flat().join('\n');
                        throw new Error(`Validation errors:\n${errorMessages}`);
                    }
                    
                    throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
                }
                
                const result = await response.json();
                console.log('Visit saved to database successfully:', result);
            } catch (error) {
                console.error('Error saving visit:', error);
                alert(`Failed to save visit to database:\n${error.message}`);
                return;
            }
        } else {
            // In CREATE mode - just update frontend state
            console.log('In CREATE mode - visit will be saved when you submit the main form');
        }
        
        // Add this visit to completed list in frontend state
        const updatedCompleted = [...(data.completedVisits || []), visitNum];
        setData('completedVisits', updatedCompleted);
    };

    // Helper to get visit vital signs data
    const getVisitVitalSigns = (visitNum) => {
        return data[`visit_${visitNum}_vital_signs`] || {};
    };

    // Helper to update visit vital signs
    const setVisitVitalSigns = (visitNum, field, value) => {
        setData(`visit_${visitNum}_vital_signs`, {
            ...getVisitVitalSigns(visitNum),
            [field]: value
        });
    };

    // Close modal
    const closeModal = () => {
        setSelectedVisit(null);
    };
    
    // Save changes to a completed visit
    const handleSaveCompletedVisit = async (visitNum) => {
        // Get vital signs for this visit and clean empty values
        const rawVitalSigns = getVisitVitalSigns(visitNum);
        const vitalSigns = {};
        
        // Only include non-empty values
        Object.keys(rawVitalSigns).forEach(key => {
            const value = rawVitalSigns[key];
            if (value !== null && value !== undefined && value !== '') {
                vitalSigns[key] = value;
            }
        });
        
        // If we're in edit mode and have a record ID, save to database
        if (data.id) {
            try {
                // Get CSRF token
                const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
                if (!csrfToken) {
                    throw new Error('CSRF token not found. Please refresh the page.');
                }
                
                console.log('Updating completed visit:', {
                    visit_date: data.visits[`visit_${visitNum}`],
                    vital_signs: vitalSigns,
                    is_completed: true,
                });
                
                const response = await fetch(`/parent/maternal-care/${data.id}/visit/${visitNum}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                    body: JSON.stringify({
                        visit_date: data.visits[`visit_${visitNum}`],
                        vital_signs: vitalSigns,
                        is_completed: true,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: `HTTP ${response.status}: ${response.statusText}` }));
                    console.error('Server error:', errorData);
                    
                    // Show validation errors if present
                    if (errorData.errors) {
                        const errorMessages = Object.values(errorData.errors).flat().join('\n');
                        throw new Error(`Validation errors:\n${errorMessages}`);
                    }
                    
                    throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
                }
                
                const result = await response.json();
                console.log('Completed visit updated successfully:', result);
                alert('Visit updated successfully!');
                closeModal();
            } catch (error) {
                console.error('Error updating visit:', error);
                alert(`Failed to update visit:\n${error.message}`);
            }
        } else {
            // In CREATE mode - just close modal
            closeModal();
        }
    };

    // Render vital signs form
    const renderVitalSignsForm = (visitNum) => {
        const vitalSigns = getVisitVitalSigns(visitNum);
        
        return (
            <div className="space-y-4 max-w-2xl">
                {/* Weight */}
                <div className="flex items-center gap-4">
                    <div className="w-32 flex-shrink-0">
                        <InputLabel value="Weight" className="text-sm font-semibold text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <TextInput
                            type="number"
                            step="0.1"
                            value={vitalSigns.weight || ''}
                            onChange={(e) => setVisitVitalSigns(visitNum, 'weight', e.target.value)}
                            placeholder="kg"
                            min="0"
                            max="300"
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Height */}
                <div className="flex items-center gap-4">
                    <div className="w-32 flex-shrink-0">
                        <InputLabel value="Height" className="text-sm font-semibold text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <TextInput
                            type="number"
                            step="0.1"
                            value={vitalSigns.height || ''}
                            onChange={(e) => setVisitVitalSigns(visitNum, 'height', e.target.value)}
                            placeholder="cm"
                            min="0"
                            max="250"
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Blood Pressure */}
                <div className="flex items-center gap-4">
                    <div className="w-32 flex-shrink-0">
                        <InputLabel value="BP" className="text-sm font-semibold text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <div className="flex gap-3 items-center">
                            <TextInput
                                type="number"
                                value={vitalSigns.blood_pressure_systolic || ''}
                                onChange={(e) => setVisitVitalSigns(visitNum, 'blood_pressure_systolic', e.target.value)}
                                placeholder="Systolic"
                                min="0"
                                max="300"
                                className="flex-1"
                            />
                            <span className="text-gray-500 font-medium">/</span>
                            <TextInput
                                type="number"
                                value={vitalSigns.blood_pressure_diastolic || ''}
                                onChange={(e) => setVisitVitalSigns(visitNum, 'blood_pressure_diastolic', e.target.value)}
                                placeholder="Diastolic"
                                min="0"
                                max="200"
                                className="flex-1"
                            />
                            <span className="text-gray-500 text-sm">mmHg</span>
                        </div>
                    </div>
                </div>

                {/* Temperature */}
                <div className="flex items-center gap-4">
                    <div className="w-32 flex-shrink-0">
                        <InputLabel value="Temp" className="text-sm font-semibold text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <TextInput
                            type="number"
                            step="0.1"
                            value={vitalSigns.temperature || ''}
                            onChange={(e) => setVisitVitalSigns(visitNum, 'temperature', e.target.value)}
                            placeholder="°C"
                            min="30"
                            max="45"
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Pulse Rate */}
                <div className="flex items-center gap-4">
                    <div className="w-32 flex-shrink-0">
                        <InputLabel value="PR" className="text-sm font-semibold text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <TextInput
                            type="number"
                            value={vitalSigns.heart_rate || ''}
                            onChange={(e) => setVisitVitalSigns(visitNum, 'heart_rate', e.target.value)}
                            placeholder="bpm"
                            min="0"
                            max="250"
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Respiratory Rate */}
                <div className="flex items-center gap-4">
                    <div className="w-32 flex-shrink-0">
                        <InputLabel value="RR" className="text-sm font-semibold text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <TextInput
                            type="number"
                            value={vitalSigns.respiratory_rate || ''}
                            onChange={(e) => setVisitVitalSigns(visitNum, 'respiratory_rate', e.target.value)}
                            placeholder="breaths/min"
                            min="0"
                            max="100"
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Fetal Heart Tone */}
                <div className="flex items-center gap-4">
                    <div className="w-32 flex-shrink-0">
                        <InputLabel value="FHT" className="text-sm font-semibold text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <TextInput
                            type="number"
                            value={vitalSigns.fetal_heart_tone || ''}
                            onChange={(e) => setVisitVitalSigns(visitNum, 'fetal_heart_tone', e.target.value)}
                            placeholder="bpm"
                            min="0"
                            max="200"
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Fundal Height */}
                <div className="flex items-center gap-4">
                    <div className="w-32 flex-shrink-0">
                        <InputLabel value="FH" className="text-sm font-semibold text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <TextInput
                            type="number"
                            step="0.1"
                            value={vitalSigns.fundal_height || ''}
                            onChange={(e) => setVisitVitalSigns(visitNum, 'fundal_height', e.target.value)}
                            placeholder="cm"
                            min="0"
                            max="50"
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Others */}
                <div className="flex items-center gap-4">
                    <div className="w-32 flex-shrink-0">
                        <InputLabel value="Others" className="text-sm font-semibold text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <TextInput
                            type="text"
                            value={vitalSigns.others || ''}
                            onChange={(e) => setVisitVitalSigns(visitNum, 'others', e.target.value)}
                            placeholder="Additional notes"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Active Visit (Current/Next Visit) */}
            {activeVisit && (
                <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden">
                    {/* Visit Header */}
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                                <span className="text-lg font-bold text-white">{activeVisit}</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Visit {activeVisit}</h3>
                                <p className="text-sm text-gray-600">Current Prenatal Checkup</p>
                            </div>
                        </div>
                    </div>

                    {/* Visit Content */}
                    <div className="p-6 space-y-6">
                        {/* Visit Date */}
                        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <InputLabel htmlFor={`visit_${activeVisit}`} value="Visit Date" className="text-base font-bold text-gray-900" />
                                    <p className="text-xs text-gray-600 mt-1">Record the date of this prenatal visit</p>
                                </div>
                            </div>
                            <TextInput
                                id={`visit_${activeVisit}`}
                                type="date"
                                className="w-full max-w-md"
                                value={data.visits?.[`visit_${activeVisit}`] || ''}
                                onChange={(e) =>
                                    setData('visits', {
                                        ...data.visits,
                                        [`visit_${activeVisit}`]: e.target.value,
                                    })
                                }
                            />
                            <InputError message={errors?.[`visits.visit_${activeVisit}`]} className="mt-2" />
                        </div>

                        {/* Vital Signs for active visit */}
                        <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-xl p-6 border border-emerald-200">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-emerald-200">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-gray-900">Vital Signs</h4>
                                    <p className="text-xs text-gray-600">Record vital signs for Visit {activeVisit}</p>
                                </div>
                            </div>
                            {renderVitalSignsForm(activeVisit)}
                            
                            {/* Submit Button */}
                            <div className="mt-6 pt-6 border-t border-emerald-200 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => handleSubmitVisit(activeVisit)}
                                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Complete Visit {activeVisit}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Completed Visits as Clickable Cards */}
            {completed.length > 0 && (
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Completed Visits</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {completed.map((visitNum) => {
                            const visitDate = data.visits?.[`visit_${visitNum}`];
                            return (
                                <button
                                    key={visitNum}
                                    onClick={() => setSelectedVisit(visitNum)}
                                    className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4 hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer"
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-gray-900">Visit {visitNum}</p>
                                            <p className="text-xs text-gray-600 mt-1">
                                                {new Date(visitDate).toLocaleDateString('en-US', { 
                                                    month: 'short', 
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

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
                            <div className="px-6 py-5 bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">Visit {selectedVisit}</h3>
                                            <p className="text-sm text-gray-600">
                                                {new Date(data.visits?.[`visit_${selectedVisit}`]).toLocaleDateString('en-US', { 
                                                    month: 'long', 
                                                    day: 'numeric', 
                                                    year: 'numeric' 
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
                                <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-xl p-6 border border-emerald-200">
                                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-emerald-200">
                                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-base font-bold text-gray-900">Vital Signs</h4>
                                            <p className="text-xs text-gray-600">View or update vital signs</p>
                                        </div>
                                    </div>
                                    {renderVitalSignsForm(selectedVisit)}
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between gap-3">
                                <button
                                    onClick={closeModal}
                                    className="px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-300 transition-all duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleSaveCompletedVisit(selectedVisit)}
                                    className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
