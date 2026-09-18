import { useFormContext } from 'react-hook-form'
import type { RegistrationValues } from '../../schemas/registration'
import { Field } from './Field'

interface PersonalInformationStepProps {
  onContinue: () => void
}

export function PersonalInformationStep({ onContinue }: PersonalInformationStepProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegistrationValues>()

  return (
    <div className="space-y-4">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-semibold text-[#1f1a17]">Personal information</h2>
        <p className="mt-1 text-sm text-[#6d625b]">Tell us a little about yourself.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
      <Field label="Name" htmlFor="name" error={errors.name?.message}>
        <input
          id="name"
          autoComplete="given-name"
          className="w-full rounded-xl border border-[#e1d7c9] bg-[#f9f5f0] px-4 py-3 text-base text-[#1f1a17] outline-none transition focus:border-[#8a6b47] focus:ring-2 focus:ring-[#d9b06a]/40"
          {...register('name')}
        />
      </Field>

      <Field label="Surname" htmlFor="surname" error={errors.surname?.message}>
        <input
          id="surname"
          autoComplete="family-name"
          className="w-full rounded-xl border border-[#e1d7c9] bg-[#f9f5f0] px-4 py-3 text-base text-[#1f1a17] outline-none transition focus:border-[#8a6b47] focus:ring-2 focus:ring-[#d9b06a]/40"
          {...register('surname')}
        />
      </Field>

      <Field label="Student number" htmlFor="studentNumber" error={errors.studentNumber?.message}>
        <input
          id="studentNumber"
          placeholder="Enter your university student number"
          className="w-full rounded-xl border border-[#e1d7c9] bg-[#f9f5f0] px-4 py-3 text-base text-[#1f1a17] outline-none transition focus:border-[#8a6b47] focus:ring-2 focus:ring-[#d9b06a]/40"
          {...register('studentNumber')}
        />
      </Field>

      <Field label="Phone number" htmlFor="phone" error={errors.phone?.message}>
        <input
          id="phone"
          type="tel"
          className="w-full rounded-xl border border-[#e1d7c9] bg-[#f9f5f0] px-4 py-3 text-base text-[#1f1a17] outline-none transition focus:border-[#8a6b47] focus:ring-2 focus:ring-[#d9b06a]/40"
          {...register('phone')}
        />
      </Field>

      <Field label="Email address" htmlFor="email" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="student@example.com"
          className="w-full rounded-xl border border-[#e1d7c9] bg-[#f9f5f0] px-4 py-3 text-base text-[#1f1a17] outline-none transition focus:border-[#8a6b47] focus:ring-2 focus:ring-[#d9b06a]/40"
          {...register('email')}
        />
      </Field>

      <Field label="South African ID number" htmlFor="idNumber" error={errors.idNumber?.message}>
        <input
          id="idNumber"
          type="text"
          inputMode="numeric"
          maxLength={13}
          className="w-full rounded-xl border border-[#e1d7c9] bg-[#f9f5f0] px-4 py-3 text-base text-[#1f1a17] outline-none transition focus:border-[#8a6b47] focus:ring-2 focus:ring-[#d9b06a]/40"
          {...register('idNumber')}
        />
      </Field>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="w-full rounded-xl bg-[#7c5d3a] px-4 py-2.5 text-base font-medium text-white shadow-lg shadow-[#7c5d3a]/20 transition hover:bg-[#69472b]"
      >
        Continue
      </button>
    </div>
  )
}
