import TestRenderer, { act } from 'react-test-renderer'
import React from 'react'
import Index, { getStaticProps } from '../../pages/index'
import Square from '../../components/square';

// TODO
global.React = React

const getSquareType =
  (squares, type) => squares.filter((square) => square.props.type == type)

describe('index', () => {
  describe('initial render',()=>{
    const props = {...getStaticProps().props}
    const rendered = TestRenderer.create(<Index { ...props}/>)
    const root = rendered.root
    const squares = root.findAllByType(Square)

    it('renders the correct title', () => {
      const title = rendered.toTree().rendered.props.title
      expect(title).toBe("Minesweeper (active)")
    })

    it('renders the correct amount of bombs', () => {
      expect(getSquareType(squares, 'bomb').length).toBe(10)
    })

    it('renders the rest of the squares', () => {
      const empty = getSquareType(squares, 'emptySquare').length
      const nearby = getSquareType(squares, 'bombNearby').length
      expect(empty > 10).toBe(true)
      expect(nearby > 10).toBe(true)
      expect(empty + nearby).toBe(90)
    })
  })


  describe('play a game',()=>{
    it('can win a game',()=>{
      const props = {...getStaticProps().props}
      const rendered = TestRenderer.create(<Index { ...props}/>)
      const root = rendered.root
      const squares = root.findAllByType(Square)

      const bombs = getSquareType(squares, 'bomb')
      bombs.forEach((bomb)=> act(()=> {
        bomb.props.onContextMenu({ preventDefault:()=>{} })
      }))
      const haveWon = root.findAllByProps({status: 'won'})
      expect(haveWon.length > 0).toBe(true)
    })

    it('can lose a game',()=>{
      const props = {...getStaticProps().props}
      const rendered = TestRenderer.create(<Index { ...props}/>)
      const root = rendered.root
      const squares = root.findAllByType(Square)
      const bomb = getSquareType(squares, 'bomb')[0]

      act(bomb.props.onClick)
      const haveLost = root.findAllByProps({status: 'lost'})
      expect(haveLost.length > 0).toBe(true)
    })
  })

})
