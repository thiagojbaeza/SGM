import { MotivoRefugoDAO, type IMotivoRefugo } from "../Database/Entities/MotivoRefugo.js";
import { Token } from "../Utils/token.js";

export class MotivoRefugoController{
    private motivoRefugoEntity = new MotivoRefugoDAO();
    private token = new Token(); 

    public async getMotivoRefugo(token: string, idMotivoRefugo?: string){
        if(this.token.validateToken(token)){
            const result = await this.motivoRefugoEntity.getMotivoRefugo(idMotivoRefugo);
            return {payload: result, success: true};
        }else{
            return {payload: null, success: false};
        }
    }

    public async addMotivoRefugo(token: string, motivoRefugo:IMotivoRefugo ){
        if(this.token.validateToken(token)){
            const result = await this.motivoRefugoEntity.addMotivoRefugo(motivoRefugo);
            return {payload: result, success: true};
        }else{
            return {payload: null, success: false};
        }
    }
    
    public async updateMotivoRefugo(token: string, motivoRefugo:IMotivoRefugo, id: string){
        if(this.token.validateToken(token)){
            const result = await this.motivoRefugoEntity.updateMotivoRefugo(motivoRefugo, id);
            return {payload: result, success: true};
        }else{
            return {payload: null, success: false};
        }
    } 

    public async deleteMotivoRefugo(token: string, motivoRefugo:IMotivoRefugo, id: string){
        if(this.token.validateToken(token)){
            const result = await this.motivoRefugoEntity.deleteMotivoRefugo(motivoRefugo, id);
            return {payload: result, success: true};
        }else{
            return {payload: null, success: false};
        }
    }
}



