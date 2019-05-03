import React from 'react'
import styled from '@emotion/styled'

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

const TimelineEntry = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  grid-column-gap: 10px;
  font-family: ${({ theme }) => theme.fonts.default};
  margin-bottom: 30px;
`

const TimelineTitle = styled.div`
  margin-bottom: 10px;
`

const TimelineDegree = styled.span`
  font-size: 12px;
`

const TimelineInfo = styled.div`
  align-items: center;
  display: flex;
  font-size: 12px;
`

const TimelineInfoDivider = styled.img`
  margin: 0 10px;
`

const TimelineEntryEdit = styled.div`
  display: flex;
  align-items: flex-end;
`

const Timeline: React.FC = () => {
  return (
    <Wrapper>
      {mockData.map((entry, i) => (
        <TimelineEntry key={`entry-${i}`}>
          <div>
            <img alt="dot" src="images/elipse.svg" />
          </div>
          <div>
            <TimelineTitle>
              {entry.title} <TimelineDegree>, {entry.degree}</TimelineDegree>
            </TimelineTitle>
            <TimelineInfo>
              {entry.schoolOrCompany}
              <TimelineInfoDivider alt="divider" src="images/dot.svg" />
              {entry.start} - {entry.end}
            </TimelineInfo>
          </div>
          <TimelineEntryEdit>
            <img alt="edit" src="images/edit.svg" />
          </TimelineEntryEdit>
        </TimelineEntry>
      ))}
    </Wrapper>
  )
}

export default Timeline
