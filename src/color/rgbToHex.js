/**
 * Convert the given RGB color value to hex color value (string, used in CSS, etc)
 * Conversion forumla:
 * - convert R, G, B into HEX strings
 * - return HEX formatted string "#RRGGBB"
 * @param  {Float} r - red value
 * @param  {Float} g - green value
 * @param  {Float} b - blue value
 */
const rgbToHex = (r, g, b) => {
  if (Array.isArray(r)) {
    b = r[2]
    g = r[1]
    r = r[0]
  }
  let s = '#' +
    Number(0x1000000 + r * 255 * 0x10000 + g * 255 * 0x100 + b * 255).toString(16).substring(1, 7)
  return s
}

module.exports = rgbToHex
