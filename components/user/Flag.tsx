import Image from 'next/image'

import { countries, countryCode3to2 } from 'data/countries'

type FlagProps = {
  code: string
}

export default function Flag({ code }: FlagProps) {
  const alpha2CountryCode = countryCode3to2(code)
  const country = countries.find(c => c.code === code)
  const shortCountryName = country ? country.name : code

  return alpha2CountryCode ? (
    <div className="flex border border-black">
      <Image
        src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${alpha2CountryCode.toLowerCase()}.svg`}
        alt={shortCountryName}
        className="border border-black"
        height={18}
        width={24}
        layout="fixed"
        title={shortCountryName}
      />
    </div>
  ) : (
    <span>{shortCountryName}</span>
  )
}
