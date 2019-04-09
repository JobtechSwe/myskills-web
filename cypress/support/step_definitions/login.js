Given('I open the login page', () => {
  cy.visit('/login')
})

Then('I click login button', () => {
  cy.get('button')
    .should('exist')
    .click()
})

Then('I should see a qr-code', () => {
  cy.get('#consentId').should('exist')
  cy.get('svg').should('exist')
})
