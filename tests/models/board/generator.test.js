import BoardGenerator from '../../../models/board/generator'

describe('BoardGenerator', () => {
  it('generates a board correctly', () => {
    const generated = new BoardGenerator(4, 2, 5)
    expect(generated.board.length).toBe(4)
    expect(generated.board[0].length).toBe(2)
    expect(generated.board.flat().filter((row)=>row.type == "bomb").length).toBe(5)
  })

  // doesn't quite test that, but good enough for a code test, in the real world
  // you would probably mock random or floor to fully test
  it('generates and will never duplcicate', () => {
    const generated = new BoardGenerator(30, 30, 900)
    expect(generated.board.length).toBe(30)
    expect(generated.board[0].length).toBe(30)
    expect(generated.board.flat().length).toBe(900)
    expect(generated.board.flat().filter((row)=>row.type == "bomb").length).toBe(900)
  })

  it('generates a board with bombNearbyType', () => {
    const generated = new BoardGenerator(2, 2, 3)
    const bombNearbySquare = generated.board.flat().filter((row)=>row.type == "bombNearby")
    expect(bombNearbySquare.length).toBe(1)
    expect(bombNearbySquare[0].nearbyBombs).toBe(3)
  })

  // again the inherent nature of Math.random here makes this harder to test
  it('generates a board with bombNearbyType and emptySquares', () => {
    const generated = new BoardGenerator(40, 2, 3)
    const bombNearbySquare = generated.board.flat().filter((row)=>row.type == "bombNearby")
    const emptySquare = generated.board.flat().filter((row)=>row.type == "emptySquare")
    const bombs = generated.board.flat().filter((row)=>row.type == "bomb")

    expect(bombNearbySquare.length > 1).toBe(true)
    expect(emptySquare.length > 1).toBe(true)
    expect(bombs.length).toBe(3)
  })


  // TODO left out to keep code concise, code test etc
  // possibility to use typescript to alleviate some invalid input
  it.skip('deals with invalid input', () => {
    expect(() => {
      // bomb count is greater than total
      new BoardGenerator(10, 30, 900)
    }).toThrow();
  })
})
