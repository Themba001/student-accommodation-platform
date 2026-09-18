import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { signIn } from '../../services/auth'

const schema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type FormValues = z.infer<typeof schema>

interface LoginFormProps {
  onGoToRegister?: () => void
}

export function LoginForm({ onGoToRegister }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  async function onSubmit(values: FormValues) {
    setSubmitError(null)
    setIsSubmitting(true)
    setIsSuccess(false)

    const result = await signIn(values.email, values.password)

    if (result.type === 'success') {
      setIsSuccess(true)
      setSubmitError(null)
    } else {
      setIsSuccess(false)
      setSubmitError(result.message)
    }

    setIsSubmitting(false)
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-soft">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8a6b47]">Welcome back</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#1f1a17]">Sign in</h1>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#2c241f]">
            Email address
          </label>
          <input
            id="email"
            type="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            autoComplete="email"
            placeholder="name@resroma.com"
            className="w-full rounded-xl border border-[#e1d7c9] bg-[#f9f5f0] px-4 py-3 text-base text-[#1f1a17] outline-none transition focus:border-[#8a6b47] focus:ring-2 focus:ring-[#d9b06a]/40"
            {...register('email')}
          />
          {errors.email && <p id="email-error" className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#2c241f]">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-error' : undefined}
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-[#e1d7c9] bg-[#f9f5f0] px-4 py-3 pr-12 text-base text-[#1f1a17] outline-none transition focus:border-[#8a6b47] focus:ring-2 focus:ring-[#d9b06a]/40"
              {...register('password')}
            />
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((value) => !value)}
              className="absolute inset-y-0 right-3 flex items-center text-[#5d5146] transition hover:text-[#2c241f]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p id="password-error" className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between gap-3 text-sm">
          <label className="flex items-center gap-2 text-[#534a42]">
            <input type="checkbox" className="h-4 w-4 rounded border-[#d9cab2] text-[#7c5d3a] focus:ring-[#d9b06a]" />
            Remember me
          </label>
          <button type="button" className="font-medium text-[#7c5d3a] transition hover:text-[#513725]">
            Forgot password?
          </button>
        </div>

        {submitError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{submitError}</div>
        )}

        {isSuccess && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Login successful. Redirecting to your dashboard...
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7c5d3a] px-4 py-3 text-base font-medium text-white shadow-lg shadow-[#7c5d3a]/20 transition hover:bg-[#69472b] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </button>

        {onGoToRegister && (
          <button
            type="button"
            onClick={onGoToRegister}
            className="mt-3 flex w-full items-center justify-center rounded-xl border border-[#d9cab2] bg-white px-4 py-3 text-base font-medium text-[#2c241f] transition hover:bg-[#f8f4ef]"
          >
            Create account
          </button>
        )}
      </form>
    </div>
  )
}
