import Rest from "./rest";

export default class loginService extends Rest {
    async getLogin(user, password) {
        const result = await this.api.post('/login', {'ds_login':user, 'ds_senha': password})
        return result.data
    }

    async getUsuarios(token, id) {
        const endpoint = id ? `/login/${id}` : '/login/';
        const result = await this.api.get(endpoint,null, {headers: { token }});
        return result.data;
    }

    async updateUsuario(token, user, password, type, active) {
        const result = await this.api.post('/login', {'ds_login':user, 'ds_senha': password,'id_tipo_usuario':type, 'fg_ativo': active}, {headers: {token}})
        return result.data
    }   
}