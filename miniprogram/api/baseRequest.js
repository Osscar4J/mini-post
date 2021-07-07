const app =getApp();

const BaseApi = {
  request: function(params){
    params = params || {}
    return new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.baseApi + params.url,
        data: params.data,
        header: {"X-Token": app.globalData.token},
        method: params.method || 'GET',
        success: function(e){
          typeof params.success === 'function' && params.success(e)
          if (e.data.code !== 0){
            wx.showToast({
              icon: 'error',
              title: e.data.msg
            })
          }
        },
        fail: function(e){
          reject(e);
          typeof params.fail === 'function' && params.fail(e)
          wx.showToast({
            icon: 'error',
            title: e.errMsg,
          })
        },
        complete: function(e){
          resolve(e);
        }
      })
    })
  }
}

export default BaseApi;
