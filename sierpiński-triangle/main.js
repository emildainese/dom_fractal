const baseTriangle = document.getElementById("base");
const input = document.getElementById("iteration");

const getTriangleSize = (triangle) => {
  return ["top", "left", "bottom", "right"].map((position) =>
    parseFloat(
      getComputedStyle(triangle)
        .getPropertyValue(`border-${position}-width`)
        .replace(/px/gi, "")
    )
  );
};

const baseDims = getTriangleSize(baseTriangle);

const drawTriangle = (b1, b2, b3, b4, top, left, right, className) => {
  const triangle = document.createElement("div");
  triangle.className = className;
  triangle.style.cssText = `
      border-width: ${b1}px ${b2}px ${b3}px ${b4}px;
      top:${top}px;
      left:${left}px;
      right:${right ? right : 0}px
    `;
  return triangle;
};

const drawTriangles = (base, p1, p2, p3, top = p1, left = p2, it) => {
  const centerTriangle = drawTriangle(
    p1,
    p2,
    0,
    p3,
    top,
    -left,
    null,
    "center-triangle"
  );

  const topTriangle = drawTriangle(
    0,
    p2,
    p1,
    p3,
    0,
    -left,
    null,
    "top-triangle"
  );

  const leftTriangle = drawTriangle(
    0,
    p2,
    p1,
    p3,
    top,
    -2 * left,
    null,
    "left-triangle"
  );

  const rightTriangle = drawTriangle(
    0,
    p2,
    p1,
    p3,
    top,
    0,
    -2 * left,
    "right-triangle"
  );

  base.append(centerTriangle);
  base.append(leftTriangle);
  base.append(rightTriangle);
  base.append(topTriangle);
  return [topTriangle, rightTriangle, leftTriangle];
};

const sierpiński = (base, p1, p2, p3, top = p1, left = p2, it) => {
  if (it === 0) return;
  const [topTriangle, rightTriangle, leftTriangle] = drawTriangles(
    base,
    p1,
    p2,
    p3,
    top,
    left,
    it
  );
  sierpiński(topTriangle, p1 / 2, p2 / 2, p3 / 2, top / 2, left / 2, it - 1);
  sierpiński(rightTriangle, p1 / 2, p2 / 2, p3 / 2, top / 2, left / 2, it - 1);
  sierpiński(leftTriangle, p1 / 2, p2 / 2, p3 / 2, top / 2, left / 2, it - 1);
};

document.addEventListener("DOMContentLoaded", () => {
  sierpiński(
    baseTriangle,
    baseDims[2] / 2,
    baseDims[1] / 2,
    baseDims[3] / 2,
    baseDims[2] / 2,
    baseDims[1] / 2,
    1
  );
});

input.addEventListener("input", () => {
  baseTriangle.innerHTML = "";
  let maxIt = +input.value || 1;
  sierpiński(
    baseTriangle,
    baseDims[2] / 2,
    baseDims[1] / 2,
    baseDims[3] / 2,
    baseDims[2] / 2,
    baseDims[1] / 2,
    maxIt
  );
});
