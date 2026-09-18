import { Eye, EyeOff } from 'lucide-react'
import { forwardRef, useState } from 'react'

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, error, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div>
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-[#2c241f]">
          {label}
        </label>
        <div className="relative">
          <input
            id={id}
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className="w-full rounded-xl border border-[#e1d7c9] bg-[#f9f5f0] px-4 py-3 pr-12 text-base text-[#1f1a17] outline-none transition focus:border-[#8a6b47] focus:ring-2 focus:ring-[#d9b06a]/40"
            {...props}
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
        {error && (
          <p id={`${id}-error`} className="mt-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

PasswordField.displayName = 'PasswordField'
