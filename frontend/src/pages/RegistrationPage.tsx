import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { BrandPanel } from '../components/auth/BrandPanel'
import { AccountSetupStep } from '../components/registration/AccountSetupStep'
import { AcademicFundingStep } from '../components/registration/AcademicFundingStep'
import { PersonalInformationStep } from '../components/registration/PersonalInformationStep'
import { RegistrationProgress } from '../components/registration/RegistrationProgress'
import { registrationSchema, STEP_FIELDS, type RegistrationValues } from '../schemas/registration'
import { registerTenant, RegistrationError } from '../services/registration'

type Step = 1 | 2 | 3

interface RegistrationPageProps {
  onBackToLogin?: () => void
}

export function RegistrationPage({ onBackToLogin }: RegistrationPageProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const methods = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      surname: '',
      studentNumber: '',
      phone: '',
      email: '',
      idNumber: '',
      university: undefined,
      fundingMethod: undefined,
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  })

  const goNext = async () => {
    const valid = await methods.trigger(STEP_FIELDS[currentStep])
    if (!valid) return
    if (currentStep < 3) {
      setCurrentStep((step) => ((step + 1) as Step))
    }
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((step) => ((step - 1) as Step))
    }
  }

  const onSubmit = async (values: RegistrationValues) => {
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      await registerTenant(values)
      console.log('Registration success (placeholder mock)')
    } catch (error) {
      const message =
        error instanceof RegistrationError
          ? error.message
          : 'Something went wrong while creating your account. Please try again.'
      setErrorMessage(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f3efe9]">
      <div className="flex min-h-screen w-full overflow-hidden border border-[#e7dfd3] bg-white shadow-soft lg:h-screen">
        <BrandPanel />

        <div className="flex min-h-screen w-full flex-1 items-start justify-center overflow-y-auto bg-[#f8f5f1] p-6 sm:p-8 lg:h-screen lg:items-center lg:w-1/2 lg:overflow-hidden lg:p-8">
          <div className="w-full max-w-xl">
            <div className="mb-6 flex justify-center lg:hidden">
              <img src="/src/assets/images/tenants/res-roma/logo.png" alt="Res Roma logo" className="h-12 w-12 rounded-full object-cover" />
            </div>

            {onBackToLogin && (
              <button
                type="button"
                onClick={onBackToLogin}
                className="mb-4 text-sm font-medium text-[#7c5d3a] underline-offset-4 hover:underline"
              >
                Back to sign in
              </button>
            )}

            <RegistrationProgress currentStep={currentStep} />

            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                {currentStep === 1 && <PersonalInformationStep onContinue={goNext} />}
                {currentStep === 2 && <AcademicFundingStep onContinue={goNext} onBack={goBack} />}
                {currentStep === 3 && (
                  <AccountSetupStep
                    onBack={goBack}
                    onEdit={(step) => setCurrentStep(step)}
                    isSubmitting={isSubmitting}
                    errorMessage={errorMessage}
                  />
                )}
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </main>
  )
}
