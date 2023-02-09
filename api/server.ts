import path from 'path';
import jsonServer from 'json-server';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(import.meta.url);
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '..', 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(8080, () => {
	console.log('Mock rodando com sucesso 👍');
});
