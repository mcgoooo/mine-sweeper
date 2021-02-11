import cloneDeep from "lodash.clonedeep"

export default ({ game: originalGame, rowIndex, squareIndex }) => {
  const game = cloneDeep(originalGame)
  const clickedSquare = game.board[rowIndex][squareIndex]
  const isMarkedAsBomb = clickedSquare.markedAsBomb === true
  const isBomb = clickedSquare.type === "bomb"
  const bombNearby = clickedSquare.type === "bombNearby"
  const isEmpty = clickedSquare.type === "emptySquare"

  if (isMarkedAsBomb) return game
  if (isBomb) return handleBomb({ game, rowIndex, squareIndex })
  if (bombNearby) return handleBombNearby({ game, rowIndex, squareIndex })
  if (isEmpty) return handleEmptySquare({ game, rowIndex, squareIndex })
}

const handleBomb = ({ game, rowIndex, squareIndex }) => {
  game.board[rowIndex][squareIndex].uncovered = true
  return {
    ...game,
    status: "lost",
  }
}

const handleBombNearby = ({ game, rowIndex, squareIndex }) => {
  game.board[rowIndex][squareIndex].uncovered = true
  return { ...game }
}

const handleEmptySquare = ({ game, rowIndex, squareIndex }) => {
  const clickedSquare = game.board[rowIndex][squareIndex]
  if (clickedSquare.uncovered == true) return game
  const recursedGame = recurseEmptySquares({ game, rowIndex, squareIndex })
  return recursedGame
}

const recurseEmptySquares = ({ game, rowIndex, squareIndex }) => {
  const recursablePositionsOffset = [
    { row: -1, column: 0 },
    { row: 1, column: 0 },
    { row: 0, column: -1 },
    { row: 0, column: 1 },
  ]

  const board = game.board
  const targetSquare = board?.[rowIndex]?.[squareIndex]
  if (!targetSquare || targetSquare.type == "bomb") return game
  targetSquare.uncovered = true

  recursablePositionsOffset.forEach((position) => {
    const row = rowIndex + position.row
    const column = squareIndex + position.column
    const adjacentSquare = board?.[row]?.[column]

    if (adjacentSquare?.type === "bombNearby") {
      adjacentSquare.uncovered = true
      return
    }

    if (adjacentSquare && adjacentSquare.uncovered !== true)
      recurseEmptySquares({
        game,
        rowIndex: row,
        squareIndex: column,
      })
  })
  return { ...game }
}
