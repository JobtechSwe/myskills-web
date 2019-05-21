import React from 'react'
import { RouteComponentProps } from '@reach/router'
import ProfileLayout from '../../components/Layout/ProfileLayout'
import TimelineComponent, { Entry } from '../../components/Timeline'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { Education, Experience } from '../../generated/myskills'
import Loader from '../../components/Loader'

const GET_EDUCATIONS_EXPERIENCES = gql`
  query getEducationsAndExperiences {
    experiences {
      id
      employer
      sourceId
      term
      start
      end
    }
    educations {
      programme
      school
      start
      end
      id
    }
  }
`
const educationsToEntries = (educations: Education[]) =>
  !educations
    ? []
    : educations.map(({ programme, start, end, school }: Education) => ({
        title: programme,
        degree: undefined,
        schoolOrCompany: school,
        start,
        end,
      }))

const experiencesToEntries = (experiences: Experience[]) =>
  !experiences
    ? []
    : experiences.map(({ employer, start, end, term }: Experience) => ({
        title: term,
        degree: undefined,
        schoolOrCompany: employer,
        start,
        end,
      }))

const sortByDate = (arr: Entry[]) =>
  arr.sort((a, b) => (a.start > b.start ? -1 : a.start < b.start ? 1 : 0))

const Timeline: React.FC<RouteComponentProps> = ({
  location = { pathname: '' },
}) => {
  const { data, error, loading } = useQuery(GET_EDUCATIONS_EXPERIENCES)

  return (
    <ProfileLayout currentPath={location.pathname}>
      {error && 'error'}
      {loading && <Loader />}
      {!loading && data && (
        <TimelineComponent
          enableTimelineBar={true}
          entries={sortByDate([
            ...experiencesToEntries(data.experiences),
            ...educationsToEntries(data.educations),
          ])}
        />
      )}
    </ProfileLayout>
  )
}

export default Timeline
