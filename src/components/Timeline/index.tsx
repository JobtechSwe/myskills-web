import React from 'react'
import styled from '@emotion/styled'
import TimelineEntry from './TimelineEntry'

const Wrapper = styled.ul<{ enableTimelineBar: boolean }>`
  position: relative;
  width: 100%;

  ${({ enableTimelineBar, theme }) =>
    enableTimelineBar &&
    `
    &:after {
      width: 5px;
      background: ${theme.colors.alabaster};
      height: calc(100% - 20px);
      content: '';
      display: block;
      position: absolute;
      top: 20px;
      left: 5px;
    }
  `}
`

export type Entry = {
  title: String
  degree: String | undefined
  schoolOrCompany: String
  start: String
  end: String
}

interface TimelineProps {
  enableTimelineBar?: boolean
  entries: Entry[]
}

const Timeline: React.FC<TimelineProps> = ({
  enableTimelineBar = false,
  entries,
}) => {
  return (
    <Wrapper enableTimelineBar={enableTimelineBar}>
      {entries.map((entry, i) => (
        <TimelineEntry entry={entry} key={`entry-${i}`} />
      ))}
    </Wrapper>
  )
}

export default Timeline
