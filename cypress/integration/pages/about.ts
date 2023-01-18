// eslint-disable-next-line no-restricted-imports
import { fontsInUse } from '../../utils'
// temp

describe('/about', () => {
  beforeEach(() => cy.visit('/about'))
  it('has correct fonts', () => {
    fontsInUse(['favorit-regular', 'sans-serif', 'extended-regular'])
  })
})

export {}
