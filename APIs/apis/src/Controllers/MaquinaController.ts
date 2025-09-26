import { MaquinaDAO, type IMaquina } from "../Database/Entities/Maquina.js";
import { Token } from "../Utils/token.js";



export class MaquinaController{
    private maquinaEntity = new MaquinaDAO();
    private token = new Token(); 

    public async getMaquina(token: string, idMaquina?: string){
        if(this.token.validateToken(token)){
            const result = await this.maquinaEntity.getMaquina(idMaquina);
            return {payload: result, success: true};
        }else{
            return {payload: null, success: false};
        }
    }

    public async addMaquina(token: string, maquina:IMaquina ){
        if(this.token.validateToken(token)){
            const result = await this.maquinaEntity.addMaquina(maquina);
            return {payload: result, success: true};
        }else{
            return {payload: null, success: false};
        }
    }
    
    public async updateMaquina(token: string, maquina:IMaquina, id: string){
        if(this.token.validateToken(token)){
            const result = await this.maquinaEntity.updateMaquina(maquina, id);
            return {payload: result, success: true};
        }else{
            return {payload: null, success: false};
        }
    } 

    public async deleteMaquina(token: string, maquina:IMaquina, id: string){
        if(this.token.validateToken(token)){
            const result = await this.maquinaEntity.deleteMaquina(maquina, id);
            return {payload: result, success: true};
        }else{
            return {payload: null, success: false};
        }
    }
}



