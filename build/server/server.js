"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const content_1 = require("./content");
const MODULES_ROOT = __dirname + '/../../node_modules/';
const CLIENT_ROOT = __dirname + '/../client/';
const SRC_RE = /^\/src\/(.+)$/;
function get404Page(request) {
    request.status = 404;
    request.send('Hello, 404!');
}
function getFavicon(request) {
    request.send('', 'ico');
}
function getIndexPage(request) {
    request.send(content_1.indexPage, 'html');
}
function getResource(match, request) {
    return __awaiter(this, void 0, void 0, function* () {
        if (request.request.method !== 'GET') {
            get404Page(request);
            return;
        }
        try {
            const file = yield request.getFile({ root: CLIENT_ROOT, file: match[1] + '.js' });
            request.send(file, 'js');
        }
        catch (error) {
            get404Page(request);
        }
    });
}
const ROUTER = {
    '/': getIndexPage,
    '/favicon.ico': getFavicon,
    '/lib/splux.js': MODULES_ROOT + 'splux/index.js',
};
function server(request) {
    request.match(SRC_RE, getResource) || request.route(ROUTER) || get404Page(request);
}
exports.server = server;
;
