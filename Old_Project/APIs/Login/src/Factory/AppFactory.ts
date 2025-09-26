import { FastifyInstance } from "fastify";
import LoginFactory from "./LoginFactory.js";
import TipoUsuarioFactory from "./TipoUsuarioFactory.js";
import MaquinaFactory from "./MaquinaFactory.js";
import MotivoPausaFactory from "./MotivoPausa.js";
import MotivoRefugoFactory from "./MotivoRefugo.js";
import StatusMaquinaFactory from "./StatusMaquina.js";

export default class AppFactory{
     static build(api: FastifyInstance){
        LoginFactory.build(api)
        TipoUsuarioFactory.build(api)
        MaquinaFactory.build(api)
        MotivoPausaFactory.build(api)
        MotivoRefugoFactory.build(api)
        StatusMaquinaFactory.build(api)
     }
}