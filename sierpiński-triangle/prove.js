const centerTriangle = document.createElement("div");
centerTriangle.classList.add("center-triangle");
//Top, right, bottom, left
centerTriangle.style.cssText = `
    border-width: ${p1}px ${p2}px 0px ${p3}px;
    top:${top}px;
    left:${-left}px;
  `;

const topTriangle = document.createElement("div");
topTriangle.classList.add("top-triangle");
topTriangle.style.cssText = `
    border-width: 0px ${p2}px ${p1}px ${p3}px;
    top:${0}px;
    left:${-left}px;
  `;

const leftTriangle = document.createElement("div");
leftTriangle.classList.add("left-triangle");
leftTriangle.style.cssText = `
    border-width: 0px ${p2}px ${p1}px ${p3}px;
    top:${top}px;
    left:${-2 * left}px;
  `;

const rightTriangle = document.createElement("div");
rightTriangle.classList.add("right-triangle");
rightTriangle.style.cssText = `
    border-width: 0px ${p2}px ${p1}px ${p3}px;
    top:${top}px;
    right:${-2 * left}px;
  `;
