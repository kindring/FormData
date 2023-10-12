"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _fieldCheck = _interopRequireDefault(require("./fieldCheck"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
var FormItem = function () {
  function FormItem(object, fieldCheck, option) {
    _classCallCheck(this, FormItem);
    _defineProperty(this, "formData", null);
    _defineProperty(this, "fieldCheck", null);
    _defineProperty(this, "formState_default", 0);
    _defineProperty(this, "formState_pass", 1);
    _defineProperty(this, "formState_notPass", 2);
    _defineProperty(this, "defaultOption", {
      isMustMatchRule: false
    });
    _defineProperty(this, "option", {});
    this.fieldCheck = fieldCheck || new _fieldCheck["default"]();
    this.option = Object.assign(this.defaultOption, option);
    var errMsg;
    for (var key in object) {
      this[key] = object[key];
      errMsg = FormItem.buildFormItem(object, key, object[key], this.fieldCheck, this.option.isMustMatchRule);
      if (errMsg) {
        throw new Error("\u8868\u5355\u9879".concat(key, "\u4E0D\u7B26\u5408\u8981\u6C42,err:").concat(errMsg));
      }
    }
    this.formData = object;
  }
  _createClass(FormItem, [{
    key: "checkForm",
    value: function checkForm(form, isMustMatch) {
      var _this = this;
      var r = true;
      var n_checkPass = 0,
        n_checkTotal = 0;
      var msg = '';
      var _loop = function _loop() {
        var formItem = form[fieldKey];
        var depend = form[formItem.depend];
        var checkField = fieldKey;
        var tmpInd = -1;
        n_checkTotal++;
        if (formItem.reCheckField) {
          checkField = formItem.reCheckField;
        }
        if (formItem.disables) {
          if (formItem.disables.indexOf(formItem.val) !== -1) {
            formItem.msg = '该项内容不合法';
            r = false;
          }
        }
        if (formItem.options) {
          tmpInd = formItem.options.findIndex(function (item) {
            return item.value == formItem.val;
          });
          if (tmpInd === -1) {
            console.log("\u68C0\u6D4B\u679A\u4E3E\u5B57\u6BB5:".concat(checkField, ",\u503C:").concat(formItem.val, "\u4E0D\u5728\u8303\u56F4\u5185"));
            formItem.msg = '选项不在范围内';
            formItem.state = 1;
            r = false;
          } else {
            if (formItem.options[tmpInd].disabled) {
              formItem.msg = '该选项已经被禁用';
              r = false;
            }
          }
          n_checkPass++;
          return 1;
        }
        if (depend) {
          if (depend.options) {
            var optionItem = depend.options.find(function (item) {
              return item.value == depend.val;
            });
            if (!optionItem) {
              depend.msg = '选项不在范围内';
              formItem.msg = '该值依赖项输入异常';
              r = false;
            }
            if (optionItem.checkField) {
              checkField = optionItem.checkField;
            }
          } else {
            r = false;
          }
          if (!r) {
            depend.msg = '该项依赖项输入异常';
            formItem.msg = '该值依赖项输入异常';
          }
        }
        formItem.msg = _this.fieldCheck.verify(_defineProperty({}, checkField, formItem.val));
        if (formItem.msg) r = false;
        if (r) {
          n_checkPass++;
          formItem.state = _this.formState_pass;
        } else {
          formItem.state = _this.formState_notPass;
        }
      };
      for (var fieldKey in form) {
        if (_loop()) continue;
      }
      msg = "\u68C0\u67E5\u8868\u5355\u9879\u901A\u8FC7\u7387:".concat(n_checkPass, "/").concat(n_checkTotal);
      console.log(msg);
      return r;
    }
  }], [{
    key: "isObject",
    value: function isObject(obj) {
      return obj !== null && _typeof(obj) === 'object';
    }
  }, {
    key: "buildFormItem",
    value: function buildFormItem(object, field, formItemData, fieldCheck, isMustMatchRule) {
      if (!FormItem.isObject(formItemData)) {
        return "form item ".concat(field, " must be object");
      }
      var isNeedMatchRule = true;
      var checkFieldStr = field;
      var disables = formItemData.disables;
      formItemData.val = formItemData.val || formItemData.init || '';
      formItemData.msg = formItemData.msg || '';
      formItemData.state = formItemData.state || FormData.formState_default;
      formItemData.label = formItemData.label || '';
      if (formItemData.options) {
        if (!formItemData.options.length || !formItemData.options[0]) {
          return "form item ".concat(field, " options must be array and has item");
        }
        if (!formItemData.init) {
          formItemData.init = formItemData.options[0].key;
        }
        var hasInit = false;
        for (var i = 0; i < formItemData.options.length; i++) {
          var option = formItemData.options[i];
          if (option.key === formItemData.init) {
            hasInit = true;
          }
          if (disables && disables.indexOf(option.key) !== -1) {
            option.disabled = true;
          }
        }
        if (!hasInit) {
          return "form item ".concat(field, " init value must be in options");
        }
      }
      if (formItemData.depend && formItemData.reCheckField) {
        return "form item ".concat(field, " has depend and reCheckField, but depend and reCheckField can not exist at the same time");
      }
      if (formItemData.depend) {
        if (!object[formItemData.depend]) {
          return "form item ".concat(field, " depend field ").concat(formItemData.depend, " but the field not exist");
        }
        if (!object[formItemData.depend].options) {
          return "form item ".concat(field, " depend field ").concat(formItemData.depend, " has no options");
        }
        var hasCheckField = false;
        for (var _i = 0; _i < object[formItemData.depend].options.length; _i++) {
          var _option = object[formItemData.depend].options[_i];
          if (_option.checkField) {
            hasCheckField = true;
            checkFieldStr = _option.checkField;
            break;
          }
        }
        if (!hasCheckField) {
          return "form item ".concat(field, " depend field ").concat(formItemData.depend, " has no checkField");
        }
      }
      if (formItemData.reCheckField) {
        checkFieldStr = formItemData.reCheckField;
      }
      if (isMustMatchRule) {
        if (fieldCheck.getRuleItem(checkFieldStr)) {
          return "form item ".concat(field, " has no rules");
        }
      }
      return '';
    }
  }, {
    key: "initFormItemData",
    value: function initFormItemData(formObject) {
      var keys = Object.keys(formObject);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        formObject[key].val = formObject[key].init;
        formObject[key].msg = '';
        formObject[key].state = FormData.formState_default;
        formObject[key].showText = '';
      }
    }
  }]);
  return FormItem;
}();
var _default = exports["default"] = FormItem;