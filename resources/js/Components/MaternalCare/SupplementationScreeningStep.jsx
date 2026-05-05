import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import FormSection from '@/Components/FormSection';

export default function SupplementationScreeningStep({ data, setData }) {
    return (
        <div className="space-y-8">

            {/* MMS */}
            <FormSection 
                title="Multiple Micronutrient Supplementation (MMS)" 
                description="Number of Tablets Given at Date (mm/dd/yy)"
            >
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
                        {[1, 2, 3, 4, 5, 6].map((visitNum) => (
                            <div key={visitNum} className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white">
                                <h4 className="text-sm font-semibold text-gray-800 mb-3">
                                    {visitNum === 1 ? '1st' : visitNum === 2 ? '2nd' : visitNum === 3 ? '3rd' : `${visitNum}th`} Visit
                                </h4>

                                <div className="space-y-3">
                                    <div>
                                        <InputLabel value="Date" className="text-xs" />
                                        <TextInput
                                            type="date"
                                            className="mt-1 block w-full"
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
                        ))}
                    </div>
                </div>
            </FormSection>

            {/* Calcium */}
            <FormSection 
                title="High Risk Pregnancy - Calcium Supplementation"
                description="Number of Tablets Given at Date (mm/dd/yy)"
            >
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
                        {[1, 2, 3, 4].map((visitNum) => (
                            <div key={visitNum} className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white">
                                <h4 className="text-sm font-semibold text-gray-800 mb-3">
                                    {visitNum} Visit
                                </h4>

                                <div className="space-y-3">
                                    <TextInput
                                        type="date"
                                        className="block w-full"
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

                                    <TextInput
                                        type="number"
                                        placeholder="# Tablets"
                                        className="block w-full"
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
                        ))}
                    </div>
                </div>
            </FormSection>

            {/* Lab Screening */}
            <FormSection title="Laboratory Screenings">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {[
                        { key: 'hepatitis_b', label: 'Hepatitis B' },
                        { key: 'cbc_hgb_hct', label: 'CBC / Hgb / Hct' },
                        { key: 'gestational_diabetes', label: 'Gestational Diabetes' }
                    ].map((test) => (
                        <div key={test.key} className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white">
                            <h4 className="text-sm font-semibold text-gray-800 mb-4">{test.label}</h4>

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
            </FormSection>

        </div>
    );
}