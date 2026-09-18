import { BrandPanel } from '../components/auth/BrandPanel'
import { LoginForm } from '../components/auth/LoginForm'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f3efe9]">
      <div className="flex h-screen w-full overflow-hidden border border-[#e7dfd3] bg-white shadow-soft">
        <BrandPanel />

        <div className="flex w-full flex-1 items-center justify-center bg-[#f8f5f1] p-6 sm:p-8 lg:w-1/2 lg:p-12">
          <div className="w-full max-w-xl">
            <div className="mb-6 flex justify-center lg:hidden">
              <img src="/src/assets/images/tenants/res-roma/logo.png" alt="Res Roma logo" className="h-12 w-12 rounded-full object-cover" />
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  )
}
