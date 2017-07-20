import {randomNormal} from 'd3-random'

const rng = randomNormal(0, 0.15)

const aLayout = i => ({
  color: [Math.random() * 0.1, Math.random() * 0.6 + 0.4, Math.random() * 0.1],
  x: (rng() + Math.cos(i)) / 2.5 + 0.5,
  y: (rng() + Math.sin(i)) / 2.5 + 0.5,
})

const bLayout = () => ({
  color: [Math.random() * 0.6 + 0.4, Math.random() * 0.1, 0.5 + Math.random() * 0.5],
  x: rng() + 0.5,
  y: rng() + 0.5,
})

export default [aLayout, bLayout]
