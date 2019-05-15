import React from 'react'
import styled from '@emotion/styled'
import Icon from '../assets/icons/calendar.svg'
import { isMobile } from 'react-device-detect'

const Label = styled.label`
  border: ${({ theme }) => `1px solid ${theme.colors.athensGray}`};
  border-radius: 5px;
  display: flex;
  font-size: 16px;
  padding: 12px;
  justify-content: space-between;
`

const Input = styled.input<{ isMobile: boolean }>`
  ${({ isMobile }) =>
    isMobile &&
    `
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
  `}
`

const PickedDate = styled.span<{ isMobile: boolean }>`
  color: ${({ theme }) => theme.colors.black};
  display: ${({ isMobile }) => (isMobile ? 'inline-block' : 'none')};
`

const Placeholder = styled.span<{ isMobile: boolean }>`
  color: grey;
  display: ${({ isMobile }) => (isMobile ? 'inline-block' : 'none')};
`

interface DatePickerProps {
  placeholder?: string
  onChange: (value: string) => void
  value: string
}

const DatePicker: React.FC<DatePickerProps> = ({
  placeholder,
  onChange,
  value,
}) => {
  return (
    <Label>
      {value.length > 0 ? (
        <PickedDate isMobile={isMobile}>{value}</PickedDate>
      ) : (
        <Placeholder isMobile={isMobile}>{placeholder}</Placeholder>
      )}
      <Input
        isMobile={isMobile}
        onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
          onChange(target.value)
        }
        placeholder="Slutdatum"
        type="month"
      />
      <img alt="calendar" src={Icon} />
    </Label>
  )
}

export default DatePicker
