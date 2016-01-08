import React, { Component, PropTypes, Children, cloneElement } from 'react'


const TRANSFORM = require('get-prefix')('transform')


export default class Slide extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    index: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    direction: PropTypes.number.isRequired,
    vertical: PropTypes.bool.isRequired,
    position: PropTypes.number.isRequired,
    outgoing: PropTypes.array.isRequired,
    isCurrent: PropTypes.bool.isRequired,
    isOutgoing: PropTypes.bool.isRequired,
    currValue: PropTypes.number.isRequired,
    destValue: PropTypes.number.isRequired,
    hasEnded: PropTypes.bool.isRequired,
    instant: PropTypes.bool.isRequired,
    onSlideEnd: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.instant && !this.props.instant) {
      return false
    }
    return true
  }

  componentDidUpdate(lastProps) {
    const { index, isCurrent, hasEnded, onSlideEnd } = this.props

    if (isCurrent && lastProps.hasEnded !== hasEnded && hasEnded === true) {
      onSlideEnd(index)
    }
  }

  render() {
    const { speed, direction, vertical, position, outgoing, isCurrent, isOutgoing, currValue, destValue, hasEnded, children } = this.props
    const axis = vertical ? 'Y' : 'X'
    let style = {}

    if (isOutgoing && isOutgoing !== isCurrent) {
      const slideOffset = -((outgoing.length - 1 - position) * 100)
      const translate = (-currValue + ((speed - 1) * 100)) + slideOffset

      style = {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        [TRANSFORM]: `translate${axis}(${(direction === -1 ? -translate : translate)}%)`
      }
    }

    if (isCurrent && !hasEnded) {
      const translate = (destValue - currValue)
      style[TRANSFORM] = `translate${axis}(${direction === -1 ? -translate : translate}%)`
    }

    return cloneElement(Children.only(children), {style})
  }
}

