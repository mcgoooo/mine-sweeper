const bombType = {
  type: "bomb",
  markedAsBomb: false
}

export default class BoardGenerator {
  constructor(height, width, bombCount) {
    this.height = height
    this.width = width
    this.bombCount = bombCount
    this.board = this.boardWithBombs()
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

  randomFlooredNumber(multiplier) {
    return Math.floor(Math.random() * multiplier)
  }

}
