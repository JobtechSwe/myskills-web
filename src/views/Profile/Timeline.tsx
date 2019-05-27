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
      employer
      term
      start
      end
    }
    educations {
      programme
      school
      start
      end
    }
  }
`

const educationsToEntries = (educations: Education[]) =>
  educations.map(
    e =>
      ({
        title: e.programme,
        schoolOrCompany: e.school,
        start: e.start,
        end: e.end,
      } as Entry)
  )

const experiencesToEntries = (experiences: Experience[]) =>
  experiences.map(
    e =>
      ({
        title: e.term,

        schoolOrCompany: e.employer,
        start: e.start,
        end: e.end,
      } as Entry)
  )

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
            ...experiencesToEntries(data.experiences || []),
            ...educationsToEntries(data.educations || []),
          ])}
        />
      )}
    </ProfileLayout>
  )
}

export default Timeline
