import { FastifyInstance } from "fastify";
import { ITipoUsuario } from "../Database/Entities/TipoUsuario.js";
import { TipoUsuarioController } from "../Controllers/TipoUsuarioController.js";

export default class TipoUsuarioFactory {

    static build(api: FastifyInstance){
        const controller = new TipoUsuarioController();
        api.get('/tipousuario/:id', async function (request, response) {
            const { id } = request.params as { id: string };
            const token = request.headers["token"] as string;
            const data = await controller.getTipoUsuario(token, id);    
            response.send({ result: data.payload?.length ? data.payload : "Id nao encontrado! verifique infos.", 
                success: data.payload!.length >0 });
        });

        api.post('/tipousuario', async function (request, response) {
            const token = request.headers["token"] as string;
            const data = await controller.addTipoUsuario(token, request.body as ITipoUsuario);    
            if(data.success === true){
                response.send({ result:"Registro inserido com sucesso!"});
            }else{
                response.send({ result:"Houve um problema ao inserir o registro!"});
            }
        });

        api.put('/tipousuario/:id', async function (request, response) {
            const token = request.headers["token"] as string;
            const { id } = request.params as { id: string };
            const data = await controller.updateTipoUsuario(token, request.body as ITipoUsuario, id);    
            if(data.success === true){
                response.send({ result:"Registro alterado com sucesso!"});
            }else{
                response.send({ result:"Houve um problema ao alterar o registro!"});
            }
        });

        api.delete('/tipousuario/:id', async function (request, response) {
            const token = request.headers["token"] as string;
            const { id } = request.params as { id: string };
            await controller.deleteTipoUsuario(token,request.body as ITipoUsuario, id);    
            response.send({ result:"Registro deletado com sucesso!"});
        });
    }
}

