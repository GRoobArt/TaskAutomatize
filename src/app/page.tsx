import { FormLogin } from '@/components/forms/login'
export default async function Home() {
  return (
    <main className='p-4 lg:grid lg:place-items-center lg:h-screen lg:w-screen'>
      <FormLogin />
    </main>
  )
}
