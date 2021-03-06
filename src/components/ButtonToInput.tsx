import Input from './Input'
import React from 'react'
import Tag from './Tag'
import styled from '@emotion/styled'
import { useToggle } from '@iteam/hooks'
import { handleFocusKeyDown } from 'utils/helpers'

interface ButtonToInputProps {
  buttonText: string
  addButtonText?: string
  inputPlaceholder: string
  onSelect: (value: string) => void
  onChange?: (value: string) => void
}

export const InputWrapper = styled(Input)`
  align-items: center;
  display: flex;
`

export const TagButton = styled(Tag)`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.redOrange};
  font-weight: 600;
`

const ButtonToInput: React.FC<ButtonToInputProps> = ({
  addButtonText = 'OK',
  buttonText,
  inputPlaceholder,
  onChange,
  onSelect,
}) => {
  const [inputValue, setInputValue] = React.useState('')
  const [addCompetenceActive, setAddCompetenceActive] = useToggle(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleSelect = () => {
    onSelect(inputValue)
    setAddCompetenceActive()
    setInputValue('')
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    if (typeof onChange === 'function') {
      onChange(event.target.value)
    }
  }

  React.useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  }, [addCompetenceActive])

  return addCompetenceActive ? (
    <InputWrapper as="div" mb="medium" mt="small" p={0}>
      <Input
        alignSelf="stretch"
        border="none"
        onChange={handleInputChange}
        placeholder={inputPlaceholder}
        ref={inputRef}
        value={inputValue}
      />
      <TagButton
        borderRadius={8}
        ml={6}
        onClick={handleSelect}
        onKeyDown={handleFocusKeyDown(handleSelect)}
        p="small"
        role="button"
        tabIndex={0}
      >
        {addButtonText}
      </TagButton>
    </InputWrapper>
  ) : (
    <Tag
      mb="medium"
      mt="small"
      onClick={setAddCompetenceActive}
      onKeyDown={handleFocusKeyDown(setAddCompetenceActive)}
      role="button"
      tabIndex={0}
    >
      {buttonText}
    </Tag>
  )
}

export default ButtonToInput
