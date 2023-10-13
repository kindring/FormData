"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FieldCheck_ruleItems;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 表单字段验证库
 * author:kindring
 * date:2023/10/08
 */
const types_1 = require("./types");
/**
 * @class FieldCheck
 * @description 表单字段验证类
 * @property {Array<ruleItem>} ruleItems 验证规则
 * @property {function} addRuleItem 添加一条验证规则
 * @property {function} verify 检查表单是否符合规则
 * @example
 * let fieldCheck = new FieldCheck();
 * fieldCheck.addRuleItem('rule1',['name'],[
 *    {
 *    type: 'string',
 *    minLength: 2,
 *    maxLength: 10,
 *    message: '姓名必须为2-10个字符'
 *    }
 *    ]);
 *    fieldCheck.addRuleItem('rule2',['age'],[
 *    {
 *    type: 'number',
 *    min: 18,
 *    max: 100,
 *    message: '年龄必须为18-100岁'
 *    }]);
 *    let errMsg = fieldCheck.verify({
 *    name: 'kindring',
 *    age: 18});
 *    console.log(errMsg);
 *    // null
 *    let errMsg = fieldCheck.verify({
 *    name: 'kindring',
 *    age: 17});
 *    console.log(errMsg);
 *    // 年龄必须为18-100岁
 */
class FieldCheck {
    /**
     *
     * @param {Array< ruleItem >} [ruleItems] 验证规则数组
     */
    constructor(ruleItems) {
        // 通过
        this.code_pass = types_1.checkCode.code_pass;
        // 未通过
        this.code_notPass = types_1.checkCode.code_notPass;
        // 无法匹配到验证规则
        this.code_notMatch = types_1.checkCode.code_notMatch;
        /**
         * @type {Array< ruleItem >}
         */
        _FieldCheck_ruleItems.set(this, []);
        this._toString = Object.prototype.toString;
        __classPrivateFieldSet(this, _FieldCheck_ruleItems, [], "f");
        if (ruleItems && Array.isArray(ruleItems)) {
            // 使用 addRuleItem 添加规则
            for (const ruleItem of ruleItems) {
                this.addRuleItem(ruleItem.name || "", ruleItem.checkFields, ruleItem.rules);
            }
        }
    }
    /**
     * 判断值是否定义
     * @param v
     * @returns {boolean}
     * @private
     */
    _isDef(v) {
        return v !== undefined && v !== null;
    }
    /**
     * 判断是否为空
     * @param v 要检验的值
     */
    _isEmpty(v) {
        return v === undefined || v === '';
    }
    /**
     * 判断是否为正则
     * @param v 要检验的值
     */
    _isRegExp(v) {
        return this._toString.call(v) === '[object RegExp]';
    }
    /**
     * 构建验证规则
     * @param {Array<string | RegExp>} checkFields 需要验证的字段
     * @param {Array<validatorFunction | checkRule>} ruleArr 验证规则
     * @returns {ruleItem} 验证规则对象
     */
    buildRuleItem(name, checkFields, ruleArr) {
        //  检测checkFields是否为数组
        //  检测ruleArr是否为数组
        if (!Array.isArray(checkFields) || !Array.isArray(ruleArr)) {
            throw new Error('checkFields or ruleArr is not Array');
        }
        //  检测checkFields中的每一项是否为字符串或者正则
        for (let field of checkFields) {
            if (typeof field !== 'string' && !this._isRegExp(field)) {
                throw new Error('checkFields item is not string or RegExp');
            }
        }
        //  检测ruleArr中的每一项是否为函数或者对象
        for (let rule of ruleArr) {
            if (typeof rule !== 'function' && typeof rule !== 'object') {
                throw new Error('ruleArr item is not function or object');
            }
        }
        let ruleItem = {
            name: name || "",
            checkFields: checkFields,
            rules: ruleArr
        };
        // this.ruleItems = this.ruleItems.push(ruleItem);
        return ruleItem;
    }
    /**
     * 添加一条验证规则
     * @param ruleName 验证规则名,用于区分
     * @param checkFields 用于匹配字段的字符或者正则数组
     * @param ruleArr 验证规则
     * @returns  返回当前对象
     */
    addRuleItem(ruleName, checkFields, ruleArr) {
        let ruleItem = this.buildRuleItem(ruleName, checkFields, ruleArr);
        __classPrivateFieldGet(this, _FieldCheck_ruleItems, "f").push(ruleItem);
        return this;
    }
    /**
     * 获取验证规则
     * @param field 字段名
     * @returns 验证规则
     */
    getRuleItem(field) {
        return __classPrivateFieldGet(this, _FieldCheck_ruleItems, "f").find(item => {
            // 判断是否为正则
            for (const _matchKey of item.checkFields) {
                // 判断是否为正则
                if (this._isRegExp(_matchKey)) {
                    // 确定为正则
                    let reg = _matchKey;
                    // console.log(`使用正则进行匹配,${_matchKey.test(key)}`);
                    if (reg.test(field)) {
                        // console.log(`通过正则匹配规则成功,${_matchKey.test(key)}`);
                        return true;
                    }
                }
                else {
                    // console.log(`比较是否全等,${_matchKey} === ${key} ?${_matchKey === key}`);
                    if (_matchKey === field) {
                        // console.log(`通过字符${_matchKey}匹配成功`);
                        return true;
                    }
                }
            }
            return false;
        });
    }
    /**
     * 检查字段是否符合规则
     * @param field 字段名
     * @param value 字段值
     * @returns {Array<checkCode | ?errMessage>} 错误码或错误信息
     */
    checkField(field, value) {
        let ruleItem = this.getRuleItem(field);
        if (!ruleItem || !ruleItem.rules) {
            return [this.code_notMatch];
        }
        // 判断值是否为undefined
        if (value === undefined) {
            return [this.code_notPass, '字段值为undefined'];
        }
        // 开始匹配规则
        for (let _rule of ruleItem.rules) {
            // 判断是否有自定义验证函数
            if (typeof _rule === 'function') {
                let _msg = _rule(value);
                // console.log(_msg)
                if (_msg) {
                    return [this.code_notPass, _msg];
                }
            }
            let rule = _rule;
            // 判断类型
            if (rule.type && typeof value !== rule.type) {
                return [this.code_notPass, rule.message];
            }
            // 判断是否为必填项
            if (rule.require && this._isEmpty(value)) {
                return [this.code_notPass, rule.message];
            }
            // 判断最小值
            if (rule.min && value < rule.min) {
                return [this.code_notPass, rule.message];
            }
            // 判断最大值
            if (rule.max && value > rule.max) {
                return [this.code_notPass, rule.message];
            }
            // 判断值是否达到指定长度
            if (rule.length && value.length && value.length !== rule.length) {
                return [this.code_notPass, rule.message];
            }
            // 判断最小长度
            if (rule.minLength && value.length && value.length < rule.minLength) {
                return [this.code_notPass, rule.message];
            }
            // 判断最大长度
            if (rule.maxLength && value.length && value.length > rule.maxLength) {
                return [this.code_notPass, rule.message];
            }
            // 判断是否符合正则
            if (rule.regex && !rule.regex.test(value)) {
                return [this.code_notPass, rule.message];
            }
        }
        return [this.code_pass];
    }
    /**
     * 检查表单是否符合规则
     * @param formObject 需要检验的表单项 字段:值
     * @param [isMustMatch] 是否强制要求匹配规则
     * @returns errMessage 错误码或错误信息
     */
    verify(formObject, isMustMatch = false) {
        for (const _oKey in formObject) {
            let value = formObject[_oKey];
            let r = this.checkField(_oKey, value);
            if (r[0] === this.code_notPass) {
                return r[1];
            }
            else if (isMustMatch && r[0] === this.code_notMatch) {
                return `字段没有对应匹配项`;
            }
        }
    }
}
_FieldCheck_ruleItems = new WeakMap();
exports.default = FieldCheck;
