import { useState } from 'react';
import Layout from '../components/layout';
import Desk from '../components/desk';
import Square from '../components/square';
import SquareContents from '../components/squareContents';
import Generator from '../models/game/generator'
import leftClickHandler from '../reducers/uncoverSquare'
import rightClickHandler from '../reducers/markSquare'

const Index = ({board, width, bombCount}) => {
  const [game, handleClick] = useState({board, status: "started", bombCount});
  const gameFinished = game.status == "lost" || game.status == "won"

  return (
    <Layout title={`Minesweeper (active)`} status={game.status}>
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
  const width = 10
  const height = 10
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
