'use client'

import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from './theme'
import { ProjectProvider } from './projects'
import { TaskProvider } from './taks'
import { UserProvider } from './user'

export function Providers({
  session,
  children,
}: {
  session: Session | null
  children: React.ReactNode
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute='class'
        defaultTheme='dark'
        enableSystem
        disableTransitionOnChange>
        <UserProvider>
          <ProjectProvider>
            <TaskProvider>{children}</TaskProvider>
          </ProjectProvider>
        </UserProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
