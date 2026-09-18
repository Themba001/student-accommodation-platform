import { useFormContext } from 'react-hook-form'
import type { RegistrationValues } from '../../schemas/registration'
import { Field } from './Field'

interface AcademicFundingStepProps {
  onContinue: () => void
  onBack: () => void
}

const fundingOptions = [
  {
    value: 'nsfas',
    title: 'NSFAS',
    description: 'Accommodation funded through NSFAS.',
  },
  {
    value: 'private_bursary',
    title: 'Private Bursary',
    description: 'Accommodation funded through a private bursary or sponsor.',
  },
  {
    value: 'cash_paying',
    title: 'Cash Paying',
    description: 'Accommodation paid directly by the student or their sponsor.',
  },
] as const

export function AcademicFundingStep({ onContinue, onBack }: AcademicFundingStepProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<RegistrationValues>()

  const selectedFunding = watch('fundingMethod')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[#1f1a17]">Academic & funding</h2>
        <p className="mt-1 text-sm text-[#6d625b]">Tell us where you study and how your accommodation is funded.</p>
      </div>

      <Field label="University" htmlFor="university" error={errors.university?.message}>
        <select
          id="university"
          className="w-full rounded-xl border border-[#e1d7c9] bg-[#f9f5f0] px-4 py-3 text-base text-[#1f1a17] outline-none transition focus:border-[#8a6b47] focus:ring-2 focus:ring-[#d9b06a]/40"
          defaultValue=""
          {...register('university')}
        >
          <option value="" disabled>
            Select your university
          </option>
          <option value="vut">Vaal University of Technology (VUT)</option>
          <option value="nwu">North-West University (NWU)</option>
        </select>
      </Field>

      <div>
        <p className="mb-3 text-sm font-medium text-[#2c241f]">How will your accommodation be funded?</p>
        <div className="space-y-3">
          {fundingOptions.map((option) => {
            const checked = selectedFunding === option.value

            return (
              <label
                key={option.value}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                  checked ? 'border-[#7c5d3a] bg-[#f6efe8]' : 'border-[#e1d7c9] bg-[#f9f5f0]'
                }`}
              >
                <input
                  type="radio"
                  value={option.value}
                  className="mt-1 h-4 w-4 accent-[#7c5d3a]"
                  {...register('fundingMethod')}
                />
                <div>
                  <div className="font-medium text-[#1f1a17]">{option.title}</div>
                  <div className="mt-1 text-sm text-[#6d625b]">{option.description}</div>
                </div>
              </label>
            )
          })}
        </div>
        {errors.fundingMethod && (
          <p role="alert" className="mt-2 text-sm text-red-600">
            {errors.fundingMethod.message}
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-xl border border-[#d9cab2] bg-white px-4 py-3 text-base font-medium text-[#2c241f] transition hover:bg-[#f8f4ef]"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="flex-1 rounded-xl bg-[#7c5d3a] px-4 py-3 text-base font-medium text-white shadow-lg shadow-[#7c5d3a]/20 transition hover:bg-[#69472b]"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
