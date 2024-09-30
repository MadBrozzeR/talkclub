import type { Request } from 'mbr-serv-request';
import { indexPage } from './content';

const MODULES_ROOT = __dirname + '/../../node_modules/';
const CLIENT_ROOT = __dirname + '/../client/';

const SRC_RE = /^\/src\/(.+)$/;

function get404Page (request: Request) {
  request.status = 404;
  request.send('Hello, 404!');
}

function getFavicon (request: Request) {
  request.send('', 'ico');
}

function getIndexPage (request: Request) {
  request.send(indexPage, 'html');
}

async function getResource (match: RegExpMatchArray, request: Request) {
  if (request.request.method !== 'GET') {
    get404Page(request);
    return;
  }

  try {
    const file = await request.getFile({ root: CLIENT_ROOT, file: match[1] + '.js' });
    request.send(file, 'js');
  } catch (error) {
    get404Page(request);
  }
}

const ROUTER = {
  '/': getIndexPage,
  '/favicon.ico': getFavicon,
  '/lib/splux.js': MODULES_ROOT + 'splux/index.js',
};

export function server (request: Request) {
  request.match(SRC_RE, getResource) || request.route(ROUTER) || get404Page(request);
};
