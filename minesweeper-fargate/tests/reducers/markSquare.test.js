import markSquare from "../../reducers/markSquare"
import { threeByThree } from "../mocks/game"

describe("MarkSquare", () => {
  it("marks an unmarked square", () => {
    const game = threeByThree().game
    const rowIndex = 0
    const squareIndex = 0

    const gameResult = markSquare({ game, rowIndex, squareIndex })
    const squareResult = gameResult.board[rowIndex][squareIndex]
    const markedAsBombQty = gameResult.board
      .flat()
      .filter((s) => s.markedAsBomb).length

    expect(squareResult.markedAsBomb).toBe(true)
    expect(gameResult.marksLeft).toBe(1)
    expect(markedAsBombQty).toBe(1)
    expect(game).not.toBe(gameResult)
    expect(game.result).not.toBeDefined()
  })

  it("unmarks a marked square", () => {
    const game = threeByThree().game
    const rowIndex = 0
    const squareIndex = 0
    game.board[rowIndex][squareIndex].markedAsBomb = true

    const gameResult = markSquare({ game, rowIndex, squareIndex })
    const squareResult = gameResult.board[rowIndex][squareIndex]
    const markedAsBombQty = gameResult.board
      .flat()
      .filter((s) => s.markedAsBomb).length

    expect(squareResult.markedAsBomb).toBe(false)
    expect(markedAsBombQty).toBe(0)
    expect(gameResult.marksLeft).toBe(2)
    expect(game).not.toBe(gameResult)
    expect(game.status).toBe("started")
  })

  it("will not accept a mark on an uncovered square", () => {
    const game = threeByThree().game
    const rowIndex = 0
    const squareIndex = 1
    game.board[rowIndex][squareIndex].uncovered = true

    const gameResult = markSquare({ game, rowIndex, squareIndex })
    const squareResult = gameResult.board[rowIndex][squareIndex]
    const markedAsBombQty = gameResult.board
      .flat()
      .filter((s) => s.markedAsBomb).length

    expect(squareResult.markedAsBomb).toBe(false)
    expect(markedAsBombQty).toBe(0)
    expect(game).not.toBe(gameResult)
    expect(game.status).toBe("started")
  })

  it("will not accept a mark when you have used all marks", () => {
    let game = threeByThree().game
    game.board[0].forEach((square, index) => {
      game = markSquare({ game, rowIndex: 0, squareIndex: index })
    })

    const markedAsBombQty = game.board.flat().filter((s) => s.markedAsBomb)
      .length
    expect(markedAsBombQty).toBe(2)
    expect(game.status).toBe("started")
  })

  it("will change status to won when all marks are on bombs", () => {
    const mock = threeByThree()
    let game = mock.game
    mock.locations.bomb.forEach(
      (location) => (game = markSquare({ game, ...location }))
    )
    expect(game.marksLeft).toBe(0)
    expect(game.status).toBe("won")
  })
})
