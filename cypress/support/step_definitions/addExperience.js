Given('I open the add experience page', () => {
  cy.visit('/skapa-cv/')
})

Given('I am not logged in', () => {
  cy.clearCookie('token')
})

Given('I am logged in', () => {
  cy.login()
})

When('I search for {string}', string => {
  cy.get('input')
    .should('exist')
    .type(string)
})

Then('I should see a list with a list item that contains {string}', string => {
  cy.get('li').within($listItem => {
    cy.get('button').should('contain', string)
  })
})

When('I click the item containing the text {string}', string => {
  cy.get('ul').within($list => {
    cy.get('li').click()
  })
})

When('I reload the page', () => {
  cy.reload(true)
})

Then('The added experience should still be present', () => {
  cy.getLocalStorage('experiences').then(data => {
    expect(JSON.parse(data)[0].term).to.equal(
      'Banarbetare, utan behörighetsbevis'
    )
  })
})
