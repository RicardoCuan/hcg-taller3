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


// http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/
export const floodFill = (canvasRef, contextRef, startX, startY, fillColor) => {
  const canvas = canvasRef.current
  var dstImg = contextRef.current.getImageData(0,0,canvas.width,canvas.height);
  var dstData = dstImg.data;
  
  var startPos = getPixelPos(startX, startY);
  var startColor = {
    r: dstData[startPos],
    g: dstData[startPos+1],
    b: dstData[startPos+2],
    a: dstData[startPos+3]
  };
  var todo = [[startX,startY]];
  
  while (todo.length) {
    var pos = todo.pop();
    var x = pos[0];
    var y = pos[1];    
    var currentPos = getPixelPos(x, y);
    
    while((y-- >= 0) && matchStartColor(dstData, currentPos, startColor)) {
      currentPos -= canvas.width * 4;
    }
    
    currentPos += canvas.width * 4;
    ++y;
    var reachLeft = false;
    var reachRight = false;
    
    while((y++ < canvas.height-1) && matchStartColor(dstData, currentPos, startColor)) {
    
      colorPixel(dstData, currentPos, fillColor);
      
      if (x > 0) {
        if (matchStartColor(dstData, currentPos-4, startColor)) {
          if (!reachLeft) {
            todo.push([x-1, y]);
            reachLeft = true;
          }
        }
        else if (reachLeft) {
          reachLeft = false;
        }
      }
      
      if (x < canvas.width-1) {
        if (matchStartColor(dstData, currentPos+4, startColor)) {
          if (!reachRight) {
            todo.push([x+1, y]);
            reachRight = true;
          }
        }
        else if (reachRight) {
          reachRight = false;
        }
      }

      currentPos += canvas.width * 4;
    }
  }
  
  contextRef.current.putImageData(dstImg,0,0);
};

const getPixelPos = (canvasRef, x, y) => {
  const canvas = canvasRef
  return (y * canvas.width + x) * 4;
};

const matchStartColor = (data, pos, startColor)  => {
  return (data[pos]   === startColor.r &&
          data[pos+1] === startColor.g &&
          data[pos+2] === startColor.b &&
          data[pos+3] === startColor.a);
};

const colorPixel =  (data, pos, color) => {
  data[pos] = color.r || 0;
  data[pos+1] = color.g || 0;
  data[pos+2] = color.b || 0;
  data[pos+3] = color.hasOwnProperty("a") ? color.a : 255;
};
