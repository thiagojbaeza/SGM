import { Db } from "../Db.js";

export interface IMotivoPausa{
    id_motivo_pausa?: number;
    ds_motivo_pausa: string;
    dt_criacao?: string;
    id_usuario_criacao: number;
    dt_ultima_alteracao?: string;
    id_usuario_ultima_alteracao?: number;
    fg_ativo?: number;
}

export class MotivoPausaDAO{
    private db: Db;

    constructor(){
        this.db = new Db();
    }

     public async getMotivoPausa(id_motivo_pausa?: string){
        let sql = "SELECT id_motivo_pausa, ds_motivo_pausa FROM tb_motivo_pausa WHERE fg_ativo = 1";
        
        if(id_motivo_pausa){
            sql += " AND id_motivo_pausa = ?";
        }
        
        const result = await this.db.query(sql, [id_motivo_pausa]);
        return result as IMotivoPausa[];
    } 

    public async addMotivoPausa(motivoPausa: IMotivoPausa){
        const sql = "insert into tb_motivo_pausa (ds_motivo_pausa, id_usuario_criacao) values(?,?)";
        await this.db.execute(sql, [motivoPausa.ds_motivo_pausa, motivoPausa.id_usuario_criacao]);
    } 

    public async updateMotivoPausa(motivoPausa: IMotivoPausa, id:string){
        const sql = "update tb_motivo_pausa set ds_motivo_pausa=?, fg_ativo=?, id_usuario_ultima_alteracao=?, dt_ultima_alteracao =NOW() where id_motivo_pausa=? ";
        await this.db.execute(sql, [motivoPausa.ds_motivo_pausa, motivoPausa.fg_ativo, motivoPausa.id_usuario_ultima_alteracao, id]);
    }  
        
    public async deleteMotivoPausa(motivoPausa: IMotivoPausa, id:string){
        const sql = "update tb_motivo_pausa set fg_ativo =0, dt_ultima_alteracao =NOW(), id_usuario_ultima_alteracao=? where id_motivo_pausa=? ";
        await this.db.execute(sql, [motivoPausa.id_usuario_ultima_alteracao, id]);
    } 
}