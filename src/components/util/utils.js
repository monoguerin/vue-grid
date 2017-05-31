export const throttle = (callbackFn, timeOutFn, args, timer = 200) => {
  if (!timeOutFn) {
    timeOutFn = setTimeout(function () {
      callbackFn(...args)
      timeOutFn = null
    }, timer)
  }
}

export const getOtherPane = (currentPane) => {
  let otherPane = 'left'
  if (otherPane === currentPane) {
    otherPane = 'right'
  }
  return `${otherPane}-pane`
}

export const debounce = (func, wait, inmediate) => {
  let timeout
  return (...args) => {
    let later = () => {
      timeout = null
      if (!inmediate) {
        func.apply(this, ...args)
      }
    }
    let callNow = inmediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) {
      func.apply(this, ...args)
    }
  }
}
