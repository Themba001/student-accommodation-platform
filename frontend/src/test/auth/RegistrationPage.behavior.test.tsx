import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RegistrationPage } from '../../pages/RegistrationPage'

async function completePersonalInformation(user: ReturnType<typeof userEvent.setup>, email = 'jane@example.com') {
  await user.type(screen.getByLabelText(/^name$/i), 'Jane')
  await user.type(screen.getByLabelText(/^surname$/i), 'Doe')
  await user.type(screen.getByLabelText(/^student number$/i), '123456789')
  await user.type(screen.getByLabelText(/^phone number$/i), '0821234567')
  await user.type(screen.getByLabelText(/^email address$/i), email)
  await user.type(screen.getByLabelText(/^south african id number$/i), '9001010001083')
  await user.click(screen.getByRole('button', { name: /^continue$/i }))
}

async function reachAccountSetup(user: ReturnType<typeof userEvent.setup>, email = 'jane@example.com') {
  await completePersonalInformation(user, email)
  await user.selectOptions(screen.getByLabelText(/^university$/i), 'nwu')
  await user.click(screen.getByLabelText(/nsfas/i))
  await user.click(screen.getByRole('button', { name: /^continue$/i }))
}

describe('RegistrationPage behavior', () => {
  it('renders the university and funding choices', async () => {
    const user = userEvent.setup()
    render(<RegistrationPage />)
    await completePersonalInformation(user)

    expect(screen.getByRole('option', { name: /vaal university/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /north-west university/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/nsfas/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/private bursary/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cash paying/i)).toBeInTheDocument()
  })

  it('shows validation feedback for invalid identity details', async () => {
    const user = userEvent.setup()
    render(<RegistrationPage />)

    await user.type(screen.getByLabelText(/^email address$/i), 'not-an-email')
    await user.type(screen.getByLabelText(/^south african id number$/i), '123')
    await user.click(screen.getByRole('button', { name: /^continue$/i }))

    expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument()
    expect(screen.getByText(/id number must be 13 digits/i)).toBeInTheDocument()
  })

  it('rejects mismatched passwords after terms consent is provided', async () => {
    const user = userEvent.setup()
    render(<RegistrationPage />)
    await reachAccountSetup(user)

    await user.type(screen.getByLabelText(/^create a password$/i), 'Password123!')
    await user.type(screen.getByLabelText(/^confirm password$/i), 'Different123!')
    await user.click(screen.getByRole('checkbox', { name: /terms of service/i }))
    await user.click(screen.getByRole('button', { name: /create account/i }))

    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument()
  })

  it('requires terms consent before submitting the account setup step', async () => {
    const user = userEvent.setup()
    render(<RegistrationPage />)
    await reachAccountSetup(user)

    await user.type(screen.getByLabelText(/^create a password$/i), 'Password123!')
    await user.type(screen.getByLabelText(/^confirm password$/i), 'Password123!')
    await user.click(screen.getByRole('button', { name: /create account/i }))

    expect(screen.getByText(/you must agree to the terms/i)).toBeInTheDocument()
  })

  it('shows the mocked duplicate-email error after a valid submission', async () => {
    const user = userEvent.setup()
    render(<RegistrationPage />)
    await reachAccountSetup(user, 'duplicate@example.com')

    await user.type(screen.getByLabelText(/^create a password$/i), 'Password123!')
    await user.type(screen.getByLabelText(/^confirm password$/i), 'Password123!')
    await user.click(screen.getByRole('checkbox', { name: /terms of service/i }))
    await user.click(screen.getByRole('button', { name: /create account/i }))

    expect(await screen.findByText(/account with this email address already exists/i)).toBeInTheDocument()
  })
})