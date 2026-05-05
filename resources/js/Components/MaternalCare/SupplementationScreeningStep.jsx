import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import FormSection from '@/Components/FormSection';

export default function SupplementationScreeningStep({ data, setData }) {
    return (
        <div className="space-y-6">
            {/* Multiple Micronutrient Supplementation (MMS) */}
            <FormSection 
                title="Multiple Micronutrient Supplementation (MMS)" 
                description="Number of Tablets Given at Date (mm/dd/yy)"
            >
                <div className="mb-3">
                    <label className="flex items-center">
                        <Checkbox
                            checked={data.micronutrient_supplementation.completed}
                            onChange={(e) => setData('micronutrient_supplementation', {
                                ...data.micronutrient_supplementation,
                                completed: e.target.checked
                            })}
                        />
                        <span className="ml-2 text-sm text-gray-700">Completed MMS Supplementation?</span>
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((visitNum) => (
                        <div key={visitNum} className="border border-gray-100 rounded p-3">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                                {visitNum === 1 ? '1st' : visitNum === 2 ? '2nd' : visitNum === 3 ? '3rd' : `${visitNum}th`} Visit
                            </h4>
                            <div className="space-y-2">
                                <div>
                                    <InputLabel htmlFor={`mms_date_${visitNum}`} value="Date" className="text-xs" />
                                    <TextInput
                                        id={`mms_date_${visitNum}`}
                                        type="date"
                                        className="mt-1 block w-full text-sm"
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
                                </div>
                                <div>
                                    <InputLabel htmlFor={`mms_tablets_${visitNum}`} value="# Tablets" className="text-xs" />
                                    <TextInput
                                        id={`mms_tablets_${visitNum}`}
                                        type="number"
                                        className="mt-1 block w-full text-sm"
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
                                        placeholder="Number"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </FormSection>

            {/* High Risk Pregnant - Calcium Supplementation */}
            <FormSection 
                title="For High Risk Pregnant - Calcium Carbonate (CaCO3) Supplementation" 
                description="Number of Tablets Given at Date (mm/dd/yy)"
            >
                <div className="mb-3">
                    <label className="flex items-center">
                        <Checkbox
                            checked={data.high_risk_supplementation.completed}
                            onChange={(e) => setData('high_risk_supplementation', {
                                ...data.high_risk_supplementation,
                                completed: e.target.checked
                            })}
                        />
                        <span className="ml-2 text-sm text-gray-700">Completed Calcium Supplementation?</span>
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map((visitNum) => (
                        <div key={visitNum} className="border border-gray-100 rounded p-3">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                                {visitNum === 1 ? '1st' : visitNum === 2 ? '2nd' : visitNum === 3 ? '3rd' : `${visitNum}th`} Visit
                            </h4>
                            <div className="space-y-2">
                                <div>
                                    <InputLabel htmlFor={`calcium_date_${visitNum}`} value="Date" className="text-xs" />
                                    <TextInput
                                        id={`calcium_date_${visitNum}`}
                                        type="date"
                                        className="mt-1 block w-full text-sm"
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
                                </div>
                                <div>
                                    <InputLabel htmlFor={`calcium_tablets_${visitNum}`} value="# Tablets" className="text-xs" />
                                    <TextInput
                                        id={`calcium_tablets_${visitNum}`}
                                        type="number"
                                        className="mt-1 block w-full text-sm"
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
                                        placeholder="Number"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </FormSection>

            {/* Laboratory Screenings */}
            <FormSection 
                title="Laboratory Screenings"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Hepatitis B */}
                    <div className="border border-gray-100 rounded p-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Hepatitis B</h4>
                        <div className="space-y-2">
                            <div>
                                <label className="flex items-center mb-2">
                                    <Checkbox
                                        checked={data.laboratory_screening.hepatitis_b.completed}
                                        onChange={(e) => setData('laboratory_screening', {
                                            ...data.laboratory_screening,
                                            hepatitis_b: {
                                                ...data.laboratory_screening.hepatitis_b,
                                                completed: e.target.checked
                                            }
                                        })}
                                    />
                                    <span className="ml-2 text-xs text-gray-700">Completed</span>
                                </label>
                            </div>
                            <div>
                                <InputLabel htmlFor="hepatitis_b_date" value="Date Screened" className="text-xs" />
                                <TextInput
                                    id="hepatitis_b_date"
                                    type="date"
                                    className="mt-1 block w-full text-sm"
                                    value={data.laboratory_screening.hepatitis_b.date}
                                    onChange={(e) => setData('laboratory_screening', {
                                        ...data.laboratory_screening,
                                        hepatitis_b: {
                                            ...data.laboratory_screening.hepatitis_b,
                                            date: e.target.value
                                        }
                                    })}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="hepatitis_b_result" value="Result" className="text-xs" />
                                <TextInput
                                    id="hepatitis_b_result"
                                    type="text"
                                    className="mt-1 block w-full text-sm"
                                    value={data.laboratory_screening.hepatitis_b.result}
                                    onChange={(e) => setData('laboratory_screening', {
                                        ...data.laboratory_screening,
                                        hepatitis_b: {
                                            ...data.laboratory_screening.hepatitis_b,
                                            result: e.target.value
                                        }
                                    })}
                                    placeholder="Result"
                                />
                            </div>
                        </div>
                    </div>

                    {/* CBC/Hgb/Hct Count */}
                    <div className="border border-gray-100 rounded p-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">CBC/Hgb/Hct Count</h4>
                        <div className="space-y-2">
                            <div>
                                <label className="flex items-center mb-2">
                                    <Checkbox
                                        checked={data.laboratory_screening.cbc_hgb_hct.completed}
                                        onChange={(e) => setData('laboratory_screening', {
                                            ...data.laboratory_screening,
                                            cbc_hgb_hct: {
                                                ...data.laboratory_screening.cbc_hgb_hct,
                                                completed: e.target.checked
                                            }
                                        })}
                                    />
                                    <span className="ml-2 text-xs text-gray-700">Completed</span>
                                </label>
                            </div>
                            <div>
                                <InputLabel htmlFor="cbc_date" value="Date Screened" className="text-xs" />
                                <TextInput
                                    id="cbc_date"
                                    type="date"
                                    className="mt-1 block w-full text-sm"
                                    value={data.laboratory_screening.cbc_hgb_hct.date}
                                    onChange={(e) => setData('laboratory_screening', {
                                        ...data.laboratory_screening,
                                        cbc_hgb_hct: {
                                            ...data.laboratory_screening.cbc_hgb_hct,
                                            date: e.target.value
                                        }
                                    })}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="cbc_result" value="Result" className="text-xs" />
                                <TextInput
                                    id="cbc_result"
                                    type="text"
                                    className="mt-1 block w-full text-sm"
                                    value={data.laboratory_screening.cbc_hgb_hct.result}
                                    onChange={(e) => setData('laboratory_screening', {
                                        ...data.laboratory_screening,
                                        cbc_hgb_hct: {
                                            ...data.laboratory_screening.cbc_hgb_hct,
                                            result: e.target.value
                                        }
                                    })}
                                    placeholder="Result"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Gestational Diabetes Mellitus */}
                    <div className="border border-gray-100 rounded p-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Gestational Diabetes</h4>
                        <div className="space-y-2">
                            <div>
                                <label className="flex items-center mb-2">
                                    <Checkbox
                                        checked={data.laboratory_screening.gestational_diabetes.completed}
                                        onChange={(e) => setData('laboratory_screening', {
                                            ...data.laboratory_screening,
                                            gestational_diabetes: {
                                                ...data.laboratory_screening.gestational_diabetes,
                                                completed: e.target.checked
                                            }
                                        })}
                                    />
                                    <span className="ml-2 text-xs text-gray-700">Completed</span>
                                </label>
                            </div>
                            <div>
                                <InputLabel htmlFor="diabetes_date" value="Date Screened" className="text-xs" />
                                <TextInput
                                    id="diabetes_date"
                                    type="date"
                                    className="mt-1 block w-full text-sm"
                                    value={data.laboratory_screening.gestational_diabetes.date}
                                    onChange={(e) => setData('laboratory_screening', {
                                        ...data.laboratory_screening,
                                        gestational_diabetes: {
                                            ...data.laboratory_screening.gestational_diabetes,
                                            date: e.target.value
                                        }
                                    })}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="diabetes_result" value="Result" className="text-xs" />
                                <TextInput
                                    id="diabetes_result"
                                    type="text"
                                    className="mt-1 block w-full text-sm"
                                    value={data.laboratory_screening.gestational_diabetes.result}
                                    onChange={(e) => setData('laboratory_screening', {
                                        ...data.laboratory_screening,
                                        gestational_diabetes: {
                                            ...data.laboratory_screening.gestational_diabetes,
                                            result: e.target.value
                                        }
                                    })}
                                    placeholder="Result"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </FormSection>

            {/* Pregnancy Outcome */}
            <FormSection 
                title="Pregnancy Outcome"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="date_terminated" value="Date Terminated (mm/dd/yy)" />
                        <TextInput
                            id="date_terminated"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.pregnancy_outcome.date_terminated}
                            onChange={(e) => setData('pregnancy_outcome', {
                                ...data.pregnancy_outcome,
                                date_terminated: e.target.value
                            })}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="outcome_type" value="Outcome Type" />
                        <select
                            id="outcome_type"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={data.pregnancy_outcome.outcome_type}
                            onChange={(e) => setData('pregnancy_outcome', {
                                ...data.pregnancy_outcome,
                                outcome_type: e.target.value
                            })}
                        >
                            <option value="">Select outcome</option>
                            <option value="FT">FT - Full Term</option>
                            <option value="PT">PT - Pre-Term</option>
                            <option value="FD">FD - Fetal Death</option>
                            <option value="AB">AB - Abortion</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <InputLabel htmlFor="remarks_action" value="Remarks/Action Taken" />
                        <textarea
                            id="remarks_action"
                            rows="3"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={data.pregnancy_outcome.remarks}
                            onChange={(e) => setData('pregnancy_outcome', {
                                ...data.pregnancy_outcome,
                                remarks: e.target.value
                            })}
                            placeholder="Enter remarks or action taken"
                        />
                    </div>
                </div>
            </FormSection>
        </div>
    );
}
