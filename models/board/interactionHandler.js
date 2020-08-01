
export const leftClickHandler = ({ statefulBoard, rowIndex, squareIndex}) => {
  statefulBoard[rowIndex][squareIndex].uncovered = true
  return [...statefulBoard]
}

