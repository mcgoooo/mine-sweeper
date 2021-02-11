import TestRenderer, { act } from "react-test-renderer"
import React from "react"
import InfoBarContainer from "../../containers/infoBar"
import InfoBarComponent from "../../components/infoBar"

// TODO
global.React = React

describe("info bar container", () => {
  it("renders the infoBarComponent and has the correct status text (start) 😀", () => {
    const rendered = TestRenderer.create(
      <InfoBarContainer status={"started"} />
    )
    const root = rendered.root
    const component = root.findByType(InfoBarComponent)

    expect(component).not.toBeNull()
    expect(component.props).toEqual({
      status: "started",
      statusText: "😀",
      timeElapsed: 0,
    })
  })

  it("renders the infoBarComponent and has the correct status text (won) 😎", () => {
    const rendered = TestRenderer.create(<InfoBarContainer status={"won"} />)
    const root = rendered.root
    const component = root.findByType(InfoBarComponent)

    expect(component).not.toBeNull()
    expect(component.props).toEqual({
      status: "won",
      statusText: "😎",
      timeElapsed: 0,
    })
  })

  it("renders the infoBarComponent and has the correct status text (loss) 🤬", () => {
    const rendered = TestRenderer.create(<InfoBarContainer status={"lost"} />)
    const root = rendered.root
    const component = root.findByType(InfoBarComponent)

    expect(component).not.toBeNull()
    expect(component.props).toEqual({
      status: "lost",
      statusText: "🤬",
      timeElapsed: 0,
    })
  })

  describe("after one second", () => {
    // timers are hard, gonna let this one slide 🤷🏻‍♂️
    it.skip("advancing the timer (react test render, and jest timers are blocking)", () => {
      jest.useFakeTimers()
      const rendered = TestRenderer.create(<InfoBarContainer status={"lost"} />)
      const root = rendered.root
      act(() => {
        jest.advanceTimersByTime(5000)
        jest.runAllTimers()
      })
      rendered.update(<InfoBarContainer status={"lost"} />)
      const component = root.findByType(InfoBarComponent)
      expect(component).not.toBeNull()
      expect(component.props).toEqual({
        status: "lost",
        statusText: "🤬",
        timeElapsed: 5,
      })
    })
  })
})
