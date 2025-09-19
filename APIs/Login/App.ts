import fastify from 'fastify';
import { LoginController } from './Controllers/LoginController.ts';
import type { ILogin } from './Database/Entities/Login.ts';


const api = fastify({
    logger: true
});

const controller = new LoginController();

api.get('/:id', async function (request, response) {
    const { id } = request.params as { id: string };
    const usuario = request.headers["usuario"] as string;
    const senha = request.headers["senha"] as string;
    const data = await controller.login(usuario, senha);
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

const start = async () => {
    try {
        await api.listen({port: 3000})
    }catch(err){
        api.log.error(err)
        process.exit(1)
    }
}

start()
