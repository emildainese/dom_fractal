const baseQuad = document.getElementById("base");
const input = document.getElementById("iteration");
const counter = document.getElementById("count");

const { width, height } = baseQuad.getBoundingClientRect();
let count = 0;

const countElements = (elem) => {
  if (elem.hasChildNodes()) {
    count += elem.children.length;
    Array.from(elem.children).forEach((child) => countElements(child));
  }
  return count;
};

const createQuad = (width, height, left, top, className) => {
  const quad = document.createElement("div");
  quad.className = className;
  quad.style.cssText = `
    width:${width}px;
    height:${height}px;
    top:${top}px;
    left:${left}px;
  `;
  return quad;
};

const drawQuads = (base, width, height, left, top) => {
  const quads = [];
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      let quad = null;
      if (i !== 1 || j !== 1) {
        quad = createQuad(width, height, i * left, j * top, "quad");
        quads.push(quad);
      } else {
        quad = createQuad(width, height, i * left, j * top, "center-quad");
      }
      base.append(quad);
    }
  }
  return quads;
};

const sierpiński = (base, width, height, top, left, it) => {
  if (it === 0) return;
  const quads = drawQuads(base, width, height, top, left);
  quads.forEach((quad) =>
    sierpiński(quad, width / 3, height / 3, width / 3, height / 3, it - 1)
  );
};

document.addEventListener("DOMContentLoaded", () => {
  sierpiński(baseQuad, width / 3, height / 3, width / 3, height / 3, 1);
  counter.innerHTML = countElements(baseQuad);
  input.addEventListener("input", () => {
    baseQuad.innerHTML = "";
    counter.innerHTML = "";
    count = 0;
    const it = +input.value;
    sierpiński(baseQuad, width / 3, height / 3, width / 3, height / 3, it);
    counter.innerHTML = countElements(baseQuad);
  });
});
