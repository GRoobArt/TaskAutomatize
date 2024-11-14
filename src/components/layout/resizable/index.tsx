'use client'

import { ResizablePanelGroup } from '@/components/ui/resizable'
import { useScreen } from '@/hooks/useScreen'

export const Rendizable = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { width } = useScreen()

  return width > 1024 ? (
    <ResizablePanelGroup direction='horizontal'>{children}</ResizablePanelGroup>
  ) : (
    <>{children}</>
  )
}
