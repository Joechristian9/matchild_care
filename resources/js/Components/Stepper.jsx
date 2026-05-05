export default function Stepper({ steps, currentStep }) {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center flex-1">
                        <div className="flex flex-col items-center flex-1">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                                currentStep >= step.number
                                    ? 'bg-indigo-600 border-indigo-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-500'
                            }`}>
                                {currentStep > step.number ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <span className="font-semibold">{step.number}</span>
                                )}
                            </div>
                            <div className="mt-2 text-center">
                                <p className={`text-sm font-medium ${
                                    currentStep >= step.number ? 'text-indigo-600' : 'text-gray-500'
                                }`}>
                                    {step.title}
                                </p>
                                <p className="text-xs text-gray-500">{step.description}</p>
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-4 transition-colors ${
                                currentStep > step.number ? 'bg-indigo-600' : 'bg-gray-300'
                            }`} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
