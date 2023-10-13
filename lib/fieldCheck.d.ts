/**
 * 表单字段验证库
 * author:kindring
 * date:2023/10/08
 */
import { verifyForm } from "./types/formVerify";
import { errMessage, checkCode, checkRule, ruleItem, checkFields, validatorFunction } from "./types/fieldCheck";
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
declare class FieldCheck {
    #private;
    code_pass: checkCode;
    code_notPass: number;
    code_notMatch: checkCode;
    /**
     *
     * @param {Array< ruleItem >} [ruleItems] 验证规则数组
     */
    constructor(ruleItems?: Array<ruleItem>);
    /**
     * 判断值是否定义
     * @param v
     * @returns {boolean}
     * @private
     */
    _isDef(v: any): boolean;
    _toString: () => string;
    /**
     * 判断是否为空
     * @param v 要检验的值
     */
    _isEmpty(v: any): boolean;
    /**
     * 判断是否为正则
     * @param v 要检验的值
     */
    _isRegExp(v: any): boolean;
    /**
     * 构建验证规则
     * @param {Array<string | RegExp>} checkFields 需要验证的字段
     * @param {Array<validatorFunction | checkRule>} ruleArr 验证规则
     * @returns {ruleItem} 验证规则对象
     */
    buildRuleItem(name: string, checkFields: checkFields, ruleArr: Array<validatorFunction | checkRule>): ruleItem;
    /**
     * 添加一条验证规则
     * @param ruleName 验证规则名,用于区分
     * @param checkFields 用于匹配字段的字符或者正则数组
     * @param ruleArr 验证规则
     * @returns  返回当前对象
     */
    addRuleItem(ruleName: string, checkFields: checkFields, ruleArr: Array<validatorFunction | checkRule>): this;
    /**
     * 获取验证规则
     * @param field 字段名
     * @returns 验证规则
     */
    getRuleItem(field: string): ruleItem | undefined;
    /**
     * 检查字段是否符合规则
     * @param field 字段名
     * @param value 字段值
     * @returns {Array<checkCode | ?errMessage>} 错误码或错误信息
     */
    checkField(field: string, value: any): [
        checkCode,
        errMessage
    ] | [checkCode];
    /**
     * 检查表单是否符合规则
     * @param formObject 需要检验的表单项 字段:值
     * @param [isMustMatch] 是否强制要求匹配规则
     * @returns errMessage 错误码或错误信息
     */
    verify(formObject: verifyForm, isMustMatch?: boolean): errMessage;
}
export default FieldCheck;
//# sourceMappingURL=fieldCheck.d.ts.map