/**
 * 表单项 enum 值,用于下拉框
 * @property key 枚举值
 * @property value 枚举文本
 * @property [disabled] 是否禁用
 * @property [checkField] 依赖字段
 */
type formOption = {
    key: string;
    value: string;
    disabled?: boolean;
    checkField?: string;
}

/**
 * 表单验证类配置
 * @property [isMustMatchRule] 是否必须匹配规则 默认false
 */
type FormVerifyOption = {
    isMustMatchRule: boolean;
}

/**
 * 表单数据
 * @property [val] 字段值
 * @property [msg] 提示信息
 * @property [state] 状态
 * @property [showText] 显示的文本
 * @property [label] 标签
 * @property [init] 初始值
 * @property [options] 选项
 * @property [depend] 依赖字段
 * @property [reCheckField] 重新验证字段
 * @property [disables] 禁用字段
 * @property [any] 字段名
 */
type formItemData = {
    // 字段值
    val?: string;
    // 提示信息
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
 * @property [key] k:v
 */
type formObject = {
    [key: string]: formItemData;
}



/**
 * 要验证的数据值 {key: value}
 */
type verifyForm = {
    // key: value
    [key: string]: any;
}
