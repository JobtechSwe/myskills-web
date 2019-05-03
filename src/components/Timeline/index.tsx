import React from 'react'
import styled from '@emotion/styled'
import TimelineEntry from './TimelineEntry'

const mockData = [
  {
    title: 'Frontendutvecklare',
    schoolOrCompany: 'Iteam',
    degree: null,
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

const Wrapper = styled.div`
  width: 100%;
`

const Timeline: React.FC = () => {
  return (
    <Wrapper>
      {mockData.map((entry, i) => (
        <TimelineEntry key={`entry-${i}`} entry={entry} />
      ))}
    </Wrapper>
  )
}

export default Timeline
