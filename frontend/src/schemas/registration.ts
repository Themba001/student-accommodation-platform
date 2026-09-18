import { z } from 'zod'

// Placeholder values pending the real Supabase schema.
// University values mirror the expected Postgres enum convention: "nwu" | "vut"
// Funding method values mirror the expected Postgres enum convention: "nsfas" | "private_bursary" | "cash_paying"

export const personalInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  surname: z.string().min(1, 'Surname is required'),
  studentNumber: z.string().min(1, 'Student number is required'),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  idNumber: z
    .string()
    .min(1, 'ID number is required')
    .length(13, 'ID number must be 13 digits')
    .regex(/^\d+$/, 'ID number must contain only numbers'),
})

export const academicFundingSchema = z.object({
  university: z.enum(['nwu', 'vut'], {
    errorMap: () => ({ message: 'Please select your university' }),
  }),
  fundingMethod: z.enum(['nsfas', 'private_bursary', 'cash_paying'], {
    errorMap: () => ({ message: 'Please select a funding method' }),
  }),
})

export const accountSetupBaseSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the Terms of Service and Privacy Policy' }),
  }),
})

const passwordsMatch = (data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword

export const accountSetupSchema = accountSetupBaseSchema.refine(passwordsMatch, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const registrationSchema = personalInfoSchema
  .merge(academicFundingSchema)
  .merge(accountSetupBaseSchema)
  .refine(passwordsMatch, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>
export type AcademicFundingValues = z.infer<typeof academicFundingSchema>
export type AccountSetupValues = z.infer<typeof accountSetupBaseSchema>
export type RegistrationValues = PersonalInfoValues & AcademicFundingValues & AccountSetupValues

export const STEP_FIELDS: Record<1 | 2 | 3, (keyof RegistrationValues)[]> = {
  1: ['name', 'surname', 'studentNumber', 'phone', 'email', 'idNumber'],
  2: ['university', 'fundingMethod'],
  3: ['password', 'confirmPassword', 'agreeToTerms'],
}
