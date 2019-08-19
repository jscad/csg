const hueToColorComponent = require('./hueToColorComponent')

/**
 * Converts an HSL color value to RGB.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 1].
 *
 * @see http://en.wikipedia.org/wiki/HSL_color_space.
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
const hslToRgb = (h, s, l) => {
  if (Array.isArray(h)) {
    l = h[2]
    s = h[1]
    h = h[0]
  }
  let r
  let g
  let b

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s
    let p = 2 * l - q
    r = hueToColorComponent(p, q, h + 1 / 3)
    g = hueToColorComponent(p, q, h)
    b = hueToColorComponent(p, q, h - 1 / 3)
  }

  return [r, g, b]
}

module.exports = hslToRgb
