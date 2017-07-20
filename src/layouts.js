import {randomNormal} from 'd3-random'

const rng = randomNormal(0, 0.15)

const phyllotaxisLayout = (length, pointWidth) => {
  const theta = Math.PI * (3 - Math.sqrt(5))

  const pointRadius = pointWidth / 2

  return Array.from({length}, (_, i) => {
    const index = i % length
    const phylloX = pointRadius * Math.sqrt(index) * Math.cos(index * theta)
    const phylloY = pointRadius * Math.sqrt(index) * Math.sin(index * theta)

    return {
      color: [Math.random() * 0.6 + 0.4, 0.5 + Math.random() * 0.5, Math.random() * 0.1],
      x: 0.5 + (phylloX - pointRadius) * 1.75,
      y: 0.5 + (phylloY - pointRadius) * 1.75,
    }
  })
}

const greenCircle = length => Array.from({length}, (_, i) => ({
  color: [Math.random() * 0.1, Math.random() * 0.6 + 0.4, Math.random() * 0.1],
  x: (rng() + Math.cos(i)) / 2.5 + 0.5,
  y: (rng() + Math.sin(i)) / 2.5 + 0.5,
}))

const pinkBlob = length => Array.from({length}, () => ({
  color: [Math.random() * 0.6 + 0.4, Math.random() * 0.1, 0.5 + Math.random() * 0.5],
  x: rng() + 0.5,
  y: rng() + 0.5,
}))

export default [pinkBlob, greenCircle, phyllotaxisLayout]
