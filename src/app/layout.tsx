import type { Metadata } from 'next'
import './globals.css'
import { cn } from '@/lib/utils'
import { Providers } from '@/providers'
import { getSession } from '@/lib/auth'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'Aplicación de Tareas | Maui and Sons',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getSession()

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <Analytics />
        <Providers session={session}>
          {children}
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  )
}
