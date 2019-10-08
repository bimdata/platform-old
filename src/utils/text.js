/* This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. */
// https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
export function getTextWidth (text, font, textSize, textStyle) {
  // re-use canvas object for better performance
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d')
  context.font = `${textStyle} ${textSize} ${font}`
  let metrics = context.measureText(text)
  return metrics.width
}
