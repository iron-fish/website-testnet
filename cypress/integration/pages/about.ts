describe('/about', () => {
  it('has links', () => {
    cy.visit('/about')
    cy.get('a').then($el => {
      expect($el).to.not.have.attr('href', '#')
      expect($el).to.not.have.attr('href', '')
    })
  })
})

export {}
