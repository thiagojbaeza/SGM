import { MotivoPausaDAO, type IMotivoPausa } from "../Database/Entities/MotivoPausa.js";
import { Token } from "../Utils/token.js";



export class MotivoPausaController{
    private motivoPausaEntity = new MotivoPausaDAO();
    private token = new Token(); 

    public async getMotivoPausa(token: string, idMotivoPausa?: string){
        if(this.token.validateToken(token)){
            const result = await this.motivoPausaEntity.getMotivoPausa(idMotivoPausa);
            return {payload: result, success: true};
        }else{
            return {payload: null, success: false};
        }
    }

    public async addMotivoPausa(token: string, motivoPausa:IMotivoPausa ){
        if(this.token.validateToken(token)){
            const result = await this.motivoPausaEntity.addMotivoPausa(motivoPausa);
            return {payload: result, success: true};
        }else{
            return {payload: null, success: false};
        }
    }
    
    public async updateMotivoPausa(token: string, motivoPausa:IMotivoPausa, id: string){
        if(this.token.validateToken(token)){
            const result = await this.motivoPausaEntity.updateMotivoPausa(motivoPausa, id);
            return {payload: result, success: true};
        }else{
            return {payload: null, success: false};
        }
    } 

    public async deleteMotivoPausa(token: string, motivoPausa:IMotivoPausa, id: string){
        if(this.token.validateToken(token)){
            const result = await this.motivoPausaEntity.deleteMotivoPausa(motivoPausa, id);
            return {payload: result, success: true};
        }else{
            return {payload: null, success: false};
        }
    }
}



