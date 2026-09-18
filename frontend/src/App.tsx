import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import { RegistrationPage } from './pages/RegistrationPage'

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'register'>('login')

  if (currentPage === 'register') {
    return <RegistrationPage onBackToLogin={() => setCurrentPage('login')} />
  }

  return <LoginPage onGoToRegister={() => setCurrentPage('register')} />
}

export default App
