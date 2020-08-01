import cloneDeep from 'lodash.clonedeep'

const markSquare =({ game: originalGame, rowIndex, squareIndex}) => {
  const game = cloneDeep(originalGame)
  const clickedSquare = game.board[rowIndex][squareIndex]
  const allMarked = game.board.flat().filter((square)=> square.markedAsBomb == true)

  if (clickedSquare.markedAsBomb) {
    clickedSquare.markedAsBomb = false
    return game
  }

  if (clickedSquare.uncovered) return game
  if (allMarked.length >= game.bombCount) return game

  clickedSquare.markedAsBomb = true

  const allMarkedBombs = game.board.flat().filter((square)=>
    square.markedAsBomb == true &&
    square.type == 'bomb'
  )
  const uncoveredNonBombs = game.board.flat().filter((square)=>
    square.type != 'bomb' && square.uncovered == true
  )


  if (game.bombCount == allMarkedBombs.length) {
    return {...game, status: "won"}
  }
  return game
}

export default markSquare
