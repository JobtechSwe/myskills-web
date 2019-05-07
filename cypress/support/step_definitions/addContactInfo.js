Given('I open the kontakt-page', () => {
  cy.visit('/skapa-cv/kontakt')
})

When('I type {string} as {string}', (input, fieldName) => {
  cy.get(`[name="${fieldName}"]`).type(input)
})

When('I press Spara', () => {
  cy.get('form').submit()
})

Then('My {string} should still be set as {string}', (fieldName, expected) => {
  cy.get(`[name="${fieldName}"]`).should('have.value', expected)
})

Then('My information has not be saved', () => {
  cy.get('[name="name"]').should('have.value', '')
  cy.get('[name="email"]').should('have.value', '')
})

// Then(
//   'I should see an error that I also need to fill out {string}',
//   missing => {}
// )
