import { Db } from "../Db";
export class LoginDAO {
    constructor() {
        this.db = new Db();
    }
    async getLogin(ds_nome_usuario, ds_senha) {
        const sql = "SELECT ds_nome_usuario, ds_senha, id_tipo_usuario FROM tb_login WHERE fg_ativo = 1 and ds_nome_usuario =? and ds_senha=? ";
        const result = await this.db.query(sql, [ds_nome_usuario, ds_senha]);
        return result;
    }
    async getLogins(id_usuario) {
        let sql = "SELECT id_usuario, ds_nome_usuario, ds_senha, id_tipo_usuario, fg_ativo FROM tb_login ";
        if (id_usuario) {
            sql += " WHERE id_usuario = ?";
        }
        const result = await this.db.query(sql, [id_usuario]);
        return result;
    }
    async addLogin(login) {
        const agora = new Date();
        const sql = "insert into tb_login (ds_nome_usuario, ds_senha,id_tipo_usuario, dt_criacao, id_usuario_criacao, fg_ativo) values(?,?,?,?,?,?)";
        await this.db.execute(sql, [login.ds_nome_usuario, login.ds_senha, login.id_tipo_usuario, agora, login.id_usuario_criacao, 1]);
    }
    async updateLogin(token, login, idUsuarioLogado) {
        const sql = "update tb_login set ds_nome_usuario=?, ds_senha =?, id_tipo_usuario=?, fg_ativo=?, dt_ultima_alteracao=NOW(), id_usuario_ultima_alteracao=? where id_usuario =?";
        ;
        try {
            await this.db.execute(sql, [login.ds_nome_usuario, login.ds_senha, login.id_tipo_usuario, login.fg_ativo, login.id_usuario_ultima_alteracao, idUsuarioLogado]);
        }
        catch (err) {
            return { data: "erro :" + err, result: false };
        }
        return { result: true };
    }
    async deleteLogin(token, login, idUsuarioLogado) {
        const sql = "update tb_login set fg_ativo=0, dt_ultima_alteracao=NOW(), id_usuario_ultima_alteracao=? where id_usuario =?";
        ;
        try {
            await this.db.execute(sql, [login.id_usuario_ultima_alteracao, idUsuarioLogado]);
        }
        catch (err) {
            return { data: "erro :" + err, result: false };
        }
        return { result: true };
    }
}
//# sourceMappingURL=Login.js.map