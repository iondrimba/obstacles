const radians = (degrees) => {
  return degrees * Math.PI / 180;
}

const distance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

const map = (value, start1, stop1, start2, stop2) => {
  return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2
}

const hexToRgbTreeJs = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : null;
}


const rgbToHex = s => s.match(/[0-9]+/g).reduce((a, b) => a + (b | 256).toString(16).slice(1), '#')

function Spring2D(xpos, m) {
  this.x = xpos;
  this.vx = 0;
  this.mass = m;
  this.stiffness = 0.2;
  this.damping = 0.6;

  this.update = function (targetX) {
    let forceX = (targetX - this.x) * this.stiffness;
    let ax = forceX / this.mass;
    this.vx = this.damping * (this.vx + ax);
    this.x += this.vx;
  }
}

export {
  radians,
  distance,
  Spring2D,
  map,
  rgbToHex,
  hexToRgbTreeJs
};
