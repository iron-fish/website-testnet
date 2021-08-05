import React from "react"

type Props = { color: string }

function FishAvatar({ color }: Props) {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d)">
        <rect x="-182" y="-12" width="1126" height="73" rx="5" fill="#fff"/>
        <rect x="-181.5" y="-11.5" width="1125" height="72" rx="4.5" stroke="#000"/>
      </g>
      <path fill="#fff" stroke="#000" d="M.5.5h49v49H.5z"/>
      <mask id="a" fill="#fff">
        <path d="M41.093 24.634l-1.056-1.829-3.582-6.202-.77-1.333a.744.744 0 00-.646-.375H24.223a.745.745 0 00-.646.375l-.862 1.492-3.784 6.555a.34.34 0 01-.374.153.329.329 0 01-.245-.32v-3.116a5.145 5.145 0 00-5.139-5.139H8.778a.746.746 0 00-.746.746v4.393A5.04 5.04 0 0011.14 24.7a.331.331 0 01.205.304v.003c0 .135-.081.253-.205.307a5.04 5.04 0 00-3.108 4.637v4.425c0 .412.334.746.746.746h4.393a5.145 5.145 0 005.138-5.138v-3.116a.332.332 0 01.62-.164l4.029 6.975.616 1.069c.132.232.38.374.647.374h10.815a.744.744 0 00.646-.374l1.145-1.982 2.69-4.662.038-.067 1.236-2.141.297-.515a.745.745 0 00.005-.748zm-11.381 4.3c-2.109 0-3.827-1.76-3.827-3.926 0-2.165 1.715-3.927 3.827-3.927 2.109 0 3.827 1.762 3.827 3.927s-1.718 3.927-3.827 3.927z"/>
      </mask>
      <path d="M41.093 24.634l-1.056-1.829-3.582-6.202-.77-1.333a.744.744 0 00-.646-.375H24.223a.745.745 0 00-.646.375l-.862 1.492-3.784 6.555a.34.34 0 01-.374.153.329.329 0 01-.245-.32v-3.116a5.145 5.145 0 00-5.139-5.139H8.778a.746.746 0 00-.746.746v4.393A5.04 5.04 0 0011.14 24.7a.331.331 0 01.205.304v.003c0 .135-.081.253-.205.307a5.04 5.04 0 00-3.108 4.637v4.425c0 .412.334.746.746.746h4.393a5.145 5.145 0 005.138-5.138v-3.116a.332.332 0 01.62-.164l4.029 6.975.616 1.069c.132.232.38.374.647.374h10.815a.744.744 0 00.646-.374l1.145-1.982 2.69-4.662.038-.067 1.236-2.141.297-.515a.745.745 0 00.005-.748zm-11.381 4.3c-2.109 0-3.827-1.76-3.827-3.926 0-2.165 1.715-3.927 3.827-3.927 2.109 0 3.827 1.762 3.827 3.927s-1.718 3.927-3.827 3.927z" fill={color} stroke="#000" strokeWidth="2" mask="url(#a)"/>
      <defs>
        <filter id="filter0_d" x="-186" y="-12" width="1134" height="81" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.19 0"/>
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
      </defs>
    </svg>
  )
}

export default FishAvatar
