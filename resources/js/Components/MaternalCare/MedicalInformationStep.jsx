import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function MedicalInformationStep({ data, setData, errors }) {
    return (
        <div className="space-y-8">

            {/* SECTION TITLE */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900">
                    Medical Information
                </h3>
                <p className="text-sm text-gray-500">
                    Enter pregnancy-related details
                </p>
            </div>

            {/* SECTION 1 - LMP */}
            <div>
                <InputLabel htmlFor="last_menstrual_period" value="Last Menstrual Period (LMP)" />
                <TextInput
                    id="last_menstrual_period"
                    type="date"
                    className="mt-2 block w-full"
                    value={data.last_menstrual_period}
                    onChange={(e) => setData('last_menstrual_period', e.target.value)}
                    required
                />
                <InputError message={errors.last_menstrual_period} className="mt-2" />
            </div>

            {/* SECTION 2 - GRAVIDA & PARITY */}
            <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">
                    Pregnancy History
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="gravida" value="Gravida" />
                        <TextInput
                            id="gravida"
                            type="number"
                            className="mt-2 block w-full"
                            value={data.gravida}
                            onChange={(e) => setData('gravida', e.target.value)}
                            placeholder="Number of pregnancies"
                            min="1"
                            required
                        />
                        <InputError message={errors.gravida} className="mt-2" />
                        <p className="mt-1 text-xs text-gray-500">
                            Total number of pregnancies
                        </p>
                    </div>

                    <div>
                        <InputLabel htmlFor="parity" value="Parity" />
                        <TextInput
                            id="parity"
                            type="number"
                            className="mt-2 block w-full"
                            value={data.parity}
                            onChange={(e) => setData('parity', e.target.value)}
                            placeholder="Number of births"
                            min="0"
                            required
                        />
                        <InputError message={errors.parity} className="mt-2" />
                        <p className="mt-1 text-xs text-gray-500">
                            Number of births after 20 weeks
                        </p>
                    </div>
                </div>
            </div>

            {/* SECTION 3 - EDD */}
            <div className="space-y-2">
                <InputLabel htmlFor="expected_date_of_delivery" value="Expected Date of Delivery (EDD)" />

                <div className="mt-2 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                    {data.expected_date_of_delivery || 'Enter Last Menstrual Period to calculate'}
                </div>

                <p className="text-xs text-gray-500">
                    Automatically calculated using Naegele's Rule
                </p>

                <InputError message={errors.expected_date_of_delivery} className="mt-2" />
            </div>

        </div>
    );
}