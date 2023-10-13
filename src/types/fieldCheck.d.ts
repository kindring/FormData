// 错误码
type errMessage = string | undefined;

/**
 * 检测是否通过
 * code_pass 通过
 * code_notPass 不通过
 * code_notMatch 未匹配到规则
 */
enum checkCode {
    code_pass = 1,
    code_notPass = 2,
    code_notMatch = 3
}

/**
 * @description 验证字段
 * @param {Array<string | RegExp>} checkFields 用于匹配的字段字符或者正则
 */
type checkFields = Array<string | RegExp>;


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



type ruleItem = {
    name: string,
    checkFields: checkFields;
    rules: Array<validatorFunction | checkRule>;
}

type validatorFunction = {
    (value: any): string | null
}
