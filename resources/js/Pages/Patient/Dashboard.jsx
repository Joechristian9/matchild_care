import PatientLayout from '@/Layouts/PatientLayout';
import { Head } from '@inertiajs/react';
import { Bell, Calendar, AlertCircle, CheckCircle } from 'lucide-react';

export default function PatientDashboard({ auth, maternalRecord }) {
    // Calculate upcoming appointment or next visit
    const getNextVisit = () => {
        if (!maternalRecord?.prenatal_visits) return null;
        const visits = maternalRecord.prenatal_visits;
        const totalVisits = visits.length;
        if (totalVisits < 8) {
            return `Visit ${totalVisits + 1} scheduled`;
        }
        return null;
    };

    // Calculate weeks pregnant
    const getWeeksPregnant = () => {
        if (!maternalRecord?.lmp) return null;
        const lmpDate = new Date(maternalRecord.lmp);
        const today = new Date();
        const diffTime = Math.abs(today - lmpDate);
        const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
        return diffWeeks;
    };

    const weeksPregnant = getWeeksPregnant();
    const nextVisit = getNextVisit();

    return (
        <PatientLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    My Health Records
                </h2>
            }
        >
            <Head title="My Health Records" />

            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4 md:space-y-6">
                    
                    {/* Welcome Section with Health Information */}
                    <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden">
                        <div className="p-4 md:p-6">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">
                                Welcome, {auth.user.name}
                            </h3>
                            
                            {maternalRecord ? (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                        <div className="bg-blue-50 p-3 md:p-4 rounded-lg">
                                            <h4 className="font-semibold text-blue-900 mb-2 text-sm md:text-base">
                                                Personal Information
                                            </h4>
                                            <div className="space-y-2 text-xs md:text-sm">
                                                <p><span className="font-medium">Age:</span> {maternalRecord.age}</p>
                                                <p><span className="font-medium">Blood Type:</span> {maternalRecord.blood_type || 'N/A'}</p>
                                                <p><span className="font-medium">Contact:</span> {maternalRecord.contact_number}</p>
                                            </div>
                                        </div>

                                        <div className="bg-green-50 p-3 md:p-4 rounded-lg">
                                            <h4 className="font-semibold text-green-900 mb-2 text-sm md:text-base">
                                                Pregnancy Status
                                            </h4>
                                            <div className="space-y-2 text-xs md:text-sm">
                                                <p><span className="font-medium">LMP:</span> {maternalRecord.lmp}</p>
                                                <p><span className="font-medium">EDC:</span> {maternalRecord.edc}</p>
                                                <p><span className="font-medium">Gravida:</span> {maternalRecord.gravida}</p>
                                                <p><span className="font-medium">Para:</span> {maternalRecord.para}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-purple-50 p-3 md:p-4 rounded-lg">
                                        <h4 className="font-semibold text-purple-900 mb-2 text-sm md:text-base">
                                            Prenatal Visits
                                        </h4>
                                        {maternalRecord.prenatal_visits?.length > 0 ? (
                                            <div className="space-y-2">
                                                {maternalRecord.prenatal_visits.map((visit, index) => (
                                                    <div key={index} className="bg-white p-2 md:p-3 rounded border">
                                                        <p className="text-xs md:text-sm">
                                                            <span className="font-medium">Visit {index + 1}:</span> {visit.visit_date}
                                                        </p>
                                                        <p className="text-xs md:text-sm">Weight: {visit.weight || 'N/A'}kg | BP: {visit.blood_pressure || 'N/A'}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-xs md:text-sm text-gray-600">No prenatal visits recorded yet.</p>
                                        )}
                                    </div>

                                    <div className="bg-yellow-50 p-3 md:p-4 rounded-lg">
                                        <h4 className="font-semibold text-yellow-900 mb-2 text-sm md:text-base">
                                            Immunizations
                                        </h4>
                                        {maternalRecord.immunization_records?.length > 0 ? (
                                            <div className="space-y-2">
                                                {maternalRecord.immunization_records.map((record, index) => (
                                                    <div key={index} className="bg-white p-2 md:p-3 rounded border">
                                                        <p className="text-xs md:text-sm">
                                                            <span className="font-medium">{record.vaccine_type}:</span> {record.date_given}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-xs md:text-sm text-gray-600">No immunization records yet.</p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-600">
                                        No maternal records found. Please contact your healthcare provider.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Notifications Card */}
                    {maternalRecord && (
                        <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden">
                            <div className="p-4 md:p-6">
                                <div className="flex items-center mb-4">
                                    <Bell className="h-5 w-5 text-pink-600 mr-2" />
                                    <h3 className="text-base md:text-lg font-semibold text-gray-900">
                                        Notifications & Reminders
                                    </h3>
                                </div>
                                
                                <div className="space-y-3">
                                    {/* Pregnancy Week Notification */}
                                    {weeksPregnant && maternalRecord.lmp && maternalRecord.edc && (
                                        <div className="flex items-start p-4 bg-pink-50 rounded-lg border border-pink-200">
                                            <div className="flex-shrink-0">
                                                <Calendar className="h-5 w-5 text-pink-600 mt-0.5" />
                                            </div>
                                            <div className="ml-3 flex-1">
                                                <p className="text-sm font-medium text-pink-900">
                                                    You are {weeksPregnant} weeks pregnant
                                                </p>
                                                <p className="text-xs text-pink-700 mt-1">
                                                    Expected delivery: {maternalRecord.edc}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Next Visit Reminder */}
                                    {nextVisit && maternalRecord.prenatal_visits && (
                                        <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            <div className="flex-shrink-0">
                                                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                                            </div>
                                            <div className="ml-3 flex-1">
                                                <p className="text-sm font-medium text-blue-900">
                                                    {nextVisit}
                                                </p>
                                                <p className="text-xs text-blue-700 mt-1">
                                                    Total visits completed: {maternalRecord.prenatal_visits.length}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Immunization Status */}
                                    {maternalRecord.immunization_records && maternalRecord.immunization_records.length > 0 && (
                                        <div className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200">
                                            <div className="flex-shrink-0">
                                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                                            </div>
                                            <div className="ml-3 flex-1">
                                                <p className="text-sm font-medium text-green-900">
                                                    Immunizations: {maternalRecord.immunization_records.length} record(s)
                                                </p>
                                                <p className="text-xs text-green-700 mt-1">
                                                    Last vaccine: {maternalRecord.immunization_records[0]?.date_given}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* No notifications */}
                                    {!weeksPregnant && !nextVisit && (!maternalRecord.immunization_records || maternalRecord.immunization_records.length === 0) && (
                                        <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                                            <div className="flex-shrink-0">
                                                <Bell className="h-5 w-5 text-gray-400 mt-0.5" />
                                            </div>
                                            <div className="ml-3 flex-1">
                                                <p className="text-sm text-gray-600">
                                                    No notifications at this time
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </PatientLayout>
    );
}
