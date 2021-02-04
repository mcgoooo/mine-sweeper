import { useState } from "react"

import InfoBar from "../containers/infoBar"

import Layout from "../components/layout"
import Desk from "../components/desk"
import Square from "../components/square"
import SquareContents from "../components/squareContents"

import Generator from "../models/game/generator"

import leftClickHandler from "../reducers/uncoverSquare"
import rightClickHandler from "../reducers/markSquare"

const Index = ({ board, width, height, bombCount }) => {
  const [game, handleClick] = useState({
    board,
    status: "started",
    bombCount,
    marksLeft: bombCount,
  })

  return (
    <Layout title={`Minesweeper 95`}>
      <InfoBar marksLeft={game.marksLeft} status={game.status}></InfoBar>
      <Desk width={width} height={height} status={game.status}>
        {game.board.map((row, rowIndex) =>
          row.map((square, squareIndex) => {
            return (
              <Square
                key={`${rowIndex}-${squareIndex}`}
                type={square.type}
                uncovered={square.uncovered}
                onClick={() => {
                  handleClick(leftClickHandler({ game, rowIndex, squareIndex }))
                }}
                onContextMenu={(e) => {
                  e.preventDefault()
                  handleClick(
                    rightClickHandler({ game, rowIndex, squareIndex })
                  )
                }}
              >
                <SquareContents square={square}></SquareContents>
              </Square>
            )
          })
        )}
      </Desk>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const width = parseInt(query.width) || 10
  const height = parseInt(query.height) || 10
  const bombCount = parseInt(query.bombs) || 10
  const board = new Generator({ width, height, bombCount }).board
  return {
    props: {
      board,
      width,
      bombCount,
    },
  }
}

export default Index
