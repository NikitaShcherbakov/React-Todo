import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SwipeItem = (props) => {
  const [state, setState] = useState({
    left: 0,
    originalOffset: 0,
    touchStartX: 0,
    prevTouchX: 0,
    beingTouched: false,
    height: 0
  });

  useEffect(() => {
    setState({ ...state, height: 170 })
  }, []);

  const handleStart = (clientX) => {
    setState({
      ...state,
      beingTouched: true,
      touchStartX: clientX,
      originalOffset: state.left
    })
  }

  const handleMove = (clientX) => {
    if (state.beingTouched) {
      let deltaX = clientX - state.touchStartX + state.originalOffset;
      if (deltaX > 250) {
        props.onCheck();
      } else if (deltaX < 0) {
        deltaX = 0;
      }
      setState({
        ...state,
        left: deltaX
      })
    }
  }

  const handleEnd = () => {
    setState({
      ...state,
      beingTouched: false,
      left: 0
    })
  }

  const handleTouchStart = (touchStartEvent) => {
    touchStartEvent.preventDefault();
    handleMotionStart(touchStartEvent.targetTouches[0].clientX);
  }

  const handleTouchMove = (touchMoveEvent) => {
    handleMove(touchMoveEvent.targetTouches[0].clientX);
  }

  const handleTouchEnd = () => {
    handleEnd();
  }

  const handleMouseDown = (mouseDownEvent) => {
    mouseDownEvent.preventDefault();
    handleStart(mouseDownEvent.clientX);
  }

  const handleMouseMove = (mouseMoveEvent) => {
    handleMove(mouseMoveEvent.clientX);
  }

  const handleMouseUp = () => {
    handleEnd();
  }

  const handleMouseLeave = () => {
    handleMouseUp();
  }

  return (
    <div
      className="swipeItem"
      style={{ height: state.height + 'px', transition: 'height 250ms ease-in-out' }}
      onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)}
      onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)}
      onTouchEnd={() => handleTouchEnd()}
      // The following event handlers are for mouse compatibility:
      onMouseDown={mouseDownEvent => handleMouseDown(mouseDownEvent)}
      onMouseMove={mouseMoveEvent => handleMouseMove(mouseMoveEvent)}
      onMouseUp={() => handleMouseUp()}
      onMouseLeave={() => handleMouseLeave()}>
      <div className={state.beingTouched ? "swipeItem-content" : "swipeItem-content animationToZero"} style={{ left: state.left + 'px' }}>
        {props.children}
      </div>
    </div>
  );

}
SwipeItem.propTypes = {
  children: PropTypes.object.isRequired,
  onCheck: PropTypes.func.isRequired
};
export default SwipeItem;