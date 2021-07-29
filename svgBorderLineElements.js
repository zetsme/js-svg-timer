import { setAttrs } from './utils.js';
export const createRectangle = (svgRectSize, strokeColor) => {
  const borderEl = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  setAttrs(borderEl, {
    fill: 'transparent',
    stroke: strokeColor,
    'stroke-width': '15',
    x: '0',
    y: '0',
    width: svgRectSize,
    height: svgRectSize,
    transform: `rotate(0 ${svgRectSize / 2} ${svgRectSize / 2})`,
  });
  const perimeter = borderEl.getAttribute('width') * 4;
  return { borderEl, perimeter };
};
export const createCircle = (svgRectSize, strokeColor) => {
  const borderEl = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  setAttrs(borderEl, {
    fill: 'transparent',
    stroke: strokeColor,
    'stroke-width': '15',
    r: svgRectSize / 2 - 15,
    cx: svgRectSize / 2,
    cy: svgRectSize / 2,
    transform: `rotate(-90 ${svgRectSize / 2} ${svgRectSize / 2})`,
  });
  const perimeter = borderEl.getAttribute('r') * 2 * Math.PI;
  return { borderEl, perimeter };
};
