import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import FormSection from '@/Components/FormSection';

export default function AdditionalInformationStep({ data, setData }) {
    return (
        <div className="space-y-10">

            {/* NUTRITIONAL ASSESSMENT */}
            <FormSection 
                title="Nutritional Assessment" 
                description="BMI and weight monitoring across trimesters"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <InputLabel htmlFor="height" value="Height (cm)" />
                        <TextInput
                            id="height"
                            type="number"
                            step="0.1"
                            className="mt-2 block w-full"
                            value={data.nutritional_assessment.height}
                            onChange={(e) => setData('nutritional_assessment', {
                                ...data.nutritional_assessment,
                                height: e.target.value
                            })}
                            placeholder="Enter height"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="bmi_1st" value="BMI (1st Trimester)" />
                        <TextInput
                            id="bmi_1st"
                            type="number"
                            step="0.1"
                            className="mt-2 block w-full"
                            value={data.nutritional_assessment.bmi_1st}
                            onChange={(e) => setData('nutritional_assessment', {
                                ...data.nutritional_assessment,
                                bmi_1st: e.target.value
                            })}
                            placeholder="Enter BMI"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="weight_1st" value="Weight 1st Trimester (kg)" />
                        <TextInput
                            id="weight_1st"
                            type="number"
                            step="0.1"
                            className="mt-2 block w-full"
                            value={data.nutritional_assessment.weight_1st}
                            onChange={(e) => setData('nutritional_assessment', {
                                ...data.nutritional_assessment,
                                weight_1st: e.target.value
                            })}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="weight_2nd" value="Weight 2nd Trimester (kg)" />
                        <TextInput
                            id="weight_2nd"
                            type="number"
                            step="0.1"
                            className="mt-2 block w-full"
                            value={data.nutritional_assessment.weight_2nd}
                            onChange={(e) => setData('nutritional_assessment', {
                                ...data.nutritional_assessment,
                                weight_2nd: e.target.value
                            })}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="weight_3rd" value="Weight 3rd Trimester (kg)" />
                        <TextInput
                            id="weight_3rd"
                            type="number"
                            step="0.1"
                            className="mt-2 block w-full"
                            value={data.nutritional_assessment.weight_3rd}
                            onChange={(e) => setData('nutritional_assessment', {
                                ...data.nutritional_assessment,
                                weight_3rd: e.target.value
                            })}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="remarks" value="Remarks" />
                        <select
                            id="remarks"
                            className="mt-2 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm"
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

            {/* IMMUNIZATION */}
            <FormSection 
                title="Immunization Status" 
                description="Tetanus Diphtheria (Td) vaccination records"
            >
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-6">
                    {['td1_tt1', 'td2_tt2', 'td3_tt3', 'td4_tt4', 'td5_tt5'].map((field, index) => (
                        <div key={field}>
                            <InputLabel htmlFor={field} value={`Td${index + 1}/TT${index + 1}`} />
                            <TextInput
                                id={field}
                                type="date"
                                className="mt-2 block w-full"
                                value={data.immunization_status[field]}
                                onChange={(e) => setData('immunization_status', {
                                    ...data.immunization_status,
                                    [field]: e.target.value
                                })}
                            />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="fully_immunized" value="Fully Immunized Mother (FIM)" />
                        <select
                            id="fully_immunized"
                            className="mt-2 block w-full border-gray-300 rounded-lg shadow-sm"
                            value={data.immunization_status.fully_immunized}
                            onChange={(e) => setData('immunization_status', {
                                ...data.immunization_status,
                                fully_immunized: e.target.value
                            })}
                        >
                            <option value="">Select</option>
                            <option value="Y">Yes</option>
                            <option value="N">No</option>
                            <option value="X">Unknown</option>
                        </select>
                    </div>

                    <div>
                        <InputLabel htmlFor="received_deworming" value="Deworming Date" />
                        <TextInput
                            id="received_deworming"
                            type="date"
                            className="mt-2 block w-full"
                            value={data.immunization_status.received_deworming}
                            onChange={(e) => setData('immunization_status', {
                                ...data.immunization_status,
                                received_deworming: e.target.value
                            })}
                        />
                    </div>
                </div>
            </FormSection>

            {/* PRENATAL SUPPLEMENTATION */}
            <FormSection 
                title="Prenatal Supplementation" 
                description="Iron Folic Acid (IFA) distribution tracking"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((visitNum) => (
                        <div
                            key={visitNum}
                            className="border border-gray-200 rounded-xl p-4 bg-gray-50"
                        >
                            <h4 className="text-sm font-semibold text-gray-800 mb-3">
                                Visit {visitNum}
                            </h4>

                            <div className="space-y-3">
                                <div>
                                    <InputLabel value="Date" className="text-xs" />
                                    <TextInput
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
                                    <InputLabel value="# Tablets" className="text-xs" />
                                    <TextInput
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
                                        placeholder="Enter number"
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