

const limit = 20;

const checkHorizontal = (row: number, matrix: number[][]) => {
  let sum = 0;
  for (let x = 0; x < matrix[0].length; x++) {
    sum = sum + matrix[row][x];
  }
  return sum;
};

const checkVerticle = (col: number, matrix: number[][]) => {
  let sum = 0;
  for (let y = 0; y < matrix.length; y++) {
    sum = sum + matrix[y][col];
  }

  return sum;
};

const checkSlantLeft = (row: number, col: number, matrix: number[][]) => {
  let sum = 0;
  let x1 = col,
    y1 = row,
    x2 = col,
    y2 = row;
  let cols = matrix[0].length;
  let rows = matrix.length;
  let isVisited = false;
  while (true) {
    if (x2 >= 0 && y2 < cols) {
      sum = sum + matrix[x2][y2];
      x2 = x2 - 1;
      y2 = y2 + 1;
    } else if (y1 >= 0 && x1 < rows) {
      if (isVisited) {
        sum = sum + matrix[x1][y1];
      }
      x1 = x1 + 1;
      y1 = y1 - 1;
      isVisited = true;
    } else {
      return sum;
    }
  }
};

const checkSlantRight = (row: number, col: number, matrix: number[][]) => {
  let sum = 0;
  let x1 = row,
    x2 = row,
    y1 = col,
    y2 = col;

  let cols = matrix[0].length;
  let rows = matrix.length;
  let isVisited = false;

  while (true) {

    if (x2 >= 0 && y2 >= 0) {
      sum = sum + matrix[x2][y2];
      x2 = x2 - 1;
      y2 = y2 - 1;
    } else if (y1 < cols && x1 < rows) {
      if (isVisited) {
        sum = sum + matrix[x1][y1];
      }
      x1 = x1 + 1;
      y1 = y1 + 1;
      isVisited = true;
    } else {
      return sum;
    }
  }
};

const markVerticle = (y: number, matrix: number[][]) => {
  const cols = matrix[0].length;
  for (let x = 0; x < cols; x++) {
    console.log(x, y);
  }
};

const markHorizontal = (x: number, matrix: number[][]) => {
  const rows = matrix.length;
  for (let y = 0; y < rows; y++) {
    console.log(x, y);
  }
};

const markSlantLeft = (row: number, col: number, matrix: number[][]) => {
  let sum = 0;
  let x1 = col,
    y1 = row,
    x2 = col,
    y2 = row;
  const cols = matrix[0].length;
  const rows = matrix.length;
  let isVisited = false;
  while (true) {
    if (x2 >= 0 && y2 < cols) {
      console.log(x2, y2);
      x2 = x2 - 1;
      y2 = y2 + 1;
    } else if (y1 >= 0 && x1 < rows) {
      if (isVisited) {
        console.log(x1, y1);
      }
      x1 = x1 + 1;
      y1 = y1 - 1;
      isVisited = true;
    } else {
      break;
    }
  }
};

const markSlantRight = (row: number, col: number, matrix: number[][]) => {
  let sum = 0;
  let x1 = col,
    y1 = row,
    x2 = col,
    y2 = row;
  let cols = matrix[0].length;
  let rows = matrix.length;
  let isVisited = false;

  while (true) {
    if (x2 >= 0 && y2 >= 0) {
      console.log(x2, y2);
      x2 = x2 - 1;
      y2 = y2 - 1;
    } else if (y1 < cols && x1 < rows) {
      if (isVisited) {
        console.log(x1, y1);
      }
      x1 = x1 + 1;
      y1 = y1 + 1;
      isVisited = true;
    } else {
      break;
    }
  }
};

function check(row: number, col: number, limit: number, matrix: number[][]) {
  const v = checkVerticle(col, matrix);
  const h = checkHorizontal(row, matrix);
  const l = checkSlantLeft(row, col, matrix);
  const r = checkSlantRight(row, col, matrix);

  console.log(`row: ${row}, col: ${col}`);
  console.log(`v: ${v}, h: ${h}, l: ${l}, r: ${r}`);
  console.log(`matrix: `);
  matrix.forEach(rows => {
    console.log(rows)
  })

  // if (v > limit) {
  //   markVerticle(row, matrix);
  // }

  // if (h > limit) {
  //   markHorizontal(col, matrix);
  // }

  // if (l > limit) {
  //   markSlantLeft(row, col, matrix);
  // }

  // if (r > limit) {
  //   markSlantRight(row, col, matrix);
  // }

  return (v <= limit && h <= limit && l <= limit && r <= limit) || false;
}

const matrix = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 4, 4, 0],
  [0, 0, 5, 0, 0],
  [0, 0, 0, 0, 0]
];

//check(2, 3, 25, matrix);



export {
  checkVerticle,
  checkHorizontal,
  checkSlantLeft,
  checkSlantRight,
  markVerticle,
  markHorizontal,
  markSlantLeft,
  markSlantRight,
};
