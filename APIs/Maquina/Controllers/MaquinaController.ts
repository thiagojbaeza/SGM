import { TipoUsuarioDAO, type ITipoUsuario } from "../Database/Entities/Maquina.ts";
import { Token } from "../Utils/token.ts";



export class TipoUsuarioController{
    private tipoUsuarioEntity = new TipoUsuarioDAO();
    private token = new Token(); 

    public async getTipoUsuario(token: string, idTipoUsuario?: string){
        if(this.token.validateToken(token)){
            const result = await this.tipoUsuarioEntity.getTipoUsuario(idTipoUsuario);
            return {payload: result, success: true};
        }else{
            return {payload: null, success: false};
        }
    }

    public async addTipoUsuario(token: string,tipoUsuario:ITipoUsuario ){
        if(this.token.validateToken(token)){
            const result = await this.tipoUsuarioEntity.addTipoUsuario(tipoUsuario);
            return {payload: result, success: true};
        }else{
            return {payload: null, success: false};
        }
    }
    
    public async updateTipoUsuario(token: string, tipoUsuario:ITipoUsuario, id: string){
        if(this.token.validateToken(token)){
            const result = await this.tipoUsuarioEntity.updateTipoUsuario(tipoUsuario, id);
            return {payload: result, success: true};
        }else{
            return {payload: null, success: false};
        }
    }

    public async deleteTipoUsuario(token: string, tipoUsuario:ITipoUsuario, id: string){
        if(this.token.validateToken(token)){
            const result = await this.tipoUsuarioEntity.deleteTipoUsuario(tipoUsuario, id);
            return {payload: result, success: true};
        }else{
            return {payload: null, success: false};
        }
    }
}



