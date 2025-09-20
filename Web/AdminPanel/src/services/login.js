import Rest from "./rest";

export default class loginService extends Rest {
    async getLogin(user, password) {
        const result = await this.api.post('/login', {'ds_login':user, 'ds_senha': password})
        return result.data
    }
}