interface RegistrationProgressProps {
  currentStep: 1 | 2 | 3
}

const steps = [
  { number: 1, title: 'Personal Info' },
  { number: 2, title: 'Academic & Funding' },
  { number: 3, title: 'Account Setup' },
]

export function RegistrationProgress({ currentStep }: RegistrationProgressProps) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between gap-2">
        {steps.map((step, index) => {
          const isActive = currentStep === step.number
          const isComplete = currentStep > step.number

          return (
            <div key={step.number} className="flex flex-1 items-center">
              <div className="flex flex-1 items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold ${
                    isComplete
                      ? 'border-[#7c5d3a] bg-[#7c5d3a] text-white'
                      : isActive
                        ? 'border-[#7c5d3a] bg-[#f6efe8] text-[#7c5d3a]'
                        : 'border-[#d8d1c7] bg-white text-[#7b736d]'
                  }`}
                >
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-px flex-1 ${isComplete ? 'bg-[#7c5d3a]' : 'bg-[#e7dfd3]'}`} />
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#8a6b47]">Step {currentStep} of 3</p>
      </div>
    </div>
  )
}
