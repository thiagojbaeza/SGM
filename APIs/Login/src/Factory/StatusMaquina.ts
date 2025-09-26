import { FastifyInstance } from "fastify";
import { StatusMaquinaController } from "../Controllers/StatusMaquina.js";
import { IStatusMaquina } from "../Database/Entities/StatusMaquina.js";

export default class StatusMaquinaFactory {

    static build(api: FastifyInstance){
        const controller = new StatusMaquinaController();
        api.get('/statusmaquina/:id', async function (request, response) {
            const { id } = request.params as { id: string };
            const token = request.headers["token"] as string;
            const data = await controller.getStatusMaquina(token, id);    
            response.send({ result: data.payload?.length ? data.payload : "Id nao encontrado! verifique infos.", 
                success: data.payload!.length >0 });
        });

        api.post('/statusmaquina', async function (request, response) {
            const token = request.headers["token"] as string;
            const data = await controller.addStatusMaquina(token, request.body as IStatusMaquina);    
            if(data.success === true){
                response.send({ result:"Registro inserido com sucesso!"});
            }else{
                response.send({ result:"Houve um problema ao inserir o registro!"});
            }
        });

        api.put('/statusmaquina/:id', async function (request, response) {
            const token = request.headers["token"] as string;
            const { id } = request.params as { id: string };
            const data = await controller.updateStatusMaquina(token, request.body as IStatusMaquina, id);    
            if(data.success === true){
                response.send({ result:"Registro alterado com sucesso!"});
            }else{
                response.send({ result:"Houve um problema ao alterar o registro!"});
            }
        });

        api.delete('/statusmaquina/:id', async function (request, response) {
            const token = request.headers["token"] as string;
            const { id } = request.params as { id: string };
            await controller.deleteStatus(token,request.body as IStatusMaquina, id);    
            response.send({ result:"Registro deletado com sucesso!"});
        });
    }
}

