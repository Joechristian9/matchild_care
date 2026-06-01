export default function Stepper({ steps, currentStep, onStepClick }) {
    return (
        <div className="mb-10">
            {/* Desktop Stepper */}
            <div className="hidden lg:block">
                <div className="flex items-start justify-between relative">
                    {steps.map((step, index) => (
                        <div key={step.number} className="flex items-center flex-1 relative">
                            <button
                                onClick={() => onStepClick && onStepClick(step.number)}
                                className="flex flex-col items-center flex-1 relative z-10 cursor-pointer group"
                                type="button"
                            >
                                {/* Step Circle */}
                                <div className={`
                                    relative flex items-center justify-center w-14 h-14 rounded-2xl border-2 
                                    transition-all duration-300 transform
                                    ${currentStep >= step.number
                                        ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110'
                                        : currentStep === step.number - 1
                                        ? 'bg-white border-indigo-300 text-indigo-600 shadow-md'
                                        : 'bg-white border-gray-300 text-gray-400 shadow-sm'
                                    }
                                    group-hover:scale-110 group-hover:shadow-lg
                                `}>
                                    {currentStep > step.number ? (
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <span className="text-lg font-bold">{step.number}</span>
                                    )}
                                </div>
                                
                                {/* Step Info */}
                                <div className="mt-4 text-center max-w-[140px]">
                                    <p className={`text-sm font-semibold leading-tight mb-1 transition-colors ${
                                        currentStep >= step.number ? 'text-indigo-600' : 'text-gray-600'
                                    } group-hover:text-indigo-600`}>
                                        {step.title}
                                    </p>
                                    <p className={`text-xs leading-tight transition-colors ${
                                        currentStep >= step.number ? 'text-indigo-500' : 'text-gray-500'
                                    } group-hover:text-indigo-500`}>
                                        {step.description}
                                    </p>
                                </div>
                            </button>
                            
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="flex-1 flex items-center px-2 -mt-16">
                                    <div className="relative w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                                        <div 
                                            className={`absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500 ${
                                                currentStep > step.number ? 'w-full' : 'w-0'
                                            }`}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Stepper */}
            <div className="lg:hidden">
                <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
                    {/* Progress Bar */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-700">
                                Step {currentStep} of {steps.length}
                            </span>
                            <span className="text-sm font-semibold text-indigo-600">
                                {Math.round((currentStep / steps.length) * 100)}%
                            </span>
                        </div>
                        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"
                                style={{ width: `${(currentStep / steps.length) * 100}%` }}
                            />
                        </div>
                    </div>
                    
                    {/* Current Step Info */}
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {currentStep}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-base font-bold text-gray-900">
                                {steps[currentStep - 1]?.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {steps[currentStep - 1]?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
