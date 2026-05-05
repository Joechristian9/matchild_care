import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

export default function FormNavigation({ 
    currentStep, 
    totalSteps, 
    onPrevious, 
    onNext, 
    processing = false,
    submitLabel = 'Submit',
    onSubmit
}) {
    return (
        <div className="flex items-center justify-between pt-6 mt-8 border-t-2 border-gray-200">
            <div>
                {currentStep > 1 && (
                    <SecondaryButton 
                        type="button" 
                        onClick={onPrevious}
                        className="flex items-center gap-2 px-6 py-3 text-sm font-semibold"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                    </SecondaryButton>
                )}
            </div>

            <div className="flex items-center gap-4">
                {/* Step indicator */}
                <span className="text-sm text-gray-600 font-medium hidden sm:block">
                    Step {currentStep} of {totalSteps}
                </span>
                
                {currentStep < totalSteps ? (
                    <PrimaryButton 
                        type="button" 
                        onClick={onNext}
                        className="flex items-center gap-2 px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-xl"
                    >
                        Next
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </PrimaryButton>
                ) : (
                    <PrimaryButton 
                        type="button" 
                        onClick={onSubmit}
                        disabled={processing}
                        className="flex items-center gap-2 px-8 py-3 text-sm font-semibold shadow-lg hover:shadow-xl"
                    >
                        {processing ? (
                            <>
                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {submitLabel}
                            </>
                        )}
                    </PrimaryButton>
                )}
            </div>
        </div>
    );
}
