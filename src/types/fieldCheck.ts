export type errMessage = string | undefined;

export enum checkCode {
    code_pass = 1,
    code_notPass = 2,
    code_notMatch = 3
}

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
