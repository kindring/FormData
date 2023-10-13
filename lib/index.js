"use strict";
/**
 * @module kind-form-verify
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldCheck = exports.FormItem = void 0;
const formData_1 = __importDefault(require("./formData"));
const fieldCheck_1 = __importDefault(require("./fieldCheck"));
exports.FormItem = formData_1.default;
exports.FieldCheck = fieldCheck_1.default;
// 示例
/**
 * @example
 * import {FormItem,FieldCheck} from "kind-form-verify"
 */
