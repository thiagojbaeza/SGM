import { Db } from "../Db.js";

export interface IMaquina{
    id_maquina?: number;
    cd_maquina: string;
    ds_nome_maquina: string;
    nr_disponibilidade_maquina: number;
    nr_parada_programada: number;
    nr_parada_nao_programada: number;
    dt_criacao?: string;
    id_usuario_criacao: number;
    dt_ultima_alteracao: string;
    id_usuario_ultima_alteracao?: number;
    fg_ativo?: number;
}

export class MaquinaDAO{
    private db: Db;

    constructor(){
        this.db = new Db();
    }

     public async getMaquina(id_maquina?: string){
        let sql = "SELECT id_maquina, cd_maquina, ds_nome_maquina, nr_disponibilidade_maquina, nr_parada_programada, nr_parada_nao_programada, fg_ativo FROM tb_maquina ";
        
        if(id_maquina){
            sql += " WHERE id_maquina = ?";
        }
        
        const result = await this.db.query(sql, [id_maquina]);
        return result as IMaquina[];
    } 

    public async addMaquina(maquina: IMaquina){
        const sql = "insert into tb_maquina (cd_maquina, ds_nome_maquina, nr_disponibilidade_maquina, nr_parada_programada, nr_parada_nao_programada, id_usuario_criacao) values(?,?,?,?,?,?)";
        await this.db.execute(sql, [maquina.cd_maquina, maquina.ds_nome_maquina, maquina.nr_disponibilidade_maquina, maquina.nr_parada_programada, maquina.nr_parada_nao_programada, maquina.id_usuario_criacao]);
    } 

    public async updateMaquina(maquina: IMaquina, id:string){
        const sql = "update tb_maquina set cd_maquina=?, ds_nome_maquina=?,nr_disponibilidade_maquina =?, nr_parada_programada =?, nr_parada_nao_programada=?, fg_ativo =?, dt_ultima_alteracao =NOW(), id_usuario_ultima_alteracao=? where id_maquina =? ";
        await this.db.execute(sql, [maquina.cd_maquina, maquina.ds_nome_maquina, maquina.nr_disponibilidade_maquina,maquina.nr_parada_nao_programada, maquina.nr_parada_nao_programada, maquina.fg_ativo, maquina.id_usuario_ultima_alteracao, id]);
    }  
        
    public async deleteMaquina(maquina: IMaquina, id:string){
        const sql = "update tb_maquina set fg_ativo =0, dt_ultima_alteracao =NOW(), id_usuario_ultima_alteracao=? where id_maquina =? ";
        await this.db.execute(sql, [maquina.id_usuario_ultima_alteracao, id]);
    } 
}