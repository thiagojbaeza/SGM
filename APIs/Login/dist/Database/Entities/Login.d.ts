export interface ILogin {
    id_usuario?: number;
    ds_nome_usuario: string;
    ds_senha: string;
    id_tipo_usuario: number;
    fg_ativo: number;
    dt_criacao: string;
    id_usuario_criacao: number;
    dt_ultima_alteracao?: string;
    id_usuario_ultima_alteracao?: number;
}
export declare class LoginDAO {
    private db;
    constructor();
    getLogin(ds_nome_usuario: string, ds_senha: string): Promise<ILogin[]>;
    getLogins(id_usuario?: string): Promise<ILogin[]>;
    addLogin(login: ILogin): Promise<void>;
    updateLogin(token: string, login: ILogin, idUsuarioLogado: string): Promise<{
        data: string;
        result: boolean;
    } | {
        result: boolean;
        data?: never;
    }>;
    deleteLogin(token: string, login: ILogin, idUsuarioLogado: string): Promise<{
        data: string;
        result: boolean;
    } | {
        result: boolean;
        data?: never;
    }>;
}
//# sourceMappingURL=Login.d.ts.map