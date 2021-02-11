import { useState, useEffect } from "react"
import InfoBar from "../components/infoBar"
const statusEmojis = {
  won: "😎",
  started: "😀",
  lost: "🤬",
}
const Container = ({ ...props }) => {
  const [timeElapsed, setTimeElapsed] = useState(0)
  const statusText = statusEmojis[props.status]
  useEffect(() => {
    if (props.status != "started") return
    setTimeout(() => {
      setTimeElapsed(timeElapsed + 1)
    }, 1000)
  }, [timeElapsed])

  return (
    <InfoBar
      {...props}
      timeElapsed={timeElapsed}
      statusText={statusText}
    ></InfoBar>
  )
}

export default Container
