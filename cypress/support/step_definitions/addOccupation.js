Given('I open the add occupation page', () => {
  cy.visit('/skapa-cv/')
})

Given('I am not logged in', () => {
  cy.clearCookie('token')
})

Given('I am logged in', () => {
  cy.register()
})

When('I search for {string}', string => {
  cy.get('input')
    .should('exist')
    .type(string)
})

Then('I should see a list with a list item that contains {string}', string => {
  cy.get('li').should('contain', string)
})

When('I click the item containing the text {string}', string => {
  cy.get('ul').within($list => {
    cy.get('li').click()
  })
})

When('I reload the page', () => {
  cy.reload(true)
})

Then('The added occupation should still be present', () => {
  cy.getLocalStorage('occupation').then(data => {
    expect(JSON.parse(data).term).to.equal('Banarbetare')
  })
})

When('I use a new browser', () => {
  cy.clearCookies()
  cy.clearLocalStorage()
})

When('I login', () => {
  cy.login()
})
