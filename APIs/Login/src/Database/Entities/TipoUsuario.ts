import { Db } from "../Db.js";

export interface ITipoUsuario{
    id_tipo_usuario?: number;
    ds_tipo_usuario: string;
    fg_ativo?: number;
    dt_criacao?: string;
    id_usuario_criacao: number;
    dt_ultima_alteracao?: string;
    id_usuario_ultima_alteracao?: number;
}

export class TipoUsuarioDAO{
    private db: Db;

    constructor(){
        this.db = new Db();
    }

     public async getTipoUsuario(id_tipo_usuario?: string){
        let sql = "SELECT id_tipo_usuario, ds_tipo_usuario FROM tb_tipo_usuario WHERE fg_ativo = 1";
        
        if(id_tipo_usuario){
            sql += " AND id_tipo_usuario = ?";
        }
        
        const result = await this.db.query(sql, [id_tipo_usuario]);
        return result as ITipoUsuario[];
    } 

    public async addTipoUsuario(tipoUsuario: ITipoUsuario){
        const sql = "insert into tb_tipo_usuario (ds_tipo_usuario, id_usuario_criacao) values(?,?)";
        await this.db.execute(sql, [tipoUsuario.ds_tipo_usuario, tipoUsuario.id_usuario_criacao]);
    } 

    public async updateTipoUsuario(tipoUsuario: ITipoUsuario, id:string){
        const sql = "update tb_tipo_usuario set ds_tipo_usuario=?, fg_ativo=?, dt_ultima_alteracao =NOW(), id_usuario_ultima_alteracao=? where id_tipo_usuario =? ";
        await this.db.execute(sql, [tipoUsuario.ds_tipo_usuario, tipoUsuario.fg_ativo, tipoUsuario.id_usuario_ultima_alteracao, id]);
    }  
        
    public async deleteTipoUsuario(tipoUsuario: ITipoUsuario, id:string){
        const sql = "update tb_tipo_usuario set fg_ativo =0, dt_ultima_alteracao =NOW(), id_usuario_ultima_alteracao=? where id_tipo_usuario =? ";
        await this.db.execute(sql, [tipoUsuario.id_usuario_ultima_alteracao, id]);
    } 
}