import React, { useState, useRef } from 'react'
import styled from '@emotion/styled'
import sliderThumb from '../images/slider_thumb.svg'

interface customProps {
  min: number
  max: number
  onInput: Function
  defaultValue: string
}

type SliderProps = React.HTMLProps<HTMLInputElement> & customProps

const SliderInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 5px;
  border-radius: 8px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  :hover {
    opacity: 1;
  }
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 24px;
    border: 0;
    background: url(${sliderThumb});
    cursor: pointer;
  }
  ::-webkit-slider-thumb:after {
    display: block;
    background-color: blue;
    width: 20px;
    height: 20px;
  }

  ::-moz-range-thumb {
    width: 25px;
    height: 24px;
    border: 0;
    background: url(${sliderThumb});
    cursor: pointer;
  }
`

const SliderRangeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`

const SliderContainer = styled.div`
  flex-direction: column;
  width: 100%;
`

const Range = styled.span``
const Bubble = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  opacity: 0;
`

const Slider: React.FC<SliderProps> = ({ min, max, onInput, defaultValue }) => {
  const bubble = useRef(null)

  const onSlideInput = (e: any) => {
    bubble.current.style.opacity = 1
    bubble.current.target.style.left = e.clientX - bubble.offsetWidth / 2 + 'px'
    onInput(e)
  }
  return (
    <SliderContainer>
      <Bubble ref={bubble} />
      <SliderInput
        defaultValue={defaultValue}
        max={max}
        min={min}
        onInput={onSlideInput}
        type="range"
      />
      <SliderRangeContainer>
        <Range>{min}</Range>
        <Range>{max}+</Range>
      </SliderRangeContainer>
    </SliderContainer>
  )
}

export default Slider
