Given('I open the add experiences page', () => {
  cy.visit('/skapa-cv/erfarenheter/tidigare-erfarenheter/')
})

Given('I am not logged in', () => {
  cy.clearCookie('token')
})

When('I try to go to the next view', () => {
  cy.get('[data-testid="okButton"]').click()
})

Then('I should be able to navigate to next view', () => {
  cy.url().should('eq', 'http://localhost:3001/skapa-cv/utbildning')
})
