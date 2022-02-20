import { checkReverse, directions } from "../shared/checkReverse";

const quarterEvalMap = [
  [50, -12, 0, -1],
  [-12, -15, -3, -3],
  [0, -3, 0, -1],
  [-1, -3, -1, -1],
];
const getFlatMap = (map: number[][]) => {
  return [0, 1, 2, 3, 3, 2, 1, 0]
    .map((e) => [map[e], map[e].slice().reverse()])
    .flat()
    .flat();
};
const evalMap = getFlatMap(quarterEvalMap);
const reverseTurn = (turn: number) => (turn % 2) + 1;
const copyMatrix = (matrix: number[][]) => {
  const result = [];
  for (const line of matrix) {
    result.push([...line]);
  }
  return result;
};

const getEvalPlaceValue = (target: number, matrix: number[][]) => {
  let evalValue = 0;
  const newCells = matrix.flat();
  const opponent = reverseTurn(target);
  evalMap.forEach((e, i) => {
    const cell = newCells[i];
    const ev = cell == target ? e : cell == opponent ? -e : 0;
    evalValue += ev;
  });
  return evalValue;
};

const getFixedCellValue = (target: number, matrix: number[][]) => {
  const countSets = [
    [ [0, 0], [0, 1], [1, 0] ],
    [ [7, 0], [-1, 0], [0, 1]],
    [ [0, 7], [0, -1], [1, 0]],
    [[7, 7],  [-1, 0], [0, -1]]
  ];

  let totalScore = 0;
  for (let i = 0; i < 4; i++) {
    const set = countSets[i];
    const start = set[0];
    const startCellState = matrix[start[1]][start[0]];
    if (startCellState == 0) continue;
    for (let j = 0; j < 2; j++) {
      const direction = set[j + 1];
      let posX = start[0];
      let posY = start[1];
      let score = 0;
      for (let k = 0; k < 8; k++) {
        if (matrix[posY][posX] == startCellState) {
          score += 1;
          [posX, posY] = [posX + direction[0], posY + direction[1]];
        } else {
          break;
        }
      }
      if (startCellState == target) {
        totalScore += score;
      } else {
        totalScore -= score;
      }
    }
  }
  return totalScore;
};

const evalBoard = (target: number, matrix: number[][]) => {
  const pv = getEvalPlaceValue(target, matrix);
  const mv = getMovablePlaces(target, matrix).length;
  const fv = getFixedCellValue(target, matrix);
  const progress = matrix.flat().filter(e => e == 0).length / 64;
  return pv + (mv * progress * 1.5) + (fv * progress * 2);
};


const getLooseCandidatePlaces = (turn: number, matrix: number[][]) => {
  const candidates = [];
  const nextTurn = reverseTurn(turn);
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (matrix[j][i] != 0) continue;
      for (let k = 0; k < directions.length; k++) {
        let [dx, dy] = directions[k];
        let [mx, my] = [i + dx, j + dy];
        if (mx < 0 || mx > 7 || my < 0 || my > 7) {
          continue;
        }
        if (matrix[my][mx] == nextTurn) {
          candidates.push(i + j * 8);
          break;
        }
      }
    }
  }
  return candidates;
};

const getMovablePlaces = (turn: number, matrix: number[][]): [number, number[][]][] => {
  const mat = copyMatrix(matrix);
  const candidates = getLooseCandidatePlaces(turn, mat);
  const candidates2 = [];

  for (const cellNum of candidates) {
    const mat = copyMatrix(matrix);
    const [ret, newMat] = checkReverse(turn, cellNum, mat);
    if (ret) {
      candidates2.push([cellNum, newMat]);
    }
  }
  return candidates2;
};

const searchBestPlace = (arg: { turn: number; level: number; matrix: number[][] }, alpha: number, beta: number) => {
  const { turn, level, matrix } = arg;
  if (level <= 0) {
    const evalValue = evalBoard(turn, matrix);
    return [evalValue, -1, [[]], []];
  }

  const movables = getMovablePlaces(turn, matrix);
  if (movables.length == 0) {
    const [evalValue, ,] = searchBestPlace({ turn: reverseTurn(turn), level: level - 1, matrix }, -beta, -alpha);
    return [-evalValue, -1, [[]], []];
  } else {
    let maxEval = alpha;
    let maxMat = [[]];
    let maxCell = 999999;
    for (const [cellNum, matrix] of movables) {
      const newMat = copyMatrix(matrix);
      const [ox, oy] = [cellNum % 8, Math.floor(cellNum / 8)];
      newMat[oy][ox] = turn;
      const [evalValue, ,] = searchBestPlace(
        { turn: reverseTurn(turn), level: level - 1, matrix: newMat },
        -beta,
        -maxEval
      );
      const val = -evalValue;
      if (val > alpha) {
        maxEval = val;
        maxMat = newMat;
        maxCell = cellNum;
      }
      if (alpha >= beta) {
        return [maxEval, maxCell, maxMat];
      }
    }
    return [maxEval, maxCell, maxMat];
  }
};

self.addEventListener("message", (evt: MessageEvent) => {
  if (evt.data.type == "best") {
    const result = searchBestPlace(evt.data.data, -99999, 99999);
    self.postMessage({ type: "best", data: result });
  } else if (evt.data.type == "candidate") {
    const { turn, matrix } = evt.data.data;
    const result = getMovablePlaces(turn, matrix);
    const ary = [];
    for (const e of result) {
      ary.push(e[0]);
    }
    self.postMessage({ type: "candidate", data: ary });
  }
});

export {};
