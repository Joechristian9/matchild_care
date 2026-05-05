import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function PrenatalCheckupsStep({ data, setData }) {
    return (
        <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">Prenatal Check-up Schedule</h3>
                <div className="text-xs text-blue-800 space-y-1">
                    <p><strong>1st Trimester:</strong> Visit 1 (8-13 weeks)</p>
                    <p><strong>2nd Trimester:</strong> Visit 2 (14-20 weeks), Visit 3 (21-27 weeks)</p>
                    <p><strong>3rd Trimester:</strong> Visit 4 (28-30 weeks), Visit 5 (31-34 weeks), Visit 6 (35 weeks), Visit 7 (36 weeks), Visit 8 (37-40 weeks)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((visitNum) => (
                    <div key={visitNum}>
                        <InputLabel htmlFor={`visit_${visitNum}`} value={`Visit ${visitNum}`} />
                        <TextInput
                            id={`visit_${visitNum}`}
                            type="date"
                            className="mt-1 block w-full"
                            value={data.visits[`visit_${visitNum}`]}
                            onChange={(e) => setData('visits', {
                                ...data.visits,
                                [`visit_${visitNum}`]: e.target.value
                            })}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
