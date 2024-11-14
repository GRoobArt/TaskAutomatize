'use client'

import { useScreen } from '@/hooks/useScreen'
import { ResizableHandle, ResizablePanel } from '@/components/ui/resizable'
import { FormTask } from '@/components/task/form'

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const { width } = useScreen()

  return width > 1024 ? (
    <>
      <ResizablePanel minSize={30}>{children}</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={35} minSize={30}>
        <FormTask />
      </ResizablePanel>
    </>
  ) : (
    <>
      {children}
      <div>
        <FormTask />
      </div>
    </>
  )
}
