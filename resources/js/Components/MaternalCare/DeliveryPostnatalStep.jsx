import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';

export default function DeliveryPostnatalStep({ data, setData }) {
    return (
        <div className="space-y-6">
            {/* Delivery Information */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-base font-bold text-gray-900 truncate">Delivery Information</h4>
                        <p className="text-xs text-gray-500 truncate">Birth details and delivery type</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Delivery Type */}
                    <div>
                        <InputLabel htmlFor="delivery_type" value="Delivery Type" />
                        <select
                            id="delivery_type"
                            className="mt-2 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
                            value={data.delivery_info.delivery_type}
                            onChange={(e) => setData('delivery_info', {
                                ...data.delivery_info,
                                delivery_type: e.target.value
                            })}
                        >
                            <option value="">Select type</option>
                            <option value="CS">CS - Cesarean Section</option>
                            <option value="VD">VD - Vaginal Delivery</option>
                            <option value="VBAC">VBAC - Vaginal Birth After Cesarean</option>
                            <option value="Combined">Combined Vaginal Cesarean</option>
                        </select>
                    </div>

                    {/* Birth Weight */}
                    <div>
                        <InputLabel htmlFor="birth_weight" value="Birth Weight (in grams)" />
                        <TextInput
                            id="birth_weight"
                            type="number"
                            className="mt-2 block w-full"
                            value={data.delivery_info.birth_weight}
                            onChange={(e) => setData('delivery_info', {
                                ...data.delivery_info,
                                birth_weight: e.target.value
                            })}
                            placeholder="Weight in grams"
                        />
                    </div>

                    {/* Birth Weight Category */}
                    <div>
                        <InputLabel htmlFor="weight_category" value="Weight Category" />
                        <select
                            id="weight_category"
                            className="mt-2 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
                            value={data.delivery_info.weight_category}
                            onChange={(e) => setData('delivery_info', {
                                ...data.delivery_info,
                                weight_category: e.target.value
                            })}
                        >
                            <option value="">Select category</option>
                            <option value="A">A - Normal</option>
                            <option value="B">B - Low</option>
                            <option value="C">C - Unknown</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Place of Delivery */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-base font-bold text-gray-900 truncate">Place of Delivery</h4>
                        <p className="text-xs text-gray-500 truncate">Facility type and location</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Health Facility */}
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                        <h4 className="text-sm font-semibold text-gray-800 mb-4">Health Facility</h4>
                        <div className="space-y-4">
                            <div>
                                <InputLabel htmlFor="facility_type" value="Facility Type" className="text-xs" />
                                <select
                                    id="facility_type"
                                    className="mt-2 block w-full text-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
                                    value={data.delivery_info.place_of_delivery.health_facility.type}
                                    onChange={(e) => setData('delivery_info', {
                                        ...data.delivery_info,
                                        place_of_delivery: {
                                            ...data.delivery_info.place_of_delivery,
                                            health_facility: {
                                                ...data.delivery_info.place_of_delivery.health_facility,
                                                type: e.target.value
                                            }
                                        }
                                    })}
                                >
                                    <option value="">Select facility</option>
                                    <option value="BHS">BHS - Barangay Health Station</option>
                                    <option value="RHU/LHU">RHU/LHU - Rural/Local Health Unit</option>
                                    <option value="Government">Government Hospital</option>
                                    <option value="Public">Public Hospital</option>
                                    <option value="Maternity">Maternity Clinic</option>
                                    <option value="DOH">DOH Licensed Ambulance</option>
                                </select>
                            </div>
                            <div>
                                <InputLabel htmlFor="facility_capable" value="Facility Capability" className="text-xs" />
                                <select
                                    id="facility_capable"
                                    className="mt-2 block w-full text-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
                                    value={data.delivery_info.place_of_delivery.health_facility.capable}
                                    onChange={(e) => setData('delivery_info', {
                                        ...data.delivery_info,
                                        place_of_delivery: {
                                            ...data.delivery_info.place_of_delivery,
                                            health_facility: {
                                                ...data.delivery_info.place_of_delivery.health_facility,
                                                capable: e.target.value
                                            }
                                        }
                                    })}
                                >
                                    <option value="">Select capability</option>
                                    <option value="BEmONC">BEmONC - Basic Emergency Obstetric Care</option>
                                    <option value="CEmONC">CEmONC - Comprehensive Emergency Obstetric Care</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Non-Health Facility */}
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                        <h4 className="text-sm font-semibold text-gray-800 mb-4">Non-Health Facility</h4>
                        <div>
                            <InputLabel htmlFor="non_health_facility" value="Location Type" className="text-xs" />
                            <select
                                id="non_health_facility"
                                className="mt-2 block w-full text-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
                                value={data.delivery_info.place_of_delivery.non_health_facility}
                                onChange={(e) => setData('delivery_info', {
                                    ...data.delivery_info,
                                    place_of_delivery: {
                                        ...data.delivery_info.place_of_delivery,
                                        non_health_facility: e.target.value
                                    }
                                })}
                            >
                                <option value="">Select location</option>
                                <option value="Home">Home</option>
                                <option value="Others">Others (including emergency transport)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Birth Attendant and Delivery Details */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-base font-bold text-gray-900 truncate">Birth Attendant & Details</h4>
                        <p className="text-xs text-gray-500 truncate">Attendant information and delivery date/time</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <InputLabel htmlFor="birth_attendant" value="Birth Attendant" />
                        <select
                            id="birth_attendant"
                            className="mt-2 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
                            value={data.delivery_info.birth_attendant}
                            onChange={(e) => setData('delivery_info', {
                                ...data.delivery_info,
                                birth_attendant: e.target.value
                            })}
                        >
                            <option value="">Select attendant</option>
                            <option value="MD">MD - Doctor</option>
                            <option value="RN">RN - Nurse</option>
                            <option value="MW">MW - Midwife</option>
                            <option value="O">O - Others</option>
                            <option value="N/A">N/A - Not Specified</option>
                        </select>
                    </div>

                    <div>
                        <InputLabel htmlFor="delivery_date" value="Date of Delivery" />
                        <TextInput
                            id="delivery_date"
                            type="date"
                            className="mt-2 block w-full"
                            value={data.delivery_info.delivery_date}
                            onChange={(e) => setData('delivery_info', {
                                ...data.delivery_info,
                                delivery_date: e.target.value
                            })}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="delivery_time" value="Time of Delivery" />
                        <TextInput
                            id="delivery_time"
                            type="time"
                            className="mt-2 block w-full"
                            value={data.delivery_info.delivery_time}
                            onChange={(e) => setData('delivery_info', {
                                ...data.delivery_info,
                                delivery_time: e.target.value
                            })}
                        />
                    </div>
                </div>
            </div>

            {/* Date of Postnatal Care (4PNC) */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-base font-bold text-gray-900 truncate">Postnatal Care (4PNC)</h4>
                        <p className="text-xs text-gray-500 truncate">Four postnatal care contact dates</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                        <InputLabel htmlFor="contact_1" value="Contact 1" className="text-xs" />
                        <TextInput
                            id="contact_1"
                            type="date"
                            className="mt-2 block w-full text-sm"
                            value={data.postnatal_care.contact_1}
                            onChange={(e) => setData('postnatal_care', {
                                ...data.postnatal_care,
                                contact_1: e.target.value
                            })}
                        />
                        <p className="mt-1 text-xs text-gray-500">Within 24 hours</p>
                    </div>

                    <div>
                        <InputLabel htmlFor="contact_2" value="Contact 2" className="text-xs" />
                        <TextInput
                            id="contact_2"
                            type="date"
                            className="mt-2 block w-full text-sm"
                            value={data.postnatal_care.contact_2}
                            onChange={(e) => setData('postnatal_care', {
                                ...data.postnatal_care,
                                contact_2: e.target.value
                            })}
                        />
                        <p className="mt-1 text-xs text-gray-500">On day 3</p>
                    </div>

                    <div>
                        <InputLabel htmlFor="contact_3" value="Contact 3" className="text-xs" />
                        <TextInput
                            id="contact_3"
                            type="date"
                            className="mt-2 block w-full text-sm"
                            value={data.postnatal_care.contact_3}
                            onChange={(e) => setData('postnatal_care', {
                                ...data.postnatal_care,
                                contact_3: e.target.value
                            })}
                        />
                        <p className="mt-1 text-xs text-gray-500">Between 7-14 days</p>
                    </div>

                    <div>
                        <InputLabel htmlFor="contact_4" value="Contact 4" className="text-xs" />
                        <TextInput
                            id="contact_4"
                            type="date"
                            className="mt-2 block w-full text-sm"
                            value={data.postnatal_care.contact_4}
                            onChange={(e) => setData('postnatal_care', {
                                ...data.postnatal_care,
                                contact_4: e.target.value
                            })}
                        />
                        <p className="mt-1 text-xs text-gray-500">6 weeks after birth</p>
                    </div>
                </div>

                <div className="mt-6">
                    <label className="flex items-center">
                        <Checkbox
                            checked={data.postnatal_care.completed_4pnc}
                            onChange={(e) => setData('postnatal_care', {
                                ...data.postnatal_care,
                                completed_4pnc: e.target.checked
                            })}
                        />
                        <span className="ml-2 text-sm text-gray-700">Completed 4PNC (6 weeks after birth)?</span>
                    </label>
                </div>
            </div>

            {/* Postpartum Supplementation */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-base font-bold text-gray-900 truncate">Postpartum Supplementation</h4>
                        <p className="text-xs text-gray-500 truncate">Iron with Folic Acid (IFA) Supplementation</p>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="flex items-center">
                        <Checkbox
                            checked={data.postpartum_supplementation.completed_ifa}
                            onChange={(e) => setData('postpartum_supplementation', {
                                ...data.postpartum_supplementation,
                                completed_ifa: e.target.checked
                            })}
                        />
                        <span className="ml-2 text-sm text-gray-700">Completed IFA Supplementation?</span>
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {[1, 2, 3].map((visitNum) => {
                        const currentVisit = data.postpartum_supplementation.visits[visitNum - 1];
                        const hasDate = currentVisit?.date;
                        const hasTablets = currentVisit?.tablets;
                        const isCompleted = hasDate && hasTablets;
                        
                        // Get suggested date for next visit
                        const getSuggestedPostpartumDate = () => {
                            if (visitNum === 1) return null;
                            const prevVisit = data.postpartum_supplementation.visits[visitNum - 2];
                            const prevDate = prevVisit?.date;
                            
                            if (prevDate && !hasDate) {
                                const prev = new Date(prevDate);
                                const suggested = new Date(prev);
                                suggested.setDate(prev.getDate() + 28); // 4 weeks
                                return suggested.toISOString().split('T')[0];
                            }
                            return null;
                        };
                        
                        const suggestedDate = getSuggestedPostpartumDate();
                        
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
                                        {visitNum === 1 ? '1st' : visitNum === 2 ? '2nd' : '3rd'} Visit
                                    </h5>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <InputLabel htmlFor={`postpartum_date_${visitNum}`} value="Date" className="text-xs" />
                                        <TextInput
                                            id={`postpartum_date_${visitNum}`}
                                            type="date"
                                            className={`mt-1 block w-full text-sm ${isCompleted ? 'border-green-300' : ''}`}
                                            value={data.postpartum_supplementation.visits[visitNum - 1]?.date || ''}
                                            onChange={(e) => {
                                                const newVisits = [...data.postpartum_supplementation.visits];
                                                newVisits[visitNum - 1] = {
                                                    ...newVisits[visitNum - 1],
                                                    date: e.target.value
                                                };
                                                setData('postpartum_supplementation', {
                                                    ...data.postpartum_supplementation,
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
                                        <InputLabel htmlFor={`postpartum_tablets_${visitNum}`} value="# Tablets Given" className="text-xs" />
                                        <TextInput
                                            id={`postpartum_tablets_${visitNum}`}
                                            type="number"
                                            className="mt-1 block w-full text-sm"
                                            value={data.postpartum_supplementation.visits[visitNum - 1]?.tablets || ''}
                                            onChange={(e) => {
                                                const newVisits = [...data.postpartum_supplementation.visits];
                                                newVisits[visitNum - 1] = {
                                                    ...newVisits[visitNum - 1],
                                                    tablets: e.target.value
                                                };
                                                setData('postpartum_supplementation', {
                                                    ...data.postpartum_supplementation,
                                                    visits: newVisits
                                                });
                                            }}
                                            placeholder="Enter number"
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Completed IFA Supply - 1st */}
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                        <h4 className="text-sm font-semibold text-gray-800 mb-3">Completed IFA Supply - 1st</h4>
                        <div className="space-y-3">
                            <div className="flex gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="completed_ifa_1st"
                                        value="yes"
                                        checked={data.postpartum_supplementation.completed_ifa_1st === 'yes'}
                                        onChange={(e) => setData('postpartum_supplementation', {
                                            ...data.postpartum_supplementation,
                                            completed_ifa_1st: e.target.value
                                        })}
                                        className="rounded-full border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="completed_ifa_1st"
                                        value="no"
                                        checked={data.postpartum_supplementation.completed_ifa_1st === 'no'}
                                        onChange={(e) => setData('postpartum_supplementation', {
                                            ...data.postpartum_supplementation,
                                            completed_ifa_1st: e.target.value
                                        })}
                                        className="rounded-full border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">No</span>
                                </label>
                            </div>
                            <div>
                                <InputLabel htmlFor="date_completed_1st" value="Date Completed" className="text-xs" />
                                <TextInput
                                    id="date_completed_1st"
                                    type="date"
                                    className="mt-1 block w-full text-sm"
                                    value={data.postpartum_supplementation.date_completed_1st}
                                    onChange={(e) => setData('postpartum_supplementation', {
                                        ...data.postpartum_supplementation,
                                        date_completed_1st: e.target.value
                                    })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Completed IFA Supply - 2nd */}
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                        <h4 className="text-sm font-semibold text-gray-800 mb-3">Completed IFA Supply - 2nd</h4>
                        <div className="space-y-3">
                            <div className="flex gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="completed_ifa_2nd"
                                        value="yes"
                                        checked={data.postpartum_supplementation.completed_ifa_2nd === 'yes'}
                                        onChange={(e) => setData('postpartum_supplementation', {
                                            ...data.postpartum_supplementation,
                                            completed_ifa_2nd: e.target.value
                                        })}
                                        className="rounded-full border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="completed_ifa_2nd"
                                        value="no"
                                        checked={data.postpartum_supplementation.completed_ifa_2nd === 'no'}
                                        onChange={(e) => setData('postpartum_supplementation', {
                                            ...data.postpartum_supplementation,
                                            completed_ifa_2nd: e.target.value
                                        })}
                                        className="rounded-full border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">No</span>
                                </label>
                            </div>
                            <div>
                                <InputLabel htmlFor="date_completed_2nd" value="Date Completed" className="text-xs" />
                                <TextInput
                                    id="date_completed_2nd"
                                    type="date"
                                    className="mt-1 block w-full text-sm"
                                    value={data.postpartum_supplementation.date_completed_2nd}
                                    onChange={(e) => setData('postpartum_supplementation', {
                                        ...data.postpartum_supplementation,
                                        date_completed_2nd: e.target.value
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="postpartum_remarks" value="Remarks" />
                    <select
                        id="postpartum_remarks"
                        className="mt-2 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
                        value={data.postpartum_supplementation.remarks}
                        onChange={(e) => setData('postpartum_supplementation', {
                            ...data.postpartum_supplementation,
                            remarks: e.target.value
                        })}
                    >
                        <option value="">Select remark</option>
                        <option value="A">A - Trans In</option>
                        <option value="B">B - Trans Out</option>
                        <option value="C">C - Died before completing 4PN</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
