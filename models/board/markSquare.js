const markSquare =({ game, rowIndex, squareIndex}) => {
  const clickedSquare = game.board[rowIndex][squareIndex]
  const allMarked = game.board.flat().filter((square)=> square.markedAsBomb == true)
  if (clickedSquare.markedAsBomb) {
    clickedSquare.markedAsBomb = false
    return {...game}
  }

  if (clickedSquare.uncovered) return {...game}
  if (allMarked.length >= game.bombCount) return {...game}

  clickedSquare.markedAsBomb = true
  const allMarkedBombs = game.board.flat().filter((square)=>
    square.markedAsBomb == true &&
    square.type == 'bomb'
  )

  if (game.bombCount == allMarkedBombs.length) {
    return {...game, status: "won"}
  }
  return {...game}
}

export default markSquare
