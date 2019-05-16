import React from 'react'
import { useSpring, animated } from 'react-spring'
import { Global, css } from '@emotion/core'

const globalStyles = css`
  .laptop,
  .blob {
    position: absolute;
    background-size: contain;
    background-position: top center;
    background-repeat: no-repeat;
    will-change: transform;
  }

  .laptop {
    width: 172px;
    height: 105px;
    max-width: 100vw;
    max-height: 100vh;
    position: relative;
    z-index: 10;
  }

  .blob {
    width: 300px;
    height: 200px;
    z-index: 1;
  }

  .container {
    width: 100%;
    height: 100%;
    max-width: 100vw;
    max-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const useDeviceOrientation = () => {
  const [coords, setCoords] = React.useState({
    x: undefined,
    y: undefined,
    z: undefined,
  })

  React.useLayoutEffect(() => {
    function handleOrientation({
      alpha,
      beta,
      gamma,
    }: {
      alpha: number
      beta: number
      gamma: number
    }) {
      const x = beta // In degree in the range [-180,180]
      const y = gamma // In degree in the range [-90,90]
      const z = alpha

      /* Magic number to keep illustration more on top */
      setCoords({ x: x - 60, y, z })
    }

    window.addEventListener('deviceorientation', handleOrientation)

    return () =>
      window.removeEventListener('deviceorientation', handleOrientation)
  }, [])

  return coords
}

const birdTransition = (x: number, y: number, z: number) =>
  `translate3d(${y / 3}px, ${x / 2}px, 0) rotateX(${z / 12}deg)`
const containerTransition = (x: number, y: number, z: number) =>
  `translate3d(${y / 4}}px, ${x / 4}}px, ${z / 2}px)`

interface IllustrationAnimationProps {
  backgroundImage: string
  illustrationImage: string
}

const IllustrationAnimation: React.FC<IllustrationAnimationProps> = ({
  backgroundImage,
  illustrationImage,
}) => {
  const { x, y, z } = useDeviceOrientation()

  const [props, set] = useSpring(() => ({
    xyz: [0, 0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }))

  React.useLayoutEffect(() => {
    set({ xyz: [x, y, z] })
  }, [x, y, z, set])

  return (
    <>
      <Global styles={globalStyles} />
      <div className="container">
        <animated.div
          className="laptop"
          style={{
            transform: props.xyz.interpolate(birdTransition),
            backgroundImage: `url("${illustrationImage}")`,
          }}
        />
        <animated.div
          className="blob"
          style={{
            transform: props.xyz.interpolate(containerTransition),
            backgroundImage: `url("${backgroundImage}")`,
          }}
        />
      </div>
    </>
  )
}

export default IllustrationAnimation
