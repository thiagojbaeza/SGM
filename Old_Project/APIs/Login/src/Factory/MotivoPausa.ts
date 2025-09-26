import { FastifyInstance } from "fastify";
import { MotivoPausaController } from "../Controllers/MotivoPausa.js";
import { IMotivoPausa } from "../Database/Entities/MotivoPausa.js";

export default class MotivoPausaFactory {

    static build(api: FastifyInstance){
        const controller = new MotivoPausaController();
        api.get('/motivopausa/:id', async function (request, response) {
            const { id } = request.params as { id: string };
            const token = request.headers["token"] as string;
            const data = await controller.getMotivoPausa(token, id);    
            response.send({ result: data.payload?.length ? data.payload : "Id nao encontrado! verifique infos.", 
                success: data.payload!.length >0 });
        });

        api.post('/motivopausa', async function (request, response) {
            const token = request.headers["token"] as string;
            const data = await controller.addMotivoPausa(token, request.body as IMotivoPausa);    
            if(data.success === true){
                response.send({ result:"Registro inserido com sucesso!"});
            }else{
                response.send({ result:"Houve um problema ao inserir o registro!"});
            }
        });

        api.put('/motivopausa/:id', async function (request, response) {
            const token = request.headers["token"] as string;
            const { id } = request.params as { id: string };
            const data = await controller.updateMotivoPausa(token, request.body as IMotivoPausa, id);    
            if(data.success === true){
                response.send({ result:"Registro alterado com sucesso!"});
            }else{
                response.send({ result:"Houve um problema ao alterar o registro!"});
            }
        });

        api.delete('/motivopausa/:id', async function (request, response) {
            const token = request.headers["token"] as string;
            const { id } = request.params as { id: string };
            await controller.deleteMotivoPausa(token,request.body as IMotivoPausa, id);    
            response.send({ result:"Registro deletado com sucesso!"});
        });
    }
}

