import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function PrenatalCheckupsStep({ data, setData }) {
    return (
        <div className="space-y-8">

            {/* SECTION TITLE */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900">
                    Prenatal Check-ups
                </h3>
                <p className="text-sm text-gray-500">
                    Track scheduled prenatal visits throughout pregnancy
                </p>
            </div>

            {/* INFO BOX */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h4 className="text-sm font-semibold text-blue-900 mb-3">
                    Recommended Schedule
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
                    <div>
                        <p className="font-medium">1st Trimester</p>
                        <p className="text-xs">Visit 1 (8–13 weeks)</p>
                    </div>

                    <div>
                        <p className="font-medium">2nd Trimester</p>
                        <p className="text-xs">Visit 2–3 (14–27 weeks)</p>
                    </div>

                    <div>
                        <p className="font-medium">3rd Trimester</p>
                        <p className="text-xs">Visit 4–8 (28–40 weeks)</p>
                    </div>
                </div>
            </div>

            {/* VISITS */}
            <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">
                    Visit Dates
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((visitNum) => (
                        <div key={visitNum} className="space-y-1">
                            <InputLabel
                                htmlFor={`visit_${visitNum}`}
                                value={`Visit ${visitNum}`}
                            />

                            <TextInput
                                id={`visit_${visitNum}`}
                                type="date"
                                className="mt-1 block w-full"
                                value={data.visits[`visit_${visitNum}`]}
                                onChange={(e) =>
                                    setData('visits', {
                                        ...data.visits,
                                        [`visit_${visitNum}`]: e.target.value,
                                    })
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}