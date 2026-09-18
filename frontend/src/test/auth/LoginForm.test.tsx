import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '../../components/auth/LoginForm'

describe('LoginForm', () => {
  it('renders the form fields and actions', () => {
    render(<LoginForm />)

    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/^email address$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i, { selector: 'input' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^sign in$/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty or invalid values', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    await user.click(screen.getByRole('button', { name: /^sign in$/i }))

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/password is required/i)).toBeInTheDocument()

    await user.type(screen.getByLabelText(/^email address$/i), 'not-an-email')
    await user.tab()
    expect(await screen.findByText(/enter a valid email address/i)).toBeInTheDocument()
  })

  it('toggles password visibility and prevents duplicate submissions while loading', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const passwordInput = screen.getByLabelText(/^password$/i, { selector: 'input' })
    const toggleButton = screen.getByRole('button', { name: /show password/i })

    await user.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'text')

    await user.type(screen.getByLabelText(/^email address$/i), 'resident@resroma.com')
    await user.type(passwordInput, 'Password123!')

    const submitButton = screen.getByRole('button', { name: /^sign in$/i })
    await user.click(submitButton)

    expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled()
    expect(await screen.findByText(/redirecting to your dashboard/i)).toBeInTheDocument()
  })

  it('shows invalid credentials message on mocked auth failure', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    await user.type(screen.getByLabelText(/^email address$/i), 'resident@resroma.com')
    await user.type(screen.getByLabelText(/^password$/i, { selector: 'input' }), 'wrong-password')
    await user.click(screen.getByRole('button', { name: /^sign in$/i }))

    expect(await screen.findByText(/invalid email or password/i)).toBeInTheDocument()
  })

  it('shows network error message for mocked network failure', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    await user.type(screen.getByLabelText(/^email address$/i), 'network@resroma.com')
    await user.type(screen.getByLabelText(/^password$/i, { selector: 'input' }), 'Password123!')
    await user.click(screen.getByRole('button', { name: /^sign in$/i }))

    expect(await screen.findByText(/network error/i)).toBeInTheDocument()
  })

  it('shows server error message for mocked server failure', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    await user.type(screen.getByLabelText(/^email address$/i), 'server@resroma.com')
    await user.type(screen.getByLabelText(/^password$/i, { selector: 'input' }), 'Password123!')
    await user.click(screen.getByRole('button', { name: /^sign in$/i }))

    expect(await screen.findByText(/server error/i)).toBeInTheDocument()
  })

  it('shows a success message after successful login', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    await user.type(screen.getByLabelText(/^email address$/i), 'resident@resroma.com')
    await user.type(screen.getByLabelText(/^password$/i, { selector: 'input' }), 'Password123!')
    await user.click(screen.getByRole('button', { name: /^sign in$/i }))

    expect(await screen.findByText(/login successful/i)).toBeInTheDocument()
  })
})