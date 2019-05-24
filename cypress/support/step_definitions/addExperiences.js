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

When('I type the experience {string} as {string}', (input, value) => {
  cy.get(`[data-testid="${input}"]`)
    .should('exist')
    .type(value)
})

When('I add the experience', () => {
  cy.get('[data-testid="saveButton"]').click()
})

Then(
  'I should see {string} with {string} within my experiences',
  (title, schoolOrCompany) => {
    cy.get('ul[data-testid="timelineWrapper"]').within($timeline => {
      cy.contains(title).should('exist')
      cy.contains(schoolOrCompany).should('exist')
    })
  }
)

When('I start updating an experience', () => {
  cy.get('[data-testid="timelineUpdateButton"]').click()
})

When('I clear the field {string}', input => {
  cy.get(`[data-testid="${input}"]`)
    .should('exist')
    .clear()
})

When('I save the updated experience', () => {
  cy.get('[data-testid="updateButton"]').click()
})

When('I delete an experience', () => {
  cy.get('[data-testid="deleteButton"]').click()
})

Then('I should not see any experiences', () => {
  cy.get('ul[data-testid="timelineWrapper"]').should('be.empty')
})
