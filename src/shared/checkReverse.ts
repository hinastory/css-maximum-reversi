const directions = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

const checkReverse = (turn: number, cellNum: number, matrix: number[][]): [boolean, number[][]] => {
  const [ox, oy] = [cellNum % 8, Math.floor(cellNum / 8)];
  let allReversed = 0;
  directions.forEach(([dx, dy]) => {
    let [mx, my] = [ox, oy];
    let directionReversed = 0;
    while (1) {
      [mx, my] = [mx + dx, my + dy];
      let target = 0;
      if (mx < 0 || mx > 7 || my < 0 || my > 7 || ((target = matrix[my][mx]), target <= 0)) {
        directionReversed = 0;
        break;
      } else if (target == turn) {
        break;
      }
      directionReversed++;
    }
    [mx, my] = [ox, oy];
    allReversed += directionReversed;
    for (let i = 0; i < directionReversed; i++) {
      [mx, my] = [mx + dx, my + dy];
      matrix[my][mx] = turn;
    }
  });
  if (allReversed == 0) return [false, [[]]];

  return [true, matrix];
};


export { directions, checkReverse };
