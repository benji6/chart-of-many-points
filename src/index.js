import {randomNormal} from 'd3-random'
import Regl from 'regl'
import frag from './frag.glsl'
import vert from './vert.glsl'

const regl = Regl()

const numPoints = 1e3

const width = window.innerWidth
const height = window.innerHeight

const rng = randomNormal(0, 0.15)

const points = Array.from({length: numPoints}, () => ({
  color: [0, Math.random(), 0],
  x: rng() * width + width / 2,
  y: rng() * height + height / 2,
}))

const drawPoints = regl({
  attributes: {
    color: points.map(d => d.color),
    position: points.map(d => [d.x, d.y]),
  },
  count: points.length,
  frag,
  primitive: 'points',
  uniforms: {
    pointWidth: regl.prop('pointWidth'),
    stageHeight: regl.prop('stageHeight'),
    stageWidth: regl.prop('stageWidth'),
  },
  vert,
})

regl.frame(() => {
  regl.clear({
    color: [0, 0, 0, 1],
    depth: 1,
  })

  drawPoints({
    pointWidth: 4,
    stageHeight: height,
    stageWidth: width,
  })
})
