import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function MedicalInformationStep({ data, setData, errors }) {
    return (
        <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-2xl p-8 border border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-200">
            {/* Card Header */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-indigo-100">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200/50">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                </div>
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900">Medical Information</h3>
                    <p className="text-sm text-gray-600 mt-1">Pregnancy history and timeline</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Last Menstrual Period */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">Last Menstrual Period</h4>
                            <p className="text-xs text-gray-500">First day of last period</p>
                        </div>
                    </div>
                    <InputLabel htmlFor="last_menstrual_period" value="LMP Date" required />
                    <TextInput
                        id="last_menstrual_period"
                        type="date"
                        value={data.last_menstrual_period}
                        onChange={(e) => setData('last_menstrual_period', e.target.value)}
                        required
                        className="w-full"
                    />
                    <InputError message={errors.last_menstrual_period} className="mt-2" />
                </div>

                {/* Expected Date of Delivery */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">Expected Date of Delivery</h4>
                        </div>
                    </div>
                    <InputLabel htmlFor="expected_date_of_delivery" value="EDD" />
                    <div className="relative">
                        <div className="w-full px-4 py-3 bg-indigo-50/50 border border-indigo-200 rounded-lg text-gray-700">
                            {data.expected_date_of_delivery 
                                ? new Date(data.expected_date_of_delivery).toLocaleDateString('en-US', { 
                                    month: '2-digit', 
                                    day: '2-digit', 
                                    year: 'numeric' 
                                })
                                : 'Enter Last Menstrual Period to calculate'
                            }
                        </div>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <p className="mt-2 text-xs text-indigo-600 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">Gravida</h4>
                            <p className="text-xs text-gray-500">Total number of pregnancies</p>
                        </div>
                    </div>
                    <InputLabel htmlFor="gravida" value="Number of Pregnancies" required />
                    <TextInput
                        id="gravida"
                        type="number"
                        value={data.gravida}
                        onChange={(e) => setData('gravida', e.target.value)}
                        placeholder="Enter number"
                        min="1"
                        required
                        className="w-full"
                    />
                    <p className="mt-2 text-xs text-gray-500 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">Parity</h4>
                            <p className="text-xs text-gray-500">Number of births after 20 weeks</p>
                        </div>
                    </div>
                    <InputLabel htmlFor="parity" value="Number of Births" required />
                    <TextInput
                        id="parity"
                        type="number"
                        value={data.parity}
                        onChange={(e) => setData('parity', e.target.value)}
                        placeholder="Enter number"
                        min="0"
                        required
                        className="w-full"
                    />
                    <p className="mt-2 text-xs text-gray-500 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Live or stillbirths ≥20 weeks gestation</span>
                    </p>
                    <InputError message={errors.parity} className="mt-2" />
                </div>
            </div>
        </div>
    );
}