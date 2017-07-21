import {randomNormal} from 'd3-random'
import {scaleLinear} from 'd3-scale'

const rng = randomNormal(0, 0.15)

const {random} = Math

const trigonometricLayout = (fn, color) => length => {
  const amplitude = 0.25
  const periods = 2
  const yScale = scaleLinear()
    .domain([0, length - 1])
    .range([0, periods * 2 * Math.PI])

  return Array.from({length}, (_, i) => ({
    color,
    x: i / length * (1 - 0.01),
    y: amplitude * fn(yScale(i)) + 0.5,
  }))
}

const phyllotaxisLayout = length => {
  const pointWidth = 1 / Math.sqrt(length)
  const theta = Math.PI * (3 - Math.sqrt(5))
  const pointRadius = pointWidth / 2

  return Array.from({length}, (_, i) => {
    const index = i % length
    const phylloX = pointRadius * Math.sqrt(index) * Math.cos(index * theta)
    const phylloY = pointRadius * Math.sqrt(index) * Math.sin(index * theta)

    return {
      color: [random() * 0.7 + 0.3, 0.7 + random() * 0.3, random() * 0.1],
      x: 0.5 + (phylloX - pointRadius),
      y: 0.5 + (phylloY - pointRadius),
    }
  })
}

const gridLayout = length => {
  const pointWidth = 1 / Math.sqrt(length) * 1.5
  const pointsPerRow = Math.floor(1 / pointWidth)

  return Array.from({length}, (_, i) => ({
    color: [random() * 0.1, random() * 0.6 + 0.4, random() * 0.1 + 0.9],
    x: pointWidth * (i % pointsPerRow),
    y: pointWidth * Math.floor(i / pointsPerRow),
  }))
}

const ringLayout = length => Array.from({length}, (_, i) => ({
  color: [random() * 0.1, random() * 0.6 + 0.4, random() * 0.1],
  x: (rng() + Math.cos(i)) / 3 + 0.5,
  y: (rng() + Math.sin(i)) / 3 + 0.5,
}))

const cosLayout = trigonometricLayout(Math.cos, [0, 0, 0.9 + random() * 0.1])
const sinLayout = trigonometricLayout(Math.sin, [0.9 + random() * 0.1, 0, 0])
const tanLayout = trigonometricLayout(Math.tan, [0, 0.9 + random() * 0.1, 0])

const randomLayout = length => Array.from({length}, () => ({
  color: [random() * 0.6 + 0.4, random() * 0.1, 0.5 + random() * 0.5],
  x: random(),
  y: random(),
}))

export default [
  randomLayout,
  phyllotaxisLayout,
  sinLayout,
  tanLayout,
  gridLayout,
  cosLayout,
  ringLayout,
]
