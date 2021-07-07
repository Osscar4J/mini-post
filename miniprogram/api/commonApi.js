import BaseApi from './baseRequest';

export default {
  login: function(params){
    params = params || {}
    params.url = 'loginByMiniProgram';
    params.method = 'POST'
    return BaseApi.request(params);
  }
}