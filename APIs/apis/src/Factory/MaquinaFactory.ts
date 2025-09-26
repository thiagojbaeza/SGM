import { FastifyInstance } from "fastify";
import { MaquinaController } from "../Controllers/MaquinaController.js";
import { IMaquina } from "../Database/Entities/Maquina.js";

export default class MaquinaFactory {

    static build(api: FastifyInstance){
        const controller = new MaquinaController();
        api.get('/maquina/:id', async function (request, response) {
            const { id } = request.params as { id: string };
            const token = request.headers["token"] as string;
            const data = await controller.getMaquina(token, id);    
            response.send({ result: data.payload?.length ? data.payload : "Id nao encontrado! verifique infos.", 
                success: data.payload!.length >0 });
        });

        api.post('/maquina', async function (request, response) {
            const token = request.headers["token"] as string;
            const data = await controller.addMaquina(token, request.body as IMaquina);    
            if(data.success === true){
                response.send({ result:"Registro inserido com sucesso!"});
            }else{
                response.send({ result:"Houve um problema ao inserir o registro!"});
            }
        });

        api.put('/maquina/:id', async function (request, response) {
            const token = request.headers["token"] as string;
            const { id } = request.params as { id: string };
            const data = await controller.updateMaquina(token, request.body as IMaquina, id);    
            if(data.success === true){
                response.send({ result:"Registro alterado com sucesso!"});
            }else{
                response.send({ result:"Houve um problema ao alterar o registro!"});
            }
        });

        api.delete('/maquina/:id', async function (request, response) {
            const token = request.headers["token"] as string;
            const { id } = request.params as { id: string };
            await controller.deleteMaquina(token,request.body as IMaquina, id);    
            response.send({ result:"Registro deletado com sucesso!"});
        });
    }
}

