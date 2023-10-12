import FieldCheck from "./fieldCheck";

let hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
}

/**
 * @typedef {object} formItemData 表单项数据
 * @property {string} [val] 表单项值
 * @property {string} [msg] 表单项错误信息
 * @property {number} [state] 表单项状态 0 通过 1 通过 2 不通过
 * @property {string} [showText] 表单项显示文本,用于在某些
 * @property {string} [label] 表单项显示文本
 * @property {string} [init] 表单项初始值
 * @property {Array} [options] 表单项枚举值
 * @property {string} [depend] 依赖字段, 该项存在将使用依赖字段的option中的checkField字段进行匹配验证规则
 * @property {string} [reCheckField] 该表单项用于匹配规则的字段
 * @property {Array} [disables] 禁用项
 */


/**
 * @class FormItem 表单验证类
 * @description 表单项
 * @param {object} object 表单项数据
 * @param {FieldCheck} [fieldCheck] 字段验证对象
 * @param {object} [option] 配置项
 */
class FormItem {
    formData;
    /**
     * @type {FieldCheck} 字段验证对象
     */
    fieldCheck;
    // 表单状态 默认 0 通过 1 不通过 2
    formState_default = 0;
    formState_pass = 1;
    formState_notPass = 2;

    defaultOption = {
        isMustMatchRule: false,// 表单字段是否必须匹配到验证规则
    }
    option = {};
    /**
     *
     * @param object
     * @param {FieldCheck} [fieldCheck] 字段验证对象
     * @param {object} [option] 配置项
     */
    constructor(object, fieldCheck, option) {
        this.fieldCheck = fieldCheck || new FieldCheck();
        // 合并配置项
        this.option = Object.assign(this.defaultOption, option);
        let errMsg;
        // 拿出其中的每一项来构建对应的表单项
        for (let key in object) {
            this[key] = object[key];
            // 验证表单项是否符合要求,不符合要求则抛出错误
            errMsg = FormItem.buildFormItem(object, key, object[key], this.fieldCheck, this.option.isMustMatchRule);
            if (errMsg) {
                throw new Error(`表单项${key}不符合要求,err:${errMsg}`);
            }
        }
        this.formData = object;
    }
    static isObject (obj) {
        return obj !== null && typeof obj === 'object'
    }

    /**
     * 检查表单项是否符合要求
     * @param { object } object 表单项数据
     * @param { string } field 字段名
     * @param { formItemData } formItemData 表单项数据
     * @param { FieldCheck } fieldCheck 字段验证对象
     * @param { boolean } isMustMatchRule 表单字段是否必须匹配到验证规则
     * @returns { string } errMsg 错误信息
     */
    static buildFormItem(object, field, formItemData, fieldCheck, isMustMatchRule) {
        if ( !FormItem.isObject(formItemData) ){
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
        formItemData.state = formItemData.state || FormData.formState_default;
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
                if ( disables && disables.indexOf(option.key) !== -1 ){
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
            // 判断依赖字段是否存在
            if ( !object[formItemData.depend] ){
                return `form item ${field} depend field ${formItemData.depend} but the field not exist`;
            }
            // 判断依赖字段的 option 是否存在
            if ( !object[formItemData.depend].options ){
                return `form item ${field} depend field ${formItemData.depend} has no options`;
            }
            // 判断依赖字段的 options 中是否有 checkField 字段
            let hasCheckField = false;
            for (let i = 0; i < object[formItemData.depend].options.length; i++) {
                let option = object[formItemData.depend].options[i];
                if ( option.checkField ){
                    hasCheckField = true;
                    checkFieldStr = option.checkField;
                    break;
                }
            }
            if ( !hasCheckField ){
                return `form item ${field} depend field ${formItemData.depend} has no checkField`;
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
    static initFormItemData ( formObject ) {
        let keys = Object.keys(formObject);
        for(let i = 0; i < keys.length; i++){
            let key = keys[i];
            formObject[key].val = formObject[key].init;
            formObject[key].msg = '';
            formObject[key].state = FormData.formState_default;
            formObject[key].showText = '';
        }
    }


    /**
     * 检查表单项是否符合要求
     * @param {object} form 表单对象
     * @param isMustMatch 是否必须全部匹配到验证规则
     * @returns {boolean}
     */
    checkForm (form, isMustMatch) {
        let r = true;
        let n_checkPass = 0,
            n_checkTotal = 0;
        let msg = '';
        for (const fieldKey in form) {
            let formItem = form[fieldKey];
            let depend = form[formItem.depend];
            let checkField = fieldKey;
            let tmpInd = -1;

            n_checkTotal++;

            if(formItem.reCheckField){
                checkField = formItem.reCheckField;
            }

            // 禁用值判断 array
            if(formItem.disables){
                if(formItem.disables.indexOf(formItem.val) !== -1){
                    formItem.msg = '该项内容不合法';
                    r = false;
                }
            }

            // 枚举值判断
            if(formItem.options){
                // 有枚举字段,只判断是否在枚举中
                // console.log(`检测枚举字段:${checkField},值:${formItem.val}`);
                tmpInd = formItem.options.findIndex(item=>item.value == formItem.val);
                if(tmpInd === -1){
                    console.log(`检测枚举字段:${checkField},值:${formItem.val}不在范围内`);
                    formItem.msg = '选项不在范围内';
                    formItem.state = 1;
                    r = false;
                }else{
                    // 判断值是否为禁用项
                    if(formItem.options[tmpInd].disabled){
                        formItem.msg = '该选项已经被禁用';
                        r = false;
                    }
                }
                // 枚举值判断完毕,继续下一个字段
                n_checkPass++;
                continue;
            }

            // 依赖字段判断
            if(depend){
                if(depend.options){
                    // 依赖的对象有枚举类型,检查该枚举类型是否有有检测值
                    let optionItem = depend.options.find(item=>item.value == depend.val);
                    if(!optionItem){
                        depend.msg = '选项不在范围内';
                        formItem.msg = '该值依赖项输入异常';
                        r = false;
                        // continue;
                    }
                    if(optionItem.checkField){
                        // console.log(`采用依赖项的检测字段${optionItem.checkField}`)
                        checkField = optionItem.checkField;
                    }

                }else{
                    r = false;
                }
                if(!r)
                {
                    depend.msg = '该项依赖项输入异常';
                    formItem.msg = '该值依赖项输入异常';
                }
            }

            // 使用验证规则进行
            formItem.msg = this.fieldCheck.verify({
                [checkField]:formItem.val,
            })


            if (formItem.msg) r = false;
            if(r){
                n_checkPass++;
                formItem.state = this.formState_pass
            }else{
                formItem.state = this.formState_notPass
            }
        }

        msg = `检查表单项通过率:${n_checkPass}/${n_checkTotal}`;
        console.log(msg);
        return r;
    }

}

export default FormItem;
