"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyFile = void 0;
/**
 * Class representing body cache file.
 */
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const mime_types_1 = __importDefault(require("mime-types"));
const utils_1 = require("../utils");
class BodyFile {
    constructor(dir, responseInfo) {
        this.responseInfo = responseInfo;
        this.path = node_path_1.default.join(dir, this.getFilename());
    }
    isJson() {
        return this.path.endsWith('.json');
    }
    async read() {
        return node_fs_1.default.promises.readFile(this.path);
    }
    async save(body) {
        const content = this.isJson() ? (0, utils_1.prettifyJson)(body.toString('utf8')) : body;
        await this.ensureDir();
        await node_fs_1.default.promises.writeFile(this.path, content);
    }
    async ensureDir() {
        await node_fs_1.default.promises.mkdir(node_path_1.default.dirname(this.path), { recursive: true });
    }
    getFilename() {
        const contentType = this.responseInfo.headers['content-type'];
        const extension = mime_types_1.default.extension(contentType || '') || 'bin';
        return `body.${extension}`;
    }
}
exports.BodyFile = BodyFile;
//# sourceMappingURL=BodyFile.js.map