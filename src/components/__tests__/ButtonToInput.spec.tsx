import * as React from 'react'
import ButtonToInput from '../ButtonToInput'
import { fireEvent } from 'react-testing-library'
import { render } from '../../utils/test-utils'

describe('components/ButtonToInput', () => {
  it('calls onSelect with input value', async () => {
    const onSelect = jest.fn()
    const { getByText, getByPlaceholderText } = render(
      <ButtonToInput
        addButtonText="Add"
        buttonText="Add something"
        inputPlaceholder="Write something to add..."
        onSelect={onSelect}
      />
    )

    fireEvent.click(getByText(/Add something/i))

    fireEvent.change(getByPlaceholderText(/write something to add.../i), {
      target: { value: 'Value that should be added' },
    })

    fireEvent.click(getByText(/add/i))

    expect(onSelect).toHaveBeenCalledWith('Value that should be added')
  })
})
