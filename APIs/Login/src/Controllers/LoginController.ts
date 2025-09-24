import { LoginDAO, type ILogin } from "../Database/Entities/Login.js";
import { Token } from "../Utils/token.js";

export class LoginController{
    private loginEntity = new LoginDAO();
    private token = new Token(); 

    public async login(login:string, senha:string){
        const result = await this.loginEntity.getLogin(login, senha);
        if(result === undefined || result.length === 0){
            return {success: false, token: null}
        }else{
            return {success: true, token: this.token.createToken(login)}
        }
    }

    public async createLogin(login: ILogin, token:string){
        const validateToken = this.token.validateToken(token);
        if(validateToken == false){
            return {success: false, token: null}
        }else{
            await this.loginEntity.addLogin(login);
            return {success: true}
        }
    }

    public async getLogins(token: string, id?: string){
        if(this.token.validateToken(token)){
            const result = await this.loginEntity.getLogins(id);
            if(result.length ===0){
                return {payload: result, success: false}
            }
            return {payload: result, success: true};
        }else{
            return {payload: "Token inválido!", success: false};
        }
    }

    public async updateLogin(token: string, login:ILogin, idUsuarioLogado: string){
        if(this.token.validateToken(token)){
            const result = await this.loginEntity.updateLogin(token, login, idUsuarioLogado);
            if(result){
                return {payload: result, success: true}
            }
            return {payload: result};
        }else{
            return {payload: "Token inválido!", success: false};
        }
    }

    public async deleteLogin(token: string, login:ILogin, idUsuarioLogado: string){
        if(this.token.validateToken(token)){
            const result = await this.loginEntity.deleteLogin(token, login, idUsuarioLogado);
            if(result){
                return {payload: result, success: true}
            }
            return {payload: result};
        }else{
            return {payload: "Token inválido!", success: false};
        }
    }
}



