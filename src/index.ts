/**
 * @module kind-form-verify
 */
// import "./types";
// 导入 types
import { formItemData, formObject, formOption, FormVerifyOption, verifyForm }  from "./types/formVerify";
import { errMessage, checkCode, checkRule, ruleItem, checkFields, validatorFunction} from "./types/fieldCheck";
export {default as FormVerify} from "./formVerify";


export {default as FieldCheck} from "./fieldCheck";
// 导出模块
// export default {
//     FormVerify,
//     FieldCheck,
// };
// 示例
/**
 * @example
 * import {FormItem,FieldCheck} from "kind-form-verify"
 */
