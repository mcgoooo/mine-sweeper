import Layout from '../components/layout';
// game components
import Desk from '../components/desk';
import Square from '../components/square';
import Mine from '../components/mine';
import Flag from '../components/flag';
import Generator from '../models/board/generator'

const Index = ({board, width}) => (
  <Layout title={`Minesweeper (active)`}>
    <Desk boardSize={width}>
    {board.map((row, x) => (
      row.map((square, i)=> (
        <Square key={`${x}-${i}`} type={square.type}>
          {square.type == 'bomb' && <Mine />}
          {square.type == 'bombNearby' && square.nearbyBombs}
        </Square>
      ))
    ))}
    </Desk>
  </Layout>
);

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
