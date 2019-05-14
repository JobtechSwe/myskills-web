// /* eslint-disable */
// import * as React from 'react'
// import Register, { GET_CONSENT_ID } from '../Register'

// import { render } from '../../../utils/test-utils'
// import { fireEvent, wait, waitForElement } from 'react-testing-library'

// const consent = {
//   id: 'db993c65-0673-454e-b951-bcb8d274f184',
//   expires: '1552561115',
//   url: '123',
//   __typename: 'Consent',
// }

// const getConsentMock = [
//   {
//     request: {
//       query: GET_CONSENT_ID,
//     },
//     result: {
//       data: {
//         consent,
//       },
//     },
//   },
// ]

// jest.mock('../Consent', () => () => (
//   <p>mydata://register/db993c65-0673-454e-b951-bcb8d274f184</p>
// ))

// describe('views/Register', () => {
//   it('renders without errors', async () => {
//     const { container } = render(<Register />, [])

//     await wait()

//     expect(container).toMatchSnapshot()
//   })

//   it('should render loading state initially', async () => {
//     const { getByText } = render(<Register />, getConsentMock)

//     fireEvent.click(getByText(/register/i))

//     expect(getByText(/loading.../i)).toBeInTheDocument()
//   })

//   it.skip('should render errors', async () => {
//     const errorMock = [
//       {
//         request: {
//           query: GET_CONSENT_ID,
//         },
//         result: {
//           error: new Error('Error while trying to request consentId'),
//         },
//       },
//     ]
//     const { getByText } = render(<Register />, errorMock)

//     fireEvent.click(getByText(/login/i))

//     await wait()

//     expect(getByText(/that’s an error./i)).toBeInTheDocument()
//   })

//   it('should render consentId after Register is clicked', async () => {
//     const { getByText } = render(<Register />, getConsentMock)

//     fireEvent.click(getByText(/register/i))

//     await waitForElement(() => getByText(`mydata://register/${consent.id}`))

//     expect(getByText(`mydata://register/${consent.id}`)).toBeInTheDocument()
//   })
// })
