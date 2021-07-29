const setAttrs = (elem, attrs) =>
  Object.keys(attrs).map((key) => elem.setAttribute(key, attrs[key]));
const createElement = (tag, classes = '', attributes = {}, textCotent = '') => {
  const $ = document.createElement(tag);
  if (classes) $.className = classes;
  if (Object.keys(attributes).length > 0) {
    setAttrs($, attributes);
  }
  $.textContent = textCotent;
  return $;
};

const appendToDOM = (myMap) =>
  myMap.forEach((value, key) => (value.length ? key.append(...value) : key.appendChild(value)));

export { createElement, appendToDOM, setAttrs };
