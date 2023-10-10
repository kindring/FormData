/**
 * 表单字段验证库
 * author:kindring
 * date:2023/10/08
 */

/**
 * @typedef {string} errMessage 错误信息
 */


/**
 * @typedef { Array<string | RegExp> } checkFields 验证字段匹配项
 */
/**
 * @typedef {Object} checkRule 规则对象
 * @property {string} [type] 类型
 * @property {number} [min] 最小值
 * @property {number} [max] 最大值
 * @property {number} [length] 长度
 * @property {RegExp} [regex] 正则表达式
 * @property {errMessage} [message] 错误信息
 * @property {boolean} [require] 是否必须
 * @property {number} [minLength] 最小长度
 * @property {number} [maxLength] 最大长度
 * @property {validatorFunction} [validator] 自定义验证函数
 */

/**
 * @typedef {function} validatorFunction 自定义验证函数
 * @param {any} value 需要验证的值
 * @returns {string} 返回错误信息或者 null
 */

/**
 * @typedef {Object} ruleItem 验证规则对象
 * @property {Array<string>} checkFields 需要验证的字段
 * @property {Array<validatorFunction | checkRule>} rules 验证规则
 */

/**
 * @typedef {number} checkCode 验证码
 * @property {1} code_pass 验证通过
 * @property {2} code_notPass 验证不通过
 * @property {3} code_notMatch 未匹配到验证规则
 */


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
    #code_pass = 1;
    // 未通过
    #code_notPass = 2;

    // 无法匹配到验证规则
    #code_notMatch = 3;

    /**
     * @type {Array< ruleItem >}
     */
    #ruleItems = [];
    constructor() {
        this.#ruleItems = [];
    }

    /**
     * 判断值是否定义
     * @param v
     * @returns {boolean}
     * @private
     */
    _isDef (v) {
        return v !== undefined && v !== null
    }
    _toString = Object.prototype.toString;
    /**
     * 判断是否为空
     * @param v
     * @returns {boolean}
     */
    _isEmpty(v){
        return v === undefined || v === '';
    }
    _isRegExp (v) {
        return this._toString.call(v) === '[object RegExp]'
    }


    /**
     * 构建验证规则
     * @param {Array<string | RegExp>} checkFields 需要验证的字段
     * @param {Array<validatorFunction | checkRule>} ruleArr 验证规则
     * @returns {ruleItem} 验证规则对象
     */
    buildRuleItem( checkFields , ruleArr) {
        //  检测checkFields是否为数组
        //  检测ruleArr是否为数组
        if(!Array.isArray(checkFields) || !Array.isArray(ruleArr)){
            throw new Error('checkFields or ruleArr is not Array');
        }
        //  检测checkFields中的每一项是否为字符串或者正则
        for(let field of checkFields){
            if(typeof field !== 'string' && !(field instanceof RegExp)){
                throw new Error('checkFields item is not string or RegExp');
            }
        }
        //  检测ruleArr中的每一项是否为函数或者对象
        for(let rule of ruleArr){
            if(typeof rule !== 'function' && typeof rule !== 'object'){
                throw new Error('ruleArr item is not function or object');
            }
        }
        /**
         * @type {ruleItem}
         */
        let ruleItem = {
            checkFields: checkFields,
            rules: ruleArr
        }
        // this.ruleItems = this.ruleItems.push(ruleItem);
        return ruleItem;
    }

    /**
     * 添加一条验证规则
     * @param { string } ruleName 验证规则名,用于区分
     * @param { Array<string | RegExp> } checkFields 用于匹配字段的字符或者正则数组
     * @param { Array<validatorFunction | checkRule> } ruleArr 验证规则
     * @returns { FieldCheck } 返回当前对象
     */
    addRuleItem( ruleName, checkFields , ruleArr) {
        let ruleItem = this.buildRuleItem(checkFields,ruleArr);
        this.#ruleItems.push(ruleItem);
        return this;
    }

    /**
     * 获取验证规则
     * @param { string } field 字段名
     * @returns { ruleItem } 验证规则
     */
    getRuleItem(field){
        let ruleItem = this.#ruleItems.find(item=>{
            // 判断是否为正则
            for (const _matchKey of item.checkFields) {
                // 判断是否为正则
                if(_matchKey instanceof RegExp){
                    // console.log(`使用正则进行匹配,${_matchKey.test(key)}`);
                    if(_matchKey.test(field)){
                        // console.log(`通过正则匹配规则成功,${_matchKey.test(key)}`);
                        return true;
                    }
                }else{
                    // console.log(`比较是否全等,${_matchKey} === ${key} ?${_matchKey === key}`);
                    if(_matchKey === field){
                        // console.log(`通过字符${_matchKey}匹配成功`);
                        return true;
                    };
                }
            }
            return false;
        });
        return ruleItem;
    }

    /**
     * 检查字段是否符合规则
     * @param field 字段名
     * @param value 字段值
     * @returns {Array<checkCode | errMessage>} 错误码或错误信息
     */
    checkField(field, value){
        let ruleItem = this.getRuleItem(field);
        if(!ruleItem || !ruleItem.rules){
            return [this.#code_notMatch];
        }
        // 判断值是否为undefined
        if(value === undefined){
            return [this.#code_notPass, '字段值为undefined'];
        }
        // 开始匹配规则
        for(let _rule of ruleItem.rules ){
            // 判断是否有自定义验证函数
            if(typeof _rule === 'function'){
                let  _msg = _rule(value);
                // console.log(_msg)
                if(_msg){
                    return [this.#code_notPass,_msg]
                }
            }

            // 判断类型
            if(_rule.type && typeof value !== _rule.type){
                return [this.#code_notPass, _rule.message]
            }

            // 判断是否为必填项
            if(_rule.require && this._isEmpty(value)){
                return [this.#code_notPass, _rule.message]
            }

            // 判断最小值
            if(_rule.min && value < _rule.min){
                return [this.#code_notPass, _rule.message]
            }

            // 判断最大值
            if(_rule.max && value > _rule.max){
                return [this.#code_notPass, _rule.message]
            }

            // 判断值是否达到指定长度
            if(_rule.length && value.length && value.length !== _rule.length){
                return [this.#code_notPass, _rule.message]
            }

            // 判断最小长度
            if(_rule.minLength && value.length && value.length < _rule.minLength){
                return [this.#code_notPass, _rule.message]
            }

            // 判断最大长度
            if(_rule.maxLength && value.length && value.length > _rule.maxLength){
                return [this.#code_notPass, _rule.message]
            }

            // 判断是否符合正则
            if(_rule.regex && !_rule.regex.test(value)){
                return [this.#code_notPass, _rule.message]
            }

        }

        return [this.#code_pass]

    }

    /**
     * 检查表单是否符合规则
     * @param { Object } formObject 需要检验的表单项 字段:值
     * @param [isMustMatch] 是否强制要求匹配规则
     * @returns { errMessage } 错误码或错误信息
     */
    verify(formObject, isMustMatch){
        for (const _oKey in formObject) {
            let value = formObject[_oKey];
            let r = this.checkField(_oKey,value);
            if(r[0] === this.#code_notPass){
                return r[1]
            }else if(isMustMatch && r[0] === this.#code_notMatch){
                return `字段没有对应匹配项`
            }
        }
    }
}

export default FieldCheck;
