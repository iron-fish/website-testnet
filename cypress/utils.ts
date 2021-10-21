export type TestLink = {
  isImage: boolean
  text: string
  href: string
}

export const linksMatch = (expected: TestLink[]) => {
  cy.get('a').should($links => {
    const hrefs = $links.map((_, el) => {
      const $el = Cypress.$(el)
      const isImage = $el.find('img').get().length > 0
      return {
        isImage,
        text: isImage ? $el.find('img').attr('alt') : $el.text(),
        href: $el.attr('href'),
      }
    })
    expect(hrefs.get()).to.deep.eq(expected)
  })
}
