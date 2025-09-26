import fastify from 'fastify';
import { MotivoRefugoController } from './Controllers/MotivoRefugoController.ts';
import type { IMotivoRefugo } from './Database/Entities/MotivoRefugo.ts';

const api = fastify({
    logger: true
});

const controller = new MotivoRefugoController();

api.get('/:id', async function (request, response) {
    const { id } = request.params as { id: string };
    const token = request.headers["token"] as string;
    const data = await controller.getMotivoRefugo(token, id);    
    response.send({ result: data.payload?.length ? data.payload : "Id nao encontrado! verifique infos.", 
        success: data.payload!.length >0 });
});

api.post('/', async function (request, response) {
    const token = request.headers["token"] as string;
    const data = await controller.addMotivoRefugo(token, request.body as IMotivoRefugo);    
    if(data.success === true){
        response.send({ result:"Registro inserido com sucesso!"});
    }else{
        response.send({ result:"Houve um problema ao inserir o registro!"});
    }
});

api.put('/:id', async function (request, response) {
    const token = request.headers["token"] as string;
    const { id } = request.params as { id: string };
    const data = await controller.updateMotivoRefugo(token, request.body as IMotivoRefugo, id);    
    if(data.success === true){
        response.send({ result:"Registro alterado com sucesso!"});
    }else{
        response.send({ result:"Houve um problema ao alterar o registro!"});
    }
});

api.delete('/:id', async function (request, response) {
    const token = request.headers["token"] as string;
    const { id } = request.params as { id: string };
    await controller.deleteMotivoRefugo(token,request.body as IMotivoRefugo, id);    
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
