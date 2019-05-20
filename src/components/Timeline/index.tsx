import React from 'react'
import styled from '@emotion/styled'
import TimelineEntry from './TimelineEntry'

export type Entry = {
  id?: string
  title: string
  degree?: string
  schoolOrCompany: string
  start: string
  end: string
}

interface TimelineProps {
  editingEntry?: string
  enableTimelineBar?: boolean
  entries: Entry[]
  handleEdit?: (entry: Entry) => void
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
  editingEntry,
  enableTimelineBar = false,
  entries,
  handleEdit,
}) => {
  return (
    <Wrapper enableTimelineBar={enableTimelineBar}>
      {entries.map((entry, i) => (
        <TimelineEntry
          editing={editingEntry === entry.id}
          entry={entry}
          handleEdit={handleEdit}
          key={`entry-${i}`}
        />
      ))}
    </Wrapper>
  )
}

export default Timeline
