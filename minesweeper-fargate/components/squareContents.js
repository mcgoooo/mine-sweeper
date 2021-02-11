import styled from "@emotion/styled"

import Mine from "../components/mine"
import Flag from "../components/flag"

const colors = [
  "black",
  "blue",
  "green",
  "red",
  "purple",
  "black",
  "maroon",
  "gray",
  "turquoise",
]

const Container = styled.div`
  color: ${(props) => colors[props.nearbyBombs]};
  font-weight: bold;
  font-size: 20px;
`

const SquareContents = ({ square }) => (
  <Container nearbyBombs={square.nearbyBombs || 0}>
    {square.markedAsBomb && <Flag />}
    {square.uncovered && square.type == "bomb" && <Mine />}
    {square.uncovered && square.type == "bombNearby" && square.nearbyBombs}
  </Container>
)

export default SquareContents
