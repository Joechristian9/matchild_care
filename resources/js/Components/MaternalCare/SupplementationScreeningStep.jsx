import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';

export default function SupplementationScreeningStep({ data, setData }) {
    return (
        <div className="space-y-6">

            {/* MMS */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-base font-bold text-gray-900 truncate">Multiple Micronutrient Supplementation</h4>
                        <p className="text-xs text-gray-500 truncate">Number of Tablets Given at Date (4 weeks apart)</p>
                    </div>
                </div>

                <div className="space-y-6">

                    <label className="flex items-center gap-3">
                        <Checkbox
                            checked={data.micronutrient_supplementation.completed}
                            onChange={(e) => setData('micronutrient_supplementation', {
                                ...data.micronutrient_supplementation,
                                completed: e.target.checked
                            })}
                        />
                        <span className="text-sm text-gray-700 font-medium">
                            Completed MMS Supplementation
                        </span>
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[1, 2, 3, 4, 5, 6].map((visitNum) => {
                            const currentVisit = data.micronutrient_supplementation.visits[visitNum - 1];
                            const hasDate = currentVisit?.date;
                            const hasTablets = currentVisit?.tablets;
                            const isCompleted = hasDate && hasTablets;
                            
                            // Get suggested date for next visit
                            const getSuggestedMMSDate = () => {
                                if (visitNum === 1) return null;
                                const prevVisit = data.micronutrient_supplementation.visits[visitNum - 2];
                                const prevDate = prevVisit?.date;
                                
                                if (prevDate && !hasDate) {
                                    const prev = new Date(prevDate);
                                    const suggested = new Date(prev);
                                    suggested.setDate(prev.getDate() + 28); // 4 weeks
                                    return suggested.toISOString().split('T')[0];
                                }
                                return null;
                            };
                            
                            const suggestedDate = getSuggestedMMSDate();
                            
                            return (
                                <div 
                                    key={visitNum} 
                                    className={`border-2 rounded-lg p-4 ${isCompleted ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300' : 'bg-white border-green-100'}`}
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${isCompleted ? 'bg-green-100' : 'bg-green-50'}`}>
                                            {isCompleted ? (
                                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <span className="text-xs font-bold text-green-600">{visitNum}</span>
                                            )}
                                        </div>
                                        <h5 className={`text-sm font-semibold ${isCompleted ? 'text-green-900' : 'text-gray-800'}`}>
                                            {visitNum === 1 ? '1st' : visitNum === 2 ? '2nd' : visitNum === 3 ? '3rd' : `${visitNum}th`} Visit
                                        </h5>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <InputLabel value="Date" className="text-xs" />
                                            <TextInput
                                                type="date"
                                                className={`mt-1 block w-full ${isCompleted ? 'border-green-300' : ''}`}
                                                value={data.micronutrient_supplementation.visits[visitNum - 1]?.date || ''}
                                                onChange={(e) => {
                                                    const newVisits = [...data.micronutrient_supplementation.visits];
                                                    newVisits[visitNum - 1] = {
                                                        ...newVisits[visitNum - 1],
                                                        date: e.target.value
                                                    };
                                                    setData('micronutrient_supplementation', {
                                                        ...data.micronutrient_supplementation,
                                                        visits: newVisits
                                                    });
                                                }}
                                            />
                                            {suggestedDate && (
                                                <div className="mt-1 p-1.5 bg-blue-50 border border-blue-200 rounded">
                                                    <p className="text-xs text-blue-700">
                                                        💡 Suggested: {new Date(suggestedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <InputLabel value="# Tablets" className="text-xs" />
                                            <TextInput
                                                type="number"
                                                className="mt-1 block w-full"
                                                value={data.micronutrient_supplementation.visits[visitNum - 1]?.tablets || ''}
                                                onChange={(e) => {
                                                    const newVisits = [...data.micronutrient_supplementation.visits];
                                                    newVisits[visitNum - 1] = {
                                                        ...newVisits[visitNum - 1],
                                                        tablets: e.target.value
                                                    };
                                                    setData('micronutrient_supplementation', {
                                                        ...data.micronutrient_supplementation,
                                                        visits: newVisits
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Calcium */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-base font-bold text-gray-900 truncate">High Risk Pregnancy - Calcium</h4>
                        <p className="text-xs text-gray-500 truncate">Number of Tablets Given at Date (4 weeks apart)</p>
                    </div>
                </div>

                <div className="space-y-6">

                    <label className="flex items-center gap-3">
                        <Checkbox
                            checked={data.high_risk_supplementation.completed}
                            onChange={(e) => setData('high_risk_supplementation', {
                                ...data.high_risk_supplementation,
                                completed: e.target.checked
                            })}
                        />
                        <span className="text-sm text-gray-700 font-medium">
                            Completed Calcium Supplementation
                        </span>
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[1, 2, 3, 4].map((visitNum) => {
                            const currentVisit = data.high_risk_supplementation.visits[visitNum - 1];
                            const hasDate = currentVisit?.date;
                            const hasTablets = currentVisit?.tablets;
                            const isCompleted = hasDate && hasTablets;
                            
                            // Get suggested date for next visit
                            const getSuggestedCalciumDate = () => {
                                if (visitNum === 1) return null;
                                const prevVisit = data.high_risk_supplementation.visits[visitNum - 2];
                                const prevDate = prevVisit?.date;
                                
                                if (prevDate && !hasDate) {
                                    const prev = new Date(prevDate);
                                    const suggested = new Date(prev);
                                    suggested.setDate(prev.getDate() + 28); // 4 weeks
                                    return suggested.toISOString().split('T')[0];
                                }
                                return null;
                            };
                            
                            const suggestedDate = getSuggestedCalciumDate();
                            
                            return (
                                <div 
                                    key={visitNum} 
                                    className={`border-2 rounded-lg p-4 ${isCompleted ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300' : 'bg-white border-green-100'}`}
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${isCompleted ? 'bg-green-100' : 'bg-green-50'}`}>
                                            {isCompleted ? (
                                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <span className="text-xs font-bold text-green-600">{visitNum}</span>
                                            )}
                                        </div>
                                        <h5 className={`text-sm font-semibold ${isCompleted ? 'text-green-900' : 'text-gray-800'}`}>Visit {visitNum}</h5>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <InputLabel value="Date" className="text-xs" />
                                            <TextInput
                                                type="date"
                                                className={`mt-1 block w-full ${isCompleted ? 'border-green-300' : ''}`}
                                                value={data.high_risk_supplementation.visits[visitNum - 1]?.date || ''}
                                                onChange={(e) => {
                                                    const newVisits = [...data.high_risk_supplementation.visits];
                                                    newVisits[visitNum - 1] = {
                                                        ...newVisits[visitNum - 1],
                                                        date: e.target.value
                                                    };
                                                    setData('high_risk_supplementation', {
                                                        ...data.high_risk_supplementation,
                                                        visits: newVisits
                                                    });
                                                }}
                                            />
                                            {suggestedDate && (
                                                <div className="mt-1 p-1.5 bg-blue-50 border border-blue-200 rounded">
                                                    <p className="text-xs text-blue-700">
                                                        💡 Suggested: {new Date(suggestedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <InputLabel value="# Tablets" className="text-xs" />
                                            <TextInput
                                                type="number"
                                                placeholder="# Tablets"
                                                className="mt-1 block w-full"
                                                value={data.high_risk_supplementation.visits[visitNum - 1]?.tablets || ''}
                                                onChange={(e) => {
                                                    const newVisits = [...data.high_risk_supplementation.visits];
                                                    newVisits[visitNum - 1] = {
                                                        ...newVisits[visitNum - 1],
                                                        tablets: e.target.value
                                                    };
                                                    setData('high_risk_supplementation', {
                                                        ...data.high_risk_supplementation,
                                                        visits: newVisits
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Lab Screening */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-base font-bold text-gray-900 truncate">Laboratory Screenings</h4>
                        <p className="text-xs text-gray-500 truncate">Required medical tests and results</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {[
                        { key: 'hepatitis_b', label: 'Hepatitis B' },
                        { key: 'cbc_hgb_hct', label: 'CBC / Hgb / Hct' },
                        { key: 'gestational_diabetes', label: 'Gestational Diabetes' }
                    ].map((test) => (
                        <div key={test.key} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                            <h5 className="text-sm font-semibold text-gray-800 mb-4">{test.label}</h5>

                            <div className="space-y-3">
                                <label className="flex items-center gap-2">
                                    <Checkbox
                                        checked={data.laboratory_screening[test.key].completed}
                                        onChange={(e) => setData('laboratory_screening', {
                                            ...data.laboratory_screening,
                                            [test.key]: {
                                                ...data.laboratory_screening[test.key],
                                                completed: e.target.checked
                                            }
                                        })}
                                    />
                                    <span className="text-xs text-gray-600">Completed</span>
                                </label>

                                <TextInput
                                    type="date"
                                    className="block w-full"
                                    value={data.laboratory_screening[test.key].date}
                                    onChange={(e) => setData('laboratory_screening', {
                                        ...data.laboratory_screening,
                                        [test.key]: {
                                            ...data.laboratory_screening[test.key],
                                            date: e.target.value
                                        }
                                    })}
                                />

                                <TextInput
                                    type="text"
                                    placeholder="Result"
                                    className="block w-full"
                                    value={data.laboratory_screening[test.key].result}
                                    onChange={(e) => setData('laboratory_screening', {
                                        ...data.laboratory_screening,
                                        [test.key]: {
                                            ...data.laboratory_screening[test.key],
                                            result: e.target.value
                                        }
                                    })}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}