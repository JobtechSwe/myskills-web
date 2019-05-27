import * as React from 'react'
import { render } from 'utils/test-utils'
import Timeline from 'views/Profile/Timeline'
import { wait } from 'react-testing-library'

import ProfileLayout from '../Layout/ProfileLayout'
import { GET_PROFESSION_AND_CONTACT } from '../Layout/ProfileLayout'

describe('components/ProfileLayout', () => {
  let withResultsMock: any

  it('renders', () => {
    withResultsMock = [
      {
        request: {
          query: GET_PROFESSION_AND_CONTACT,
        },
        result: {
          data: {
            profile: {
              name: '',
              __typename: 'ContactInformation',
            },
            occupation: {
              term: '',
              __typename: 'Occupation',
            },
          },
        },
      },
    ]
    const { container } = render(
      <ProfileLayout currentPath="/profil/tidslinje">
        <Timeline />
      </ProfileLayout>,
      withResultsMock
    )

    expect(container).toMatchSnapshot()
  })

  it('renders with storage data', async () => {
    withResultsMock = [
      {
        request: {
          query: GET_PROFESSION_AND_CONTACT,
        },
        result: {
          data: {
            profile: {
              name: 'Example Persson',
              __typename: 'Profile',
            },
            occupation: {
              term: 'Systemutvecklare',
              __typename: 'Occupation',
            },
          },
        },
      },
    ]
    const { container, getByText } = render(
      <ProfileLayout currentPath="/profil/tidslinje">
        <div />
      </ProfileLayout>,
      withResultsMock
    )

    await wait()

    expect(getByText('Example Persson')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
