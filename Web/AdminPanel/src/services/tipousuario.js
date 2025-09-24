import Rest from "./rest";

export default class tipousuarioService extends Rest {
    async getTipoUsuario(token, id) {
        const endpoint = id ? `/tipousuario/${id}` : '/tipousuario/';
        const result = await this.api.get(endpoint,null, {headers: { token }});
        return result.data;
    }
}