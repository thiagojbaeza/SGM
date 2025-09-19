import { LoginDAO, type ILogin } from "../Database/Entities/Login.ts";
import { Token } from "../Utils/token.ts";

export class LoginController{
    private loginEntity = new LoginDAO();
    private token = new Token(); 

    public async login(login:string, senha:string, id?: string){
        const result = await this.loginEntity.getLogin(login, senha, id);
        if(result === undefined){
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
}



