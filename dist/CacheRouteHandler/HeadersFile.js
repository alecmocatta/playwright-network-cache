"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadersFile = void 0;
/**
 * Class representing headers cache file.
 */
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const utils_1 = require("../utils");
class HeadersFile {
    constructor(dir) {
        this.path = node_path_1.default.join(dir, 'headers.json');
    }
    getLastModified() {
        return this.stat()?.mtimeMs || 0;
    }
    async read() {
        const content = await node_fs_1.default.promises.readFile(this.path, 'utf8');
        return JSON.parse(content);
    }
    save(responseInfo) {
        this.ensureDir();
        node_fs_1.default.writeFileSync(this.path, (0, utils_1.prettifyJson)(responseInfo));
    }
    ensureDir() {
        node_fs_1.default.mkdirSync(node_path_1.default.dirname(this.path), { recursive: true });
    }
    stat() {
        return node_fs_1.default.existsSync(this.path) ? node_fs_1.default.statSync(this.path) : null;
    }
}
exports.HeadersFile = HeadersFile;
//# sourceMappingURL=HeadersFile.js.map