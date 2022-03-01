import React from 'react'
import clsx from 'clsx'

type Props = { color: string; classes?: string[] }

export function RawFishAvatar({ color, classes }: Props) {
  return (
    <svg
      className={clsx(classes)}
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M99.5164 64.1951L97.1865 60.1595L89.2817 46.4718L87.5819 43.5298C87.2907 43.0186 86.7439 42.7036 86.1555 42.7036H62.2866C61.6982 42.7036 61.1514 43.0186 60.8602 43.5298L58.9583 46.8224L50.6078 61.2887C50.4473 61.5681 50.0907 61.7107 49.7816 61.6275C49.4607 61.5443 49.2408 61.2531 49.2408 60.9203V54.0437C49.2408 47.7912 44.1532 42.7036 37.9007 42.7036H28.201C27.2917 42.7036 26.5547 43.4406 26.5547 44.3499V54.0437C26.5547 58.5667 29.2471 62.6082 33.4134 64.3437C33.6868 64.4566 33.8651 64.7241 33.8651 65.0153V65.0212C33.8651 65.3184 33.6868 65.5799 33.4134 65.6988C29.2708 67.4224 26.5785 71.4401 26.5547 75.9334C26.5547 75.9393 26.5547 75.9809 26.5547 75.9869V83.0714V85.6985C26.5547 86.6078 27.2917 87.3448 28.201 87.3448H37.8948C44.1473 87.3448 49.2349 82.2572 49.2349 76.0047V69.1281C49.2349 68.7953 49.4607 68.5041 49.7757 68.4209C49.8351 68.403 49.9005 68.3971 49.9659 68.3971C50.2274 68.3971 50.4711 68.5397 50.6018 68.7656L59.4932 84.1591L60.8543 86.5186C61.1455 87.0298 61.6923 87.3448 62.2807 87.3448H86.1496C86.738 87.3448 87.2847 87.0298 87.576 86.5186L90.1019 82.1443L96.0394 71.8562L96.1226 71.7076L98.8507 66.9826L99.5045 65.8474C99.8076 65.3362 99.8076 64.7062 99.5164 64.1951ZM74.3994 73.6868C69.7457 73.6868 65.9537 69.7998 65.9537 65.0212C65.9537 60.2427 69.7397 56.3557 74.3994 56.3557C79.0531 56.3557 82.845 60.2427 82.845 65.0212C82.845 69.7998 79.0531 73.6868 74.3994 73.6868Z"
        fill={color}
        stroke="#000000"
        style={{ strokeWidth: '1px' }}
      />
    </svg>
  )
}

export const FishAvatar = ({ color }: Props) => (
  <RawFishAvatar
    classes={[
      'max-w-[3.125rem]',
      'flex',
      'bg-transparent',
      'md:max-w-[8rem]',
      'md:w-[8rem]',
      'border',
      'border-black',
    ]}
    color={color}
  />
)

export default FishAvatar
