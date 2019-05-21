Given('I open the add education page', () => {
  cy.visit('/skapa-cv/utbildning')
})

Given('I am not logged in', () => {
  cy.clearCookie('token')
})

When(
  'I click on the placeholder for {string} and I enter {string}',
  (placeholder, value) => {
    cy.get(`input[placeholder="${placeholder}"]`)
      .should('exist')
      .type(value)
  }
)

When(
  'I click on the date-selector for {string} and enter {string}',
  (testId, date) => {
    cy.get(`[data-testid="${testId}"]`).within($form => {
      cy.get('input').type(date)
    })
  }
)

When('I click Lägg till', () =>
  cy
    .get('button[type="submit"]')
    .contains('Lägg till')
    .click()
)

Then(
  'I should see {string} with {string} within my educations',
  (school, course) => {
    cy.get('ul[data-testid="timelineWrapper"]').within($timeline => {
      cy.contains(school).should('exist')
      cy.contains(course).should('exist')
    })
  }
)
