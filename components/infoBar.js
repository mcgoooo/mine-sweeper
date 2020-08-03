
import styled from '@emotion/styled'
import { useState, useEffect } from 'react';
import RedDisplay from '../components/redDisplay';
import { SmileySquare } from '../components/square';

const Timer = styled(RedDisplay)`
  float: right;
  margin-right: 10px;
`
const Container = styled.div`
    width: 416px;
    background-color: rgb(187, 192, 196);
    border-style: solid;
    border-width: 6px;
    border-color: rgb(123, 127, 131) white white rgb(123, 127, 131);
    margin-bottom: 12px;
`
const statusEmojis = {
  won: "😎",
  started: "😀",
  lost: "🤬",

}

export default ({ marksLeft , status})=>{
  const [timeElapsed, setTimeElapsed] = useState(0);
  useEffect(() => {
    if(status != 'started') return
    setTimeout(() => {
      setTimeElapsed(timeElapsed + 1);
    }, 1000);

  }, [timeElapsed]);

  return (
    <Container>
      <RedDisplay>{`${timeElapsed}`.padStart(3, "0")}</RedDisplay>
      {/* does a hard refresh, should really do a reload on client side */}
      <SmileySquare href="/">{statusEmojis[status]}</SmileySquare>
      <Timer>{`${marksLeft}`.padStart(3, "0")}</Timer>
    </Container>
  )
};
