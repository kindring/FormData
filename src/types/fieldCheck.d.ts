// 错误码
type errMessage = string | undefined;

/**
 * 规则匹配结果
 * @property code_pass 验证通过
 * @property code_notPass 验证未通过
 * @property code_notMatch 未匹配到规则
 */
enum checkCode {
    code_pass = 1,
    code_notPass = 2,
    code_notMatch = 3
}

type checkFields = Array<string | RegExp>;

/**
 * 验证规则
 * @property [type] 类型
 * @property  [min] 最小值
 * @property max 最大值
 * @property length 长度
 * @property regex 正则表达式
 * @property message 错误信息
 * @property require 是否必填
 * @property minLength 最小长度
 * @property maxLength 最大长度
 * @property validator 自定义验证函数
 */
type checkRule = {
    type?: string;
    min?: number;
    max?: number;
    length?: number;
    regex?: RegExp;
    message?: errMessage;
    require?: boolean;
    minLength?: number;
    maxLength?: number;
    validator?: validatorFunction;
}


/**
 * 规则项
 * @property name 规则名称
 * @property checkFields 验证匹配字段
 * @property rules 验证规则
 */
type ruleItem = {
    name: string,
    checkFields: checkFields;
    rules: Array<validatorFunction | checkRule>;
}

/**
 * 验证函数
 * @param value 要验证的值
 * @returns {string | null} 错误信息
 */
type validatorFunction = {
    (value: any): string | null
}
