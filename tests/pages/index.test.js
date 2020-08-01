import TestRenderer from 'react-test-renderer'
import React from 'react'
import Index, { getStaticProps } from '../../pages/index'
import Mine from '../../components/mine';
import Square from '../../components/square';


// TODO
global.React = React

describe('index', () => {
  const props = {...getStaticProps().props}
  const rendered = TestRenderer.create(<Index { ...props}/>)
  const squares = rendered.root.findAllByType(Square)

  it('renders the correct title', () => {
    const title = rendered.toTree().rendered.props.title
    expect(title).toBe("Minesweeper (active)")
  })

  it('renders the correct amount of bombs', () => {
    expect(rendered.root.findAllByType(Mine).length).toBe(10)
  })

  it('renders some empty squares', () => {
    const emptySquares = squares.filter((square) => square.props.type == "emptySquare")
    expect(emptySquares.length > 10).toBe(true)
  })

  it('renders some BombNearby squares', () => {
    const BombNearby = squares.filter((square) => square.props.type == "bombNearby")
    expect(BombNearby.length > 10).toBe(true)
  })
})
