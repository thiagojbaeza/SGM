import fastify from 'fastify';
import cors from '@fastify/cors';
import AppFactory from './Factory/AppFactory.js';

const api = fastify({
    logger: true
});

await api.register(cors, {
    origin:'*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // inclua PUT aqui
    allowedHeaders: ['Content-Type', 'Authorization', 'token']// se você usa tokens ou headers personalizados
})

AppFactory.build(api)

const start = async () => {
    try {
        //await api.listen({port: 3000})
        await api.listen({ port: 3000, host: '0.0.0.0' })
    }catch(err){
        api.log.error(err)
        process.exit(1)
    }
}

start()
