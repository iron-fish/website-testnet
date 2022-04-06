import { FC } from 'react'
import clsx from 'clsx'
import Box from 'components/OffsetBorder/CustomBox'

export const Chip: FC = ({ children = 'New' }) => {
  return (
    <Box
      cl="ml-[4px]"
      cb="mb-[1rem]"
      cr="mr-[4px]"
      mt="top-[4px]"
      mb="bottom-[-4px]"
      ml="left-[4px]"
      mr="right-[-4px]"
      behind="bg-ifpink"
      className="h-[3.125rem] max-w-[5rem]"
      background={clsx(
        'uppercase',
        'h-[3.125rem]',
        'bg-white',
        'text-center',
        'align-middle'
      )}
    >
      <div className="mt-3">{children}</div>
    </Box>
  )
}

export default Chip
