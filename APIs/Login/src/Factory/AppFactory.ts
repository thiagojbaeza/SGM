import { FastifyInstance } from "fastify";
import LoginFactory from "./LoginFactory.js";
import TipoUsuarioFactory from "./TipoUsuarioFactory.js";

export default class AppFactory{
     static build(api: FastifyInstance){
        LoginFactory.build(api)
        TipoUsuarioFactory.build(api)
     }
}