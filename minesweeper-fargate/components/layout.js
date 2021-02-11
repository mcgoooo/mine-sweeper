import Head from "next/head"
import { Fragment } from "react"
import styled from "@emotion/styled"
import GameContainer from "../components/gameContainer"
import AppContainer from "../components/appContainer"
import TitleBar from "./titleBar"

const Section = styled.section`
  background-color: rgb(187, 192, 196);
`
const Layout = ({ children, title = "Minesweeper" }) => (
  <Fragment>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>{title}</title>
    </Head>
    <AppContainer>
      <TitleBar></TitleBar>
      <GameContainer>{children}</GameContainer>
    </AppContainer>
  </Fragment>
)

export default Layout
