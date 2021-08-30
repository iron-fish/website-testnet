import { useEffect, useState } from 'react'
import { Box } from 'components/OffsetBorder/Box'
import { scrollUp } from 'utils/scroll'
import { UpArrow } from 'components/icons/UpArrow'

export type BackToTopProps = {
  visibleAfter?: number
}

export const BackToTop = ({ visibleAfter = 280 }) => {
  const [$visible, $setVisibility] = useState<boolean>(false)
  useEffect(() => {
    function scrollVisibility() {
      const y = window.scrollY
      $setVisibility(y >= visibleAfter)
    }

    window.addEventListener('scroll', scrollVisibility)
    return () => window.removeEventListener('scroll', scrollVisibility)
  }, [$setVisibility, visibleAfter])
  return (
    <div
      className={`fixed flex cursor-pointer right-12 bottom-96 z-10 transition-opacity duration-300 ${
        $visible
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => scrollUp()}
    >
      <Box background="ifpink">
        <div className="w-16 h-16 flex items-center justify-center">
          <UpArrow />
        </div>
      </Box>
    </div>
  )
}

export default BackToTop
