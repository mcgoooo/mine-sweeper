import Mine from '../components/mine';
import Flag from '../components/flag';
import { Fragment } from 'react'

const SquareContents = ({square}) => (
  <Fragment>
    {square.markedAsBomb && <Flag />}
    {square.uncovered && square.type == 'bomb' && <Mine />}
    {square.uncovered && square.type == 'bombNearby' && square.nearbyBombs}
  </Fragment>
)

export default SquareContents;
