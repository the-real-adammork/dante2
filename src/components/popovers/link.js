import React from 'react';
import ReactDOM from 'react-dom';

import {getCurrentBlock} from '../../model/index.js';

class DanteAnchorPopover extends React.Component {
  constructor(props) {
    super(props);
    this.display = this.display.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.relocate = this.relocate.bind(this);
    this.render = this.render.bind(this);
    this.state = {
      tooltipPosition: {
        top: 0,
        left: 0,
      },
      position: {
        top: 0,
        left: 0,
      },
      show: false,
      url: '',
    };
  }

  display(b) {
    if (b) {
      return this.show();
    } else {
      return this.hide();
    }
  }

  show() {
    return this.setState({
      show: true,
    });
  }

  hide() {
    return this.setState({
      show: false,
    });
  }

  setPosition(coords) {
    /*
    return this.setState({
      position: coords,
    });
    */
  }

  relocate(node) {
    if (node == null) {
      node = null;
    }
    if (!node) {
      return;
    }

    let {editorState} = this.props;
    let currentBlock = getCurrentBlock(editorState);
    let blockType = currentBlock.getType();

    let contentState = editorState.getCurrentContent();
    let selectionState = editorState.getSelection();

    let selectionBoundary = node.getBoundingClientRect();
    let coords = selectionBoundary;

    let el = this.refs.dante_popover;
    let padd = el.offsetWidth / 2;

    let parent = ReactDOM.findDOMNode(this.props.editor);
    let parentBoundary = parent.getBoundingClientRect();

    var top = selectionBoundary.top - parentBoundary.top + 10;
    var left =
      selectionBoundary.left +
      selectionBoundary.width / 2 -
      parentBoundary.left -
      padd;

    // Bound 'left' position to be within textbox +/- a margin.
    const xAxisMargin = 20;
    left = Math.max(-1 * xAxisMargin, left);
    left = Math.min(parentBoundary.width + xAxisMargin - el.offsetWidth, left);

    if (!top || !left) {
      return;
    }

    var carretSize = 6;
    var padding = 20;

    var tooltipTop =
      selectionBoundary.top -
      parentBoundary.top +
      10 +
      padding -
      carretSize -
      5;
    var tooltipLeft =
      selectionBoundary.left -
      parentBoundary.left +
      selectionBoundary.width / 2 -
      padding -
      carretSize;

    // console.log "SET SHOW FOR TOOLTIP INSERT MENU"
    return this.setState({
      position: {
        left: left,
        top: top,
      },
      tooltipPosition: {
        left: tooltipLeft,
        top: tooltipTop,
      },
    });
  }

  render() {
    let {position} = this.state;
    let style = {
      left: position.left,
      top: position.top,
      visibility: `${this.state.show ? 'visible' : 'hidden'}`,
    };
    let carretStyle = {
      transform: 'rotate(45deg)',
      position: 'absolute',
      top: this.state.tooltipPosition.top + 'px',
      left: this.state.tooltipPosition.left + 'px',
      visibility: `${this.state.show ? 'visible' : 'hidden'}`,
    };
    return (
      <div>
        <div
          ref="dante_popover"
          className="dante-popover popover--tooltip popover--Linktooltip popover--bottom is-active"
          style={style}
          onMouseOver={this.props.handleOnMouseOver}
          onMouseOut={this.props.handleOnMouseOut}>
          <div className="popover-inner">
            <a href={this.props.url} target="_blank">
              {this.state.url}
            </a>
          </div>
        </div>
        <div style={carretStyle} className="popover-arrow" />
      </div>
    );
  }
}

export default DanteAnchorPopover;
