'use client'

import { useState, useEffect } from 'react'

export const useScreen = () => {
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
  }, [width, height])

  return { width, height }
}
