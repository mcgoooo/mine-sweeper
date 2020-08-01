import { createComponent } from 'cf-style-container';

const Square = createComponent(
  ({ uncovered }) => ({
    width: 40,
    height: 40,
    padding: 10,
    cursor: 'pointer',
    backgroundColor: uncovered ? '#CCC' : '#FFF',
    border: `1px solid black`,
    lineHeight: 1,
    textAlign: 'center',
    fontSize: 18
  }),
  'div',
  ['onClick', 'onContextMenu']
);

export default Square;
