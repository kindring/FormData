export type errMessage = string | undefined;


export type checkFields = Array<string | RegExp>;
export interface checkRule {
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



export interface ruleItem {
    name: string,
    checkFields: checkFields;
    rules: Array<validatorFunction | checkRule>;
}

export interface validatorFunction {
    (value: any): string | null
}


// type checkCode = number;

export enum checkCode {
    code_pass = 1,
    code_notPass = 2,
    code_notMatch = 3
}

export interface formOption {
    key: string;
    value: string;
    disabled?: boolean;
    checkField?: string;
}

export interface FormVerifyOption{
    isMustMatchRule: boolean;
}

export interface formItemData {
    val?: string;
    msg?: string;
    state?: number;
    showText?: string;
    label?: string;
    init?: string;
    options?: formOption[];
    depend?: string;
    reCheckField?: string;
    disables?: string[];
    // 允许有其他字段
    [key: string]: any;
}

/**
 * 表单数据对象
 * object 表单数据对象
 */
export interface formObject {
    [key: string]: formItemData;
}

export interface formOption {
    isMustMatchRule?: boolean;
    [key: string]: any;
}


export interface verifyForm{
    [key: string]: any;
}
