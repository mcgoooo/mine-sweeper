import styled from "@emotion/styled"

const Square = styled.div`
  width: 40px;
  height: 40px;
  padding: 10px;
  cursor: pointer;
  background-color: ${(props) =>
    props.uncovered && props.type == "bomb" ? "red" : "rgb(187, 192, 196)"};
  border: ${(props) =>
    props.uncovered ? "1px dashed black" : "2px solid black"};
  border-color: ${(props) =>
    props.uncovered
      ? "rgba(32,32,32,0.2)"
      : "rgb(246,247,248) rgb(32,32,32) rgb(32,32,32) rgb(246,247,248)"};
  border-width: ${(props) => (props.uncovered ? "0 2px 2px 0" : "2px")};
  line-height: 1;
  box-shadow: ${(props) =>
    props.uncovered ? "initial" : "inset 0px -2px 6px rgba(32,32,32,0.2)"};
  text-align: center;
`

export const SmileySquare = styled(Square)`
  height: 32px;
  display: inline-block;
  line-height: 18px;
  font-size: 26px;
  padding: 6px 0px 0px 0px;
  margin-left: calc(50% - 109px);
  text-decoration: none;
  &:hover {
    background-color: rgb(177, 182, 186);
  }
`.withComponent("a")

export default Square
