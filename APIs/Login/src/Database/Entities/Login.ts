import { Db } from "../Db.js";

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
    
    public async getLogins(id_usuario?: string){
        let sql = "SELECT id_usuario, ds_nome_usuario, ds_senha, fg_ativo FROM tb_login ";
        
        if(id_usuario){
            sql += " WHERE id_usuario = ?";
        }
        
        const result = await this.db.query(sql, [id_usuario]);
        return result as ILogin[];
    }

     public async addLogin(login: ILogin){
        const agora = new Date();
        const sql = "insert into tb_login (ds_nome_usuario, ds_senha,id_tipo_usuario, dt_criacao, id_usuario_criacao, fg_ativo) values(?,?,?,?,?,?)";
        await this.db.execute(sql, [login.ds_nome_usuario, login.ds_senha,login.id_tipo_usuario,agora,login.id_usuario_criacao, 1]);
     }

    public async updateLogin(token: string, login: ILogin, idUsuarioLogado:string){
        const sql = "update tb_login set ds_nome_usuario=?, ds_senha =?, id_tipo_usuario=?, fg_ativo=?, dt_ultima_alteracao=NOW(), id_usuario_ultima_alteracao=? where id_usuario =?";
        ;
        try {
            await this.db.execute(sql, [login.ds_nome_usuario, login.ds_senha, login.id_tipo_usuario, login.fg_ativo, login.id_usuario_ultima_alteracao, idUsuarioLogado])
        } catch (err) {
            return {data:"erro :" + err, result:false}
        }
        
        return {result:true}
    }

        public async deleteLogin(token: string, login: ILogin, idUsuarioLogado:string){
        const sql = "update tb_login set fg_ativo=0, dt_ultima_alteracao=NOW(), id_usuario_ultima_alteracao=? where id_usuario =?";
        ;
        try {
            await this.db.execute(sql, [login.id_usuario_ultima_alteracao, idUsuarioLogado])
        } catch (err) {
            return {data:"erro :" + err, result:false}
        }
        
        return {result:true}
    }

}