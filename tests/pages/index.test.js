// https://github.com/facebook/jest/issues/3126#issuecomment-521616378
// TODO
require("regenerator-runtime/runtime")

import TestRenderer, { act } from "react-test-renderer"
import React from "react"
import Index, { getServerSideProps } from "../../pages/index"
import Square from "../../components/square"

// TODO
global.React = React

const getSquareType = (squares, type) =>
  squares.filter((square) => square.props.type == type)

describe("index", () => {
  describe("initial render", () => {
    it("renders the correct title", async () => {
      const ssrProps = await getServerSideProps({ query: {} })
      const rendered = TestRenderer.create(<Index {...ssrProps.props} />)

      const title = rendered.toTree().rendered.props.title
      expect(title).toBe("Minesweeper 95")
    })

    it("renders the correct amount of bombs", async () => {
      const ssrProps = await getServerSideProps({ query: {} })
      const rendered = TestRenderer.create(<Index {...ssrProps.props} />)
      const squares = rendered.root.findAllByType(Square)

      expect(getSquareType(squares, "bomb").length).toBe(10)
    })

    it("renders the rest of the squares", async () => {
      const ssrProps = await getServerSideProps({ query: {} })
      const rendered = TestRenderer.create(<Index {...ssrProps.props} />)
      const squares = rendered.root.findAllByType(Square)

      const empty = getSquareType(squares, "emptySquare").length
      const nearby = getSquareType(squares, "bombNearby").length
      expect(empty > 10).toBe(true)
      expect(nearby > 10).toBe(true)
      expect(empty + nearby).toBe(90)
    })
  })

  describe("play a game", () => {
    it("can win a game", async () => {
      const ssrProps = await getServerSideProps({ query: {} })
      const rendered = TestRenderer.create(<Index {...ssrProps.props} />)
      const root = rendered.root
      const squares = root.findAllByType(Square)
      const bombs = getSquareType(squares, "bomb")

      bombs.forEach((bomb) =>
        act(() => {
          bomb.props.onContextMenu({ preventDefault: () => {} })
        })
      )
      const haveWon = root.findAllByProps({ status: "won" })
      expect(haveWon.length > 0).toBe(true)
    })

    it("can lose a game", async () => {
      const ssrProps = await getServerSideProps({ query: {} })
      const props = { ...ssrProps.props }
      const rendered = TestRenderer.create(<Index {...props} />)
      const root = rendered.root
      const squares = root.findAllByType(Square)
      const bomb = getSquareType(squares, "bomb")[0]

      act(bomb.props.onClick)
      const haveLost = root.findAllByProps({ status: "lost" })
      expect(haveLost.length > 0).toBe(true)
    })
  })

  describe("change the parameters of the board", () => {
    it("can win change the width", async () => {
      const ssrProps = await getServerSideProps({ query: { width: 20 } })
      const props = { ...ssrProps.props }
      const rendered = TestRenderer.create(<Index {...props} />)
      const squares = rendered.root.findAllByType(Square)

      expect(squares.length).toBe(200)
    })

    it("can win change the height", async () => {
      const ssrProps = await getServerSideProps({ query: { height: 20 } })
      const props = { ...ssrProps.props }
      const rendered = TestRenderer.create(<Index {...props} />)
      const squares = rendered.root.findAllByType(Square)

      expect(squares.length).toBe(200)
    })

    it("can win change the amount of bombs", async () => {
      const ssrProps = await getServerSideProps({ query: { bombs: 20 } })
      const props = { ...ssrProps.props }
      const rendered = TestRenderer.create(<Index {...props} />)
      const squares = rendered.root.findAllByType(Square)
      const bombs = getSquareType(squares, "bomb")

      expect(bombs.length).toBe(20)
    })
  })
})
