import PatientLayout from '@/Layouts/PatientLayout';
import { Head } from '@inertiajs/react';

export default function MyRecords({ auth, records }) {
    return (
        <PatientLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    My Complete Medical Records
                </h2>
            }
        >
            <Head title="My Records" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Nutritional Assessment */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900">
                                Nutritional Assessment
                            </h3>
                            {records.nutritional_assessments?.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Height</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weight</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">BMI</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {records.nutritional_assessments.map((assessment, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{assessment.assessment_date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{assessment.height} cm</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{assessment.weight} kg</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{assessment.bmi}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{assessment.nutritional_status}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-600">No nutritional assessments recorded.</p>
                            )}
                        </div>
                    </div>

                    {/* Laboratory Screenings */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900">
                                Laboratory Screenings
                            </h3>
                            {records.laboratory_screenings?.length > 0 ? (
                                <div className="space-y-4">
                                    {records.laboratory_screenings.map((screening, index) => (
                                        <div key={index} className="border rounded-lg p-4 bg-gray-50">
                                            <p className="text-sm"><span className="font-medium">Date:</span> {screening.screening_date}</p>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 text-sm">
                                                <p><span className="font-medium">CBC:</span> {screening.cbc_result || 'N/A'}</p>
                                                <p><span className="font-medium">Urinalysis:</span> {screening.urinalysis_result || 'N/A'}</p>
                                                <p><span className="font-medium">STI:</span> {screening.sti_screening || 'N/A'}</p>
                                                <p><span className="font-medium">Hepatitis B:</span> {screening.hepatitis_b || 'N/A'}</p>
                                                <p><span className="font-medium">HIV:</span> {screening.hiv_screening || 'N/A'}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600">No laboratory screenings recorded.</p>
                            )}
                        </div>
                    </div>

                    {/* Supplementation Records */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900">
                                Supplementation Records
                            </h3>
                            {records.prenatal_supplementations?.length > 0 ? (
                                <div className="space-y-2">
                                    {records.prenatal_supplementations.map((supp, index) => (
                                        <div key={index} className="flex justify-between items-center border-b py-2">
                                            <span className="text-sm">{supp.supplement_type}</span>
                                            <span className="text-sm text-gray-600">{supp.date_given}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600">No supplementation records.</p>
                            )}
                        </div>
                    </div>

                    {/* Delivery Information */}
                    {records.delivery_information && (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                                    Delivery Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm"><span className="font-medium">Delivery Date:</span> {records.delivery_information.delivery_date}</p>
                                        <p className="text-sm"><span className="font-medium">Type:</span> {records.delivery_information.delivery_type}</p>
                                        <p className="text-sm"><span className="font-medium">Outcome:</span> {records.delivery_information.delivery_outcome}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm"><span className="font-medium">Birth Weight:</span> {records.delivery_information.birth_weight} kg</p>
                                        <p className="text-sm"><span className="font-medium">Birth Length:</span> {records.delivery_information.birth_length} cm</p>
                                        <p className="text-sm"><span className="font-medium">Place:</span> {records.delivery_information.place_of_delivery}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </PatientLayout>
    );
}
