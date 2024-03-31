"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChart = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var LineChart = exports.LineChart = /*#__PURE__*/function () {
  function LineChart(_ref) {
    var canvas = _ref.canvas,
      _ref$fontSize = _ref.fontSize,
      fontSize = _ref$fontSize === void 0 ? "16px" : _ref$fontSize,
      _ref$fontFamily = _ref.fontFamily,
      fontFamily = _ref$fontFamily === void 0 ? "Arial" : _ref$fontFamily,
      _ref$showGrid = _ref.showGrid,
      showGrid = _ref$showGrid === void 0 ? true : _ref$showGrid,
      _ref$showXAxisLabel = _ref.showXAxisLabel,
      showXAxisLabel = _ref$showXAxisLabel === void 0 ? true : _ref$showXAxisLabel,
      _ref$showYAxisLabel = _ref.showYAxisLabel,
      showYAxisLabel = _ref$showYAxisLabel === void 0 ? true : _ref$showYAxisLabel,
      _ref$showXAxisValues = _ref.showXAxisValues,
      showXAxisValues = _ref$showXAxisValues === void 0 ? true : _ref$showXAxisValues,
      _ref$showYAxisValues = _ref.showYAxisValues,
      showYAxisValues = _ref$showYAxisValues === void 0 ? true : _ref$showYAxisValues,
      _ref$showAnnotations = _ref.showAnnotations,
      showAnnotations = _ref$showAnnotations === void 0 ? true : _ref$showAnnotations,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? "" : _ref$title,
      _ref$xlabel = _ref.xlabel,
      xlabel = _ref$xlabel === void 0 ? "" : _ref$xlabel,
      _ref$ylabel = _ref.ylabel,
      ylabel = _ref$ylabel === void 0 ? "" : _ref$ylabel;
    _classCallCheck(this, LineChart);
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.dataSets = [];
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.showGrid = showGrid;
    this.showXAxisLabel = showXAxisLabel;
    this.showYAxisLabel = showYAxisLabel;
    this.showXAxisValues = showXAxisValues;
    this.showYAxisValues = showYAxisValues;
    this.showAnnotations = showAnnotations;
    this.title = title;
    this.xlabel = xlabel;
    this.ylabel = ylabel;
    this.padding = 60;
    this.fillAreas = [];
  }
  return _createClass(LineChart, [{
    key: "addDataSet",
    value: function addDataSet(_ref2) {
      var xData = _ref2.xData,
        yData = _ref2.yData,
        color = _ref2.color,
        name = _ref2.name;
      this.dataSets.push({
        xData: xData,
        yData: yData,
        color: color,
        name: name
      });
    }
  }, {
    key: "addFillBetween",
    value: function addFillBetween(_ref3) {
      var index1 = _ref3.index1,
        index2 = _ref3.index2,
        color = _ref3.color;
      if (index1 < this.dataSets.length && index2 < this.dataSets.length) {
        this.fillAreas.push({
          index1: index1,
          index2: index2,
          color: color
        });
      }
    }
  }, {
    key: "getX",
    value: function getX(value) {
      var allXData = this.dataSets.flatMap(function (dataSet) {
        return dataSet.xData;
      });
      var minX = Math.min.apply(Math, _toConsumableArray(allXData));
      var maxX = Math.max.apply(Math, _toConsumableArray(allXData));
      var range = maxX - minX;
      var scale = (this.canvas.width - 2 * this.padding) / range;
      return (value - minX) * scale + this.padding;
    }
  }, {
    key: "getY",
    value: function getY(value) {
      var allYData = this.dataSets.flatMap(function (dataSet) {
        return dataSet.yData;
      });
      var minY = Math.min.apply(Math, _toConsumableArray(allYData));
      var maxY = Math.max.apply(Math, _toConsumableArray(allYData));
      var range = maxY - minY;
      var scale = (this.canvas.height - 2 * this.padding) / range;
      return this.canvas.height - (value - minY) * scale - this.padding;
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this = this;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (this.dataSets.length === 0) return;
      this.ctx.font = "".concat(this.fontSize, " ").concat(this.fontFamily);
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "top";
      this.ctx.fillText(this.title, this.canvas.width / 2, this.padding / 2);
      this.ctx.textBaseline = "bottom";
      this.ctx.fillText(this.xlabel, this.canvas.width / 2, this.canvas.height - this.padding / 4);
      this.ctx.save();
      this.ctx.translate(this.padding / 2, this.canvas.height / 2);
      this.ctx.rotate(-Math.PI / 2);
      this.ctx.fillText(this.ylabel, 0, 0);
      this.ctx.restore();
      this.fillAreas.forEach(function (_ref4) {
        var index1 = _ref4.index1,
          index2 = _ref4.index2,
          color = _ref4.color;
        var dataSet1 = _this.dataSets[index1];
        var dataSet2 = _this.dataSets[index2];
        _this.ctx.fillStyle = color;
        _this.ctx.beginPath();
        dataSet1.xData.forEach(function (x, i) {
          var y1 = _this.getY(dataSet1.yData[i]);
          var y2 = _this.getY(dataSet2.yData[i]);
          var xVal = _this.getX(x);
          if (i === 0) {
            _this.ctx.moveTo(xVal, y1);
          } else {
            _this.ctx.lineTo(xVal, y1);
          }
          if (i === dataSet1.xData.length - 1) {
            for (var j = dataSet2.xData.length - 1; j >= 0; j--) {
              _this.ctx.lineTo(_this.getX(dataSet2.xData[j]), _this.getY(dataSet2.yData[j]));
            }
          }
        });
        _this.ctx.closePath();
        _this.ctx.fill();
      });
      this.dataSets.forEach(function (_ref5) {
        var xData = _ref5.xData,
          yData = _ref5.yData,
          color = _ref5.color;
        _this.ctx.strokeStyle = color;
        _this.ctx.lineWidth = 2;
        _this.ctx.beginPath();
        xData.forEach(function (x, index) {
          var xVal = _this.getX(x);
          var yVal = _this.getY(yData[index]);
          if (index === 0) {
            _this.ctx.moveTo(xVal, yVal);
          } else {
            _this.ctx.lineTo(xVal, yVal);
          }
          if (_this.showAnnotations) {
            _this.ctx.fillStyle = color;
            _this.ctx.fillText("(".concat(x, ", ").concat(yData[index], ")"), xVal, yVal - 10);
          }
        });
        _this.ctx.stroke();
      });
      var allXData = this.dataSets.flatMap(function (dataSet) {
        return dataSet.xData;
      });
      var allYData = this.dataSets.flatMap(function (dataSet) {
        return dataSet.yData;
      });
      var maxXValue = Math.max.apply(Math, _toConsumableArray(allXData));
      var maxYValue = Math.max.apply(Math, _toConsumableArray(allYData));
      if (this.showGrid) {
        this.drawGrid(maxXValue, maxYValue);
      }
    }
  }, {
    key: "drawGrid",
    value: function drawGrid(maxXValue, maxYValue) {
      this.ctx.strokeStyle = "#ddd";
      this.ctx.lineWidth = 1;
      for (var i = 0; i <= maxXValue; i++) {
        var x = this.getX(i);
        this.ctx.beginPath();
        this.ctx.moveTo(x, this.padding);
        this.ctx.lineTo(x, this.canvas.height - this.padding);
        this.ctx.stroke();
        if (this.showXAxisValues) {
          this.ctx.fillText(i.toString(), x, this.canvas.height - this.padding / 1.4);
        }
      }
      for (var _i = 0; _i <= maxYValue; _i++) {
        var y = this.getY(_i);
        this.ctx.beginPath();
        this.ctx.moveTo(this.padding, y);
        this.ctx.lineTo(this.canvas.width - this.padding, y);
        this.ctx.stroke();
        if (this.showYAxisValues) {
          this.ctx.fillText(_i.toString(), this.padding / 1.5, y);
        }
      }
    }
  }]);
}();