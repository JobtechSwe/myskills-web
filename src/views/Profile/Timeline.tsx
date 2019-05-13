import React from 'react'
import { RouteComponentProps } from '@reach/router'
import ProfileLayout from '../../components/Layout/ProfileLayout'
import TimelineComponent from '../../components/Timeline'

const mockData = [
  {
    title: 'Frontendutvecklare',
    schoolOrCompany: 'Iteam',
    degree: undefined,
    start: '2018/11',
    end: '2019/04',
  },
  {
    title: 'Frontendutvecklare',
    schoolOrCompany: 'Webbutveckling',
    degree: 'Kandidat',
    start: '2012/01',
    end: '2018/10',
  },
  {
    title: 'Pistvaktsutbildning',
    schoolOrCompany: 'Skistar',
    degree: 'Diplomerad',
    start: '2009/01',
    end: '2011/11',
  },
]

const Timeline: React.FC<RouteComponentProps> = ({
  location = { pathname: '' },
}) => {
  return (
    <ProfileLayout currentPath={location.pathname}>
      <TimelineComponent entries={mockData} />
    </ProfileLayout>
  )
}

export default Timeline
