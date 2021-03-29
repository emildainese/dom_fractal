const mat3d = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 200, 1)';

const mat = /^matrix3d\(([\d,\s]+)\)$/.test(mat3d);

const values = mat3d.match(/(?!matrix3d)(\d{1,}(?=[,)])\s*)+/gi);

const deep = /(\d+)(?=,\s\d\))/g.exec(mat3d);

console.log(deep);
