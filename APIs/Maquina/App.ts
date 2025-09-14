import fastify from 'fastify';
import { MaquinaController } from './Controllers/MaquinaController.ts';
import type { IMaquina } from './Database/Entities/Maquina.ts';

const api = fastify({
    logger: true
});

const controller = new MaquinaController();

api.get('/:id', async function (request, response) {
    const { id } = request.params as { id: string };
    const token = request.headers["token"] as string;
    const data = await controller.getMaquina(token, id);    
    response.send({ result: data.payload?.length ? data.payload : "Id nao encontrado! verifique infos.", 
        success: data.payload!.length >0 });
});

api.post('/', async function (request, response) {
    const token = request.headers["token"] as string;
    const data = await controller.addTipoUsuario(token, request.body as IMaquina);    
    if(data.success === true){
        response.send({ result:"Registro inserido com sucesso!"});
    }else{
        response.send({ result:"Houve um problema ao inserir o registro!"});
    }
});

/* api.put('/:id', async function (request, response) {
    const token = request.headers["token"] as string;
    const { id } = request.params as { id: string };
    const data = await controller.updateTipoUsuario(token, request.body as ITipoUsuario, id);    
    if(data.success === true){
        response.send({ result:"Registro alterado com sucesso!"});
    }else{
        response.send({ result:"Houve um problema ao alterar o registro!"});
    }
}); */

api.delete('/:id', async function (request, response) {
    const token = request.headers["token"] as string;
    const { id } = request.params as { id: string };
    await controller.deleteMaquina(token,request.body as IMaquina, id);    
    response.send({ result:"Registro deletado com sucesso!"});
});

const start = async () => {
    try {
        await api.listen({port: 3000})
    }catch(err){
        api.log.error(err)
        process.exit(1)
    }
}

start()
