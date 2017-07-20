import Regl from 'regl'
import frag from './frag.glsl'
import layouts from './layouts'
import vert from './vert.glsl'

const regl = Regl()

const duration = 2e3
const pointsToPixelsRatio = 0.05
const pointWidth = 1.5

const width = window.innerWidth
const height = window.innerHeight

const numPixels = width * height
const numPoints = Math.round(numPixels * pointsToPixelsRatio)

const points = [[], []]

for (let i = 0; i < numPoints; i++) {
  for (let j = 0; j < layouts.length; j++) {
    points[j].push(layouts[j](i))
  }
}

const makeDrawPoints = points => regl({
  attributes: {
    colorEnd: points[1].map(d => d.color),
    colorStart: points[0].map(d => d.color),
    positionEnd: points[1].map(d => [d.x * width, d.y * height]),
    positionStart: points[0].map(d => [d.x * width, d.y * height]),
  },
  count: numPoints,
  frag,
  primitive: 'points',
  uniforms: {
    duration: regl.prop('duration'),
    elapsed: ({time}, {startTime = 0}) => (time - startTime) * 1000,
    pointWidth: regl.prop('pointWidth'),
    stageHeight: regl.prop('stageHeight'),
    stageWidth: regl.prop('stageWidth'),
  },
  vert,
})

let drawPoints = makeDrawPoints(points)
let startTime = null
let newLayoutIndex = -1

regl.frame(({time}) => {
  if (startTime === null) {
    startTime = time
  }

  regl.clear({
    color: [0, 0, 0, 1],
    depth: 1,
  })

  drawPoints({
    duration,
    pointWidth,
    stageHeight: height,
    stageWidth: width,
    startTime,
  })

  if (time - startTime > duration / 1000) {
    startTime = null
    newLayoutIndex = newLayoutIndex === layouts.length - 1 ? 0 : newLayoutIndex + 1
    points.shift()
    points.push(Array.from({length: numPoints}, (_, i) => layouts[newLayoutIndex](i)))
    drawPoints = makeDrawPoints(points)
  }
})
