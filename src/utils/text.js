// https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
export function getTextWidth (text, font, textSize, textStyle) {
  // re-use canvas object for better performance
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d')
  context.font = `${textStyle} ${textSize} ${font}`
  let metrics = context.measureText(text)
  return metrics.width
}
