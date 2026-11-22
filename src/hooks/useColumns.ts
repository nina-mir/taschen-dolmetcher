import { useEffect, useState } from 'react'

function countColumns(): number {
  if (window.matchMedia('(min-width: 1024px)').matches) return 6
  if (window.matchMedia('(min-width: 640px)').matches) return 4
  return 3
}

/** How many thumbnails fit in one archive row at the current screen width. */
export function useColumns(): number {
  const [columns, setColumns] = useState<number>(countColumns)

  useEffect(() => {
    const onResize = () => setColumns(countColumns())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return columns
}
