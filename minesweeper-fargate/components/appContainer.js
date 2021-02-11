import styled from "@emotion/styled"

const AppContainer = styled.div`
  background-color: rgb(187, 192, 196);
  padding: 6px;
  display: block;
  float: left;
  border: 1px solid rgba(60, 60, 60, 0.6);
  box-shadow: inset 0px -2px 10px rgba(60, 60, 60, 0.2);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media only screen and (max-height: 860px) {
    transform: translate(-50%, -50%) scale(0.8);
  }

  @media only screen and (max-height: 768px) {
    transform: translate(-50%, -50%) scale(0.5);
  }
`

export default AppContainer
