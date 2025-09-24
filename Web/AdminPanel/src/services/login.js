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

    
}