import Rest from "./rest";

export default class tipoUsuarioService extends Rest {
/*     async getLogin(user, password) {
        const result = await this.api.post('/tipoUsuario', {'ds_login':user, 'ds_senha': password})
        return result.data
    } */

    async getTipoUsuario(token, id) {
        const endpoint = id ? `/tipoUsuario/${id}` : '/tipoUsuario/';
        const result = await this.api.get(endpoint,null, {headers: { token }});
        return result.data;
    }

/*     async updateTipoUsuario(token, user, password, type, active) {
        const result = await this.api.post('/tipoUsuario/', {'ds_login':user, 'ds_senha': password,'id_tipo_usuario':type, 'fg_ativo': active}, {headers: {token}})
        return result.data
    }    */
}