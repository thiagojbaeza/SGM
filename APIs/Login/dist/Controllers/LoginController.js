import { LoginDAO } from "../Database/Entities/Login";
import { Token } from "../Utils/token";
export class LoginController {
    constructor() {
        this.loginEntity = new LoginDAO();
        this.token = new Token();
    }
    async login(login, senha) {
        const result = await this.loginEntity.getLogin(login, senha);
        if (result === undefined || result.length === 0) {
            return { success: false, token: null };
        }
        else {
            return { success: true, token: this.token.createToken(login) };
        }
    }
    async createLogin(login, token) {
        const validateToken = this.token.validateToken(token);
        if (validateToken == false) {
            return { success: false, token: null };
        }
        else {
            await this.loginEntity.addLogin(login);
            return { success: true };
        }
    }
    async getLogins(token, id) {
        if (this.token.validateToken(token)) {
            const result = await this.loginEntity.getLogins(id);
            if (result.length === 0) {
                return { payload: result, success: false };
            }
            return { payload: result, success: true };
        }
        else {
            return { payload: "Token inválido!", success: false };
        }
    }
    async updateLogin(token, login, idUsuarioLogado) {
        if (this.token.validateToken(token)) {
            const result = await this.loginEntity.updateLogin(token, login, idUsuarioLogado);
            if (result) {
                return { payload: result, success: true };
            }
            return { payload: result };
        }
        else {
            return { payload: "Token inválido!", success: false };
        }
    }
    async deleteLogin(token, login, idUsuarioLogado) {
        if (this.token.validateToken(token)) {
            const result = await this.loginEntity.deleteLogin(token, login, idUsuarioLogado);
            if (result) {
                return { payload: result, success: true };
            }
            return { payload: result };
        }
        else {
            return { payload: "Token inválido!", success: false };
        }
    }
}
//# sourceMappingURL=LoginController.js.map