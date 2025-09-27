import { Db } from "../Db.js";

export interface IStatusMaquina {
    id_status_maquina?: number;
    ds_status_maquina: string;
    dt_criacao?: string;
    id_usuario_criacao: number;
    dt_ultima_alteracao?: string;
    id_usuario_ultima_alteracao?: number;
    fg_ativo?: number;
    cd_rgb: string;
}

export class StatusMaquinaDAO{
    private db: Db;

    constructor(){
        this.db = new Db();
    }

     public async getStatusMaquina(id_status_maquina?: string){
        let sql = "SELECT id_status_maquina, ds_status_maquina, cd_rgb, fg_ativo FROM tb_status_maquina";
        
        if(id_status_maquina){
            sql += " WHERE id_status_maquina = ?";
        }
        
        const result = await this.db.query(sql, [id_status_maquina]);
        return result as IStatusMaquina[];
    } 

    public async addStatusMaquina(statusMaquina: IStatusMaquina){
        const sql = "insert into tb_status_maquina (ds_status_maquina, id_usuario_criacao, cd_rgb) values(?,?,?)";
        await this.db.execute(sql, [statusMaquina.ds_status_maquina, statusMaquina.id_usuario_criacao, statusMaquina.cd_rgb]);
    } 

    public async updateStatusMaquina(statusMaquina: IStatusMaquina, id:string){
        const sql = "update tb_status_maquina set ds_status_maquina=?, fg_ativo=?, id_usuario_ultima_alteracao=?, dt_ultima_alteracao =NOW(), cd_rgb=? where id_status_maquina=? ";
        await this.db.execute(sql, [statusMaquina.ds_status_maquina, statusMaquina.fg_ativo, statusMaquina.id_usuario_ultima_alteracao, statusMaquina.cd_rgb, id]);
    }  
        
    public async deleteStatusMaquina(statusMaquina: IStatusMaquina, id:string){
        const sql = "update tb_status_maquina set fg_ativo =0, dt_ultima_alteracao =NOW(), id_usuario_ultima_alteracao=? where id_status_maquina=? ";
        await this.db.execute(sql, [statusMaquina.id_usuario_ultima_alteracao, id]);
    } 
}