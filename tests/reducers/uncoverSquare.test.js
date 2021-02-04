import uncoverSquare from "../../reducers/uncoverSquare"
import { threeByThree, blockingWall, nonBlockingWall } from "../mocks/game"

// blog post about not DRYing up tests
// https://evgenii.com/blog/code-duplication-in-unit-tests/
describe("uncoverSquare", () => {
  it("marks the game as lost if you click on a bomb", () => {
    const mock = threeByThree()
    const game = mock.game
    const bombLocation = mock.locations.bomb[0]

    const result = uncoverSquare({ game, ...bombLocation })
    const flatttenedRows = result.board.flat()
    const uncovered = flatttenedRows.filter((square) => square.uncovered)

    expect(result.status).toBe("lost")
    expect(game).not.toBe(result)
    expect(uncovered.length).toBe(1)
  })

  it("does nothing if it is marked as a bomb", () => {
    const mock = threeByThree()
    const game = mock.game
    const bombLocation = mock.locations.bomb[0]
    const initialBomb =
      game.board[bombLocation.rowIndex][bombLocation.squareIndex]

    initialBomb.markedAsBomb = true
    const result = uncoverSquare({ game, ...bombLocation })
    const flatttenedRows = result.board.flat()
    const coveredSquares = flatttenedRows.filter(
      (square) => square.uncovered === false
    )
    const resultantBomb =
      result.board[bombLocation.rowIndex][bombLocation.squareIndex]

    expect(result.status).toBe("started")
    expect(coveredSquares.length + game.bombCount).toBe(flatttenedRows.length)
    expect(resultantBomb.markedAsBomb).toBe(true)
  })

  it("uncovers a nearby square", () => {
    const mock = threeByThree()
    const game = mock.game
    const nearbyLocation = mock.locations.bombNearby[0]

    const result = uncoverSquare({ game, ...nearbyLocation })
    const flatttenedRows = result.board.flat()
    const uncoveredSquares = flatttenedRows.filter((square) => square.uncovered)

    expect(result.status).toBe("started")
    expect(uncoveredSquares.length).toBe(1)
  })

  it("ignores an uncovered square", () => {
    const mock = threeByThree()
    const game = mock.game
    const emptyLocation = mock.locations.emptySquare[0]
    const emptySquare =
      game.board[emptyLocation.rowIndex][emptyLocation.squareIndex]

    emptySquare.uncovered = true
    const result = uncoverSquare({ game, ...emptyLocation })
    expect(game).toEqual(result)
    expect(game).not.toBe(result)
  })

  describe("recurse empty squares", () => {
    it("uncovers squares when clicking on an empty square on a 3*3 board", () => {
      const mock = threeByThree()
      const game = mock.game
      const emptyLocation = mock.locations.emptySquare[0]

      const result = uncoverSquare({ game, ...emptyLocation })
      const flatttenedRows = result.board.flat()
      const uncoveredSquares = flatttenedRows.filter(
        (square) => square.uncovered
      )
      const unHiddenSquare = result.board[1][0]

      expect(result.status).toBe("started")
      expect(unHiddenSquare.uncovered).toBe(false)
      expect(uncoveredSquares.length).toBe(6)
      expect(game).not.toBe(result)
    })

    it("uncovers squares when clicking on an empty square on a board with a blocking nearby cell in a bomb wall", () => {
      const mock = blockingWall()
      const game = mock.game
      const emptyLocation = mock.locations.emptySquare[0]

      const result = uncoverSquare({ game, ...emptyLocation })
      const flatttenedRows = result.board.flat()
      const uncoveredSquares = flatttenedRows.filter(
        (square) => square.uncovered
      )

      expect(result.status).toBe("started")
      expect(uncoveredSquares.length).toBe(21)
      expect(game).not.toBe(result)
    })

    it("uncovers squares when clicking on an empty square on a board with a non blocking bomb wall", () => {
      const mock = nonBlockingWall()
      const game = mock.game
      const emptyLocation = mock.locations.emptySquare[0]

      const result = uncoverSquare({ game, ...emptyLocation })
      const flatttenedRows = result.board.flat()
      const uncoveredSquares = flatttenedRows.filter(
        (square) => square.uncovered
      )

      expect(result.status).toBe("started")
      expect(uncoveredSquares.length).toBe(37)
      expect(game).not.toBe(result)
    })
  })
})
