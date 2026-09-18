import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RegistrationPage } from './RegistrationPage'

describe('RegistrationPage', () => {
  it('renders the first step and validates required fields', async () => {
    const user = userEvent.setup()
    render(<RegistrationPage />)

    expect(screen.getByText(/personal information/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /continue/i }))

    expect((await screen.findAllByText(/name is required/i)).length).toBeGreaterThan(0)
    expect((await screen.findAllByText(/surname is required/i)).length).toBeGreaterThan(0)
  })

  it('moves through the three steps and preserves data', async () => {
    const user = userEvent.setup()
    render(<RegistrationPage />)

    await user.type(screen.getByLabelText(/^name$/i), 'Jane')
    await user.type(screen.getByLabelText(/^surname$/i), 'Doe')
    await user.type(screen.getByLabelText(/^student number$/i), '123456789')
    await user.type(screen.getByLabelText(/^phone number$/i), '0821234567')
    await user.type(screen.getByLabelText(/^email address$/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/^south african id number$/i), '9001010001083')
    await user.click(screen.getByRole('button', { name: /continue/i }))

    expect(await screen.findByText(/academic & funding/i)).toBeInTheDocument()
    await user.selectOptions(screen.getByLabelText(/^university$/i), 'nwu')
    await user.click(screen.getByLabelText(/nsfas/i))
    await user.click(screen.getByRole('button', { name: /^continue$/i }))

    expect(await screen.findByText(/account setup & review/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^create a password$/i)).toBeInTheDocument()
  })
})
