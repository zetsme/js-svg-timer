import Timer from './Timer.js';
import { createElement, appendToDOM, setAttrs } from './utils.js';
import { createCircle, createRectangle } from './svgBorderLineElements.js';

const createTimer = (createShape, { svgRectSize = 400, strokeColor = 'green' }) => {
  const createTimerHTML = () => {
    const timerEl = createElement('div', 'timer');
    const controlsEl = createElement('div', 'controls');
    const durationInputEl = createElement('input', '', {
      maxlength: '3',
      value: '3',
    });
    const btnContainerEl = createElement('div', 'btn-container');
    const startBtnEl = createElement('button');
    const pauseBtnEl = createElement('button');
    const playIconEl = createElement('i', 'fas fa-play');
    const pauseIconEl = createElement('i', 'fas fa-pause');
    appendToDOM(
      new Map([
        [startBtnEl, playIconEl],
        [pauseBtnEl, pauseIconEl],
        [btnContainerEl, [startBtnEl, pauseBtnEl]],
        [controlsEl, [durationInputEl, btnContainerEl]],
        [timerEl, controlsEl],
        [document.querySelector('.container'), timerEl],
      ])
    );

    return { timerEl, durationInputEl, startBtnEl, pauseBtnEl };
  };

  const { timerEl, durationInputEl, startBtnEl, pauseBtnEl } = createTimerHTML();
  const createSvgElement = (timerEl, svgRectSize, strokeColor) => {
    if (svgRectSize < 350) {
      svgRectSize = 400;
    }
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    setAttrs(svgEl, { width: svgRectSize, height: svgRectSize });
    const { borderEl, perimeter } = createShape(svgRectSize, strokeColor);
    appendToDOM(
      new Map([
        [svgEl, borderEl],
        [timerEl, svgEl],
      ])
    );
    return { borderEl, perimeter };
  };
  const svgBorderLineObj = createSvgElement(timerEl, svgRectSize, strokeColor);

  const createTimerInstance = (
    durationInputEl,
    startBtnEl,
    pauseBtnEl,
    { borderEl, perimeter }
  ) => {
    let duration;
    borderEl.setAttribute('stroke-dasharray', perimeter);
    new Timer(durationInputEl, startBtnEl, pauseBtnEl, {
      onStart(totalDuration) {
        duration = totalDuration;
      },
      onTick(timeRemaining) {
        borderEl.setAttribute(
          'stroke-dashoffset',
          (perimeter * timeRemaining) / duration - perimeter
        );
      },
    });
  };

  createTimerInstance(durationInputEl, startBtnEl, pauseBtnEl, svgBorderLineObj);
};
createTimer(createRectangle, { svgRectSize: 600 });
createTimer(createCircle, { strokeColor: 'orange' });
createTimer(createCircle, { svgRectSize: 640, strokeColor: 'cyan' });
createTimer(createRectangle, { svgRectSize: 431, strokeColor: 'tomato' });
