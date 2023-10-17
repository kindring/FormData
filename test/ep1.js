

const {FieldCheck, FormVerify} = require("../lib/cjs/index.js")
const {paramsRules} = require("./rule")
const {color, ColorValue} = require("./colorConsole");

let fieldCheck  = new FieldCheck(paramsRules);

let t_form = {
    pType: {
        val: 'all',
        oldVal: 'all',
        init: 'all',
        msg: '',
        state: 0,
        options: [
            {text: '全部', key: 'all', value: 'all'},
            {text: '新闻', key: 'news', value: 'news'},
            {text: '解决方案', key: 'solution', value: 'solution'},
        ]
    },
    type: {
        val: '',
        init: '',
        msg: '',
        state: 0,
        options: [
                {
                    "text": "全部",
                    "key": "all",
                    "value": "all",
                    "disabled": true
                },
                {
                    "type_id": 1,
                    "type_logo": null,
                    "type_name": "解决方案",
                    "parent_type": 1,
                    "type_name_en": "Plan and case",
                    "type_sort": 1,
                    "date_time": "1482569003",
                    "type_key": "sol",
                    "seo_key": null,
                    "text": "解决方案",
                    "key": "sol",
                    "typeKey": "sol",
                    "href": "/sol",
                    "value": "sol"
                },
                {
                    "type_id": 3,
                    "type_logo": null,
                    "type_name": "公司动态",
                    "parent_type": 2,
                    "type_name_en": "Company Dynamic",
                    "type_sort": 0,
                    "date_time": "1482307803",
                    "type_key": "com",
                    "seo_key": null,
                    "text": "公司动态",
                    "key": "com",
                    "typeKey": "com",
                    "href": "/com",
                    "value": "com"
                },
                {
                    "type_id": 4,
                    "type_logo": null,
                    "type_name": "行业资讯",
                    "parent_type": 2,
                    "type_name_en": "Industry information",
                    "type_sort": 0,
                    "date_time": "1482307826",
                    "type_key": "in",
                    "seo_key": null,
                    "text": "行业资讯",
                    "key": "in",
                    "typeKey": "in",
                    "href": "/in",
                    "value": "in"
                },
                {
                    "type_id": 2,
                    "type_logo": null,
                    "type_name": "应用案例",
                    "parent_type": 1,
                    "type_name_en": "输电线路在线监测",
                    "type_sort": 0,
                    "date_time": "1482307826",
                    "type_key": "acs",
                    "seo_key": null,
                    "text": "应用案例",
                    "key": "acs",
                    "typeKey": "acs",
                    "href": "/acs",
                    "value": "acs"
                },
                {
                    "type_id": 12,
                    "type_logo": null,
                    "type_name": "产品的应用",
                    "parent_type": 2,
                    "type_name_en": "产品的应用",
                    "type_sort": 0,
                    "date_time": "1638180062",
                    "type_key": "pa",
                    "seo_key": null,
                    "text": "产品的应用",
                    "key": "pa",
                    "typeKey": "pa",
                    "href": "/pa",
                    "value": "pa"
                },
                {
                    "type_id": 14,
                    "type_logo": null,
                    "type_name": "电力案例",
                    "parent_type": 1,
                    "type_name_en": "电力案例",
                    "type_sort": 0,
                    "date_time": "1663818099",
                    "type_key": "epower",
                    "seo_key": null,
                    "text": "电力案例",
                    "key": "epower",
                    "typeKey": "epower",
                    "href": "/epower",
                    "value": "epower"
                }
        ],
        disables: ['all'],
    },
    title: {
        val: '',
        init: '',
        msg: '',
        state: 0
    },
    author: {
        val: '',
        init: '',
        msg: '',
        state: 0
    },
    source: {
        val: '',
        init: '',
        msg: '',
        state: 0
    },
    cover: {
        val: '',
        init: '',
        msg: '',
        reCheckField: 'fileData',
        state: 0
    },
    remark: {
        val: '',
        init: '',
        msg: '',
        state: 0
    },
}
let formVerify = new FormVerify(t_form, fieldCheck);
formVerify.onLog = (msg)=>{
    console.log(`${color('[INFO]', ColorValue.green) } ${color(msg, ColorValue.bright)}`);
}
let testFn = (field, val)=>{
    let errMsg = '';
    t_form[field].val = val;
    errMsg = formVerify.checkItem(field);
    console.log(`------ ${field}: ${val} ------`);
    // console.log(`${ColorValue.green}2222`)
    console.log(`[${!
        errMsg?color('pass', ColorValue.green)
        :color('failed', ColorValue.red)}] ${errMsg || ''}`);
    console.log();
}



console.log(color('\n-----------测试单项验证------------', ColorValue.bright))
testFn('remark', '12345');
testFn('type', 'all');
testFn('type', t_form.type.options[1].value);
testFn('type', '11111');
testFn('cover', '1233');

console.log(color('\n-----------测试获取结果------------', ColorValue.bright))
console.log(formVerify.getFormData());

t_form.type.val = t_form.type.options[1].value;

console.log(formVerify.getFormData());

console.log(color('\n-----------测试重置------------', ColorValue.bright))
formVerify.init();
console.log(formVerify.getFormData());

console.log(color('\n-----------测试整体验证------------', ColorValue.bright))
t_form.type.val = t_form.type.options[1].value;
t_form.cover.val = '1233';
t_form.remark.val = '12345';
console.log(formVerify.check());
console.log(formVerify.getFormData());


console.log(color('\n-----------测试整体验证------------', ColorValue.bright))
t_form.type.val = t_form.type.options[0].value;
t_form.cover.val = '1233';
t_form.remark.val = '12345';
console.log(formVerify.check());
console.log(formVerify.getFormData());

