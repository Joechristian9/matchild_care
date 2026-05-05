import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import FormSection from '@/Components/FormSection';

export default function DeliveryPostnatalStep({ data, setData }) {
    return (
        <div className="space-y-6">
            {/* Delivery Information */}
            <FormSection 
                title="Delivery Information"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Delivery Type */}
                    <div>
                        <InputLabel htmlFor="delivery_type" value="Delivery Type" />
                        <select
                            id="delivery_type"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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
                            className="mt-1 block w-full"
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
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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
            </FormSection>

            {/* Place of Delivery */}
            <FormSection 
                title="Place of Delivery"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Health Facility */}
                    <div className="border border-gray-100 rounded p-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Health Facility</h4>
                        <div className="space-y-3">
                            <div>
                                <InputLabel htmlFor="facility_type" value="Facility Type" className="text-xs" />
                                <select
                                    id="facility_type"
                                    className="mt-1 block w-full text-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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
                                    className="mt-1 block w-full text-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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
                    <div className="border border-gray-100 rounded p-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Non-Health Facility</h4>
                        <div>
                            <InputLabel htmlFor="non_health_facility" value="Location Type" className="text-xs" />
                            <select
                                id="non_health_facility"
                                className="mt-1 block w-full text-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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
            </FormSection>

            {/* Birth Attendant and Delivery Details */}
            <FormSection 
                title="Birth Attendant and Delivery Details"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="birth_attendant" value="Birth Attendant" />
                        <select
                            id="birth_attendant"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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
                        <InputLabel htmlFor="delivery_date" value="Date of Delivery (mm/dd/yy)" />
                        <TextInput
                            id="delivery_date"
                            type="date"
                            className="mt-1 block w-full"
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
                            className="mt-1 block w-full"
                            value={data.delivery_info.delivery_time}
                            onChange={(e) => setData('delivery_info', {
                                ...data.delivery_info,
                                delivery_time: e.target.value
                            })}
                        />
                    </div>
                </div>
            </FormSection>

            {/* Date of Postnatal Care (4PNC) */}
            <FormSection 
                title="Date of Postnatal Care (4PNC) - mm/dd/yy"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <InputLabel htmlFor="contact_1" value="Contact 1 - within 24 hours after delivery" className="text-xs" />
                        <TextInput
                            id="contact_1"
                            type="date"
                            className="mt-1 block w-full text-sm"
                            value={data.postnatal_care.contact_1}
                            onChange={(e) => setData('postnatal_care', {
                                ...data.postnatal_care,
                                contact_1: e.target.value
                            })}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="contact_2" value="Contact 2 - on day 3" className="text-xs" />
                        <TextInput
                            id="contact_2"
                            type="date"
                            className="mt-1 block w-full text-sm"
                            value={data.postnatal_care.contact_2}
                            onChange={(e) => setData('postnatal_care', {
                                ...data.postnatal_care,
                                contact_2: e.target.value
                            })}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="contact_3" value="Contact 3 - between 7-14 days" className="text-xs" />
                        <TextInput
                            id="contact_3"
                            type="date"
                            className="mt-1 block w-full text-sm"
                            value={data.postnatal_care.contact_3}
                            onChange={(e) => setData('postnatal_care', {
                                ...data.postnatal_care,
                                contact_3: e.target.value
                            })}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="contact_4" value="Contact 4 - 6 weeks after birth" className="text-xs" />
                        <TextInput
                            id="contact_4"
                            type="date"
                            className="mt-1 block w-full text-sm"
                            value={data.postnatal_care.contact_4}
                            onChange={(e) => setData('postnatal_care', {
                                ...data.postnatal_care,
                                contact_4: e.target.value
                            })}
                        />
                    </div>
                </div>

                <div className="mt-4">
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
            </FormSection>

            {/* Postpartum Supplementation */}
            <FormSection 
                title="Postpartum Supplementation" 
                description="Iron with Folic Acid (IFA) Supplementation"
            >
                <div className="mb-3">
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    {[1, 2, 3].map((visitNum) => (
                        <div key={visitNum} className="border border-gray-100 rounded p-3">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                                {visitNum === 1 ? '1st' : visitNum === 2 ? '2nd' : '3rd'} Visit
                            </h4>
                            <div className="space-y-2">
                                <div>
                                    <InputLabel htmlFor={`postpartum_date_${visitNum}`} value="Date" className="text-xs" />
                                    <TextInput
                                        id={`postpartum_date_${visitNum}`}
                                        type="date"
                                        className="mt-1 block w-full text-sm"
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
                                        placeholder="Number"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-200 pt-4">
                    {/* Completed IFA Supply - 1st */}
                    <div className="border border-gray-100 rounded p-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Completed IFA Supply - 1st</h4>
                        <div className="space-y-2">
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
                    <div className="border border-gray-100 rounded p-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Completed IFA Supply - 2nd</h4>
                        <div className="space-y-2">
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

                <div className="mt-4">
                    <InputLabel htmlFor="postpartum_remarks" value="Remarks" />
                    <select
                        id="postpartum_remarks"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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
            </FormSection>
        </div>
    );
}
