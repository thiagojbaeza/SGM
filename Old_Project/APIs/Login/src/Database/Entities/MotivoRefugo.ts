import { Db } from "../Db.js";

export interface IMotivoRefugo{
    id_motivo_refugo?: number;
    ds_motivo_refugo: string;
    dt_criacao?: string;
    id_usuario_criacao: number;
    dt_ultima_alteracao?: string;
    id_usuario_ultima_alteracao?: number;
    fg_ativo?: number;
}

export class MotivoRefugoDAO{
    private db: Db;

    constructor(){
        this.db = new Db();
    }

     public async getMotivoRefugo(id_motivo_refugo?: string){
        let sql = "SELECT id_motivo_refugo, ds_motivo_refugo FROM tb_motivo_refugo WHERE fg_ativo = 1";
        
        if(id_motivo_refugo){
            sql += " AND id_motivo_refugo = ?";
        }
        
        const result = await this.db.query(sql, [id_motivo_refugo]);
        return result as IMotivoRefugo[];
    } 

    public async addMotivoRefugo(motivoRefugo: IMotivoRefugo){
        const sql = "insert into tb_motivo_refugo (ds_motivo_refugo, id_usuario_criacao) values(?,?)";
        await this.db.execute(sql, [motivoRefugo.ds_motivo_refugo, motivoRefugo.id_usuario_criacao]);
    } 

    public async updateMotivoRefugo(motivoRefugo: IMotivoRefugo, id:string){
        const sql = "update tb_motivo_refugo set ds_motivo_refugo=?, fg_ativo=?, id_usuario_ultima_alteracao=?, dt_ultima_alteracao =NOW() where id_motivo_refugo=? ";
        await this.db.execute(sql, [motivoRefugo.ds_motivo_refugo, motivoRefugo.fg_ativo, motivoRefugo.id_usuario_ultima_alteracao, id]);
    }  
        
    public async deleteMotivoRefugo(motivoRefugo: IMotivoRefugo, id:string){
        const sql = "update tb_motivo_refugo set fg_ativo =0, dt_ultima_alteracao =NOW(), id_usuario_ultima_alteracao=? where id_motivo_refugo=? ";
        await this.db.execute(sql, [motivoRefugo.id_usuario_ultima_alteracao, id]);
    } 
}