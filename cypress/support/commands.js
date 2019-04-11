import { createUnionTypeNode } from 'typescript'
const appUrl = 'http://localhost:1337'
const host = 'https://api-myskills-ci.dev.services.jtech.se'
Cypress.Commands.add('getLocalStorage', key => {
  return localStorage.getItem(key)
})

Cypress.Commands.add('login', () => {
  createAccount()
    .then(data => {
      cy.log(data.body)
    })
    .then(createConsentRequest)
    .then(consent => getConsentRequest(consent.id))
})

function createAccount() {
  const args = {
    args: {
      firstName: 'Mikael',
      lastname: 'Freeman',
    },
  }

  return cy.request({
    url: `${appUrl}/createAccount`,
    method: 'POST',
    body: JSON.stringify(args),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

function createConsentRequest() {
  const query = {
    query: 'mutation consent { consent { id } }',
  }
  return cy
    .request({
      url: `${host}/graphql`,
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.body.data.consent)
}

function getConsentRequest(consentId) {
  cy.request({
    url: `${appUrl}/getConsentRequest`,
    method: 'POST',
    body: JSON.stringify({
      args: `mydata://login/${consentId}`,
    }),
  }).then(cy.log)
}
