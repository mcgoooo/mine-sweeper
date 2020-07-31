import TestRenderer from 'react-test-renderer'
import React from 'react'
import Index from '../../pages/index'
// TODO
global.React = React

describe('index', () => {
  it('renders the correct title', () => {
    const rendered = TestRenderer.create(<Index />)
    const title = rendered.toTree().rendered.props.title
    expect(title).toBe("Minesweeper (active)")
  })
})
