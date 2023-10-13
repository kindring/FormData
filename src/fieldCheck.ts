"use strict";


/**
 * 表单字段验证库
 * author:kindring
 * date:2023/10/08
 */


// 在 types 中定义的 enum 在此处使用会导致异常

/**
 * 规则匹配结果
 * @property code_pass 验证通过
 * @property code_notPass 验证未通过
 * @property code_notMatch 未匹配到规则
 */
enum checkCode {
    code_pass = 1,
    code_notPass,
    code_notMatch
}

/**
 * @class FieldCheck
 * @description 表单字段验证类
 * @property {Array<ruleItem>} ruleItems 验证规则
 * @property {function} addRuleItem 添加一条验证规则
 * @property {function} verify 检查表单是否符合规则
 * @example
 * let fieldCheck = new FieldCheck();
 * fieldCheck.addRuleItem('rule1',['name'],[
 *    {
 *    type: 'string',
 *    minLength: 2,
 *    maxLength: 10,
 *    message: '姓名必须为2-10个字符'
 *    }
 *    ]);
 *    fieldCheck.addRuleItem('rule2',['age'],[
 *    {
 *    type: 'number',
 *    min: 18,
 *    max: 100,
 *    message: '年龄必须为18-100岁'
 *    }]);
 *    let errMsg = fieldCheck.verify({
 *    name: 'kindring',
 *    age: 18});
 *    console.log(errMsg);
 *    // null
 *    let errMsg = fieldCheck.verify({
 *    name: 'kindring',
 *    age: 17});
 *    console.log(errMsg);
 *    // 年龄必须为18-100岁
 */
class FieldCheck{


    // 通过
    code_pass = checkCode.code_pass;
    // 未通过
    code_notPass:number = checkCode.code_notPass;

    // 无法匹配到验证规则
    code_notMatch = checkCode.code_notMatch;

    /**
     * @type {Array< ruleItem >}
     */
    #ruleItems: ruleItem[] = [];


    constructor(ruleItems?:Array< ruleItem >) {
        this.#ruleItems = [];
        if(ruleItems && Array.isArray(ruleItems)){
            // 使用 addRuleItem 添加规则
            for (const ruleItem of ruleItems) {
                this.addRuleItem(ruleItem.name || "", ruleItem.checkFields, ruleItem.rules);
            }
        }
    }

    /**
     * 判断值是否定义
     * @param v
     * @returns {boolean}
     * @private
     */
    _isDef (v:any) {
        return v !== undefined && v !== null
    }
    _toString = Object.prototype.toString;
    /**
     * 判断是否为空
     * @param v 要检验的值
     */
    _isEmpty(v:any){
        return v === undefined || v === '';
    }

    /**
     * 判断是否为正则
     * @param v 要检验的值
     */
    _isRegExp (v:any) {
        return this._toString.call(v) === '[object RegExp]'
    }


    /**
     * 构建验证规则
     * @param {Array<string | RegExp>} checkFields 需要验证的字段
     * @param {Array<validatorFunction | checkRule>} ruleArr 验证规则
     * @returns {ruleItem} 验证规则对象
     */
    buildRuleItem(name: string,
                  checkFields: checkFields ,
                  ruleArr:Array<validatorFunction | checkRule> ) : ruleItem
    {
        //  检测checkFields是否为数组
        //  检测ruleArr是否为数组
        if(!Array.isArray(checkFields) || !Array.isArray(ruleArr)){
            throw new Error('checkFields or ruleArr is not Array');
        }
        //  检测checkFields中的每一项是否为字符串或者正则
        for(let field of checkFields){
            if(typeof field !== 'string' && !this._isRegExp(field)){
                throw new Error('checkFields item is not string or RegExp');
            }
        }
        //  检测ruleArr中的每一项是否为函数或者对象
        for(let rule of ruleArr){
            if(typeof rule !== 'function' && typeof rule !== 'object'){
                throw new Error('ruleArr item is not function or object');
            }
        }
        let ruleItem:ruleItem = {
            name: name || "",
            checkFields: checkFields,
            rules: ruleArr
        }
        // this.ruleItems = this.ruleItems.push(ruleItem);
        return ruleItem;
    }

    /**
     * 添加一条验证规则
     * @param ruleName 验证规则名,用于区分
     * @param checkFields 用于匹配字段的字符或者正则数组
     * @param ruleArr 验证规则
     * @returns  返回当前对象
     */
    addRuleItem(
        ruleName: string,
        checkFields: checkFields,
        ruleArr: Array<validatorFunction | checkRule>) : this
    {
        let ruleItem = this.buildRuleItem(ruleName, checkFields, ruleArr);
        this.#ruleItems.push(ruleItem);
        return this;
    }



    /**
     * 获取验证规则
     * @param field 字段名
     * @returns 验证规则
     */
    getRuleItem(field:string):ruleItem | undefined{
        return this.#ruleItems.find(item => {
            // 判断是否为正则
            for (const _matchKey of item.checkFields) {
                // 判断是否为正则
                if (this._isRegExp(_matchKey)) {
                    // 确定为正则
                    let reg :RegExp = _matchKey as RegExp;
                    // console.log(`使用正则进行匹配,${_matchKey.test(key)}`);
                    if (reg.test(field)) {
                        // console.log(`通过正则匹配规则成功,${_matchKey.test(key)}`);
                        return true;
                    }
                } else {
                    // console.log(`比较是否全等,${_matchKey} === ${key} ?${_matchKey === key}`);
                    if (_matchKey === field) {
                        // console.log(`通过字符${_matchKey}匹配成功`);
                        return true;
                    }

                }
            }
            return false;
        });
    }

    /**
     * 检查字段是否符合规则
     * @param field 字段名
     * @param value 字段值
     * @returns {Array<checkCode | ?errMessage>} 错误码或错误信息
     */
    checkField(field: string, value: any):
        [ checkCode, errMessage ] | [ checkCode ]
    {
        let ruleItem = this.getRuleItem(field);
        if(!ruleItem || !ruleItem.rules){
            return [this.code_notMatch];
        }

        // 判断值是否为undefined
        if(value === undefined){
            return [this.code_notPass, '字段值为undefined'];
        }
        // 开始匹配规则
        for(let _rule of ruleItem.rules ){
            // 判断是否有自定义验证函数
            if(typeof _rule === 'function'){
                let  _msg = _rule(value);
                // console.log(_msg)
                if(_msg){
                    return [this.code_notPass,_msg]
                }
            }
            let rule = _rule as checkRule;
            // 判断类型
            if(rule.type && typeof value !== rule.type){
                return [this.code_notPass, rule.message]
            }

            // 判断是否为必填项
            if(rule.require && this._isEmpty(value)){
                return [this.code_notPass, rule.message]
            }

            // 判断最小值
            if(rule.min && value < rule.min){
                return [this.code_notPass, rule.message]
            }

            // 判断最大值
            if(rule.max && value > rule.max){
                return [this.code_notPass, rule.message]
            }

            // 判断值是否达到指定长度
            if(rule.length && value.length && value.length !== rule.length){
                return [this.code_notPass, rule.message]
            }

            // 判断最小长度
            if(rule.minLength && value.length && value.length < rule.minLength){
                return [this.code_notPass, rule.message]
            }

            // 判断最大长度
            if(rule.maxLength && value.length && value.length > rule.maxLength){
                return [this.code_notPass, rule.message]
            }

            // 判断是否符合正则
            if(rule.regex && !rule.regex.test(value)){
                return [this.code_notPass, rule.message]
            }

        }

        return [this.code_pass]

    }

    /**
     * 检查表单是否符合规则
     * @param {verifyForm} formObject 需要检验的表单项 字段:值
     * @param [isMustMatch] 是否强制要求匹配规则
     * @returns errMessage 错误码或错误信息
     */
    verify(formObject: verifyForm, isMustMatch:boolean = false){
        for (const _oKey in formObject) {
            let value = formObject[_oKey];
            let r = this.checkField(_oKey,value);
            if(r[0] === this.code_notPass){
                return r[1]
            }else if(isMustMatch && r[0] === this.code_notMatch){
                return `字段没有对应匹配项`
            }
        }
    }
}

export default FieldCheck;
