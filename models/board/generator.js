const bombType = {
  type: "bomb",
  markedAsBomb: false
}

const emptySquareType = {
  type: "emptySquare",
  markedAsBomb: false
}

const bombNearbyType = {
  type: "bombNearby",
  markedAsBomb: false,
  nearbyBombs: 0
}

export default class BoardGenerator {
  constructor(height, width, bombCount) {
    this.height = height
    this.width = width
    this.bombCount = bombCount
    const boardWithBombs = this.boardWithBombs()
    const boardWithBombsAndNearby = this.fillInNonBombSquares(boardWithBombs)
    this.board = boardWithBombsAndNearby
  }

  generateEmptyBoard() {
    const generateRow = () => new Array(this.width).fill(null)
    const rows = new Array(this.height).fill(null).map(generateRow)
    return rows
  }

  boardWithBombs() {
    const board = this.generateEmptyBoard()
    const bombLocations = []

    while (bombLocations.length < this.bombCount) {
      const column = this.randomFlooredNumber(this.width)
      const row = this.randomFlooredNumber(this.height)
      const dupe = (location)=> location.column == column && location.row == row

      if (bombLocations.find(dupe)) continue
      bombLocations.push({ column, row })
    }

    bombLocations.forEach ((location) => board[location.row][location.column] = {...bombType})
    return board
  }

  fillInNonBombSquares(board) {
    // top left, top center etc, sure there would be a fancy way to abstract this, but i find this descriptive
    // and simple as opposed to some maths that may hurt your head
    const positionsToCheck = [
      [-1,-1],[-1,0],[-1,1],
      [0,-1],[0,1],
      [1,-1],[1,0],[1,1],
    ]

    const filledIn =
      board.map((row, RowIndex) => (
        row.map((square, squareIndex)=> {
          if (square?.type === 'bomb') return square

          const nearbyBombs = positionsToCheck.reduce((nearbyBombs, [rowOffset, squareOffset]) => {
            const nearbySquare = board?.[RowIndex + rowOffset]?.[squareIndex + squareOffset]
            if (!nearbySquare) return nearbyBombs;

            return (nearbySquare.type === 'bomb') ? nearbyBombs + 1 : nearbyBombs
          }, 0)

          return (nearbyBombs !== 0) ? { ...bombNearbyType, nearbyBombs} : {...emptySquareType}
        })
      ))
    return filledIn
  }


  randomFlooredNumber(multiplier) {
    return Math.floor(Math.random() * multiplier)
  }

}
