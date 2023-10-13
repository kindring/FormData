# 表单创建与验证工具
## 使用方法
### step1 安装库
> 该方法为直接在项目中通过配置链接的方式引入该库

1. 编辑 `package.josn`
2. 在依赖 `dependencies` 中添加如下内容  

"kind-form-verify": "git+http://kindring.cn:9123/kindring/FormData.git"

`package.json` 示例:
```json
{
  "dependencies": {
    "kind-form-verify": "git+https://github.com/kindring/KindFormVerify.git"
  }
}
```

3. 执行 `npm install` 安装依赖
4. 更新库  
使用 npm  
`npm update kind-form-verify`  
使用 yarn  
`yarn upgrade kind-form-verify`

### step2 引入库
```js
import { FieldCheck, FormVerify } from 'kind-form-verify';
```

### step3 使用库
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

let form = {
    pType: {
        val: dbField_esm.db_base.newsType.all,
            oldVal: dbField_esm.db_base.newsType.all,
            init: dbField_esm.db_base.newsType.all,
            msg: '',
            state: 0,
            options: [
            {text: '全部', key: dbField_esm.db_base.newsType.all, value: dbField_esm.db_base.newsType.all},
            {text: '新闻', key: dbField_esm.db_base.newsType.news, value: dbField_esm.db_base.newsType.news},
            {text: '解决方案', key: dbField_esm.db_base.newsType.solution, value: dbField_esm.db_base.newsType.solution},
        ]
    },
    type: {
        val: '',
            init: '',
            msg: '',
            state: 0,
            options: [],
            disables: ['all'],
    }
}
let formVerify = new FormVerify(form,fieldCheck);
formVerify.check(false);

```
