
import styled from '@emotion/styled'

const Square = styled.div`
    width: 40px;
    height: 40px;
    padding: 10px;
    cursor: pointer;
    background-color: rgb(187, 192, 196);
    border: ${props => props.uncovered ? '1px dashed black' : '2px solid black'};
    border-color: ${props => props.uncovered ? "initial" : 'rgb(246,247,248) rgb(32,32,32) rgb(32,32,32) rgb(246,247,248)'};
    line-height: 1;
    box-shadow: ${props => props.uncovered ? "initial" : "inset 0px -2px 6px rgba(32,32,32,0.2)"};
    text-align: center;
    font-size: 18;
`

export default Square;
