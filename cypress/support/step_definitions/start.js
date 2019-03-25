Given('I open the startpage', page => {
    cy.visit(page ? page : '/')
})

Then('I click login button', () => {
    cy.get('button').should('exist')
    .click()
})

Then('I should see a qr-code', () => {
    cy.get('#consentId').should('exist')
    cy.get('svg').should('exist')
})
