import React, { useState, useContext } from 'react'
import { RouteComponentProps } from '@reach/router'
import styled from '@emotion/styled'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { ExperienceInput } from '../../generated/myskills'
import { Mutation } from 'react-apollo'

const Wrapper = styled.section`
  padding-top: 4rem;
  height: 100vh;
  display: flex;

  align-items: center;
  flex-flow: column nowrap;
  input {
    width: 30%;
    height: 50px;
    font-size: 28px;
  }
`

const GET_EXPERIENCES = gql`
  query taxonomy($q: String!) {
    taxonomy(params: { q: $q }) {
      result {
        term
        taxonomyId
        type
      }
    }
  }
`

const ADD_EXPERIENCE = gql`
  mutation addExperience($experience: ExperienceInput!) {
    addExperience(experience: $experience) {
      name
    }
  }
`

interface InitialCv {
  experiences: ExperienceInput[]
}
const initialState = {
  experiences: [],
}
const CreateProfile: React.FC<RouteComponentProps> = () => {
  const [query, setQuery] = useState('')
  const [currentCv, setCurrentCv] = useState<InitialCv>(initialState)
  const [navigationState, setNavigationState] = useState(0)

  const { data, error, loading } = useQuery(GET_EXPERIENCES, {
    variables: {
      q: query,
    },
  })
  const types = {
    SET_EXPERIENCES: 'set experiences',
  }
  const handleUpdateCv = (data: any, type: string) => {
    switch (type) {
      case types.SET_EXPERIENCES:
        setCurrentCv({
          ...currentCv,
          experiences: [...currentCv.experiences, data],
        })
        break

      default:
        break
    }
  }

  return (
    <Wrapper>
      <input onChange={({ target }) => setQuery(target.value)} />
      this is the query: {query}
      <ul>
        {data.taxonomy &&
          !loading &&
          data.taxonomy.result
            .filter(
              ({ taxonomyId }: { taxonomyId: string }) =>
                !currentCv.experiences.some(y => y.taxonomyId === taxonomyId)
            )
            .map((c: any, i: number) => (
              <li
                key={i}
                onClick={() =>
                  handleUpdateCv(c.taxonomyId, types.SET_EXPERIENCES)
                }
              >
                {c.term}
              </li>
            ))}

        {loading && <div>Loading...</div>}

        <Mutation mutation={ADD_EXPERIENCE}>
          {(addExperience, { data, error, loading }) => {
            if (loading) {
              return <p>Loading...</p>
            }

            if (error) {
              return <p>That’s an error.</p>
            }

            if (data) {
            }

            return (
              <button onClick={_e => addExperience()}>add experience</button>
            )
          }}
        </Mutation>
      </ul>
    </Wrapper>
  )
}

export default CreateProfile
