## Classes

<dl>
<dt><a href="#FieldCheck">FieldCheck</a></dt>
<dd></dd>
<dt><a href="#FormVerify">FormVerify</a></dt>
<dd><p>FormItem 表单验证类</p></dd>
</dl>

<a name="FieldCheck"></a>

## FieldCheck
**Kind**: global class  
**Properties**

| Name        | Type                                | Description       |
|-------------|-------------------------------------|-------------------|
| ruleItems   | <code>Array.&lt;ruleItem&gt;</code> | <p>验证规则</p>       |
| addRuleItem | <code>function</code>               | <p>添加一条验证规则</p>   |
| verify      | <code>function</code>               | <p>检查表单是否符合规则</p> |


* [FieldCheck](#FieldCheck)
    * [new FieldCheck()](#new_FieldCheck_new)
    * [._isEmpty(v)](#FieldCheck+_isEmpty)
    * [._isRegExp(v)](#FieldCheck+_isRegExp)
    * [.buildRuleItem(checkFields, ruleArr)](#FieldCheck+buildRuleItem) ⇒ <code>ruleItem</code>
    * [.addRuleItem(ruleName, checkFields, ruleArr)](#FieldCheck+addRuleItem) ⇒
    * [.getRuleItem(field)](#FieldCheck+getRuleItem) ⇒
    * [.checkField(field, value)](#FieldCheck+checkField) ⇒ <code>Array.&lt;(checkCode\|?errMessage)&gt;</code>
    * [.verify(formObject, [isMustMatch])](#FieldCheck+verify) ⇒

<a name="new_FieldCheck_new"></a>

### new FieldCheck()
<p>表单字段验证类</p>

**Example**  
```js
let fieldCheck = new FieldCheck();
fieldCheck.addRuleItem('rule1',['name'],[
   {
   type: 'string',
   minLength: 2,
   maxLength: 10,
   message: '姓名必须为2-10个字符'
   }
   ]);
   fieldCheck.addRuleItem('rule2',['age'],[
   {
   type: 'number',
   min: 18,
   max: 100,
   message: '年龄必须为18-100岁'
   }]);
   let errMsg = fieldCheck.verify({
   name: 'kindring',
   age: 18});
   console.log(errMsg);
   // null
   let errMsg = fieldCheck.verify({
   name: 'kindring',
   age: 17});
   console.log(errMsg);
   // 年龄必须为18-100岁
```
<a name="FieldCheck+_isEmpty"></a>

### fieldCheck.\_isEmpty(v)
<p>判断是否为空</p>

**Kind**: instance method of [<code>FieldCheck</code>](#FieldCheck)  

| Param | Description  |
|-------|--------------|
| v     | <p>要检验的值</p> |

<a name="FieldCheck+_isRegExp"></a>

### fieldCheck.\_isRegExp(v)
<p>判断是否为正则</p>

**Kind**: instance method of [<code>FieldCheck</code>](#FieldCheck)  

| Param | Description  |
|-------|--------------|
| v     | <p>要检验的值</p> |

<a name="FieldCheck+buildRuleItem"></a>

### fieldCheck.buildRuleItem(checkFields, ruleArr) ⇒ <code>ruleItem</code>
<p>构建验证规则</p>

**Kind**: instance method of [<code>FieldCheck</code>](#FieldCheck)  
**Returns**: <code>ruleItem</code> - <p>验证规则对象</p>  

| Param       | Type                                                      | Description    |
|-------------|-----------------------------------------------------------|----------------|
| checkFields | <code>Array.&lt;(string\|RegExp)&gt;</code>               | <p>需要验证的字段</p> |
| ruleArr     | <code>Array.&lt;(validatorFunction\|checkRule)&gt;</code> | <p>验证规则</p>    |

<a name="FieldCheck+addRuleItem"></a>

### fieldCheck.addRuleItem(ruleName, checkFields, ruleArr) ⇒
<p>添加一条验证规则</p>

**Kind**: instance method of [<code>FieldCheck</code>](#FieldCheck)  
**Returns**: <p>返回当前对象</p>  

| Param       | Description            |
|-------------|------------------------|
| ruleName    | <p>验证规则名,用于区分</p>      |
| checkFields | <p>用于匹配字段的字符或者正则数组</p> |
| ruleArr     | <p>验证规则</p>            |

<a name="FieldCheck+getRuleItem"></a>

### fieldCheck.getRuleItem(field) ⇒
<p>获取验证规则</p>

**Kind**: instance method of [<code>FieldCheck</code>](#FieldCheck)  
**Returns**: <p>验证规则</p>  

| Param | Description |
|-------|-------------|
| field | <p>字段名</p>  |

<a name="FieldCheck+checkField"></a>

### fieldCheck.checkField(field, value) ⇒ <code>Array.&lt;(checkCode\|?errMessage)&gt;</code>
<p>检查字段是否符合规则</p>

**Kind**: instance method of [<code>FieldCheck</code>](#FieldCheck)  
**Returns**: <code>Array.&lt;(checkCode\|?errMessage)&gt;</code> - <p>错误码或错误信息</p>  

| Param | Description |
|-------|-------------|
| field | <p>字段名</p>  |
| value | <p>字段值</p>  |

<a name="FieldCheck+verify"></a>

### fieldCheck.verify(formObject, [isMustMatch]) ⇒
<p>检查表单是否符合规则</p>

**Kind**: instance method of [<code>FieldCheck</code>](#FieldCheck)  
**Returns**: <p>errMessage 错误码或错误信息</p>  

| Param         | Type                    | Default            | Description          |
|---------------|-------------------------|--------------------|----------------------|
| formObject    | <code>verifyForm</code> |                    | <p>需要检验的表单项 字段:值</p> |
| [isMustMatch] |                         | <code>false</code> | <p>是否强制要求匹配规则</p>    |

<a name="FormVerify"></a>

## FormVerify
<p>FormItem 表单验证类</p>

**Kind**: global class  

* [FormVerify](#FormVerify)
    * [new FormVerify(formObject, [fieldCheck], [option])](#new_FormVerify_new)
    * _instance_
        * [.checkForm(form, isMustMatch)](#FormVerify+checkForm) ⇒ <code>boolean</code>
        * [.check([isMustMatch])](#FormVerify+check)
    * _static_
        * [.buildFormItem(object, field, formItemData, fieldCheck, isMustMatchRule)](#FormVerify.buildFormItem) ⇒
        * [.initFormItemData(formObject)](#FormVerify.initFormItemData)

<a name="new_FormVerify_new"></a>

### `new FormVerify(formObject, [fieldCheck], [option])`
<p>表单项</p>


| Param        | Type                                   | Description   |
|--------------|----------------------------------------|---------------|
| formObject   | <code>formObject</code>                | <p>表单项数据</p>  |
| [fieldCheck] | [<code>FieldCheck</code>](#FieldCheck) | <p>字段验证对象</p> |
| [option]     | <code>object</code>                    | <p>配置项</p>    |

<a name="FormVerify+checkForm"></a>

### formVerify.checkForm(form, isMustMatch) ⇒ <code>boolean</code>
<p>检查表单项是否符合要求</p>

**Kind**: instance method of [<code>FormVerify</code>](#FormVerify)  

| Param       | Type                    | Description          |
|-------------|-------------------------|----------------------|
| form        | <code>formObject</code> | <p>表单对象</p>          |
| isMustMatch |                         | <p>是否必须全部匹配到验证规则</p> |

<a name="FormVerify+check"></a>

### formVerify.check([isMustMatch])
<p>验证当前的表单是否符合要求</p>

**Kind**: instance method of [<code>FormVerify</code>](#FormVerify)  

| Param         | Default            | Description          |
|---------------|--------------------|----------------------|
| [isMustMatch] | <code>false</code> | <p>是否必须全部匹配到验证规则</p> |

<a name="FormVerify.buildFormItem"></a>

### FormVerify.buildFormItem(object, field, formItemData, fieldCheck, isMustMatchRule) ⇒
<p>检查表单项是否符合要求</p>

**Kind**: static method of [<code>FormVerify</code>](#FormVerify)  
**Returns**: <p>errMsg 错误信息</p>  

| Param           | Description            |
|-----------------|------------------------|
| object          | <p>表单项数据</p>           |
| field           | <p>字段名</p>             |
| formItemData    | <p>表单项数据</p>           |
| fieldCheck      | <p>字段验证对象</p>          |
| isMustMatchRule | <p>表单字段是否必须匹配到验证规则</p> |

<a name="FormVerify.initFormItemData"></a>

### FormVerify.initFormItemData(formObject)
<p>初始化表单项数据</p>

**Kind**: static method of [<code>FormVerify</code>](#FormVerify)  

| Param      | Type                    | Description |
|------------|-------------------------|-------------|
| formObject | <code>formObject</code> | <p>表单对象</p> |

