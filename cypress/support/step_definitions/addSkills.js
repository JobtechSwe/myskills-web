Given('I open the kompetenser-page', () => {
  cy.visit('/skapa-cv/kompetenser')
})

When('I click Lägg till kompetens', () => {
  cy.get('span')
    .contains('Lägg till kompetens')
    .click()
})

When('I type {string} as a skill', input => {
  cy.get(`[placeholder="Lägg till kompetens"]`).type(input)
})

When('I press OK', () => {
  cy.get('span[role="button"]')
    .contains('OK')
    .click()
})

Then('{string} should be added as a skill', skill => {
  cy.get('[data-testid="tagList"]').should('contain', skill)
})
