import { useFormContext } from 'react-hook-form'
import { PasswordField } from '../auth/PasswordField'
import type { RegistrationValues } from '../../schemas/registration'
import { RegistrationReview } from './RegistrationReview'

interface AccountSetupStepProps {
  onBack: () => void
  onEdit: (step: 1 | 2) => void
  isSubmitting: boolean
  errorMessage: string | null
}

export function AccountSetupStep({ onBack, onEdit, isSubmitting, errorMessage }: AccountSetupStepProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<RegistrationValues>()

  const values = watch()

  return (
    <div className="space-y-6">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-semibold text-[#1f1a17]">Account setup & review</h2>
        <p className="mt-1 text-sm text-[#6d625b]">Create your account and review the details before continuing.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <PasswordField
          id="password"
          label="Create a password"
          placeholder="Enter a password"
          error={errors.password?.message}
          {...register('password')}
        />

        <PasswordField
          id="confirmPassword"
          label="Confirm password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
      </div>

      <div className="text-xs text-[#6d625b]">Password must be at least 8 characters.</div>

      <label className="flex items-start gap-3 rounded-xl border border-[#e1d7c9] bg-[#f9f5f0] p-3 text-sm text-[#2c241f]">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-[#7c5d3a]"
          {...register('agreeToTerms')}
        />
        <span>
          I agree to the <a href="/terms" className="font-medium text-[#7c5d3a] underline">Terms of Service</a> and{' '}
          <a href="/privacy" className="font-medium text-[#7c5d3a] underline">Privacy Policy</a>.
        </span>
      </label>
      {errors.agreeToTerms && (
        <p role="alert" className="text-sm text-red-600">
          {errors.agreeToTerms.message}
        </p>
      )}

      <RegistrationReview values={values} onEdit={onEdit} />

      {errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-xl border border-[#d9cab2] bg-white px-4 py-2.5 text-base font-medium text-[#2c241f] transition hover:bg-[#f8f4ef]"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-xl bg-[#7c5d3a] px-4 py-2.5 text-base font-medium text-white shadow-lg shadow-[#7c5d3a]/20 transition hover:bg-[#69472b] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
      </div>
    </div>
  )
}
