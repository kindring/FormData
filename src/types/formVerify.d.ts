


type formOption = {
    key: string;
    value: string;
    disabled?: boolean;
    checkField?: string;
}

type FormVerifyOption = {
    isMustMatchRule: boolean;
}

type formItemData = {
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
type formObject = {
    [key: string]: formItemData;
}

type formOption= {
    isMustMatchRule?: boolean;
    [key: string]: any;
}


type verifyForm = {
    [key: string]: any;
}
