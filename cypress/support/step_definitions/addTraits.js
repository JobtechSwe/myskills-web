Given('I open the egenskaper-page', () => {
  cy.visit('/skapa-cv/egenskaper')
})

When('I click Lägg till en ny egenskap', () => {
  cy.get(`[data-testid="addTraitButton"`).click()
})

When('I type {string} as a {string}', (input, fieldName) => {
  cy.get(`[name="${fieldName}"]`).type(input)
})

When('I press OK', () => {
  cy.get('[data-testid="okButton"]').click()
})

Then('{string} should be added as a trait', trait => {
  cy.get('[data-testid="tagList"]').should('contain', trait)
})
