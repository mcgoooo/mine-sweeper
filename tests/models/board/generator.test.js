import GameGenerator, { fillInSquares } from "../../../models/game/generator"
import { surroundedByBombs, threeByThree, rectangular } from "../../mocks/game"

describe("BoardGenerator", () => {
  it("generates a board correctly", () => {
    const generated = new GameGenerator({ height: 4, width: 2, bombCount: 5 })
    expect(generated.board.length).toBe(4)
    expect(generated.board[0].length).toBe(2)
    expect(
      generated.board.flat().filter((row) => row.type == "bomb").length
    ).toBe(5)
  })

  // doesn't quite test that, but good enough for a code test, in the real world
  // you would probably mock random or floor to fully test
  it("generates and will never duplcicate position", () => {
    const generated = new GameGenerator({
      height: 30,
      width: 30,
      bombCount: 900,
    })
    expect(generated.board.length).toBe(30)
    expect(generated.board[0].length).toBe(30)
    expect(generated.board.flat().length).toBe(900)
    expect(
      generated.board.flat().filter((row) => row.type == "bomb").length
    ).toBe(900)
  })

  it("generates a board with bombNearbyType", () => {
    const generated = new GameGenerator({ height: 2, width: 2, bombCount: 3 })
    const bombNearbySquare = generated.board
      .flat()
      .filter((row) => row.type == "bombNearby")
    expect(bombNearbySquare.length).toBe(1)
    expect(bombNearbySquare[0].nearbyBombs).toBe(3)
  })

  // again the inherent nature of Math.random here makes this harder to test
  it("generates a board with bombNearbyType and emptySquares", () => {
    const generated = new GameGenerator({ height: 40, width: 2, bombCount: 3 })
    const bombNearbySquare = generated.board
      .flat()
      .filter((row) => row.type == "bombNearby")
    const emptySquare = generated.board
      .flat()
      .filter((row) => row.type == "emptySquare")
    const bombs = generated.board.flat().filter((row) => row.type == "bomb")

    expect(bombNearbySquare.length > 1).toBe(true)
    expect(emptySquare.length > 1).toBe(true)
    expect(bombs.length).toBe(3)
  })

  describe("#fillInSquares", () => {
    it("finds all bombs in vicinity when the middle square of 3x3 is the only not bomb", () => {
      const game = surroundedByBombs({ shouldFillInSquares: false }).game
      const result = fillInSquares(game.board)
      const middleSquare = game.board[1][1]
      expect(middleSquare.nearbyBombs).toBe(8)
    })

    describe("threeByThree mock", () => {
      it("correctly identifies nearby squares and qty", () => {
        const game = threeByThree({ shouldFillInSquares: false }).game
        const result = fillInSquares(game.board)
        const exepctedNearbyQuantity = [
          [null, 1, null],
          [2, 2, null],
          [null, 1, null],
        ]

        exepctedNearbyQuantity.forEach((row, rowIndex) => {
          row.forEach((squareQuantity, squareIndex) => {
            if (!squareQuantity) return
            const squareResult = result[rowIndex][squareIndex].nearbyBombs
            expect(squareResult).toBe(squareQuantity)
          })
        })
      })

      it("correctly identifies empty squares", () => {
        const game = threeByThree({ shouldFillInSquares: false }).game
        const result = fillInSquares(game.board)
        const exepctedToBeEmpty = [
          [false, false, true],
          [false, false, true],
          [false, false, true],
        ]

        exepctedToBeEmpty.forEach((row, rowIndex) => {
          row.forEach((squareExpectedToBeEmpty, squareIndex) => {
            if (!squareExpectedToBeEmpty) return
            const squareResult =
              result[rowIndex][squareIndex].type == "emptySquare"
            expect(squareResult).toBe(true)
          })
        })
      })
    })
    describe("rectangular mock", () => {
      it("correctly identifies nearby squares and qty", () => {
        const game = rectangular({ shouldFillInSquares: false }).game
        const result = fillInSquares(game.board)
        const rowCount = result.length
        const rowSquareCount = result[0].length
        expect(rowCount).toBe(4)
        expect(rowSquareCount).toBe(3)
      })
    })
  })

  // TODO left out to keep code concise, code test etc
  // possibility to use typescript to alleviate some invalid input
  it.skip("invalid input", () => {
    expect(() => {
      // bomb count is greater than total etc
      new GameGenerator(10, 30, 900)
    }).toThrow()
  })
})
