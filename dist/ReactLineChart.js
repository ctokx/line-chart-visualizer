"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _LineChart = require("./LineChart");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var ReactLineChart = function ReactLineChart(_ref) {
  var dataSets = _ref.dataSets,
    fillAreas = _ref.fillAreas;
  var canvasRef = (0, _react.useRef)(null);
  var chartRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (canvasRef.current) {
      if (!chartRef.current) {
        chartRef.current = new _LineChart.LineChart({
          canvas: canvasRef.current,
          fontSize: "12px",
          fontFamily: "Arial",
          showGrid: true,
          showXAxisLabel: true,
          showYAxisLabel: true,
          showXAxisValues: true,
          showYAxisValues: true,
          showAnnotations: true,
          title: "My Line Chart",
          xlabel: "X-axis",
          ylabel: "Y-axis"
        });
      }
      var chart = chartRef.current;
      chart.dataSets = [];
      dataSets.forEach(function (dataSet) {
        return chart.addDataSet(dataSet);
      });
      if (fillAreas) {
        fillAreas.forEach(function (_ref2) {
          var index1 = _ref2.index1,
            index2 = _ref2.index2,
            color = _ref2.color;
          chart.addFillBetween({
            index1: index1,
            index2: index2,
            color: color
          });
        });
      }
      chart.draw();
      var observer = new ResizeObserver(function (entries) {
        var _iterator = _createForOfIteratorHelper(entries),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entry = _step.value;
            var _entry$contentRect = entry.contentRect,
              width = _entry$contentRect.width,
              height = _entry$contentRect.height;
            canvasRef.current.width = width;
            canvasRef.current.height = height;
            chart.draw();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
      observer.observe(canvasRef.current);
      return function () {
        return observer.disconnect();
      };
    }
  }, [dataSets, fillAreas]);
  return /*#__PURE__*/_react["default"].createElement("canvas", {
    ref: canvasRef,
    style: {
      width: "100%",
      height: "100%"
    }
  });
};
var _default = exports["default"] = ReactLineChart;