import { getData } from 'country-list'

export type Country = {
  code: string
  name: string
}

const equals = (x: string) => (name: string) => x === name
const shortform = (name: string) => {
  const clean = name
    .toLowerCase()
    .replace(/'/, '')
    .replace(/\(.*\)/, '')
    .replace(/\s+/g, '-')
  const eq = equals(clean)
  if (eq('united-states-of-america')) {
    return 'United States'
  }
  if (eq('lao-peoples-democratic-republic')) {
    return 'Laos'
  }
  if (eq('united-kingdom-of-great-britain-and-northern-ireland')) {
    return 'United Kingdom'
  }
  return name.replace(/\(.*\)/, '').replace(/\s+/g, ' ')
}

export const countries = getData()
  .map(({ code, name }: Country) => {
    const comma = name.indexOf(',')
    return { code, name: shortform(~comma ? name.slice(0, comma) : name) }
  })
  .sort((a: Country, b: Country) => (a.name > b.name ? 1 : -1))
