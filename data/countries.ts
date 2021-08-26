import { records, Alpha3Code, EnglishShortName, findByAlpha3 } from 'iso-3166-1-ts'

export type Country = {
  alpha3: Alpha3Code
  name: EnglishShortName
}

export type CountryWithCode = {
  code: Alpha3Code
  name: string
}
const equals = (x: string) => (name: string) => x === name
const shortform = (name: string) => {
  const clean = name
    .toLowerCase()
    .replace(/'/, '')
    .replace(/\(.*\)/, '')
    .trim()
    .replace(/\s+/g, '-')
  const eq = equals(clean)
  if (name === 'Virgin Islands (British)' || name === 'Virgin Islands (U.S.)') {
    return name
  }
  if (eq('united-states-of-america')) {
    return 'United States'
  }
  if (eq('lao-peoples-democratic-republic')) {
    return 'Laos'
  }
  if (eq('united-kingdom-of-great-britain-and-northern-ireland')) {
    return 'United Kingdom'
  }
  return name
    .replace(/\(.*\)/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export const countries = records
  .map(({ alpha3, name }: Country) => {
    const comma = name.indexOf(',')
    return {
      code: alpha3,
      name: shortform(~comma ? name.slice(0, comma) : name),
    }
  })
  .sort((a: CountryWithCode, b: CountryWithCode) => (a.name > b.name ? 1 : -1))

export const countryCode3to2 = (alpha3Code: string): string | undefined => {
  return findByAlpha3(alpha3Code)?.alpha2
}