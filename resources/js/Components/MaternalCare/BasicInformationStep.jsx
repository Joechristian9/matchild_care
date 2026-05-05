import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function BasicInformationStep({ data, setData, errors }) {
    return (
        <div className="space-y-8">

            {/* SECTION TITLE */}
            <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                            Basic Information
                        </h3>
                        <p className="text-sm text-gray-600">
                            Enter the patient's personal details
                        </p>
                    </div>
                </div>
            </div>

            {/* SECTION 1 - Registration Details */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Registration Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="date_of_registration" value="Date of Registration" required />
                        <TextInput
                            id="date_of_registration"
                            type="date"
                            value={data.date_of_registration}
                            onChange={(e) => setData('date_of_registration', e.target.value)}
                            required
                        />
                        <InputError message={errors.date_of_registration} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="family_serial" value="Family Serial Number" required />
                        <TextInput
                            id="family_serial"
                            type="text"
                            value={data.family_serial}
                            onChange={(e) => setData('family_serial', e.target.value)}
                            placeholder="Enter family serial number"
                            required
                        />
                        <InputError message={errors.family_serial} className="mt-2" />
                    </div>
                </div>
            </div>

            {/* SECTION 2 - NAME */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Full Name
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Address Information
                </h4>
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

            {/* SECTION 4 - Age Information */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                    Age Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                className="bg-gray-100"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-600 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Automatically calculated based on age
                        </p>
                        <InputError message={errors.age_group} className="mt-2" />
                    </div>
                </div>
            </div>

        </div>
    );
}
