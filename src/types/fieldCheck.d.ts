type errMessage = string | undefined;

enum checkCode {
    code_pass = 1,
    code_notPass = 2,
    code_notMatch = 3
}

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
