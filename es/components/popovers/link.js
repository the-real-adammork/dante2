import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import ReactDOM from 'react-dom';

import { getCurrentBlock } from '../../model/index.js';

var DanteAnchorPopover = function (_React$Component) {
  _inherits(DanteAnchorPopover, _React$Component);

  function DanteAnchorPopover(props) {
    _classCallCheck(this, DanteAnchorPopover);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.display = _this.display.bind(_this);
    _this.show = _this.show.bind(_this);
    _this.hide = _this.hide.bind(_this);
    _this.relocate = _this.relocate.bind(_this);
    _this.render = _this.render.bind(_this);
    _this.state = {
      tooltipPosition: {
        top: 0,
        left: 0
      },
      position: {
        top: 0,
        left: 0
      },
      show: false,
      url: ''
    };
    return _this;
  }

  DanteAnchorPopover.prototype.display = function display(b) {
    if (b) {
      return this.show();
    } else {
      return this.hide();
    }
  };

  DanteAnchorPopover.prototype.show = function show() {};

  DanteAnchorPopover.prototype.hide = function hide() {
    return this.setState({
      show: false
    });
  };

  DanteAnchorPopover.prototype.setPosition = function setPosition(coords) {
    /*
    return this.setState({
      position: coords,
    });
    */
  };

  DanteAnchorPopover.prototype.relocate = function relocate(node) {
    if (node == null) {
      node = null;
    }
    if (!node) {
      return;
    }

    var editorState = this.props.editorState;

    var currentBlock = getCurrentBlock(editorState);
    var blockType = currentBlock.getType();

    var contentState = editorState.getCurrentContent();
    var selectionState = editorState.getSelection();

    var selectionBoundary = node.getBoundingClientRect();
    var coords = selectionBoundary;

    var el = this.refs.dante_popover;
    var padd = el.offsetWidth / 2;

    var parent = ReactDOM.findDOMNode(this.props.editor);
    var parentBoundary = parent.getBoundingClientRect();

    var top = selectionBoundary.top - parentBoundary.top + 10;
    var left = selectionBoundary.left + selectionBoundary.width / 2 - parentBoundary.left - padd;

    // Bound 'left' position to be within textbox +/- a margin.
    var xAxisMargin = 20;
    left = Math.max(-1 * xAxisMargin, left);
    left = Math.min(parentBoundary.width + xAxisMargin - el.offsetWidth, left);

    if (!top || !left) {
      return;
    }

    var carretSize = 6;
    var padding = 15;

    var tooltipTop = selectionBoundary.top - parentBoundary.top + 10 + padding - carretSize;
    var tooltipLeft = selectionBoundary.left - parentBoundary.left + selectionBoundary.width / 2 - padding - carretSize / 2;

    // console.log "SET SHOW FOR TOOLTIP INSERT MENU"
    return this.setState({
      show: true,
      position: {
        left: left,
        top: top
      },
      tooltipPosition: {
        left: tooltipLeft,
        top: tooltipTop
      }
    });
  };

  DanteAnchorPopover.prototype.render = function render() {
    var position = this.state.position;

    var style = {
      zIndex: 90000,
      left: position.left,
      top: position.top,
      visibility: '' + (this.state.show ? 'visible' : 'hidden')
    };
    // visibility is always hidden.
    // Temporary fix to minize visual disruption with the delayed reloaction behavior of this component
    // If we show the carret, it's position is off and the link box is off and it looks alot worse having them
    // disjointed then combined. Id rather just have the link box relocate then have two boxes relocate to become 1.

    var carretStyle = {
      zIndex: 90000,
      transform: 'rotate(45deg)',
      position: 'absolute',
      top: this.state.tooltipPosition.top + 'px',
      left: this.state.tooltipPosition.left + 'px',
      visibility: 'hidden'
    };
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        {
          ref: 'dante_popover',
          className: 'dante-popover popover--tooltip popover--Linktooltip popover--bottom is-active',
          style: style,
          onMouseOver: this.props.handleOnMouseOver,
          onMouseOut: this.props.handleOnMouseOut },
        React.createElement(
          'div',
          { className: 'popover-inner' },
          React.createElement(
            'a',
            { href: this.state.url, target: '_blank' },
            this.state.url
          )
        )
      ),
      React.createElement('div', { style: carretStyle, className: 'popover-arrow' })
    );
  };

  return DanteAnchorPopover;
}(React.Component);

export default DanteAnchorPopover;