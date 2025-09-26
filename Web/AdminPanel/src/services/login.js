import Rest from "./rest";

export default class loginService extends Rest {
    async getLogin(user, password) {
        const result = await this.api.post('/auth', {'ds_login':user, 'ds_senha': password})
        return result.data
    }

    async getUsuarios(token, id) {
        const endpoint = id ? `/auth/users/${id}` : '/auth/users/';
        const result = await this.api.get(endpoint,null, {headers: { token }});
        return result.data;
    }

/*     async updateUsuario(user,password,active,type,iduser,token, id) {
        const endpoint = id ? `/auth/users/${id}` : '/auth/users/';
        const result = await this.api.put(endpoint,{'ds_nome_usuario':user, 'ds_senha': password, 'fg_ativo': active, 'id_tipo_usuario': type, 'id_usuario_ultima_alteracao': iduser}, {headers: { token }});
        return result.data;
    } */

    async updateUsuario(user, password, active, type, iduser, token, id) {
    const endpoint = id ? `/auth/users/${id}` : '/auth/users/';
    const payload = {
        ds_nome_usuario: user,
        ds_senha: password,
        fg_ativo: active,
        id_tipo_usuario: type,
        id_usuario_ultima_alteracao: iduser
    };
    const headers = { headers: { token } };

    // 🧾 LOG: mostra o que está sendo enviado
    console.log('🔄 PUT para:', endpoint);
    console.log('📦 Payload:', payload);
    console.log('🧾 Headers:', headers);

    const result = await this.api.put(endpoint, payload, headers);
    return result.data;
    }

}