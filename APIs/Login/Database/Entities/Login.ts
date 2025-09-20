import { Db } from "../Db.ts";

export interface ILogin{
    id_usuario?: number;
    ds_nome_usuario: string;
    ds_senha: string;
    id_tipo_usuario: number; 
    fg_ativo: number;
    dt_criacao: string; 
    id_usuario_criacao: number; 
    dt_ultima_alteracao?: string; 
    id_usuario_ultima_alteracao?: number;
    token?: string; 
}

export class LoginDAO{
    private db: Db;

    constructor(){
        this.db = new Db();
    }
     public async getLogin(ds_nome_usuario: string, ds_senha: string){
        const sql = "SELECT ds_nome_usuario, ds_senha FROM tb_login WHERE fg_ativo = 1 and ds_nome_usuario =? and ds_senha=? ";
        const result = await this.db.query(sql, [ds_nome_usuario, ds_senha]);
        return result as ILogin[];
    } 

     public async addLogin(login: ILogin){
        const agora = new Date();
        const sql = "insert into tb_login (ds_nome_usuario, ds_senha,id_tipo_usuario, dt_criacao, id_usuario_criacao, fg_ativo) values(?,?,?,?,?,?)";
        await this.db.execute(sql, [login.ds_nome_usuario, login.ds_senha,login.id_tipo_usuario,agora,login.id_usuario_criacao, 1]);
     }


/*     public async getLoginById(id: string){
        const sql = "select ds_user, ds_password from users where id_user = ?";
        const result = await this.db.query(sql, [id]);
        return result as ILogin[];
    } */

/*     public async addLogin(login: ILogin){
        const sql = "insert into users (ds_nome_usuario, ds_senha,id_tipo_usuario, fg_ativo) values(?,?,?,?)";
        await this.db.execute(sql, [login.ds_nome_usuario, login.ds_senha,login.id_tipo_usuario, 1]);
    } */

/*     public async updateUser(user: ILogin){
        const sql = "update users set ds_user=?, ds_password =? where id_user =?";
        await this.db.execute(sql, [user.ds_user, user.ds_password, user.id_user!]);
    }

    public async deleteUser(id: string){
        const sql = "update users set fg_ativo = 0 where id_user =?";
        await this.db.execute(sql, [id]);
    } */
}