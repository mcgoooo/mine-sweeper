import { useState } from 'react';
import Layout from '../components/layout';
import Desk from '../components/desk';
import Square from '../components/square';
import SquareContents from '../components/squareContents';
import Generator from '../models/board/generator'
import leftClickHandler from '../models/board/uncoverSquare'
import rightClickHandler from '../models/board/markSquare'

const Index = ({board, width, bombCount}) => {
  const [game, handleClick] = useState({board, status: "started", bombCount});
  const gameFinished = game.status == "lost" || game.status == "won"

  return (
    <Layout title={`Minesweeper (active)`}>
      {gameFinished && `${game.status}`}
      <Desk boardSize={width}>
      {game.board.map((row, rowIndex) => (
          row.map((square, squareIndex)=> {
            return (
            <Square
              key={`${rowIndex}-${squareIndex}`}
              type={square.type}
              uncovered={square.uncovered}
              onClick={() => {
                handleClick(leftClickHandler({ game, rowIndex, squareIndex}))
              }}
              onContextMenu={(e) => {
                e.preventDefault()
                handleClick(rightClickHandler({ game, rowIndex, squareIndex}))
              }}
            >
              <SquareContents square={square}></SquareContents>
            </Square>
          )})
       ))}
      </Desk>
    </Layout>
  )
};

export function getStaticProps() {
  const width = 30
  const height = 30
  const bombCount = 10
  const board = (new Generator(width,height,bombCount)).board
  return {
    props: {
      board,
      width,
      bombCount
    }
  }
}

export default Index;
