import Input from './Input'
import React from 'react'
import Tag from './Tag'
import styled from '@emotion/styled'
import { useToggle } from '@iteam/hooks'

interface ButtonToInputProps {
  buttonText?: string
  onSelect: (value: string) => void
}

const InputWrapper = styled(Input)`
  display: flex;
  align-items: center;
`

const TagButton = styled(Tag)`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.redOrange};
  font-weight: 600;
`

const ButtonToInput: React.FC<ButtonToInputProps> = ({
  buttonText = 'OK',
  onSelect,
}) => {
  const [inputValue, setInputValue] = React.useState('')
  const [addCompetenceActive, setAddCompetenceActive] = useToggle(false)

  const handleSelect = () => {
    onSelect(inputValue)
    setAddCompetenceActive()
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  return addCompetenceActive ? (
    <InputWrapper mb="medium" mt="small" p={0} as="div">
      <Input
        alignSelf="stretch"
        border="none"
        onChange={handleInputChange}
        value={inputValue}
        placeholder="Lägg till en kompetens"
      />
      <TagButton
        borderRadius={8}
        ml={6}
        onClick={handleSelect}
        p="small"
        role="button"
      >
        {buttonText}
      </TagButton>
    </InputWrapper>
  ) : (
    <Tag mb="medium" mt="small" onClick={setAddCompetenceActive}>
      + Lägg till en kompetens
    </Tag>
  )
}

export default ButtonToInput
