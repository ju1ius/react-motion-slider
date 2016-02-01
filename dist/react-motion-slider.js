(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactMotion"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactMotion"], factory);
	else if(typeof exports === 'object')
		exports["Slider"] = factory(require("React"), require("ReactMotion"));
	else
		root["Slider"] = factory(root["React"], root["ReactMotion"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = undefined;

	var _Slider = __webpack_require__(1);

	var _Slider2 = _interopRequireDefault(_Slider);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Slider2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _class, _temp2;

	exports.__esModule = true;
	exports.default = undefined;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactMotion = __webpack_require__(3);

	var _isInteger = __webpack_require__(4);

	var _isInteger2 = _interopRequireDefault(_isInteger);

	var _Slide = __webpack_require__(7);

	var _Slide2 = _interopRequireDefault(_Slide);

	var _getIndexFromKey = __webpack_require__(9);

	var _getIndexFromKey2 = _interopRequireDefault(_getIndexFromKey);

	var _modulo = __webpack_require__(10);

	var _modulo2 = _interopRequireDefault(_modulo);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// touch / swipe
	// http://codepen.io/barTsoury/post/optimization-of-swipe-gesture-on-list-items
	// https://github.com/kenwheeler/nuka-carousel/blob/master/src/carousel.js#L162

	var Slider = (_temp2 = _class = function (_Component) {
	  _inherits(Slider, _Component);

	  function Slider() {
	    var _temp, _this, _ret;

	    _classCallCheck(this, Slider);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
	      current: _this._getNextIndex(_this.props) || 0,
	      outgoing: [],
	      speed: 0,
	      direction: 1
	    }, _this._handleSlideEnd = function (slideIndex) {
	      if (_this.state.outgoing.length > 0) {
	        _this.setState({ outgoing: [], speed: 0 });
	      } else {
	        var current = _this.state.current;
	        var _this$props = _this.props;
	        var children = _this$props.children;
	        var onChange = _this$props.onChange;

	        onChange(children[current].key, current);
	      }
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  Slider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var current = this.state.current;

	    var nextIndex = this._getNextIndex(nextProps);

	    // don't update state if index hasn't changed and we're not in the middle of a slide
	    if (current !== nextIndex && nextIndex !== null) {
	      this.slide(current > nextIndex ? -1 : 1, nextIndex);
	    }
	  };

	  Slider.prototype.prev = function prev() {
	    this.slide(-1);
	  };

	  Slider.prototype.next = function next() {
	    this.slide(1);
	  };

	  Slider.prototype.slide = function slide(direction, index) {
	    var outgoing = this.state.outgoing.slice(0);
	    var _state = this.state;
	    var current = _state.current;
	    var speed = _state.speed;

	    var newIndex = (0, _isInteger2.default)(index) ? index : (0, _modulo2.default)(current + direction, this.props.children.length);
	    var outgoingPos = outgoing.indexOf(newIndex);

	    // if new index exists in outgoing, remove it
	    if (outgoingPos > -1) {
	      outgoing.splice(outgoingPos, 1);
	    }

	    this.setState({
	      current: newIndex,
	      outgoing: [].concat(outgoing, [current]),
	      speed: speed + 1,
	      direction: direction
	    });
	  };

	  Slider.prototype._getNextIndex = function _getNextIndex(_ref) {
	    var currentIndex = _ref.currentIndex;
	    var currentKey = _ref.currentKey;
	    var children = _ref.children;

	    return currentKey ? (0, _getIndexFromKey2.default)(currentKey, children) : (0, _isInteger2.default)(currentIndex) ? currentIndex : null;
	  };

	  Slider.prototype._getChildrenToRender = function _getChildrenToRender(currValue, destValue, instant) {
	    var _this2 = this;

	    var _props = this.props;
	    var children = _props.children;
	    var vertical = _props.vertical;
	    var _state2 = this.state;
	    var current = _state2.current;
	    var outgoing = _state2.outgoing;
	    var speed = _state2.speed;
	    var direction = _state2.direction;

	    return _react.Children.map(children, function (child, index) {
	      var position = outgoing.indexOf(index);
	      var isCurrent = current === index;
	      var isOutgoing = position > -1;

	      return (isCurrent || isOutgoing) && (0, _react.createElement)(_Slide2.default, {
	        index: index,
	        position: position,
	        speed: speed,
	        direction: direction,
	        vertical: vertical,
	        outgoing: outgoing,
	        isCurrent: isCurrent,
	        isOutgoing: isOutgoing,
	        currValue: currValue,
	        destValue: destValue,
	        instant: instant,
	        hasEnded: currValue === destValue,
	        onSlideEnd: _this2._handleSlideEnd
	      }, child);
	    });
	  };

	  Slider.prototype.render = function render() {
	    var _this3 = this;

	    var _props2 = this.props;
	    var component = _props2.component;
	    var className = _props2.className;
	    var slideConfig = _props2.slideConfig;
	    var speed = this.state.speed;

	    var destValue = speed * 100;
	    var instant = speed === 0;

	    return (0, _react.createElement)(_reactMotion.Motion, {
	      style: {
	        currValue: instant ? destValue : (0, _reactMotion.spring)(destValue, slideConfig)
	      }
	    }, function (_ref2) {
	      var currValue = _ref2.currValue;
	      return (0, _react.createElement)(component, {
	        className: className
	      }, _this3._getChildrenToRender(currValue, destValue, instant));
	    });
	  };

	  return Slider;
	}(_react.Component), _class.propTypes = {
	  component: _react.PropTypes.string,
	  currentKey: _react.PropTypes.any,
	  currentIndex: _react.PropTypes.number,
	  vertical: _react.PropTypes.bool,
	  onChange: _react.PropTypes.func,
	  className: _react.PropTypes.string,
	  slideConfig: _react.PropTypes.shape({
	    stiffness: _react.PropTypes.number,
	    damping: _react.PropTypes.number,
	    precision: _react.PropTypes.number
	  })
	}, _class.defaultProps = {
	  component: 'div',
	  vertical: false,
	  onChange: function onChange() {},
	  className: 'slider',
	  slideConfig: _reactMotion.presets.stiff
	}, _temp2);
	exports.default = Slider;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/paulmillr/es6-shim
	// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isinteger
	var isFinite = __webpack_require__(5);
	module.exports = Number.isInteger || function(val) {
	  return typeof val === "number" &&
	    isFinite(val) &&
	    Math.floor(val) === val;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var numberIsNan = __webpack_require__(6);

	module.exports = Number.isFinite || function (val) {
		return !(typeof val !== 'number' || numberIsNan(val) || val === Infinity || val === -Infinity);
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	module.exports = Number.isNaN || function (x) {
		return x !== x;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _class, _temp;

	exports.__esModule = true;
	exports.default = undefined;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TRANSFORM = __webpack_require__(8)('transform');

	var Slide = (_temp = _class = function (_Component) {
	  _inherits(Slide, _Component);

	  function Slide() {
	    _classCallCheck(this, Slide);

	    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	  }

	  Slide.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
	    if (nextProps.instant && !this.props.instant) {
	      return false;
	    }
	    return true;
	  };

	  Slide.prototype.componentDidUpdate = function componentDidUpdate(lastProps) {
	    var _props = this.props;
	    var index = _props.index;
	    var isCurrent = _props.isCurrent;
	    var hasEnded = _props.hasEnded;
	    var onSlideEnd = _props.onSlideEnd;

	    if (isCurrent && lastProps.hasEnded !== hasEnded && hasEnded === true) {
	      onSlideEnd(index);
	    }
	  };

	  Slide.prototype.render = function render() {
	    var _props2 = this.props;
	    var speed = _props2.speed;
	    var direction = _props2.direction;
	    var vertical = _props2.vertical;
	    var position = _props2.position;
	    var outgoing = _props2.outgoing;
	    var isCurrent = _props2.isCurrent;
	    var isOutgoing = _props2.isOutgoing;
	    var currValue = _props2.currValue;
	    var destValue = _props2.destValue;
	    var hasEnded = _props2.hasEnded;
	    var children = _props2.children;

	    var axis = vertical ? 'Y' : 'X';
	    var style = {};

	    if (isOutgoing && isOutgoing !== isCurrent) {
	      var _style;

	      var slideOffset = -((outgoing.length - 1 - position) * 100);
	      var translate = -currValue + (speed - 1) * 100 + slideOffset;

	      style = (_style = {
	        width: '100%',
	        position: 'absolute',
	        top: 0,
	        left: 0
	      }, _style[TRANSFORM] = 'translate' + axis + '(' + (direction === -1 ? -translate : translate) + '%)', _style);
	    }

	    if (isCurrent && !hasEnded) {
	      var translate = destValue - currValue;
	      style[TRANSFORM] = 'translate' + axis + '(' + (direction === -1 ? -translate : translate) + '%)';
	    }

	    return (0, _react.cloneElement)(_react.Children.only(children), { style: style });
	  };

	  return Slide;
	}(_react.Component), _class.propTypes = {
	  children: _react.PropTypes.element.isRequired,
	  index: _react.PropTypes.number.isRequired,
	  speed: _react.PropTypes.number.isRequired,
	  direction: _react.PropTypes.number.isRequired,
	  vertical: _react.PropTypes.bool.isRequired,
	  position: _react.PropTypes.number.isRequired,
	  outgoing: _react.PropTypes.array.isRequired,
	  isCurrent: _react.PropTypes.bool.isRequired,
	  isOutgoing: _react.PropTypes.bool.isRequired,
	  currValue: _react.PropTypes.number.isRequired,
	  destValue: _react.PropTypes.number.isRequired,
	  hasEnded: _react.PropTypes.bool.isRequired,
	  instant: _react.PropTypes.bool.isRequired,
	  onSlideEnd: _react.PropTypes.func.isRequired
	}, _temp);
	exports.default = Slide;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = getPrefix;

	function getPrefix(prop) {
	  if (typeof document === 'undefined') return prop;

	  var styles = document.createElement('p').style;
	  var vendors = ['ms', 'O', 'Moz', 'Webkit'];

	  if (styles[prop] === '') return prop;

	  prop = prop.charAt(0).toUpperCase() + prop.slice(1);

	  for (var i = vendors.length; i--;) {
	    if (styles[vendors[i] + prop] === '') {
	      return vendors[i] + prop;
	    }
	  }
	}

	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = getIndexFromKey;

	var _react = __webpack_require__(2);

	function getIndexFromKey(key, children) {
	  var index = null;

	  _react.Children.forEach(children, function (child, _index) {
	    if (child.key === key) {
	      index = _index;
	      return;
	    }
	  });

	  return index;
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.default = modulo;
	function modulo(n, m) {
	  return n < 0 ? (n % m + m) % m : n % m;
	}

/***/ }
/******/ ])
});
;