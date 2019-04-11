import { createUnionTypeNode } from 'typescript'
const appUrl = 'http://localhost:1337'
const host = 'http://localhost:3000'
Cypress.Commands.add('getLocalStorage', key => {
  return localStorage.getItem(key)
})

Cypress.Commands.add('login', () => {
  getLoginUrl()
  .then(url => )
})

function getLoginUrl() {
  const query = {
    query: `mutation login { login { url } }`
  }
  return cy.request({
    url: `${host}/graphql`,
    method: 'POST',
    body: JSON.stringify(query),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.body.data.login.url)
}

Cypress.Commands.add('register', () => {
  createAccount()
    .then(data => {
      cy.log(data.body)
    })
    .then(createConsentRequest)
    .then(consent => getConsentRequest(consent.url))
    .then(data => approveConsentRequest(data))
    .then(consentRequestId => getAccessToken(consentRequestId))
    .then(accessToken => cy.setCookie('token', accessToken))
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
    query: 'mutation consent { consent { url } }',
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

function getConsentRequest(consentUrl) {
  return cy.request({
    url: `${appUrl}/getConsentRequest`,
    method: 'POST',
    body: JSON.stringify({
      args: consentUrl,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.body.data)
}

function approveConsentRequest(data) {
  return cy.request({
    url: `${appUrl}/approveConsentRequest`,
    method: 'POST',
    body: JSON.stringify({
      args: {
        data
      }
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(() => data.consentRequestId)
}

function getAccessToken(consentRequestId) {
  return cy.request({
    url: `${host}/approved/${consentRequestId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.body.accessToken)
}