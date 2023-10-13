"use strict";
/**
 * @module kind-form-verify
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formVerify_1 = __importDefault(require("./formVerify"));
const fieldCheck_1 = __importDefault(require("./fieldCheck"));
// 导出模块
exports.default = {
    FormVerify: formVerify_1.default,
    FieldCheck: fieldCheck_1.default,
};
// 示例
/**
 * @example
 * import {FormItem,FieldCheck} from "kind-form-verify"
 */
