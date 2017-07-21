import {rgb} from 'd3-color'
import {
  interpolateCool,
  interpolateInferno,
  interpolateViridis,
  scaleLinear,
  scaleSequential,
} from 'd3-scale'

const {random} = Math

const colors = [
  interpolateViridis,
  interpolateInferno,
  interpolateCool,
].map(f => (length, i) => {
  const {r, g, b} = rgb(scaleSequential(f).domain([length - 1, 0])(i))
  return [r, g, b].map(x => x / 255)
}).concat([
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
].map(color => () => color))

const randomColorFn = () => colors[Math.floor(random() * colors.length)]

const trigonometricLayout = fn => length => {
  const amplitude = 0.25
  const periods = 3
  const yScale = scaleLinear()
    .domain([0, length - 1])
    .range([0, periods * 2 * Math.PI])
  const colorFn = randomColorFn()

  return Array.from({length}, (_, i) => ({
    color: colorFn(length, i),
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
      color: colors[0](length, i),
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

const cosLayout = trigonometricLayout(Math.cos, [0, 0, 0.9 + random() * 0.1])
const sinLayout = trigonometricLayout(Math.sin, [0.9 + random() * 0.1, 0, 0])
const tanLayout = trigonometricLayout(Math.tan, [0, 0.9 + random() * 0.1, 0])

const randomLayout = length => {
  const colorFn = randomColorFn()
  return Array.from({length}, (_, i) => ({
    color: colorFn(length, i),
    x: random(),
    y: random(),
  }))
}

const spiralLayout = length => {
  const periods = 11

  const rScale = scaleLinear()
    .domain([0, length - 1])
    .range([0, Math.min(0.5, 0.5)])

  const thetaScale = scaleLinear()
    .domain([0, length - 1])
    .range([0, periods * 2 * Math.PI])

  return Array.from({length}, (_, i) => ({
    color: colors[2](length, i),
    x: rScale(i) * Math.cos(thetaScale(i)) + 0.5,
    y: rScale(i) * Math.sin(thetaScale(i)) + 0.5,
  }))
}

export default [
  randomLayout,
  phyllotaxisLayout,
  sinLayout,
  spiralLayout,
  tanLayout,
  gridLayout,
  cosLayout,
]
