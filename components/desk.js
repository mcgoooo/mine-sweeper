
import styled from '@emotion/styled'

const Desk = styled.div`
  width: ${props => 40 * props.boardSize + 16 }px;
  height: ${props => 40 * props.boardSize + 16 }px;
  border-style: solid;
  border-width: 6px;
  border-color: rgb(123, 127, 131) white white rgb(123, 127, 131);
  display: flex;
  flex-wrap: wrap;
  pointer-events: ${props => (props.status != 'started') ? 'none' : 'initial'};

`
export default Desk;
