import styled from "@emotion/styled"
import { Fragment } from "react"
const TitleContainer = styled.div`
  background-color: rgb(16, 0, 158);
  color: white;
  line-height: 1;
  padding: 6px;
`
const StyledLink = styled.a`
  width: 33.33%;
  display: inline-block;
  text-align: center;
  padding: 8px 0;
  color: black;
  font-weight: bold;
  font-size: 20px;
`

const TitleBar = () => (
  <section>
    <TitleContainer>
      <div>💣&nbsp; &nbsp;Minesweeper</div>
    </TitleContainer>
    <div>
      <StyledLink href="/">easy</StyledLink>
      <StyledLink href="/?width=16&height=16&bombs=16">normal</StyledLink>
      <StyledLink href="/?width=30&height=16&bombs=99">hard</StyledLink>
    </div>
  </section>
)

export default TitleBar
