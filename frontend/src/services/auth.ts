export type AuthResult =
  | { type: 'success'; message: string }
  | { type: 'invalid_credentials'; message: string }
  | { type: 'network_error'; message: string }
  | { type: 'server_error'; message: string }

export async function signIn(email: string, password: string): Promise<AuthResult> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const normalizedEmail = email.trim().toLowerCase()

  if (!normalizedEmail || !password) {
    return { type: 'invalid_credentials', message: 'Please enter both email and password.' }
  }

  if (normalizedEmail === 'network@resroma.com') {
    return { type: 'network_error', message: 'Network error. Please try again.' }
  }

  if (normalizedEmail === 'server@resroma.com') {
    return { type: 'server_error', message: 'Server error. Please try again later.' }
  }

  if (normalizedEmail !== 'resident@resroma.com' || password !== 'Password123!') {
    return { type: 'invalid_credentials', message: 'Invalid email or password.' }
  }

  return { type: 'success', message: 'Welcome back, resident.' }
}
