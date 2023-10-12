"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var _code_pass = new WeakMap();
var _code_notPass = new WeakMap();
var _code_notMatch = new WeakMap();
var _ruleItems = new WeakMap();
var FieldCheck = function () {
  function FieldCheck(ruleItems) {
    _classCallCheck(this, FieldCheck);
    _classPrivateFieldInitSpec(this, _code_pass, {
      writable: true,
      value: 1
    });
    _classPrivateFieldInitSpec(this, _code_notPass, {
      writable: true,
      value: 2
    });
    _classPrivateFieldInitSpec(this, _code_notMatch, {
      writable: true,
      value: 3
    });
    _classPrivateFieldInitSpec(this, _ruleItems, {
      writable: true,
      value: []
    });
    _defineProperty(this, "_toString", Object.prototype.toString);
    _classPrivateFieldSet(this, _ruleItems, []);
    if (ruleItems && Array.isArray(ruleItems)) {
      var _iterator = _createForOfIteratorHelper(ruleItems),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var ruleItem = _step.value;
          this.addRuleItem(ruleItem.name || "", ruleItem.checkFields, ruleItem.rules);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }
  _createClass(FieldCheck, [{
    key: "_isDef",
    value: function _isDef(v) {
      return v !== undefined && v !== null;
    }
  }, {
    key: "_isEmpty",
    value: function _isEmpty(v) {
      return v === undefined || v === '';
    }
  }, {
    key: "_isRegExp",
    value: function _isRegExp(v) {
      return this._toString.call(v) === '[object RegExp]';
    }
  }, {
    key: "buildRuleItem",
    value: function buildRuleItem(checkFields, ruleArr) {
      if (!Array.isArray(checkFields) || !Array.isArray(ruleArr)) {
        throw new Error('checkFields or ruleArr is not Array');
      }
      var _iterator2 = _createForOfIteratorHelper(checkFields),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var field = _step2.value;
          if (typeof field !== 'string' && !this._isRegExp(field)) {
            throw new Error('checkFields item is not string or RegExp');
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var _iterator3 = _createForOfIteratorHelper(ruleArr),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var rule = _step3.value;
          if (typeof rule !== 'function' && _typeof(rule) !== 'object') {
            throw new Error('ruleArr item is not function or object');
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      var ruleItem = {
        checkFields: checkFields,
        rules: ruleArr
      };
      return ruleItem;
    }
  }, {
    key: "addRuleItem",
    value: function addRuleItem(ruleName, checkFields, ruleArr) {
      var ruleItem = this.buildRuleItem(checkFields, ruleArr);
      _classPrivateFieldGet(this, _ruleItems).push(ruleItem);
      return this;
    }
  }, {
    key: "getRuleItem",
    value: function getRuleItem(field) {
      var _this = this;
      return _classPrivateFieldGet(this, _ruleItems).find(function (item) {
        var _iterator4 = _createForOfIteratorHelper(item.checkFields),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _matchKey = _step4.value;
            if (_this._isRegExp(_matchKey)) {
              if (_matchKey.test(field)) {
                return true;
              }
            } else {
              if (_matchKey === field) {
                return true;
              }
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
        return false;
      });
    }
  }, {
    key: "checkField",
    value: function checkField(field, value) {
      var ruleItem = this.getRuleItem(field);
      if (!ruleItem || !ruleItem.rules) {
        return [_classPrivateFieldGet(this, _code_notMatch)];
      }
      if (value === undefined) {
        return [_classPrivateFieldGet(this, _code_notPass), '字段值为undefined'];
      }
      var _iterator5 = _createForOfIteratorHelper(ruleItem.rules),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _rule = _step5.value;
          if (typeof _rule === 'function') {
            var _msg = _rule(value);
            if (_msg) {
              return [_classPrivateFieldGet(this, _code_notPass), _msg];
            }
          }
          if (_rule.type && _typeof(value) !== _rule.type) {
            return [_classPrivateFieldGet(this, _code_notPass), _rule.message];
          }
          if (_rule.require && this._isEmpty(value)) {
            return [_classPrivateFieldGet(this, _code_notPass), _rule.message];
          }
          if (_rule.min && value < _rule.min) {
            return [_classPrivateFieldGet(this, _code_notPass), _rule.message];
          }
          if (_rule.max && value > _rule.max) {
            return [_classPrivateFieldGet(this, _code_notPass), _rule.message];
          }
          if (_rule.length && value.length && value.length !== _rule.length) {
            return [_classPrivateFieldGet(this, _code_notPass), _rule.message];
          }
          if (_rule.minLength && value.length && value.length < _rule.minLength) {
            return [_classPrivateFieldGet(this, _code_notPass), _rule.message];
          }
          if (_rule.maxLength && value.length && value.length > _rule.maxLength) {
            return [_classPrivateFieldGet(this, _code_notPass), _rule.message];
          }
          if (_rule.regex && !_rule.regex.test(value)) {
            return [_classPrivateFieldGet(this, _code_notPass), _rule.message];
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      return [_classPrivateFieldGet(this, _code_pass)];
    }
  }, {
    key: "verify",
    value: function verify(formObject, isMustMatch) {
      for (var _oKey in formObject) {
        var value = formObject[_oKey];
        var r = this.checkField(_oKey, value);
        if (r[0] === _classPrivateFieldGet(this, _code_notPass)) {
          return r[1];
        } else if (isMustMatch && r[0] === _classPrivateFieldGet(this, _code_notMatch)) {
          return "\u5B57\u6BB5\u6CA1\u6709\u5BF9\u5E94\u5339\u914D\u9879";
        }
      }
    }
  }]);
  return FieldCheck;
}();
var _default = exports["default"] = FieldCheck;