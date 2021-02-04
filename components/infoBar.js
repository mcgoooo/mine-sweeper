import styled from "@emotion/styled"
import { useState, useEffect } from "react"
import RedDisplay from "../components/redDisplay"
import { SmileySquare } from "../components/square"

const Timer = styled(RedDisplay)`
  float: right;
  margin-right: 10px;
`
const Container = styled.div`
  width: ${(props) => props.width * 40 + 16}px;
  background-color: rgb(187, 192, 196);
  border-style: solid;
  border-width: 6px;
  border-color: rgb(123, 127, 131) white white rgb(123, 127, 131);
  margin-bottom: 12px;
`

const Component = (props) => (
  <Container>
    <RedDisplay>{`${props.timeElapsed}`.padStart(3, "0")}</RedDisplay>
    {/* does a hard refresh, should really do a reload on client side but
          for me the page loads in 37ms, so for the target users this should be fine
          https://www.nngroup.com/articles/powers-of-10-time-scales-in-ux/
      */}
    <SmileySquare
      onClick={() => {
        location && location.reload()
      }}
    >
      {props.statusText}
    </SmileySquare>
    <Timer>{`${props.marksLeft}`.padStart(3, "0")}</Timer>
  </Container>
)

export default Component
