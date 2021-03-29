const SIDE = 400;
const baseCube = document.querySelector('.base-cube');
const container = document.querySelector('.container');
const maxIt = 2;

//-------------------------------------------------------------------------------------
const setupFaces = (side, face, className, tx, ty, tz) => {
  face.style.border = '1px solid black';
  switch (className) {
    case 'front':
      face.style.transform = `translate3d(${tx}px, ${ty}px, ${
        side / 2 + tz + side
      }px)`;
      break;
    case 'back':
      face.style.transform = `translate3d(${tx}px, ${ty}px,${
        -side / 2 + tz + side
      }px) rotateY(180deg)`;
      break;
    case 'left':
      face.style.transform = `translate3d(${-side / 2 + tx}px, ${ty}px, ${
        tz + side
      }px) rotateY(-90deg)`;
      break;
    case 'right':
      face.style.transform = `translate3d(${side / 2 + tx}px, ${ty}px, ${
        tz + side
      }px) rotateY(90deg)`;
      break;
    case 'top':
      face.style.transform = `translate3d(${tx}px, ${-side / 2 + ty}px, ${
        tz + side
      }px) rotateX(90deg)`;
      break;
    case 'bottom':
      face.style.transform = `translate3d(${tx}px, ${side / 2 + ty}px, ${
        tz + side
      }px) rotateX(-90deg)`;
      break;
  }
};

//-------------------------------------------------------------------------------------
const createFace = (side, className, tx, ty, tz, color = 'blueviolet') => {
  const face = document.createElement('div');
  face.className = `face ${className}`;
  face.style.cssText = `
    width:${side}px;
    height:${side}px;
    background-color:${color};
  `;

  setupFaces(side, face, className, tx, ty, tz);

  return face;
};

//-------------------------------------------------------------------------------------
const createCube = (side, tx, ty, tz, color = 'blueviolet') => {
  const cube = document.createElement('div');
  cube.className = 'cube';
  cube.style.cssText = `
    position: absolute;
    width:${side}px;
    height:${side}px;  
    transform-style: preserve-3d;
    `;

  const front = createFace(side, 'front', tx, ty, tz, color);
  const back = createFace(side, 'back', tx, ty, tz, color);
  const top = createFace(side, 'top', tx, ty, tz, color);
  const bottom = createFace(side, 'bottom', tx, ty, tz, color);
  const left = createFace(side, 'left', tx, ty, tz, color);
  const right = createFace(side, 'right', tx, ty, tz, color);

  cube.append(front);
  cube.append(back);
  cube.append(top);
  cube.append(bottom);
  cube.append(left);
  cube.append(right);

  return cube;
};

//-------------------------------------------------------------------------------------
const skip = (i, j, k) => {
  if (
    (j == 1 && k == 1 && i == 0) || //Front
    (j == 1 && k == 1 && i == 1) || //Center
    (j == 1 && k == 1 && i == 2) || //Back
    (j == 0 && k == 1 && i == 1) || //Top
    (j == 2 && k == 1 && i == 1) || //Bottom
    (j == 1 && k == 2 && i == 1) || //Right
    (j == 1 && k == 0 && i == 1) //Left
  ) {
    return true;
  }
  return false;
};

//-------------------------------------------------------------------------------------
const drawCubes = (root, side, it) => {
  let offsetx = 0;
  let offsety = 0;
  let offsetz = 0;
  let cubeSide = side;
  let max = 3;

  const cubes = [];
  const refFace = root.querySelector('.front');
  const mat3d = getComputedStyle(refFace).getPropertyValue('transform');

  for (let i = 0; i < max; ++i) {
    for (let j = 0; j < max; ++j) {
      for (let k = 0; k < max; ++k) {
        offsetx = k * cubeSide;
        offsety = j * cubeSide;
        offsetz = -i * cubeSide;

        let cube;
        if (skip(i, j, k)) {
          cube = createCube(side, offsetx, offsety, offsetz, 'black');
          if (it > 0)
            cube.style.transform = `translateZ(${
              (-cubeSide * 3) / 2
            }px) ${mat3d}`;
          root.append(cube);
        } else {
          cube = createCube(side, offsetx, offsety, offsetz);
          if (it > 0)
            cube.style.transform = `translateZ(${
              (-cubeSide * 3) / 2
            }px) ${mat3d}`;
          cubes.push(cube);
          root.append(cube);
        }
      }
    }
  }

  return cubes;
};

//-------------------------------------------------------------------------------------
const mengerCube = (root, side, it = 0) => {
  if (it === maxIt) return;
  const cubes = drawCubes(root, side, it);
  cubes.forEach((cube) => {
    mengerCube(cube, side / 3, it + 1);
  });
};

//-------------------------------------------------------------------------------------
mengerCube(baseCube, SIDE / 3);
