"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimSlash = exports.toFunction = exports.toArray = exports.filenamify = exports.prettifyJson = void 0;
function prettifyJson(data) {
    const obj = typeof data === 'string' ? JSON.parse(data) : data;
    return JSON.stringify(obj, null, 2);
}
exports.prettifyJson = prettifyJson;
const reRelativePath = /^\.+(\\|\/)|^\.+$/;
// eslint-disable-next-line no-control-regex
const filenameReservedRegex = /[<>:"/\\|?*\u0000-\u001F]/g;
/**
 * See: https://github.com/sindresorhus/filenamify
 *
 * There is implementation in Playwright, it replaces more characters with "-", compared to filenamify.
 * At least, " " and ".". But for our case, it's not suitable. We need to keep "." in dir as file extension from URL.
 * E.g. caching "example.com/index.html" creates dir "index.html", not "index-html"
 * So, just replace spaces with "-".
 * See: https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/utils/fileUtils.ts#L55
 */
function filenamify(s, replacement = '-') {
    return (s
        .replace(reRelativePath, replacement) // prettier-ignore
        .replace(filenameReservedRegex, replacement)
        // Replace spaces with replacement, from Playwright
        .replace(/\s+/g, replacement));
}
exports.filenamify = filenamify;
function toArray(value) {
    return Array.isArray(value) ? value : [value];
}
exports.toArray = toArray;
function toFunction(value) {
    return typeof value === 'function' ? value : () => value;
}
exports.toFunction = toFunction;
function trimSlash(s) {
    return s.replace(/^\/+|\/+$/, '');
}
exports.trimSlash = trimSlash;
//# sourceMappingURL=utils.js.map