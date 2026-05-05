import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import FormSection from '@/Components/FormSection';

export default function AdditionalInformationStep({ data, setData }) {
    return (
        <div className="space-y-8">
            {/* Nutritional Assessment */}
            <FormSection 
                title="Nutritional Assessment" 
                description="Write the BMI for 1st Trimester (1st visit)"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="height" value="Height (cm)" />
                        <TextInput
                            id="height"
                            type="number"
                            step="0.1"
                            className="mt-1 block w-full"
                            value={data.nutritional_assessment.height}
                            onChange={(e) => setData('nutritional_assessment', {
                                ...data.nutritional_assessment,
                                height: e.target.value
                            })}
                            placeholder="Height in cm"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="bmi_1st" value="BMI (1st Trimester)" />
                        <TextInput
                            id="bmi_1st"
                            type="number"
                            step="0.1"
                            className="mt-1 block w-full"
                            value={data.nutritional_assessment.bmi_1st}
                            onChange={(e) => setData('nutritional_assessment', {
                                ...data.nutritional_assessment,
                                bmi_1st: e.target.value
                            })}
                            placeholder="BMI"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="weight_1st" value="Weight 1st Trimester (kg)" />
                        <TextInput
                            id="weight_1st"
                            type="number"
                            step="0.1"
                            className="mt-1 block w-full"
                            value={data.nutritional_assessment.weight_1st}
                            onChange={(e) => setData('nutritional_assessment', {
                                ...data.nutritional_assessment,
                                weight_1st: e.target.value
                            })}
                            placeholder="Weight"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="weight_2nd" value="Weight 2nd Trimester (kg)" />
                        <TextInput
                            id="weight_2nd"
                            type="number"
                            step="0.1"
                            className="mt-1 block w-full"
                            value={data.nutritional_assessment.weight_2nd}
                            onChange={(e) => setData('nutritional_assessment', {
                                ...data.nutritional_assessment,
                                weight_2nd: e.target.value
                            })}
                            placeholder="Weight"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="weight_3rd" value="Weight 3rd Trimester (kg)" />
                        <TextInput
                            id="weight_3rd"
                            type="number"
                            step="0.1"
                            className="mt-1 block w-full"
                            value={data.nutritional_assessment.weight_3rd}
                            onChange={(e) => setData('nutritional_assessment', {
                                ...data.nutritional_assessment,
                                weight_3rd: e.target.value
                            })}
                            placeholder="Weight"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="remarks" value="Remarks" />
                        <select
                            id="remarks"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={data.nutritional_assessment.remarks}
                            onChange={(e) => setData('nutritional_assessment', {
                                ...data.nutritional_assessment,
                                remarks: e.target.value
                            })}
                        >
                            <option value="">Select status</option>
                            <option value="N">N - Normal</option>
                            <option value="U">U - Underweight</option>
                            <option value="O">O - Overweight</option>
                            <option value="A">A - Receiving 8 ANC</option>
                            <option value="B">B - Trans Out before receiving 8 ANC</option>
                        </select>
                    </div>
                </div>
            </FormSection>

            {/* Immunization Status */}
            <FormSection 
                title="Immunization Status" 
                description="Date Tetanus Diphtheria (Td) - containing vaccine given (mm/dd/yy)"
            >
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    {['td1_tt1', 'td2_tt2', 'td3_tt3', 'td4_tt4', 'td5_tt5'].map((field, index) => (
                        <div key={field}>
                            <InputLabel htmlFor={field} value={`Td${index + 1}/TT${index + 1}`} />
                            <TextInput
                                id={field}
                                type="date"
                                className="mt-1 block w-full"
                                value={data.immunization_status[field]}
                                onChange={(e) => setData('immunization_status', {
                                    ...data.immunization_status,
                                    [field]: e.target.value
                                })}
                            />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="fully_immunized" value="Fully Immunized Mother (FIM) Status" />
                        <select
                            id="fully_immunized"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={data.immunization_status.fully_immunized}
                            onChange={(e) => setData('immunization_status', {
                                ...data.immunization_status,
                                fully_immunized: e.target.value
                            })}
                        >
                            <option value="">Select</option>
                            <option value="Y">Yes</option>
                            <option value="N">No</option>
                            <option value="X">Unknown (Y or X)</option>
                        </select>
                    </div>

                    <div>
                        <InputLabel htmlFor="received_deworming" value="Received 1 Dose Deworming Tablet?" />
                        <TextInput
                            id="received_deworming"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.immunization_status.received_deworming}
                            onChange={(e) => setData('immunization_status', {
                                ...data.immunization_status,
                                received_deworming: e.target.value
                            })}
                        />
                        <p className="mt-1 text-xs text-gray-500">Date (mm/dd/yy)</p>
                    </div>
                </div>
            </FormSection>

            {/* Prenatal Supplementation */}
            <FormSection 
                title="Prenatal Supplementation" 
                description="Iron Folic Acid (IFA) Supplementation - Number of Tablets Given at Date (mm/dd/yy)"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((visitNum) => (
                        <div key={visitNum} className="border border-gray-100 rounded p-3">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                                {visitNum === 1 ? '1st' : visitNum === 2 ? '2nd' : visitNum === 3 ? '3rd' : `${visitNum}th`} Visit
                            </h4>
                            <div className="space-y-2">
                                <div>
                                    <InputLabel htmlFor={`ifa_date_${visitNum}`} value="Date" className="text-xs" />
                                    <TextInput
                                        id={`ifa_date_${visitNum}`}
                                        type="date"
                                        className="mt-1 block w-full text-sm"
                                        value={data.prenatal_supplementation.iron_folic_acid[visitNum - 1]?.date || ''}
                                        onChange={(e) => {
                                            const newIFA = [...data.prenatal_supplementation.iron_folic_acid];
                                            newIFA[visitNum - 1] = {
                                                ...newIFA[visitNum - 1],
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
                                    <InputLabel htmlFor={`ifa_tablets_${visitNum}`} value="# Tablets" className="text-xs" />
                                    <TextInput
                                        id={`ifa_tablets_${visitNum}`}
                                        type="number"
                                        className="mt-1 block w-full text-sm"
                                        value={data.prenatal_supplementation.iron_folic_acid[visitNum - 1]?.tablets || ''}
                                        onChange={(e) => {
                                            const newIFA = [...data.prenatal_supplementation.iron_folic_acid];
                                            newIFA[visitNum - 1] = {
                                                ...newIFA[visitNum - 1],
                                                tablets: e.target.value
                                            };
                                            setData('prenatal_supplementation', {
                                                ...data.prenatal_supplementation,
                                                iron_folic_acid: newIFA
                                            });
                                        }}
                                        placeholder="Number"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </FormSection>
        </div>
    );
}
