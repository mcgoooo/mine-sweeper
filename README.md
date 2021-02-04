# Minesweeper [play it here](https://minesweeper.space)

## notes

please check pull requests to see how it was built

## Installation

It assumes you have the latest node and yarn installed.

```
yarn install
yarn dev
open http://localhost:3000
```

## Rules

The rules are pretty simple

- Player can left click to reveal square.
- Player can right click to flag square as mine.
- The number tells how many mines are in the immediate neighborhood.
- The goal is to reveal or flag all squares without revealing a mine.

## infrastructure

the app is primarily deployed in production on vercel. for demonstration
puproses, and to learn, i also made an aws review environment stack, which
has its own [readme](/infra/README.md)

basically every pull request will make its own review environment on aws,
setup the domain, and tear itself down. this is also where we will run the
the end to end tests
