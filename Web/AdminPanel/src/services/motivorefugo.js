import Rest from './rest';

export default class motivorefugoService extends Rest {
  // 📋 Buscar motivo da refugo
  async getMotivoRefugo(token, id = null) {
    const endpoint = id ? `/motivorefugo/${id}` : '/motivorefugo/';
    const headers = { headers: { token } };

    console.log('📋 Get motivorefugo - GET');
    console.log('🔗 Endpoint:', endpoint);
    console.log('🧾 Headers:', JSON.stringify(headers, null, 2));

    const result = await this.api.get(endpoint, null, headers);
    console.log('📥 Get motivorefugo response:', result);

    return result.data;
  }

  // 🆕 Criar motivo refugo
  async createMotivoRefugo(payload, token) {
    const endpoint = '/motivorefugo';
    const headers = {
      headers: {
        token,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };

    console.log('🆕 Criar motivo refugo - POST');
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

  // 🔄 Atualizar motivo refugo
  async updateMotivoRefugo(payload, token, id) {
    const endpoint = id ? `/motivorefugo/${id}` : '/motivorefugo';
    const headers = {
      headers: {
        token,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };

    console.log('🔄 Atualizar motivo refugo - PUT');
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
