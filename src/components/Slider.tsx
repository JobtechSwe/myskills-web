import 'rc-slider/assets/index.css'
import React from 'react'
import Flex from './Flex'
import { Global, css } from '@emotion/core'
import SliderInput, { createSliderWithTooltip } from 'rc-slider'
import sliderThumb from '../images/slider_thumb.svg'
import { theme } from '../theme'

const SliderWithTooltip = createSliderWithTooltip(SliderInput)

interface SliderProps {
  min: number
  max: number
  onInput: (val: number) => void
  defaultValue: number
}

const Slider: React.FC<SliderProps> = ({ min, max, onInput, defaultValue }) => {
  return (
    <Flex flex={1} flexDirection="column">
      <Global
        styles={css`
          .rc-slider-tooltip-content .rc-slider-tooltip-inner {
            align-items: center;
            background-color: ${theme.colors.seashellPeach};
            box-shadow: none;
            box-sizing: content-box;
            color: ${theme.colors.black};
            display: flex;
            font-size: 14px;
            font-weight: 500;
            justify-content: center;
            margin-top: 6px;
            padding: 5px 10px;

            &::after {
              background: ${theme.colors.seashellPeach};
              content: '';
              height: 12px;
              left: calc(50% - 6px);
              position: absolute;
              bottom: 2px;
              transform: rotate(45deg);
              width: 12px;
            }
          }
        `}
      />
      <SliderWithTooltip
        defaultValue={defaultValue}
        handleStyle={{
          backgroundImage: `url(${sliderThumb})`,
          backgroundRepeat: 'no-repeat',
          border: 'none',
          height: 24,
          width: 24,
          marginLeft: -14,
          marginTop: -9,
        }}
        max={max}
        min={min}
        onChange={onInput}
        railStyle={{ backgroundColor: theme.colors.athensGray, height: 5 }}
        tipFormatter={(value: number) => `${value} år`}
        tipProps={{
          placement: 'top',
          prefixCls: 'rc-slider-tooltip',
        }}
        trackStyle={{ backgroundColor: theme.colors.bitterSweet, height: 5 }}
      />
      <Flex justifyContent="space-between" mt="small">
        <span>{min} år</span>
        <span>{max}+ år</span>
      </Flex>
    </Flex>
  )
}

export default Slider
