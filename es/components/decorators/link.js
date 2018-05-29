import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Entity } from 'draft-js';

var Link = function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link(props) {
    _classCallCheck(this, Link);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this._validateLink = _this._validateLink.bind(_this);
    _this._checkProtocol = _this._checkProtocol.bind(_this);
    _this._showPopLinkOver = _this._showPopLinkOver.bind(_this);
    _this._hidePopLinkOver = _this._hidePopLinkOver.bind(_this);
    _this.isHover = false;
    return _this;
  }

  Link.prototype._validateLink = function _validateLink() {
    var pattern = new RegExp('^(https?://)?' + // protocol
    '((([a-zd]([a-zd-]*[a-zd])*).)+[a-z]{2,}|' + // domain name
    '((d{1,3}.){3}d{1,3}))' + // OR ip (v4) address
    '(:d+)?(/[-a-zd%_.~+]*)*' + // port and path
    '(?[&a-zd%_.~+=-]*)?' + // query string
    '(#[-a-zd_]*)?$', 'i'); // fragment locater
    if (!pattern.test(str)) {
      alert('Please enter a valid URL.');
      return false;
    } else {
      return true;
    }
  };

  Link.prototype._checkProtocol = function _checkProtocol() {
    return console.log('xcvd');
  };

  Link.prototype._showPopLinkOver = function _showPopLinkOver(e) {
    if (!this.data.showPopLinkOver) {
      return;
    }
    return this.data.showPopLinkOver(this.refs.link);
  };

  Link.prototype._hidePopLinkOver = function _hidePopLinkOver(e) {
    if (!this.data.hidePopLinkOver) {
      return;
    }
    return this.data.hidePopLinkOver();
  };

  Link.prototype.render = function render() {
    this.data = this.props.contentState.getEntity(this.props.entityKey).getData();
    //Entity.get(this.props.entityKey).getData()

    return React.createElement(
      'a',
      {
        ref: 'link',
        target: '_blank',
        href: this.data.url,
        className: 'markup--anchor',
        onMouseOver: this._showPopLinkOver,
        onMouseOut: this._hidePopLinkOver },
      this.props.children
    );
  };

  return Link;
}(React.Component);

export default Link;