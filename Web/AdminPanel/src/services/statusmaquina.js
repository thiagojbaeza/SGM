import Rest from './rest';

export default class statusmaquinaService extends Rest {
  // 📋 Buscar status das maquinas
  async getStatusMaquina(token, id = null) {
    const endpoint = id ? `/statusmaquina/${id}` : '/statusmaquina/';
    const headers = { headers: { token } };

    console.log('📋 Get statusmaquina - GET');
    console.log('🔗 Endpoint:', endpoint);
    console.log('🧾 Headers:', JSON.stringify(headers, null, 2));

    const result = await this.api.get(endpoint, null, headers);
    console.log('📥 Get statusmaquina response:', result);

    return result.data;
  }

  // 🆕 Criar status maquina
  async createStatusMaquina(payload, token) {
    const endpoint = '/statusmaquina';
    const headers = {
      headers: {
        token,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };

    console.log('🆕 Criar statusmaquina - POST');
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

  // 🔄 Atualizar status maquina
  async updateStatusMaquina(payload, token, id) {
    const endpoint = id ? `/statusmaquina/${id}` : '/statusmaquina';
    const headers = {
      headers: {
        token,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };

    console.log('🔄 Atualizar statusmaquina - PUT');
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
