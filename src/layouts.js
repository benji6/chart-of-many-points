import {shuffle} from 'd3-array'
import {randomNormal} from 'd3-random'

const rng = randomNormal(0, 0.15)

const phyllotaxisLayout = length => {
  const pointWidth = 1 / Math.sqrt(length)
  const theta = Math.PI * (3 - Math.sqrt(5))
  const pointRadius = pointWidth / 2

  return Array.from({length}, (_, i) => {
    const index = i % length
    const phylloX = pointRadius * Math.sqrt(index) * Math.cos(index * theta)
    const phylloY = pointRadius * Math.sqrt(index) * Math.sin(index * theta)

    return {
      color: [Math.random() * 0.6 + 0.4, 0.5 + Math.random() * 0.5, Math.random() * 0.1],
      x: 0.5 + (phylloX - pointRadius),
      y: 0.5 + (phylloY - pointRadius),
    }
  })
}

const gridLayout = length => {
  const pointWidth = 1 / Math.sqrt(length)
  const pointsPerRow = Math.floor(1 / pointWidth)

  return shuffle(Array.from({length}, (_, i) => ({
    color: [Math.random() * 0.1, Math.random() * 0.6 + 0.4, Math.random() * 0.1 + 0.9],
    x: pointWidth * (i % pointsPerRow),
    y: pointWidth * Math.floor(i / pointsPerRow),
  })))
}

const ring = length => Array.from({length}, (_, i) => ({
  color: [Math.random() * 0.1, Math.random() * 0.6 + 0.4, Math.random() * 0.1],
  x: (rng() + Math.cos(i)) / 3 + 0.5,
  y: (rng() + Math.sin(i)) / 3 + 0.5,
}))

const random = length => Array.from({length}, () => ({
  color: [Math.random() * 0.6 + 0.4, Math.random() * 0.1, 0.5 + Math.random() * 0.5],
  x: Math.random(),
  y: Math.random(),
}))

export default [gridLayout, random, ring, phyllotaxisLayout]
