import PatientLayout from '@/Layouts/PatientLayout';
import { Head } from '@inertiajs/react';
import { Bell, Calendar, AlertCircle, CheckCircle, Clock, Heart } from 'lucide-react';

export default function Notifications({ auth, maternalRecord }) {
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

    // Generate all notifications
    const notifications = [];

    // Pregnancy week notification
    if (weeksPregnant && maternalRecord?.lmp && maternalRecord?.edc) {
        notifications.push({
            id: 1,
            type: 'pregnancy',
            icon: Heart,
            color: 'pink',
            title: `Week ${weeksPregnant} of Pregnancy`,
            message: `Expected delivery date: ${new Date(maternalRecord.edc).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
            time: 'Updated today',
            priority: 'high'
        });
    }

    // Next visit reminder
    if (maternalRecord?.prenatal_visits) {
        const totalVisits = maternalRecord.prenatal_visits.length;
        if (totalVisits < 8) {
            notifications.push({
                id: 2,
                type: 'appointment',
                icon: Calendar,
                color: 'blue',
                title: `Prenatal Visit ${totalVisits + 1} Scheduled`,
                message: `You have completed ${totalVisits} out of 8 recommended prenatal visits`,
                time: 'Upcoming',
                priority: 'high'
            });
        }
    }

    // Immunization status
    if (maternalRecord?.immunization_records && maternalRecord.immunization_records.length > 0) {
        const lastVaccine = maternalRecord.immunization_records[0];
        notifications.push({
            id: 3,
            type: 'immunization',
            icon: CheckCircle,
            color: 'green',
            title: 'Immunization Record Updated',
            message: `${lastVaccine.vaccine_type} administered on ${new Date(lastVaccine.date_given).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
            time: lastVaccine.date_given,
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
            title: 'Recent Prenatal Visit',
            message: `Visit ${maternalRecord.prenatal_visits.length} completed on ${new Date(lastVisit.visit_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
            time: lastVisit.visit_date,
            priority: 'normal'
        });
    }

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
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-pink-100 rounded-lg">
                                <Bell className="h-6 w-6 text-pink-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Notifications</h1>
                                <p className="text-sm text-gray-500 mt-0.5">
                                    Stay updated with your pregnancy journey
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Notifications Grid */}
                    {notifications.length > 0 ? (
                        <div className="grid gap-4 md:gap-5">
                            {notifications.map((notification) => {
                                const Icon = notification.icon;
                                const isHighPriority = notification.priority === 'high';
                                
                                return (
                                    <div
                                        key={notification.id}
                                        className={`
                                            bg-white rounded-xl shadow-sm border-2 p-5 md:p-6
                                            transition-all duration-200 hover:shadow-md hover:scale-[1.01]
                                            ${isHighPriority ? 'border-pink-200 bg-gradient-to-br from-white to-pink-50' : 'border-gray-100'}
                                        `}
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Icon */}
                                            <div className={`
                                                flex-shrink-0 p-3 rounded-xl
                                                ${notification.color === 'pink' ? 'bg-pink-100' : ''}
                                                ${notification.color === 'blue' ? 'bg-blue-100' : ''}
                                                ${notification.color === 'green' ? 'bg-green-100' : ''}
                                                ${notification.color === 'purple' ? 'bg-purple-100' : ''}
                                            `}>
                                                <Icon className={`
                                                    h-6 w-6
                                                    ${notification.color === 'pink' ? 'text-pink-600' : ''}
                                                    ${notification.color === 'blue' ? 'text-blue-600' : ''}
                                                    ${notification.color === 'green' ? 'text-green-600' : ''}
                                                    ${notification.color === 'purple' ? 'text-purple-600' : ''}
                                                `} />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-3 mb-2">
                                                    <h3 className="text-base md:text-lg font-semibold text-gray-900">
                                                        {notification.title}
                                                    </h3>
                                                    {isHighPriority && (
                                                        <span className="flex-shrink-0 px-2.5 py-1 text-xs font-semibold bg-pink-100 text-pink-700 rounded-full border border-pink-200">
                                                            Important
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm md:text-base text-gray-600 mb-3">
                                                    {notification.message}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <Clock className="h-3.5 w-3.5" />
                                                    <span>{notification.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border-2 border-gray-100 p-12 text-center">
                            <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
                                <Bell className="h-12 w-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No notifications yet
                            </h3>
                            <p className="text-gray-600 max-w-md mx-auto">
                                You're all caught up! New notifications about your pregnancy journey will appear here.
                            </p>
                        </div>
                    )}

                    {/* Summary Card */}
                    {maternalRecord && notifications.length > 0 && (
                        <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-100 p-5">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
                                    <AlertCircle className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-blue-900 mb-1">
                                        Notification Summary
                                    </h4>
                                    <p className="text-xs text-blue-800 leading-relaxed">
                                        You have {notifications.length} active notification{notifications.length !== 1 ? 's' : ''} about your pregnancy. 
                                        Stay informed about your prenatal visits, immunizations, and important health updates.
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
