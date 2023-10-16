"use strict";
import FieldCheck from "./fieldCheck";

// import {formItemData, formObject, formOption, FormVerifyOption} from "./types/formVerify";
let hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj:object, key:string) {
    return hasOwnProperty.call(obj, key)
}


/**
 * @class FormItem 表单验证类
 * @description 表单项
 * @param {formObject} formObject 表单项数据
 * @param {FieldCheck} [fieldCheck] 字段验证对象
 * @param {object} [option] 配置项
 */
class FormVerify {
    formData:formObject | null = null;

    fieldCheck:FieldCheck;


    defaultOption: FormVerifyOption = {
        isMustMatchRule: false,
    }
    option: FormVerifyOption = {
        isMustMatchRule: false,
    };
    // 表单状态 默认 0 通过 1 不通过 2
    public static formState_default: number;
    public static formState_pass: number;
    public static formState_notPass: number;

    formState_default: number = 0;
    formState_pass: number = 1;
    formState_notPass: number = 2;

    constructor(formObject:formObject, fieldCheck?:FieldCheck, option?:FormVerifyOption) {
        this.fieldCheck = fieldCheck || new FieldCheck();
        // 合并配置项
        this.option = Object.assign(this.defaultOption, option);

        let errMsg;
        // 拿出其中的每一项来构建对应的表单项
        for (let key in formObject) {
            // this.formData[key] = object[key];
            // 验证表单项是否符合要求,不符合要求则抛出错误
            errMsg = FormVerify.buildFormItem(formObject, key, formObject[key], this.fieldCheck, this.option.isMustMatchRule);
            if (errMsg) {
                throw new Error(`表单项${key}不符合要求,err:${errMsg}`);
            }
        }
        this.formData = formObject;
    }
    static isObject (obj:any) {
        return obj !== null && typeof obj === 'object'
    }

    /**
     * 检查表单项是否符合要求
     * @param  object 表单项数据
     * @param  field 字段名
     * @param  formItemData 表单项数据
     * @param  fieldCheck 字段验证对象
     * @param  isMustMatchRule 表单字段是否必须匹配到验证规则
     * @returns  errMsg 错误信息
     */
    static buildFormItem(object: formObject,
                         field: string,
                         formItemData: formItemData,
                         fieldCheck: FieldCheck,
                         isMustMatchRule: boolean)
    {
        if ( !FormVerify.isObject(formItemData) ){
            return `form item ${field} must be object`;
        }
        // 是否需要从验证规则表中查找对应的验证规则
        let isNeedMatchRule = true;

        // 用于匹配的字段
        let checkFieldStr = field;

        let disables = formItemData.disables;

        // 设置默认值
        formItemData.val = formItemData.val || formItemData.init || '';
        // 设置默认提示词
        formItemData.msg = formItemData.msg || '';
        // 设置默认状态
        formItemData.state = formItemData.state || FormVerify.formState_default;
        // 设置默认显示文本
        formItemData.label = formItemData.label || '';

        // 判断是否有 options 选项有则判断是否有 init 选项,没有则设置第一个为 init
        if ( formItemData.options  ){
            if( !formItemData.options.length || !formItemData.options[0] ){
                return `form item ${field} options must be array and has item`;
            }
            if ( !formItemData.init ){
                formItemData.init = formItemData.options[0].key;
            }

            // 判断 val 与 init 是否存在于 options 中
            let hasInit = false;
            for (let i = 0; i < formItemData.options.length; i++) {
                let option = formItemData.options[i];
                if ( option.key === formItemData.init ){
                    hasInit = true;
                }

                // 判断该options是否为禁用项

                if ( disables && disables.find(item=>item === option.key) ){
                    option.disabled = true;
                }
            }
            if ( !hasInit ){
                return `form item ${field} init value must be in options`;
            }

        }

        // 判断是否有 depend 依赖字段 有依赖字段则依据依赖字段中的 option 中的 checkField 字段进行判断
        if( formItemData.depend && formItemData.reCheckField ){
            return `form item ${field} has depend and reCheckField, but depend and reCheckField can not exist at the same time`;
        }

        // 判断是否有 depend 依赖字段 有依赖字段则依据依赖字段中的 option 中的 checkField 字段进行判断
        if ( formItemData.depend ){
            let hasCheckField = false;
            let dependStr: string = formItemData.depend;
            let dependOptions:formOption[] = [];
            // 判断object 是否为 formObject 并且不为undefined
            if ( !object){
                return `form item ${field} depend field ${dependStr} but the field not exist`;
            }
            // 设置 object 不为undefined
            object = object as formObject;

            // 判断依赖字段是否存在
            if ( !object[dependStr] ){
                return `form item ${field} depend field ${dependStr} but the field not exist`;
            }
            // 判断依赖字段的 option 是否存在
            if ( !object[dependStr].options ){
                return `form item ${field} depend field ${dependStr} has no options`;
            }
            // 判断依赖字段的 options 中是否有 checkField 字段
            dependOptions = object[dependStr].options as formOption[];

            for (let i = 0; i < dependOptions.length; i++) {
                let option = object?dependOptions[i]:null;
                if ( option?.checkField ){
                    hasCheckField = true;
                    checkFieldStr = option.checkField;
                    break;
                }
            }
            if ( !hasCheckField ){
                return `form item ${field} depend field ${dependStr} has no checkField`;
            }

        }

        // 判断是否有 reCheckField 有则使用该字段的值进行规则验证
        if ( formItemData.reCheckField ){
            checkFieldStr = formItemData.reCheckField;
        }



        // 判断是否有 rules 规则
        if(isMustMatchRule){
            if(fieldCheck.getRuleItem(checkFieldStr)){
                return `form item ${field} has no rules`;
            }
        }

        return '';
    }

    /**
     * 初始化表单项数据
     * @param { formObject } formObject 表单对象
     */
    static initFormItemData ( formObject: formObject ) {
        let keys = Object.keys(formObject);
        for(let i = 0; i < keys.length; i++){
            let key = keys[i];
            formObject[key].val = formObject[key].init;
            formObject[key].msg = '';
            formObject[key].state = FormVerify.formState_default;
            formObject[key].showText = '';
        }
    }


    // onLog函数
    public onLog: (msg: string) => void = (msg: string) => {
        console.log(msg);
    }

    /**
     * 检查表单项是否符合要求
     * @param {formObject} form 表单对象
     * @param isMustMatch 是否必须全部匹配到验证规则
     * @returns {boolean}
     */
    public checkForm (form: formObject, isMustMatch: boolean) :boolean {
        let r = true;
        let n_checkPass = 0,
            n_checkTotal = 0;
        let tmpOption: formOption | undefined = {} as formOption;
        let msg = '';
        let logStr = '';
        let logHandle = (_str:string )=>{
            try {
                this.onLog(_str);
            }catch (e) {
                console.log(_str)
                console.error(e);
            }
        };
        for (const fieldKey in form) {
            let formItem = form[fieldKey];
            logStr = '';
            if(!formItem){
                continue;
            }
            let depend: formItemData | undefined = form[formItem.depend || ''];
            let checkField = fieldKey;
            let tmpInd = -1;

            n_checkTotal++;

            if(formItem.reCheckField){
                checkField = formItem.reCheckField;
            }

            // 禁用值判断 array
            if(formItem.disables){

                if(formItem.disables.find(item=>item === formItem.val)){
                    formItem.msg = '该项内容不合法';
                    formItem.state = this.formState_notPass;
                    r = false;
                }
            }

            // 枚举值判断
            if(formItem.options){
                // 有枚举字段,只判断是否在枚举中
                // console.log(`检测枚举字段:${checkField},值:${formItem.val}`);
                tmpOption = formItem.options.find(item=>item.value == formItem.val);
                // tmpInd = formItem.options.findIndex(item=>item.value == formItem.val);
                if ( tmpOption )
                {
                    if (tmpOption.disabled)
                    {
                        logStr = `项${fieldKey} 检测枚举字段:${checkField},值:${formItem.val}被禁用`;
                        formItem.msg = '该选项已经被禁用';
                        formItem.state = this.formState_notPass;
                        r = false;
                    }
                    // 检查通过
                    formItem.state = this.formState_pass;
                }else{
                    logStr = `项${fieldKey} 检测枚举字段:${checkField},值:${formItem.val}不在范围内`;
                    this.onLog(`检测枚举字段:${checkField},值:${formItem.val}不在范围内`)
                    formItem.msg = '选项不在范围内';
                    formItem.state = this.formState_notPass;
                    r = false;
                }


                // 枚举值判断完毕,继续下一个字段
                n_checkPass++;
                continue;
            }

            // 依赖字段判断
            if(depend){
                depend = depend as formItemData;
                if(depend.options){
                    // 依赖的对象有枚举类型,检查该枚举类型是否有有检测值
                    let optionItem = depend.options.find(item=>item.value == formItem.val);
                    if(!optionItem){
                        logStr = `检测依赖字段:${depend},但是选项${ formItem.val }不在范围内`;
                        depend.msg = '选项不在范围内';
                        formItem.msg = '该值依赖项输入异常';

                        r = false;
                        // continue;
                    }
                    optionItem = optionItem as formOption;
                    if(optionItem.checkField){
                        // console.log(`采用依赖项的检测字段${optionItem.checkField}`)
                        checkField = optionItem.checkField;
                    }

                }else{
                    logStr = `项${fieldKey} 依赖表单项:${depend},没有对应 options 内容`;
                    r = false;
                }
                if(!r)
                {
                    logStr = `项${fieldKey} 检测依赖字段:${depend},但是选项${ formItem.val }不在范围内`;
                    depend.msg = '该项依赖项输入异常';
                    formItem.msg = '该值依赖项输入异常';
                    formItem.state = this.formState_notPass;
                }

            }

            // 使用验证规则进行
            formItem.msg = this.fieldCheck.verify({
                [checkField]:formItem.val,
            })


            if (formItem.msg)
            {
                r = false;
                logStr = `检测字段:${checkField},值:${formItem.val}不符合规则,${formItem.msg}`;
            }

            if ( logStr ) logHandle(logStr);

            if(r){
                n_checkPass++;
                formItem.state = this.formState_pass;
                formItem.msg = '';
            }else{
                formItem.state = this.formState_notPass;
            }
        }

        msg = `检查表单项通过率:${n_checkPass}/${n_checkTotal}`;
        console.log(msg);
        return r;
    }

    /**
     * 验证当前的表单是否符合要求
     * @param [isMustMatch] 是否必须全部匹配到验证规则
     */
    public check (isMustMatch:boolean = false) : boolean {
        return this.checkForm(this.formData as formObject, isMustMatch);
    }

}

export default FormVerify;
