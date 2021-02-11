import cloneDeep from "lodash.clonedeep"
import { bombType } from "../../models/game/generator"
import { fillInSquares } from "../../models/game/generator"

const bm = () => ({ ...bombType })

const threeByThreeBoard = [
  [bm(), null, null],
  [null, null, null],
  [bm(), null, null],
]
const surrondedByBombsBoard = [
  [bm(), bm(), bm()],
  [bm(), null, bm()],
  [bm(), bm(), bm()],
]

const blockingWallBoard = [
  [bm(), null, null, null, null, null, null],
  [bm(), null, null, null, bm(), null, null],
  [bm(), null, null, null, bm(), null, null],
  [bm(), null, null, null, bm(), null, null],
  [bm(), null, null, null, bm(), null, null],
  [bm(), null, null, null, bm(), null, null],
  [bm(), null, null, null, bm(), null, null],
]

const nonBlockingWallBoard = [
  [bm(), null, null, null, null, null, null],
  [bm(), null, null, null, null, null, null],
  [bm(), null, null, null, bm(), null, null],
  [bm(), null, null, null, bm(), null, null],
  [bm(), null, null, null, bm(), null, null],
  [bm(), null, null, null, bm(), null, null],
  [bm(), null, null, null, bm(), null, null],
]

const rectangularBoard = [
  [bm(), null, null],
  [bm(), null, null],
  [bm(), null, null],
  [bm(), null, null],
]

const generate = (originalBoard, shouldFillInSquares = true) => {
  const board = shouldFillInSquares
    ? fillInSquares(cloneDeep(originalBoard))
    : cloneDeep(originalBoard)
  const locations = generateLocations(board)
  const bombCount = board.flat().filter((square) => square.type == "bomb")
    .length
  return {
    game: {
      board: board,
      status: "started",
      bombCount: bombCount,
    },
    locations,
  }
}

const generateLocations = (board) => {
  const locations = {
    bomb: [],
    emptySquare: [],
    bombNearby: [],
  }

  board.forEach((row, rowIndex) => {
    row.forEach((square, squareIndex) => {
      locations[square.type].push({ rowIndex, squareIndex })
    })
  })

  return locations
}

export const threeByThree = (fillsquares) =>
  generate(threeByThreeBoard, fillsquares)

export const blockingWall = (fillsquares) =>
  generate(blockingWallBoard, fillsquares)

export const nonBlockingWall = (fillsquares) =>
  generate(nonBlockingWallBoard, fillsquares)

export const surroundedByBombs = (fillsquares) =>
  generate(surrondedByBombsBoard, fillsquares)

export const rectangular = (fillsquares) =>
  generate(rectangularBoard, fillsquares)
