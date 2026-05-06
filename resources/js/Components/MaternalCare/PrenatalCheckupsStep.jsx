import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function PrenatalCheckupsStep({ data, setData }) {
    return (
        <div className="space-y-6">

            {/* INFO BOX */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-gray-900">Recommended Schedule</h4>
                        <p className="text-xs text-gray-500">Standard prenatal visit timeline</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <p className="font-semibold text-sm text-blue-900">1st Trimester</p>
                        <p className="text-xs text-blue-700 mt-1">Visit 1 (8–13 weeks)</p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <p className="font-semibold text-sm text-blue-900">2nd Trimester</p>
                        <p className="text-xs text-blue-700 mt-1">Visit 2–3 (14–27 weeks)</p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <p className="font-semibold text-sm text-blue-900">3rd Trimester</p>
                        <p className="text-xs text-blue-700 mt-1">Visit 4–8 (28–40 weeks)</p>
                    </div>
                </div>
            </div>

            {/* VISITS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((visitNum) => (
                    <div key={visitNum} className="bg-white rounded-xl p-5 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-bold text-indigo-600">{visitNum}</span>
                            </div>
                            <h5 className="text-sm font-bold text-gray-900">Visit {visitNum}</h5>
                        </div>

                        <InputLabel
                            htmlFor={`visit_${visitNum}`}
                            value="Visit Date"
                            className="text-xs"
                        />

                        <TextInput
                            id={`visit_${visitNum}`}
                            type="date"
                            className="mt-1 block w-full"
                            value={data.visits[`visit_${visitNum}`]}
                            onChange={(e) =>
                                setData('visits', {
                                    ...data.visits,
                                    [`visit_${visitNum}`]: e.target.value,
                                })
                            }
                        />
                    </div>
                ))}
            </div>

        </div>
    );
}