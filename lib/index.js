"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldCheck = exports.FormVerify = void 0;
/**
 * @module kind-form-verify
 */
require("./types");
var formVerify_1 = require("./formVerify");
Object.defineProperty(exports, "FormVerify", { enumerable: true, get: function () { return __importDefault(formVerify_1).default; } });
var fieldCheck_1 = require("./fieldCheck");
Object.defineProperty(exports, "FieldCheck", { enumerable: true, get: function () { return __importDefault(fieldCheck_1).default; } });
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
