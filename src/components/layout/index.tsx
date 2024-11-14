import { Main } from '@/components/layout/main'
import { Header } from '@/components/layout/header'
import { Rendizable } from '@/components/layout/resizable'
import { Toaster } from '@/components/ui/toaster'

export const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <Header />
      <Main>
        <Rendizable>{children}</Rendizable>
      </Main>
      <Toaster />
    </>
  )
}
