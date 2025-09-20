import { LoginDAO, type ILogin } from "../Database/Entities/Login.ts";
import { Token } from "../Utils/token.ts";



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


/*     public async getUser(token: string){
        if(this.token.validateToken(token)){
            const result = await this.entity.getUser();
            return {payload: result, success: true};
        }else{
            return {payload: null, success: false};
        }
    }

    public async getUserById(id_user:string){
        const result = await this.entity.getUserById(id_user);
        return result;
    }

    public async addUser(user:IUser){
        const result = await this.entity.addUser(user);
        return result;
    }

    public async updateUser(user:IUser){
        const result = await this.entity.updateUser(user);
        return result;
    }

    public async deleteUser(id_user: string){
        const result = await this.entity.deleteUser(id_user);
        return result;
    } */
}



