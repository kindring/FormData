import FieldCheck from "./fieldCheck";
/**
 * @class FormItem 表单验证类
 * @description 表单项
 * @param {formObject} formObject 表单项数据
 * @param {FieldCheck} [fieldCheck] 字段验证对象
 * @param {object} [option] 配置项
 */
declare class FormVerify {
    formData: formObject | null;
    fieldCheck: FieldCheck;
    defaultOption: FormVerifyOption;
    option: FormVerifyOption;
    static formState_default: number;
    static formState_pass: number;
    static formState_notPass: number;
    formState_default: number;
    formState_pass: number;
    formState_notPass: number;
    constructor(formObject: formObject, fieldCheck?: FieldCheck, option?: FormVerifyOption);
    static isObject(obj: any): boolean;
    /**
     * 检查表单项是否符合要求
     * @param  object 表单项数据
     * @param  field 字段名
     * @param  formItemData 表单项数据
     * @param  fieldCheck 字段验证对象
     * @param  isMustMatchRule 表单字段是否必须匹配到验证规则
     * @returns  errMsg 错误信息
     */
    static buildFormItem(object: formObject, field: string, formItemData: formItemData, fieldCheck: FieldCheck, isMustMatchRule: boolean): string;
    /**
     * 初始化表单项数据
     * @param { formObject } formObject 表单对象
     */
    static initFormItemData(formObject: formObject): void;
    onLog: (msg: string) => void;
    /**
     * 检查表单项是否符合要求
     * @param {formObject} form 表单对象
     * @param isMustMatch 是否必须全部匹配到验证规则
     * @returns {boolean}
     */
    checkForm(form: formObject, isMustMatch: boolean): boolean;
    /**
     * 验证当前的表单是否符合要求
     * @param [isMustMatch] 是否必须全部匹配到验证规则
     */
    check(isMustMatch?: boolean): boolean;
    /**
     * 检测特定表单项的内容是否符合规则
     * @param field 字段名
     * @param isMustMatch 是否必须匹配到验证规则 默认 true
     */
    checkItem(field: string, isMustMatch?: boolean): boolean;
    /**
     * 使用该表单绑定的验证器进行验证字段与值是否符合规则
     * @param field 要验证的字段
     * @param value 要验证的值
     * @param isMustMatch
     */
    verifyKnV(field: string, value: any, isMustMatch?: boolean): errMessage;
}
export default FormVerify;
//# sourceMappingURL=formVerify.d.ts.map