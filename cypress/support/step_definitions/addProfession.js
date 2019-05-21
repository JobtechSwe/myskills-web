Given('I open the add profession page', () => {
  cy.visit('/skapa-cv/')
})

Given('I am not logged in', () => {
  cy.clearCookie('token')
})

Given('I am logged in', () => {
  cy.register()
})

When('I search for {string}', string => {
  cy.get('input')
    .should('exist')
    .type(string)
})

Then('I should see a list with a list item that contains {string}', string => {
  cy.get('li').should('contain', string)
})

When('I click the item containing the text {string}', string => {
  cy.get('ul').within($list => {
    cy.get('li').click()
  })
})

When('I reload the page', () => {
  cy.reload(true)
})

Then('The added profession should still be present', () => {
  cy.getLocalStorage('occupation').then(data => {
    expect(JSON.parse(data).term).to.equal('Banarbetare')
  })
})

When('I use a new browser', () => {
  cy.clearCookies()
  cy.clearLocalStorage()
})

When('I login', () => {
  cy.login()
})

When('I try to go to the next view', () => {
  cy.get('[data-testid="okButton"]').click()
})

Then('I should remain on the same view', () => {
  cy.url().should('eq', 'http://localhost:3001/skapa-cv/')
})

Then('I should be able to navigate to next view', () => {
  cy.url().should('eq', 'http://localhost:3001/skapa-cv/kompetenser')
})
