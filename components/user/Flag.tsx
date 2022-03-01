import Image from 'next/image'

import { countries, countryCode3to2 } from 'data/countries'

type FlagProps = {
  code: string
  width?: number
}

export default function Flag({ code, width = 24 }: FlagProps) {
  const alpha2CountryCode = countryCode3to2(code)
  const country = countries.find(c => c.code === code)
  const shortCountryName = country ? country.name : code

  return alpha2CountryCode ? (
    <div className="flex border border-black">
      <Image
        src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${alpha2CountryCode.toLowerCase()}.svg`}
        alt={shortCountryName}
        title={shortCountryName}
        className="border border-black"
        height={Math.round(0.75 * width)}
        width={width}
        layout="fixed"
      />
    </div>
  ) : (
    <span>{shortCountryName}</span>
  )
}
