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

const getFont = (el: HTMLElement) =>
  (document && document.defaultView
    ? document.defaultView.getComputedStyle(el).getPropertyValue('font-family')
    : el && el.style && el.style.font
  )
    .split(/('.*?'|".*?"|\S+)/g)
    .map(z => z.replace(/,/g, ''))
    .filter(z => z.trim().length > 0)

export const fontsInUse = (expected: string[]) => {
  cy.get('*').should($elements => {
    const mapped = $elements
      .map((_, el) => getFont(el))
      .get()
      .reduce(
        (agg: string[], x: string) => (agg.includes(x) ? agg : agg.concat(x)),
        []
      )
    expect(mapped).to.deep.eq(expected)
  })
}
