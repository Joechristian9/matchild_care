import PatientLayout from '@/Layouts/PatientLayout';
import { Head } from '@inertiajs/react';
import { Bell, Calendar, AlertCircle, CheckCircle, Clock, Info } from 'lucide-react';

export default function Notifications({ auth, maternalRecord }) {
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

    // Generate all notifications
    const notifications = [];

    // Pregnancy week notification
    if (weeksPregnant && maternalRecord?.lmp && maternalRecord?.edc) {
        notifications.push({
            id: 1,
            type: 'pregnancy',
            icon: Calendar,
            color: 'pink',
            title: `You are ${weeksPregnant} weeks pregnant`,
            message: `Expected delivery: ${maternalRecord.edc}`,
            time: 'Updated today',
            priority: 'high'
        });
    }

    // Next visit reminder
    if (nextVisit && maternalRecord?.prenatal_visits) {
        notifications.push({
            id: 2,
            type: 'appointment',
            icon: AlertCircle,
            color: 'blue',
            title: nextVisit,
            message: `Total visits completed: ${maternalRecord.prenatal_visits.length}`,
            time: 'Upcoming',
            priority: 'high'
        });
    }

    // Immunization status
    if (maternalRecord?.immunization_records && maternalRecord.immunization_records.length > 0) {
        notifications.push({
            id: 3,
            type: 'immunization',
            icon: CheckCircle,
            color: 'green',
            title: `Immunizations: ${maternalRecord.immunization_records.length} record(s)`,
            message: `Last vaccine: ${maternalRecord.immunization_records[0]?.date_given}`,
            time: maternalRecord.immunization_records[0]?.date_given,
            priority: 'normal'
        });
    }

    // Recent prenatal visits
    if (maternalRecord?.prenatal_visits && maternalRecord.prenatal_visits.length > 0) {
        const lastVisit = maternalRecord.prenatal_visits[maternalRecord.prenatal_visits.length - 1];
        notifications.push({
            id: 4,
            type: 'visit',
            icon: Clock,
            color: 'purple',
            title: `Last prenatal visit completed`,
            message: `Visit ${maternalRecord.prenatal_visits.length} on ${lastVisit.visit_date}`,
            time: lastVisit.visit_date,
            priority: 'normal'
        });
    }

    const getColorClasses = (color) => {
        const colors = {
            pink: 'bg-pink-50 border-pink-200 text-pink-900',
            blue: 'bg-blue-50 border-blue-200 text-blue-900',
            green: 'bg-green-50 border-green-200 text-green-900',
            purple: 'bg-purple-50 border-purple-200 text-purple-900',
            gray: 'bg-gray-50 border-gray-200 text-gray-900'
        };
        return colors[color] || colors.gray;
    };

    const getIconColorClasses = (color) => {
        const colors = {
            pink: 'text-pink-600',
            blue: 'text-blue-600',
            green: 'text-green-600',
            purple: 'text-purple-600',
            gray: 'text-gray-600'
        };
        return colors[color] || colors.gray;
    };

    return (
        <PatientLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Notifications
                </h2>
            }
        >
            <Head title="Notifications" />

            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Bell className="h-6 w-6 text-pink-600 mr-3" />
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notifications List */}
                    {notifications.length > 0 ? (
                        <div className="space-y-4">
                            {notifications.map((notification) => {
                                const Icon = notification.icon;
                                return (
                                    <div
                                        key={notification.id}
                                        className={`p-4 md:p-5 rounded-lg border ${getColorClasses(notification.color)} transition-all hover:shadow-md`}
                                    >
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <Icon className={`h-6 w-6 ${getIconColorClasses(notification.color)} mt-0.5`} />
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h3 className="text-sm md:text-base font-semibold">
                                                            {notification.title}
                                                        </h3>
                                                        <p className="text-xs md:text-sm mt-1 opacity-90">
                                                            {notification.message}
                                                        </p>
                                                    </div>
                                                    {notification.priority === 'high' && (
                                                        <span className="ml-2 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                                                            Important
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs opacity-70 mt-2">
                                                    {notification.time}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 text-center">
                            <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                No notifications
                            </h3>
                            <p className="text-gray-600">
                                You're all caught up! Check back later for updates.
                            </p>
                        </div>
                    )}

                    {/* Info Card */}
                    {maternalRecord && (
                        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start">
                                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                <div className="ml-3">
                                    <h4 className="text-sm font-semibold text-blue-900">
                                        About Notifications
                                    </h4>
                                    <p className="text-xs text-blue-800 mt-1">
                                        You'll receive notifications about your pregnancy progress, upcoming appointments, 
                                        immunizations, and important health reminders.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </PatientLayout>
    );
}
