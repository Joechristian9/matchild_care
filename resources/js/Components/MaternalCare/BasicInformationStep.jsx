import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

function BasicInformationStep({ data, setData, errors, isEdit = false }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-fr">
            {/* SECTION 1 - Registration Details */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-base font-bold text-gray-900 truncate">Registration Details</h4>
                        <p className="text-xs text-gray-500 truncate">Initial registration information</p>
                    </div>
                    {isEdit && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Locked
                        </span>
                    )}
                </div>
                
                <div className="space-y-4 flex-1">
                    <div>
                        <InputLabel htmlFor="date_of_registration" value="Date of Registration" required />
                        <TextInput
                            id="date_of_registration"
                            type="date"
                            value={data.date_of_registration}
                            onChange={(e) => setData('date_of_registration', e.target.value)}
                            readOnly={isEdit}
                            disabled={isEdit}
                            className={isEdit ? 'bg-gray-50 cursor-not-allowed' : ''}
                            required
                        />
                        {isEdit && (
                            <p className="mt-2 text-xs text-gray-500 flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span>Registration date cannot be changed</span>
                            </p>
                        )}
                        <InputError message={errors.date_of_registration} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="family_serial" value="Family Serial Number" required />
                        <div className="relative">
                            <TextInput
                                id="family_serial"
                                type="text"
                                value={data.family_serial}
                                readOnly
                                className="bg-gradient-to-r from-green-50 to-emerald-50 cursor-not-allowed border-green-200 text-green-900 font-semibold"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <div className="flex items-center gap-1.5 bg-green-100 px-2 py-1 rounded-md">
                                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-xs font-medium text-green-700">{isEdit ? 'Fixed' : 'Auto'}</span>
                                </div>
                            </div>
                        </div>
                        <p className="mt-2 text-xs text-green-600 flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>{isEdit ? 'Family serial is permanent' : 'Auto-generated based on latest record'}</span>
                        </p>
                        <InputError message={errors.family_serial} className="mt-2" />
                    </div>
                </div>
            </div>

            {/* SECTION 2 - Full Name */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-base font-bold text-gray-900 truncate">Full Name</h4>
                        <p className="text-xs text-gray-500 truncate">Patient's complete name</p>
                    </div>
                </div>

                <div className="space-y-4 flex-1">
                    <div>
                        <InputLabel htmlFor="last_name" value="Last Name" required />
                        <TextInput
                            id="last_name"
                            type="text"
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                            placeholder="Last name"
                            required
                        />
                        <InputError message={errors.last_name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="first_name" value="First Name" required />
                        <TextInput
                            id="first_name"
                            type="text"
                            value={data.first_name}
                            onChange={(e) => setData('first_name', e.target.value)}
                            placeholder="First name"
                            required
                        />
                        <InputError message={errors.first_name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="middle_initial" value="Middle Initial" />
                        <TextInput
                            id="middle_initial"
                            type="text"
                            value={data.middle_initial}
                            onChange={(e) => setData('middle_initial', e.target.value.toUpperCase())}
                            placeholder="M.I."
                            maxLength="2"
                        />
                        <InputError message={errors.middle_initial} className="mt-2" />
                    </div>
                </div>
            </div>

            {/* SECTION 3 - Address */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-base font-bold text-gray-900 truncate">Address Information</h4>
                        <p className="text-xs text-gray-500 truncate">Current residential address</p>
                    </div>
                </div>
                
                <div className="flex-1">
                    <InputLabel htmlFor="address" value="Complete Address" required />
                    <TextInput
                        id="address"
                        type="text"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        placeholder="Street, Barangay, City, Province"
                        required
                    />
                    <InputError message={errors.address} className="mt-2" />
                </div>
            </div>

            {/* SECTION 4 - Age Information */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-base font-bold text-gray-900 truncate">Age Information</h4>
                        <p className="text-xs text-gray-500 truncate">Patient's age and category</p>
                    </div>
                </div>
                
                <div className="space-y-4 flex-1">
                    <div>
                        <InputLabel htmlFor="age" value="Age" required />
                        <TextInput
                            id="age"
                            type="number"
                            value={data.age}
                            onChange={(e) => setData('age', e.target.value)}
                            placeholder="Enter age"
                            min="10"
                            max="49"
                            required
                        />
                        <InputError message={errors.age} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="age_group" value="Age Group" />
                        <div className="relative">
                            <TextInput
                                id="age_group"
                                type="text"
                                value={data.age_group ? `${data.age_group} years` : ''}
                                readOnly
                                disabled
                                placeholder="Auto-calculated"
                                className="bg-gray-50"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500 flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Automatically calculated based on age</span>
                        </p>
                        <InputError message={errors.age_group} className="mt-2" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasicInformationStep;
