import fastify from 'fastify';
import { TipoUsuarioController } from './Controllers/TipoUsuarioController.js';
import type { ITipoUsuario } from './Database/Entities/TipoUsuario.js';
import cors from '@fastify/cors';

const api = fastify({
    logger: true
});

await api.register(cors, {
    origin:'*'
})

const controller = new TipoUsuarioController();

api.get('/:id', async function (request, response) {
    const { id } = request.params as { id: string };
    const token = request.headers["token"] as string;
    const data = await controller.getTipoUsuario(token, id);    
    response.send({ result: data.payload?.length ? data.payload : "Id nao encontrado! verifique infos.", 
        success: data.payload!.length >0 });
});

api.post('/', async function (request, response) {
    const token = request.headers["token"] as string;
    const data = await controller.addTipoUsuario(token, request.body as ITipoUsuario);    
    if(data.success === true){
        response.send({ result:"Registro inserido com sucesso!"});
    }else{
        response.send({ result:"Houve um problema ao inserir o registro!"});
    }
});

api.put('/:id', async function (request, response) {
    const token = request.headers["token"] as string;
    const { id } = request.params as { id: string };
    const data = await controller.updateTipoUsuario(token, request.body as ITipoUsuario, id);    
    if(data.success === true){
        response.send({ result:"Registro alterado com sucesso!"});
    }else{
        response.send({ result:"Houve um problema ao alterar o registro!"});
    }
});

api.delete('/:id', async function (request, response) {
    const token = request.headers["token"] as string;
    const { id } = request.params as { id: string };
    await controller.deleteTipoUsuario(token,request.body as ITipoUsuario, id);    
    response.send({ result:"Registro deletado com sucesso!"});
});

const start = async () => {
    try {
        await api.listen({ port: 3001, host: '0.0.0.0' })
    }catch(err){
        api.log.error(err)
        process.exit(1)
    }
}

start()
