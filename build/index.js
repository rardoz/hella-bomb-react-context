Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateProvider = exports.Consumer = exports.Provider = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Initialize a context
var Context = (0, _react.createContext)("hbrc-global-context");

// This context contains two interesting components
var Provider = Context.Provider,
    Consumer = Context.Consumer;
exports.Provider = Provider;
exports.Consumer = Consumer;

var StateProvider = exports.StateProvider = function (_Component) {
  _inherits(StateProvider, _Component);

  function StateProvider() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, StateProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = StateProvider.__proto__ || Object.getPrototypeOf(StateProvider)).call.apply(_ref, [this].concat(args))), _this), _this.state = Object.assign({
      actions: []
    }, _this.props.initialState), _this.changeState = function () {
      var newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _this.setState(Object.assign({}, newState));
    }, _this.getActionName = function () {
      var actionObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      for (key in actionObject) {
        return key;
      }return "";
    }, _this.addActions = function () {
      var actions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var actionsState = Object.assign({}, _this.state.actions);
      for (key in actions) {
        actionsState[key] = actions[key];
      }_this.setState({ actions: actionsState });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(StateProvider, [{
    key: "render",
    value: function () {
      function render() {
        return _react2["default"].createElement(
          Provider,
          {
            value: {
              state: this.state,
              actions: Object.assign({
                changeState: this.changeState,
                addAction: this.addAction
              }, this.props.actions, this.state.actions)
            }
          },
          this.props.children
        );
      }

      return render;
    }()
  }]);

  return StateProvider;
}(_react.Component);

StateProvider.defaultProps = {
  children: []
};
