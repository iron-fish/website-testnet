import { useState, useRef, useEffect, useCallback } from 'react'

export function useResponsiveCards() {
  const [$scrollWidth, $setScrollWidth] = useState<number>(0)
  const $cards = useRef<HTMLDivElement>(null)

  // listen to the width of the page
  useEffect(() => {
    const reportWindowSize = () => {
      $setScrollWidth(window.innerWidth)
    }
    reportWindowSize()
    window.addEventListener('resize', reportWindowSize)
    return () => window.removeEventListener('resize', reportWindowSize)
  }, [$setScrollWidth])

  // scroll the NFT cards left
  const scrollLeft = useCallback(() => {
    if ($cards && $cards.current && $cards.current.scrollWidth) {
      const left = $cards.current.scrollLeft - Math.round($scrollWidth * 0.75)
      const start = left >= 0 ? left : 0
      $cards.current.scrollTo({ left: start, behavior: 'smooth' })
    }
  }, [$cards, $scrollWidth])

  // scroll the NFT cards right
  const scrollRight = useCallback(() => {
    if ($cards && $cards.current && $cards.current.scrollWidth) {
      const furthest = $cards.current.scrollWidth || 0
      const right = $cards.current.scrollLeft + Math.round($scrollWidth * 0.75)
      if (furthest && right) {
        const end = right <= furthest ? right : furthest
        $cards.current.scrollTo({ left: end, behavior: 'smooth' })
      }
    }
  }, [$cards, $scrollWidth])

  return { scrollLeft, scrollRight, $cards }
}
