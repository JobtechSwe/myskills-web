import React from 'react'
import styled from '@emotion/styled'
import TimelineEntry from './TimelineEntry'

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

const Wrapper = styled.ul<{ enableTimelineBar: boolean }>`
  position: relative;
  width: 100%;

  ${({ enableTimelineBar, theme }) =>
    enableTimelineBar &&
    `
    > li:not(:last-of-type)::after {
      background: ${theme.colors.alabaster};
      content: ' ';
      height: 100%;
      left: 5px;
      position: absolute;
      top: 20px;
      width: 5px;
    }
  `}
`

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
