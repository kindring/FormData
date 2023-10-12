## Classes

<dl>
<dt><a href="#FieldCheck">FieldCheck</a></dt>
<dd></dd>
<dt><a href="#FieldCheck">FieldCheck</a></dt>
<dd></dd>
<dt><a href="#FormItem">FormItem</a></dt>
<dd><p>FormItem 表单验证类</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#errMessage">errMessage</a> : <code>string</code></dt>
<dd><p>错误信息</p>
</dd>
<dt><a href="#checkFields">checkFields</a> : <code>Array.&lt;(string|RegExp)&gt;</code></dt>
<dd><p>验证字段匹配项</p>
</dd>
<dt><a href="#checkRule">checkRule</a> : <code>Object</code></dt>
<dd><p>规则对象</p>
</dd>
<dt><a href="#validatorFunction">validatorFunction</a> ⇒ <code>string</code></dt>
<dd><p>自定义验证函数</p>
</dd>
<dt><a href="#ruleItem">ruleItem</a> : <code>Object</code></dt>
<dd><p>验证规则对象</p>
</dd>
<dt><a href="#checkCode">checkCode</a> : <code>number</code></dt>
<dd><p>验证码</p>
</dd>
<dt><a href="#formItemData">formItemData</a> : <code>object</code></dt>
<dd><p>表单项数据</p>
</dd>
</dl>

<a name="FieldCheck"></a>

## FieldCheck
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| ruleItems | [<code>Array.&lt;ruleItem&gt;</code>](#ruleItem) | 验证规则 |
| addRuleItem | <code>function</code> | 添加一条验证规则 |
| verify | <code>function</code> | 检查表单是否符合规则 |


* [FieldCheck](#FieldCheck)
    * [new FieldCheck()](#new_FieldCheck_new)
    * [new FieldCheck([ruleItems])](#new_FieldCheck_new)
    * [._isEmpty(v)](#FieldCheck+_isEmpty) ⇒ <code>boolean</code>
    * [.buildRuleItem(checkFields, ruleArr)](#FieldCheck+buildRuleItem) ⇒ [<code>ruleItem</code>](#ruleItem)
    * [.addRuleItem(ruleName, checkFields, ruleArr)](#FieldCheck+addRuleItem) ⇒ [<code>FieldCheck</code>](#FieldCheck)
    * [.getRuleItem(field)](#FieldCheck+getRuleItem) ⇒ [<code>ruleItem</code>](#ruleItem)
    * [.checkField(field, value)](#FieldCheck+checkField) ⇒ <code>Array.&lt;(checkCode\|errMessage)&gt;</code>
    * [.verify(formObject, [isMustMatch])](#FieldCheck+verify) ⇒ [<code>errMessage</code>](#errMessage)

<a name="new_FieldCheck_new"></a>

### new FieldCheck()
表单字段验证类

**Example**  
```js
let fieldCheck = new FieldCheck();fieldCheck.addRuleItem('rule1',['name'],[   {   type: 'string',   minLength: 2,   maxLength: 10,   message: '姓名必须为2-10个字符'   }   ]);   fieldCheck.addRuleItem('rule2',['age'],[   {   type: 'number',   min: 18,   max: 100,   message: '年龄必须为18-100岁'   }]);   let errMsg = fieldCheck.verify({   name: 'kindring',   age: 18});   console.log(errMsg);   // null   let errMsg = fieldCheck.verify({   name: 'kindring',   age: 17});   console.log(errMsg);   // 年龄必须为18-100岁
```
<a name="new_FieldCheck_new"></a>

### new FieldCheck([ruleItems])

| Param | Type | Description |
| --- | --- | --- |
| [ruleItems] | [<code>Array.&lt;ruleItem&gt;</code>](#ruleItem) | 验证规则数组 |

<a name="FieldCheck+_isEmpty"></a>

### fieldCheck.\_isEmpty(v) ⇒ <code>boolean</code>
判断是否为空

**Kind**: instance method of [<code>FieldCheck</code>](#FieldCheck)  

| Param |
| --- |
| v | 

<a name="FieldCheck+buildRuleItem"></a>

### fieldCheck.buildRuleItem(checkFields, ruleArr) ⇒ [<code>ruleItem</code>](#ruleItem)
构建验证规则

**Kind**: instance method of [<code>FieldCheck</code>](#FieldCheck)  
**Returns**: [<code>ruleItem</code>](#ruleItem) - 验证规则对象  

| Param | Type | Description |
| --- | --- | --- |
| checkFields | <code>Array.&lt;(string\|RegExp)&gt;</code> | 需要验证的字段 |
| ruleArr | <code>Array.&lt;(validatorFunction\|checkRule)&gt;</code> | 验证规则 |

<a name="FieldCheck+addRuleItem"></a>

### fieldCheck.addRuleItem(ruleName, checkFields, ruleArr) ⇒ [<code>FieldCheck</code>](#FieldCheck)
添加一条验证规则

**Kind**: instance method of [<code>FieldCheck</code>](#FieldCheck)  
**Returns**: [<code>FieldCheck</code>](#FieldCheck) - 返回当前对象  

| Param | Type | Description |
| --- | --- | --- |
| ruleName | <code>string</code> | 验证规则名,用于区分 |
| checkFields | <code>Array.&lt;(string\|RegExp)&gt;</code> | 用于匹配字段的字符或者正则数组 |
| ruleArr | <code>Array.&lt;(validatorFunction\|checkRule)&gt;</code> | 验证规则 |

<a name="FieldCheck+getRuleItem"></a>

### fieldCheck.getRuleItem(field) ⇒ [<code>ruleItem</code>](#ruleItem)
获取验证规则

**Kind**: instance method of [<code>FieldCheck</code>](#FieldCheck)  
**Returns**: [<code>ruleItem</code>](#ruleItem) - 验证规则  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>string</code> | 字段名 |

<a name="FieldCheck+checkField"></a>

### fieldCheck.checkField(field, value) ⇒ <code>Array.&lt;(checkCode\|errMessage)&gt;</code>
检查字段是否符合规则

**Kind**: instance method of [<code>FieldCheck</code>](#FieldCheck)  
**Returns**: <code>Array.&lt;(checkCode\|errMessage)&gt;</code> - 错误码或错误信息  

| Param | Description |
| --- | --- |
| field | 字段名 |
| value | 字段值 |

<a name="FieldCheck+verify"></a>

### fieldCheck.verify(formObject, [isMustMatch]) ⇒ [<code>errMessage</code>](#errMessage)
检查表单是否符合规则

**Kind**: instance method of [<code>FieldCheck</code>](#FieldCheck)  
**Returns**: [<code>errMessage</code>](#errMessage) - 错误码或错误信息  

| Param | Type | Description |
| --- | --- | --- |
| formObject | <code>Object</code> | 需要检验的表单项 字段:值 |
| [isMustMatch] |  | 是否强制要求匹配规则 |

<a name="FieldCheck"></a>

## FieldCheck
**Kind**: global class  

* [FieldCheck](#FieldCheck)
    * [new FieldCheck()](#new_FieldCheck_new)
    * [new FieldCheck([ruleItems])](#new_FieldCheck_new)
    * [._isEmpty(v)](#FieldCheck+_isEmpty) ⇒ <code>boolean</code>
    * [.buildRuleItem(checkFields, ruleArr)](#FieldCheck+buildRuleItem) ⇒ [<code>ruleItem</code>](#ruleItem)
    * [.addRuleItem(ruleName, checkFields, ruleArr)](#FieldCheck+addRuleItem) ⇒ [<code>FieldCheck</code>](#FieldCheck)
    * [.getRuleItem(field)](#FieldCheck+getRuleItem) ⇒ [<code>ruleItem</code>](#ruleItem)
    * [.checkField(field, value)](#FieldCheck+checkField) ⇒ <code>Array.&lt;(checkCode\|errMessage)&gt;</code>
    * [.verify(formObject, [isMustMatch])](#FieldCheck+verify) ⇒ [<code>errMessage</code>](#errMessage)

<a name="new_FieldCheck_new"></a>

### new FieldCheck()
表单字段验证类

**Example**  
```js
let fieldCheck = new FieldCheck();fieldCheck.addRuleItem('rule1',['name'],[   {   type: 'string',   minLength: 2,   maxLength: 10,   message: '姓名必须为2-10个字符'   }   ]);   fieldCheck.addRuleItem('rule2',['age'],[   {   type: 'number',   min: 18,   max: 100,   message: '年龄必须为18-100岁'   }]);   let errMsg = fieldCheck.verify({   name: 'kindring',   age: 18});   console.log(errMsg);   // null   let errMsg = fieldCheck.verify({   name: 'kindring',   age: 17});   console.log(errMsg);   // 年龄必须为18-100岁
```
<a name="new_FieldCheck_new"></a>

### new FieldCheck([ruleItems])

| Param | Type | Description |
| --- | --- | --- |
| [ruleItems] | [<code>Array.&lt;ruleItem&gt;</code>](#ruleItem) | 验证规则数组 |

<a name="FieldCheck+_isEmpty"></a>

### fieldCheck.\_isEmpty(v) ⇒ <code>boolean</code>
判断是否为空

**Kind**: instance method of [<code>FieldCheck</code>](#FieldCheck)  

| Param |
| --- |
| v | 

<a name="FieldCheck+buildRuleItem"></a>

### fieldCheck.buildRuleItem(checkFields, ruleArr) ⇒ [<code>ruleItem</code>](#ruleItem)
构建验证规则

**Kind**: instance method of [<code>FieldCheck</code>](#FieldCheck)  
**Returns**: [<code>ruleItem</code>](#ruleItem) - 验证规则对象  

| Param | Type | Description |
| --- | --- | --- |
| checkFields | <code>Array.&lt;(string\|RegExp)&gt;</code> | 需要验证的字段 |
| ruleArr | <code>Array.&lt;(validatorFunction\|checkRule)&gt;</code> | 验证规则 |

<a name="FieldCheck+addRuleItem"></a>

### fieldCheck.addRuleItem(ruleName, checkFields, ruleArr) ⇒ [<code>FieldCheck</code>](#FieldCheck)
添加一条验证规则

**Kind**: instance method of [<code>FieldCheck</code>](#FieldCheck)  
**Returns**: [<code>FieldCheck</code>](#FieldCheck) - 返回当前对象  

| Param | Type | Description |
| --- | --- | --- |
| ruleName | <code>string</code> | 验证规则名,用于区分 |
| checkFields | <code>Array.&lt;(string\|RegExp)&gt;</code> | 用于匹配字段的字符或者正则数组 |
| ruleArr | <code>Array.&lt;(validatorFunction\|checkRule)&gt;</code> | 验证规则 |

<a name="FieldCheck+getRuleItem"></a>

### fieldCheck.getRuleItem(field) ⇒ [<code>ruleItem</code>](#ruleItem)
获取验证规则

**Kind**: instance method of [<code>FieldCheck</code>](#FieldCheck)  
**Returns**: [<code>ruleItem</code>](#ruleItem) - 验证规则  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>string</code> | 字段名 |

<a name="FieldCheck+checkField"></a>

### fieldCheck.checkField(field, value) ⇒ <code>Array.&lt;(checkCode\|errMessage)&gt;</code>
检查字段是否符合规则

**Kind**: instance method of [<code>FieldCheck</code>](#FieldCheck)  
**Returns**: <code>Array.&lt;(checkCode\|errMessage)&gt;</code> - 错误码或错误信息  

| Param | Description |
| --- | --- |
| field | 字段名 |
| value | 字段值 |

<a name="FieldCheck+verify"></a>

### fieldCheck.verify(formObject, [isMustMatch]) ⇒ [<code>errMessage</code>](#errMessage)
检查表单是否符合规则

**Kind**: instance method of [<code>FieldCheck</code>](#FieldCheck)  
**Returns**: [<code>errMessage</code>](#errMessage) - 错误码或错误信息  

| Param | Type | Description |
| --- | --- | --- |
| formObject | <code>Object</code> | 需要检验的表单项 字段:值 |
| [isMustMatch] |  | 是否强制要求匹配规则 |

<a name="FormItem"></a>

## FormItem
FormItem 表单验证类

**Kind**: global class  

* [FormItem](#FormItem)
    * [new FormItem(object, [fieldCheck], [option])](#new_FormItem_new)
    * _instance_
        * [.fieldCheck](#FormItem+fieldCheck) : [<code>FieldCheck</code>](#FieldCheck)
        * [.checkForm(form, isMustMatch)](#FormItem+checkForm) ⇒ <code>boolean</code>
    * _static_
        * [.buildFormItem(object, field, formItemData, fieldCheck, isMustMatchRule)](#FormItem.buildFormItem) ⇒ <code>string</code>
        * [.initFormItemData(formObject)](#FormItem.initFormItemData)

<a name="new_FormItem_new"></a>

### new FormItem(object, [fieldCheck], [option])
表单项


| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | 表单项数据 |
| [fieldCheck] | [<code>FieldCheck</code>](#FieldCheck) | 字段验证对象 |
| [option] | <code>object</code> | 配置项 |

<a name="FormItem+fieldCheck"></a>

### formItem.fieldCheck : [<code>FieldCheck</code>](#FieldCheck)
字段验证对象

**Kind**: instance property of [<code>FormItem</code>](#FormItem)  
<a name="FormItem+checkForm"></a>

### formItem.checkForm(form, isMustMatch) ⇒ <code>boolean</code>
检查表单项是否符合要求

**Kind**: instance method of [<code>FormItem</code>](#FormItem)  

| Param | Type | Description |
| --- | --- | --- |
| form | <code>object</code> | 表单对象 |
| isMustMatch |  | 是否必须全部匹配到验证规则 |

<a name="FormItem.buildFormItem"></a>

### FormItem.buildFormItem(object, field, formItemData, fieldCheck, isMustMatchRule) ⇒ <code>string</code>
检查表单项是否符合要求

**Kind**: static method of [<code>FormItem</code>](#FormItem)  
**Returns**: <code>string</code> - errMsg 错误信息  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | 表单项数据 |
| field | <code>string</code> | 字段名 |
| formItemData | [<code>formItemData</code>](#formItemData) | 表单项数据 |
| fieldCheck | [<code>FieldCheck</code>](#FieldCheck) | 字段验证对象 |
| isMustMatchRule | <code>boolean</code> | 表单字段是否必须匹配到验证规则 |

<a name="FormItem.initFormItemData"></a>

### FormItem.initFormItemData(formObject)
初始化表单项数据

**Kind**: static method of [<code>FormItem</code>](#FormItem)  

| Param | Type | Description |
| --- | --- | --- |
| formObject | <code>formObject</code> | 表单对象 |

<a name="errMessage"></a>

## errMessage : <code>string</code>
错误信息

**Kind**: global typedef  
<a name="checkFields"></a>

## checkFields : <code>Array.&lt;(string\|RegExp)&gt;</code>
验证字段匹配项

**Kind**: global typedef  
<a name="checkRule"></a>

## checkRule : <code>Object</code>
规则对象

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [type] | <code>string</code> | 类型 |
| [min] | <code>number</code> | 最小值 |
| [max] | <code>number</code> | 最大值 |
| [length] | <code>number</code> | 长度 |
| [regex] | <code>RegExp</code> | 正则表达式 |
| [message] | [<code>errMessage</code>](#errMessage) | 错误信息 |
| [require] | <code>boolean</code> | 是否必须 |
| [minLength] | <code>number</code> | 最小长度 |
| [maxLength] | <code>number</code> | 最大长度 |
| [validator] | [<code>validatorFunction</code>](#validatorFunction) | 自定义验证函数 |

<a name="validatorFunction"></a>

## validatorFunction ⇒ <code>string</code>
自定义验证函数

**Kind**: global typedef  
**Returns**: <code>string</code> - 返回错误信息或者 null  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | 需要验证的值 |

<a name="ruleItem"></a>

## ruleItem : <code>Object</code>
验证规则对象

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| checkFields | <code>Array.&lt;string&gt;</code> | 需要验证的字段 |
| rules | <code>Array.&lt;(validatorFunction\|checkRule)&gt;</code> | 验证规则 |

<a name="checkCode"></a>

## checkCode : <code>number</code>
验证码

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| code_pass | <code>1</code> | 验证通过 |
| code_notPass | <code>2</code> | 验证不通过 |
| code_notMatch | <code>3</code> | 未匹配到验证规则 |

<a name="formItemData"></a>

## formItemData : <code>object</code>
表单项数据

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [val] | <code>string</code> | 表单项值 |
| [msg] | <code>string</code> | 表单项错误信息 |
| [state] | <code>number</code> | 表单项状态 0 通过 1 通过 2 不通过 |
| [showText] | <code>string</code> | 表单项显示文本,用于在某些 |
| [label] | <code>string</code> | 表单项显示文本 |
| [init] | <code>string</code> | 表单项初始值 |
| [options] | <code>Array</code> | 表单项枚举值 |
| [depend] | <code>string</code> | 依赖字段, 该项存在将使用依赖字段的option中的checkField字段进行匹配验证规则 |
| [reCheckField] | <code>string</code> | 该表单项用于匹配规则的字段 |
| [disables] | <code>Array</code> | 禁用项 |

