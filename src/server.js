const express = require('express');
const {resolve} = require('path');
const {promisify} = require('util');
const initControllers = require('./controllers');
const initMiddlewares = require('./middlewares');

const server = express();
const port = parseInt(process.env.PORT || '9000');
const publicDir = resolve('public');
const mouldsDir = resolve('src/moulds');

async function bootstrap() {
    server.use(express.static(publicDir));
    server.use('/moulds', express.static(mouldsDir));
    server.use(await initControllers());
    server.use(await initMiddlewares());
    await promisify(server.listen.bind(server, port))();
    console.log(`> Started on port ${port}`);
}

bootstrap();
