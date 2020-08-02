
import styled from '@emotion/styled'

const Desk = styled.div`
  width: ${props => 40 * props.boardSize + 16 }px;
  height: ${props => 40 * props.boardSize + 16 }px;
  border: 8px solid rgb(123, 127, 131);
  display: flex;
  flex-wrap: wrap;

`
export default Desk;
