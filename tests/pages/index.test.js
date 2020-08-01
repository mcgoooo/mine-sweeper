import TestRenderer from 'react-test-renderer'
import React from 'react'
import Index, { getStaticProps } from '../../pages/index'
import Mine from '../../components/mine';

// TODO
global.React = React

describe('index', () => {
  const props = {...getStaticProps().props}
  const rendered = TestRenderer.create(<Index { ...props}/>)

  it('renders the correct title', () => {
    const title = rendered.toTree().rendered.props.title
    expect(title).toBe("Minesweeper (active)")
  })

  it('renders the correct amount of bombs', () => {
    expect(rendered.root.findAllByType(Mine).length).toBe(10)
  })

})
