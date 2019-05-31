Given('I open the login page', () => {
  cy.visit('/logga-in')
})

Then('I click login button', () => {
  cy.get('button')
    .should('exist')
    .click()
})

Then('I should see a link which can open the Egendata-application', () => {
  cy.get('a')
    .contains('Logga in med')
    .should('have.attr', 'href')
    .should('exist')
})
