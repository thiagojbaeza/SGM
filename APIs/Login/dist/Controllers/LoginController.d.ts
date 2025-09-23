import { type ILogin } from "../Database/Entities/Login";
export declare class LoginController {
    private loginEntity;
    private token;
    login(login: string, senha: string): Promise<{
        success: boolean;
        token: any;
    }>;
    createLogin(login: ILogin, token: string): Promise<{
        success: boolean;
        token: null;
    } | {
        success: boolean;
        token?: never;
    }>;
    getLogins(token: string, id?: string): Promise<{
        payload: any;
        success: boolean;
    }>;
    updateLogin(token: string, login: ILogin, idUsuarioLogado: string): Promise<{
        payload: any;
        success: boolean;
    } | {
        payload: any;
        success?: never;
    }>;
    deleteLogin(token: string, login: ILogin, idUsuarioLogado: string): Promise<{
        payload: any;
        success: boolean;
    } | {
        payload: any;
        success?: never;
    }>;
}
//# sourceMappingURL=LoginController.d.ts.map