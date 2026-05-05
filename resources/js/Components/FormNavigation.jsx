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
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
            <div>
                {currentStep > 1 && (
                    <SecondaryButton type="button" onClick={onPrevious}>
                        Previous
                    </SecondaryButton>
                )}
            </div>

            <div className="flex gap-4">
                {currentStep < totalSteps ? (
                    <PrimaryButton type="button" onClick={onNext}>
                        Next
                    </PrimaryButton>
                ) : (
                    <PrimaryButton 
                        type="button" 
                        onClick={onSubmit}
                        disabled={processing}
                    >
                        {processing ? 'Saving...' : submitLabel}
                    </PrimaryButton>
                )}
            </div>
        </div>
    );
}
