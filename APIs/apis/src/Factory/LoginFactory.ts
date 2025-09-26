import { LoginController } from "../Controllers/LoginController.js";
import { ILogin } from "../Database/Entities/Login.js";
import { FastifyInstance } from 'fastify';

export default class LoginFactory {

    static build(api: FastifyInstance){
        const controller = new LoginController();
        // verifica se o usuario existe e efetua o login, gera o token para acesso ao sistema
        api.post('/auth', async function (request, response) {
            const body = request.body as {ds_login: string, ds_senha: string}
            const data = await controller.login(body.ds_login, body.ds_senha);
            response.send({ result: data});
        });

        // cria um novo usuario para acesso ao sistema
        api.post('/auth/create', async function (request, response) {
            const body = request.body as ILogin;
            const token = request.headers["token"] as string;
            const data = await controller.createLogin(body, token); 
            if(data.success === true){
                response.send({ result:"Registro inserido com sucesso!"});
            }else{
                response.send({ result:"Houve um problema ao inserir o registro!"});
            }
        });

        //utilizado para pegar todos os usuários ou somente um
        api.get('/auth/users/:id', async function (request, response) {
            const { id } = request.params as { id: string };
            const token = request.headers["token"] as string;
            const data = await controller.getLogins(token, id);    
            if(data.success ===true){
                response.send({result: data.payload, success: true})
            }else if (data.payload.length === 0) {
                response.send({result:"Usuário não encontrado!", success:false});
            } else{
                response.send({result:"Token inválido!", success:false});
            }
            
        });

        //utilizado para alterar os dados do usuário
        api.put('/auth/users/:id', async function (request, response) {
            const body = request.body as ILogin;
            const { id } = request.params as { id: string };
            const token = request.headers["token"] as string;
            const data = await controller.updateLogin(token,body,id);
            if(data.success){
                response.send({ result:"Registro alterado com sucesso!", success:true}); 
            } else{
                response.send({ result: data.payload, success:false}); 
            }   
        });

        //utilizado para inativar um usuário
        api.delete('/auth/users/:id', async function (request, response) {
            const body = request.body as ILogin;
            const { id } = request.params as { id: string };
            const token = request.headers["token"] as string;
            const data = await controller.deleteLogin(token,body,id);
            if(data.success){
                response.send({ result:"Registro deletado com sucesso!", success:true}); 
            } else{
                response.send({ result: data.payload, success:false}); 
            }   
        });
    }
}