import Rest from './rest';

export default class loginService extends Rest {
  // 🔐 Login com parâmetros separados
  async getLogin(user, password) {
    const endpoint = '/auth';
    const payload = { ds_login: user, ds_senha: password };

    console.log('🔐 Login - POST');
    console.log('🔗 Endpoint:', endpoint);
    console.log('📦 Payload:', JSON.stringify(payload, null, 2));

    const result = await this.api.post(endpoint, payload);
    console.log('📥 Login response:', result);

    return result.data;
  }

  // 📋 Buscar usuários
  async getUsuarios(token, id = null) {
    const endpoint = id ? `/auth/users/${id}` : '/auth/users/';
    const headers = { headers: { token } };

    console.log('📋 Get usuários - GET');
    console.log('🔗 Endpoint:', endpoint);
    console.log('🧾 Headers:', JSON.stringify(headers, null, 2));

    const result = await this.api.get(endpoint, null, headers);
    console.log('📥 Get usuários response:', result);

    return result.data;
  }

  // 🆕 Criar usuário
  async createUsuario(payload, token) {
    const endpoint = '/auth/create';
    const headers = {
      headers: {
        token,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };

    console.log('🆕 Criar usuário - POST');
    console.log('🔗 Endpoint:', endpoint);
    console.log('📦 Payload:', JSON.stringify(payload, null, 2));
    console.log('🧾 Headers:', JSON.stringify(headers, null, 2));

    try {
      const result = await this.api.post(endpoint, payload, headers);
      console.log('📥 POST response:', result);

      if (!result.ok) {
        console.error('❌ Erro na criação:', {
          status: result.status,
          problem: result.problem,
          data: result.data
        });
      }

      return result.data;
    } catch (error) {
      console.error('🔥 Exceção capturada na criação:', error);
      throw error;
    }
  }

  // 🔄 Atualizar usuário
  async updateUsuario(payload, token, id) {
    const endpoint = id ? `/auth/users/${id}` : '/auth/users/';
    const headers = {
      headers: {
        token,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };

    console.log('🔄 Atualizar usuário - PUT');
    console.log('🔗 Endpoint:', endpoint);
    console.log('📦 Payload:', JSON.stringify(payload, null, 2));
    console.log('🧾 Headers:', JSON.stringify(headers, null, 2));

    try {
      const result = await this.api.put(endpoint, payload, headers);
      console.log('📥 PUT response:', result);

      if (!result.ok) {
        console.error('❌ Erro na atualização:', {
          status: result.status,
          problem: result.problem,
          data: result.data
        });
      }

      return result.data;
    } catch (error) {
      console.error('🔥 Exceção capturada na atualização:', error);
      throw error;
    }
  }
}
