import { useState } from 'react';
import Layout from '../components/layout';
import Desk from '../components/desk';
import Square from '../components/square';
import Mine from '../components/mine';
import Flag from '../components/flag';
import Generator from '../models/board/generator'
import { leftClickHandler } from '../models/board/interactionHandler'


const Index = ({board, width}) => {
  const [statefulBoard, handleClick] = useState(board);

  return (<Layout title={`Minesweeper (active)`}>
    <Desk boardSize={width}>
    {statefulBoard.map((row, rowIndex) => (
      row.map((square, squareIndex)=> {
        return (
        <Square
          key={`${rowIndex}-${squareIndex}`}
          type={square.type}
          uncovered={square.uncovered}
          onClick={(e) => {
            handleClick(leftClickHandler({ statefulBoard, rowIndex, squareIndex}))
          }}
        >
          {square.type == 'bomb' && <Mine />}
          {square.type == 'bombNearby' && square.nearbyBombs}
        </Square>
      )})
    ))}
    </Desk>
  </Layout>)
};

export function getStaticProps() {
  const width = 10
  const height = 10
  const bombs = 10
  const board = (new Generator(width,height,bombs)).board
  return {
    props: {
      board,
      width
    }
  }
}


export default Index;
