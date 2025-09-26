import { StatusMaquinaDAO, type IStatusMaquina } from "../Database/Entities/StatusMaquina.js";
import { Token } from "../Utils/token.js";

export class StatusMaquinaController{
    private statusMaquinaEntity = new StatusMaquinaDAO();
    private token = new Token(); 

    public async getStatusMaquina(token: string, idStatusMaquina?: string){
        if(this.token.validateToken(token)){
            const result = await this.statusMaquinaEntity.getStatusMaquina(idStatusMaquina);
            return {payload: result, success: true};
        }else{
            return {payload: null, success: false};
        }
    }

    public async addStatusMaquina(token: string, statusMaquina:IStatusMaquina ){
        if(this.token.validateToken(token)){
            const result = await this.statusMaquinaEntity.addStatusMaquina(statusMaquina);
            return {payload: result, success: true};    
        }else{
            return {payload: null, success: false};
        }
    }
    
    public async updateStatusMaquina(token: string, statusMaquina:IStatusMaquina, id: string){
        if(this.token.validateToken(token)){
            const result = await this.statusMaquinaEntity.updateStatusMaquina(statusMaquina, id);
            return {payload: result, success: true};
        }else{
            return {payload: null, success: false};
        }
    } 

    public async deleteStatus(token: string, statusMaquina:IStatusMaquina, id: string){
        if(this.token.validateToken(token)){
            const result = await this.statusMaquinaEntity.deleteStatusMaquina(statusMaquina, id);
            return {payload: result, success: true};
        }else{
            return {payload: null, success: false};
        }
    }
}



