import fastify from 'fastify';
import { LoginController } from './Controllers/LoginController.js';
import type { ILogin } from './Database/Entities/Login.js';
import cors from '@fastify/cors';


const api = fastify({
    logger: true
});

await api.register(cors, {
    origin:'*'
})

const controller = new LoginController();

// verifica se o usuario existe e efetua o login, gera o token para acesso ao sistema
api.post('/login', async function (request, response) {
    const body = request.body as {ds_login: string, ds_senha: string}
    const data = await controller.login(body.ds_login, body.ds_senha);
    response.send({ result: data});
});

// cria um novo usuario para acesso ao sistema
api.post('/createLogin', async function (request, response) {
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
api.get('/login/:id', async function (request, response) {
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
api.put('/login/:id', async function (request, response) {
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
api.delete('/login/:id', async function (request, response) {
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
