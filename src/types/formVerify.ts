


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
