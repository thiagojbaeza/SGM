import fastify from 'fastify';
import { LoginController } from './Controllers/LoginController.ts';
import type { ILogin } from './Database/Entities/Login.ts';
import cors from '@fastify/cors';


const api = fastify({
    logger: true
});

await api.register(cors, {
    origin:'*'
})

const controller = new LoginController();

api.post('/login', async function (request, response) {
    const body = request.body as {ds_login: string, ds_senha: string}
    const data = await controller.login(body.ds_login, body.ds_senha);
    response.send({ result: data});
});

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


/* api.get('/:id', async function (request, response) {
    const { id } = request.params as { id: string };
    var data = await controller.getUserById(id);    
    response.send({ result: data.length ? data: "Id nao encontrado! verifique infos."});
});

api.post('/', async function (request, response) {
    var body = request.body as IUser;
    var data = await controller.addUser(body);    
    response.send({ result:"Registro inserido com sucesso!"});
});

api.put('/', async function (request, response) {
    var body = request.body as IUser;
    var data = await controller.updateUser(body);    
    response.send({ result:"Registro alterado com sucesso!"});
});

api.delete('/:id', async function (request, response) {
    const { id } = request.params as { id: string };
    var data = await controller.deleteUser(id);    
    response.send({ result:"Registro deletado com sucesso!"});
});
 */




/* api.get('/', async function (request, response) {
    const token = request.headers["token"] as string;
    const data = await controller.getUser(token);    
    response.send({ result: data});
}); */

const start = async () => {
    try {
        await api.listen({port: 3000})
    }catch(err){
        api.log.error(err)
        process.exit(1)
    }
}

start()
