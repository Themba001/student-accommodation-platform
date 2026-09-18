import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'

describe('App authentication screens', () => {
  it('switches between the standalone login and registration screens', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /create account/i }))
    expect(await screen.findByRole('heading', { name: /personal information/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /back to sign in/i }))
    expect(await screen.findByRole('heading', { name: /sign in/i })).toBeInTheDocument()
  })
})