const baseQuad = document.getElementById('base');

const SCALE = Math.SQRT2 / 2;

const MAX_ITER = 15;

const { width: baseWidth, height: baseHeight } =
  baseQuad.getBoundingClientRect();

const createQuad = (width, height, left, top, className) => {
  const quad = document.createElement('div');
  quad.className = className;
  quad.style.cssText = `
    width:${width}px;
    height:${height}px;
    top:${top}px;
    left:${left};
  `;
  return quad;
};

const ratio = () => {
  return (1 - SCALE) * 100;
};

const drawQuads = (base, width, height) => {
  const quads = [];

  const quadLeft = createQuad(width, height, 0, -height, 'quad-left');
  const quadRight = createQuad(
    width,
    height,
    `${(1 - SCALE) * 100}%`,
    -height,
    'quad-right'
  );

  quads.push(quadLeft);
  quads.push(quadRight);

  base.append(quadLeft);
  base.append(quadRight);

  return quads;
};

const pythagorasTree = (base, width, height, it) => {
  if (it === 0) return;
  const [leftBranch, rightBranch] = drawQuads(base, width, height, it);
  pythagorasTree(leftBranch, width * SCALE, height * SCALE, it - 1);
  pythagorasTree(rightBranch, width * SCALE, height * SCALE, it - 1);
};

pythagorasTree(baseQuad, baseWidth * SCALE, baseHeight * SCALE, MAX_ITER);
