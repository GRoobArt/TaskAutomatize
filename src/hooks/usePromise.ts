'use client'

import { useState, useEffect } from 'react'

export function usePromine<T>(fetch: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: T = await fetch()

        setData(res)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(true)
      }
    }

    if (!loading) fetchData()
  }, [loading, fetch])

  return { data, loading }
}
