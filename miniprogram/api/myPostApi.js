import BaseApi from './baseRequest';

const baseUrl = 'post/';

export default {
  query: function(params){
    params = params || {}
    params.url = baseUrl + 'query/' + params.data.postNo;
    return BaseApi.request(params);
  }
}