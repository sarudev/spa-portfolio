import React, { useCallback } from 'react'
import type { Engine } from 'tsparticles-engine'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

export default function Cherry (): React.ReactElement {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        style: {
          position: 'relative'
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: '#ffffff'
          },
          move: {
            direction: 'bottom-left',
            enable: true,
            outModes: {
              default: 'out'
            },
            random: false,
            speed: 10,
            straight: false
          },
          number: {
            value: 50
          },
          opacity: {
            value: 1
          },
          shape: {
            type: 'image',
            image: [
              {
                src: '/static/petals/petal1.png',
                width: 100,
                height: 100
              },
              {
                src: '/static/petals/petal2.png',
                width: 100,
                height: 100
              },
              {
                src: '/static/petals/petal3.png',
                width: 100,
                height: 100
              },
              {
                src: '/static/petals/petal4.png',
                width: 100,
                height: 100
              },
              {
                src: '/static/petals/petal5.png',
                width: 100,
                height: 100
              },
              {
                src: '/static/petals/petal6.png',
                width: 100,
                height: 100
              },
              {
                src: '/static/petals/petal7.png',
                width: 100,
                height: 100
              },
              {
                src: '/static/petals/petal8.png',
                width: 100,
                height: 100
              },
              {
                src: '/static/petals/petal9.png',
                width: 100,
                height: 100
              }
            ]
          },
          size: {
            value: 20
          }
        }
      }}
    />
  )
}
