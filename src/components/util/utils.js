export const getOtherPane = (currentPane) => {
  let otherPane = 'left'
  if (otherPane === currentPane) {
    otherPane = 'right'
  }
  return `${otherPane}-pane`
}

export const addPx = (value) => {
  return `${value}px`
}
