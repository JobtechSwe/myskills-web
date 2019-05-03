import React, { useState } from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr;
  font-family: ${({ theme }) => theme.fonts.default};
`

const DotWrapper = styled.div`
  padding: 15px 0;
`

const ContentWrapper = styled.div<{ editing: boolean }>`
  background-color: ${({ editing, theme }) =>
    editing ? theme.colors.seashellPeach : theme.colors.white};
  display: grid;
  grid-template-columns: 1fr 20px;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
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

interface TimelineEntryProps {
  entry: any
}

const removeEntry = () => {
  console.log('DELETE!')
}

const TimelineEntry: React.FC<TimelineEntryProps> = ({ entry }) => {
  const [editing, toggleEditMode] = useState(false)

  return (
    <Wrapper>
      <DotWrapper>
        <img alt="dot" src="images/elipse.svg" />
      </DotWrapper>
      <ContentWrapper editing={editing}>
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
          {editing ? (
            <button onClick={removeEntry}>
              <img alt="remove" src="images/trashcan.svg" />
            </button>
          ) : (
            <button onClick={() => toggleEditMode(!editing)}>
              <img alt="edit" src="images/edit.svg" />
            </button>
          )}
        </TimelineEntryEdit>
      </ContentWrapper>
    </Wrapper>
  )
}

export default TimelineEntry
