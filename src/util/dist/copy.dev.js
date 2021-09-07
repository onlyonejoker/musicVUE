"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Copy = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Copy =
/*#__PURE__*/
function () {
  function Copy() {
    _classCallCheck(this, Copy);
  }

  _createClass(Copy, [{
    key: "copy",
    value: function copy(obj) {
      var copyObj = Array.isArray(obj) ? [] : {};

      if (obj && _typeof(obj) == "object") {
        for (var key in obj) {
          if (obj[key] && _typeof(obj[key]) == "object") {
            copyObj[key] = this.copy(obj[key]);
          } else {
            copyObj[key] = obj[key];
          }
        }
      }

      return copyObj;
    }
  }]);

  return Copy;
}();

exports.Copy = Copy;