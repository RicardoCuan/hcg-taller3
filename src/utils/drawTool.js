export const lineDDA = (contextRef, lineColor, lineWidth, x1,y1,x2,y2) => {
  /** Diferencial de dx = x2 - x1 */
  let dx = x2 - x1
  /** Diferencial de dy = y2 - y1 */
  let dy = y2 - y1

  /** Dependiendo del valor absoluto de dx y dy
   * se va a escoger el número de paso que se pondrá el pixel como
   * steps = abs(dx) > abs(dy) ? abs(dx) : abs(dy) */
  const step = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy)

  /* Calculando el incremento de x para cada Paso */
  dx = dx / step
  /* Calculando el incremento de y para cada Paso */
  dy = dy / step

  /** Distancia en X del pixel a pintar */
  let pixelX = x1
  /** Distancia en Y del pixel a pintar */
  let pixelY = y1

  // Color de la linea
  contextRef.current.fillStyle = lineColor

  for (let i = 0; i < step; i++) {
    // Dibujar un pixel
    contextRef.current.fillRect(pixelX,pixelY,lineWidth,lineWidth)
    // Sumar 
    pixelX += dx
    pixelY += dy
  }
}

export const rectangleDDA = (contextRef, lineColor, lineWidth, x1,y1,x2,y2) => {
  lineDDA(contextRef, lineColor, lineWidth, x1,y1,x2,y1)
  lineDDA(contextRef, lineColor, lineWidth, x2,y1,x2,y2)
  lineDDA(contextRef, lineColor, lineWidth, x2,y2,x1,y2)
  lineDDA(contextRef, lineColor, lineWidth, x1,y2,x1,y1)
}

export const squareDDA = (contextRef, lineColor, lineWidth, x1,y1,x2,y2) => {
  const dx = x2-x1
  const dy = y2-y1
  const r = dx > dy ? dx : dy
  lineDDA(contextRef, lineColor, lineWidth, x1,y1,x1+r,y1)
  lineDDA(contextRef, lineColor, lineWidth, x1+r,y1,x1+r,y1+r)
  lineDDA(contextRef, lineColor, lineWidth, x1+r,y1+r,x1,y1+r)
  lineDDA(contextRef, lineColor, lineWidth, x1,y1+r,x1,y1)
}

export const triangleDDA = (contextRef, lineColor, lineWidth, x1,y1,x2,y2,x3,y3) => {
  lineDDA(contextRef, lineColor, lineWidth, x1,y1,x2,y2)
  lineDDA(contextRef, lineColor, lineWidth, x2,y2,x3,y3)
  lineDDA(contextRef, lineColor, lineWidth, x3,y3,x1,y1)
}

export const circumference = (contextRef, lineColor, lineWidth, cx,cy,rx,ry) => {
  const dx = cx - rx
  const dy = cy - ry
  const r = Math.sqrt(dx*dx+dy*dy)
  let p = 1 - r
  let addx = 0
  let addy = r
  contextRef.current.fillStyle = lineColor
  drawEightPoint(contextRef, lineWidth, cx,cy,addx,addy)
  while(addx<addy){
    addx++
    if(p<0) {
      p+=2*addx+1
    } else {
      addy--
      p+=2*(addx-addy)+1
    }
    drawEightPoint(contextRef, lineWidth, cx,cy,addx,addy)
  }
}
const drawEightPoint = (contextRef, lineWidth, cx,cy,addx,addy) => {
  contextRef.current.fillRect(cx+addx, cy+addy, lineWidth, lineWidth)
  contextRef.current.fillRect(cx-addx, cy+addy, lineWidth, lineWidth)
  contextRef.current.fillRect(cx+addx, cy-addy, lineWidth, lineWidth)
  contextRef.current.fillRect(cx-addx, cy-addy, lineWidth, lineWidth)
  contextRef.current.fillRect(cx+addy, cy+addx, lineWidth, lineWidth)
  contextRef.current.fillRect(cx-addy, cy+addx, lineWidth, lineWidth)
  contextRef.current.fillRect(cx+addy, cy-addx, lineWidth, lineWidth)
  contextRef.current.fillRect(cx-addy, cy-addx, lineWidth, lineWidth)
}


const canvas = document.querySelector('#main-canvas')
const ctx = canvas.getContext('2d')

// Set canvas size
canvas.width = 200
canvas.height = 200

// Fill the canvas and create some shapes
ctx.fillStyle = '#000'
ctx.fillRect(0, 0, canvas.width, canvas.height)

ctx.fillStyle = '#0000ff'
ctx.scale(2, 2)

const randomColor = () => {
  let str = Math.round(Math.random() * 0x1000000).toString(16)
  while (str.length < 6) {
    str = '0' + str
  }
  return '#' + str
}

console.log(randomColor())

for (let i = 0; i < 25; i++) {
  ctx.fillStyle = randomColor()
  ctx.fillRect(
    Math.round(Math.random() * canvas.width / 2),
    Math.round(Math.random() * canvas.height / 2),
    Math.round(Math.random() * 50),
    Math.round(Math.random() * 50)
  )
}

function getColorAtPixel(imageData, x, y) {
  const {width, data} = imageData

  return {
    r: data[4 * (width * y + x) + 0],
    g: data[4 * (width * y + x) + 1],
    b: data[4 * (width * y + x) + 2],
    a: data[4 * (width * y + x) + 3]
  }
}

function setColorAtPixel(imageData, color, x, y) {
  const {width, data} = imageData

  data[4 * (width * y + x) + 0] = color.r & 0xff
  data[4 * (width * y + x) + 1] = color.g & 0xff
  data[4 * (width * y + x) + 2] = color.b & 0xff
  data[4 * (width * y + x) + 3] = color.a & 0xff
}

function colorMatch(a, b) {
  return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a
}

function floodFill(imageData, newColor, x, y) {
  const {width, height, data} = imageData
  const stack = []
  const baseColor = getColorAtPixel(imageData, x, y)
  let operator = {x, y}

  // Check if base color and new color are the same
  if (colorMatch(baseColor, newColor)) {
    return
  }

  // Add the clicked location to stack
  stack.push({x: operator.x, y: operator.y})

  while (stack.length) {
    operator = stack.pop()
    let contiguousDown = true // Vertical is assumed to be true
    let contiguousUp = true // Vertical is assumed to be true
    let contiguousLeft = false
    let contiguousRight = false

    // Move to top most contiguousDown pixel
    while (contiguousUp && operator.y >= 0) {
      operator.y--
      contiguousUp = colorMatch(getColorAtPixel(imageData, operator.x, operator.y), baseColor)
    }

    // Move downward
    while (contiguousDown && operator.y < height) {
      setColorAtPixel(imageData, newColor, operator.x, operator.y)

      // Check left
      if (operator.x - 1 >= 0 && colorMatch(getColorAtPixel(imageData, operator.x - 1, operator.y), baseColor)) {
        if (!contiguousLeft) {
          contiguousLeft = true
          stack.push({x: operator.x - 1, y: operator.y})
        }
      } else {
        contiguousLeft = false
      }

      // Check right
      if (operator.x + 1 < width && colorMatch(getColorAtPixel(imageData, operator.x + 1, operator.y), baseColor)) {
        if (!contiguousRight) {
          stack.push({x: operator.x + 1, y: operator.y})
          contiguousRight = true
        }
      } else {
        contiguousRight = false
      }

      operator.y++
      contiguousDown = colorMatch(getColorAtPixel(imageData, operator.x, operator.y), baseColor)
    }
  }
}

const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

const col = {r: 0xff, g: 0xff, b: 0x0, a: 0xff}

canvas.addEventListener('click', event => {
  const rect = canvas.getBoundingClientRect()
  const x = Math.round(event.clientX - rect.left)
  const y = Math.round(event.clientY - rect.top)
  floodFill(imageData, col, x, y)
  ctx.putImageData(imageData, 0, 0)
})
