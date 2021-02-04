import TestRenderer from "react-test-renderer"
import Head from "next/head"
import React from "react"
import Layout from "../../components/layout"
// TODO
global.React = React

describe("index", () => {
  const rendered = TestRenderer.create(<Layout />)
  const root = rendered.root

  it("renders a document head", () => {
    expect(root.findByType(Head)).not.toBeNull()
  })
})
