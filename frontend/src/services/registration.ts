import type { RegistrationValues } from '../schemas/registration'

export type RegistrationErrorType =
  | 'duplicate_email'
  | 'duplicate_student_number'
  | 'invalid_id_number'
  | 'network_error'
  | 'server_error'

export class RegistrationError extends Error {
  type: RegistrationErrorType

  constructor(type: RegistrationErrorType, message: string) {
    super(message)
    this.type = type
  }
}

// TEMPORARY MOCK for the registration flow. Replace with a real Supabase Auth signUp() call and
// database write once the backend exists. Reserved values intentionally mirror the specification.
export async function registerTenant(values: RegistrationValues): Promise<{ success: true }> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (values.email === 'duplicate@example.com') {
    throw new RegistrationError('duplicate_email', 'An account with this email address already exists.')
  }

  if (values.studentNumber === '000000000') {
    throw new RegistrationError('duplicate_student_number', 'This student number is already registered.')
  }

  if (values.idNumber.startsWith('0000')) {
    throw new RegistrationError('invalid_id_number', 'Please check your ID number and try again.')
  }

  if (values.email === 'network-fail@example.com') {
    throw new RegistrationError('network_error', "We couldn't connect to the server. Check your internet connection and try again.")
  }

  if (values.email === 'server-fail@example.com') {
    throw new RegistrationError('server_error', 'Something went wrong while creating your account. Please try again.')
  }

  console.log('TEMPORARY MOCK: tenant registration succeeded', {
    studentNumber: values.studentNumber,
    email: values.email,
  })

  return { success: true }
}
