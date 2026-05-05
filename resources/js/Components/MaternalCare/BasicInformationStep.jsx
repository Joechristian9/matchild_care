import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function BasicInformationStep({ data, setData, errors }) {
    return (
        <div className="space-y-4">
            <div>
                <InputLabel htmlFor="date_of_registration" value="Date of Registration" />
                <TextInput
                    id="date_of_registration"
                    type="date"
                    className="mt-1 block w-full"
                    value={data.date_of_registration}
                    onChange={(e) => setData('date_of_registration', e.target.value)}
                    required
                />
                <InputError message={errors.date_of_registration} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="family_serial" value="Family Serial Number" />
                <TextInput
                    id="family_serial"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.family_serial}
                    onChange={(e) => setData('family_serial', e.target.value)}
                    placeholder="Enter family serial number"
                    required
                />
                <InputError message={errors.family_serial} className="mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                    <InputLabel htmlFor="last_name" value="Last Name" />
                    <TextInput
                        id="last_name"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                        placeholder="Last name"
                        required
                    />
                    <InputError message={errors.last_name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="first_name" value="First Name" />
                    <TextInput
                        id="first_name"
                        type="text"
                        className="mt-1 block w-full"
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
                        className="mt-1 block w-full"
                        value={data.middle_initial}
                        onChange={(e) => setData('middle_initial', e.target.value.toUpperCase())}
                        placeholder="M.I."
                        maxLength="2"
                    />
                    <InputError message={errors.middle_initial} className="mt-2" />
                </div>
            </div>

            <div>
                <InputLabel htmlFor="address" value="Address" />
                <TextInput
                    id="address"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                    placeholder="Complete address"
                    required
                />
                <InputError message={errors.address} className="mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <InputLabel htmlFor="age" value="Age" />
                    <TextInput
                        id="age"
                        type="number"
                        className="mt-1 block w-full"
                        value={data.age}
                        onChange={(e) => setData('age', e.target.value)}
                        placeholder="Age"
                        min="10"
                        max="49"
                        required
                    />
                    <InputError message={errors.age} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="age_group" value="Age Group" />
                    <TextInput
                        id="age_group"
                        type="text"
                        className="mt-1 block w-full bg-gray-50"
                        value={data.age_group ? `${data.age_group} years` : ''}
                        readOnly
                        disabled
                        placeholder="Auto-calculated"
                    />
                    <p className="mt-1 text-xs text-gray-500">Automatically set based on age</p>
                    <InputError message={errors.age_group} className="mt-2" />
                </div>
            </div>
        </div>
    );
}
