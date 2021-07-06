const app =getApp();
const BaseApi = {
  request: function(params){
    params = params || {}
    wx.request({
      url: app.globalData.baseApi + params.url,
      data: params.data,
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
        typeof params.fail === 'function' && params.fail(e)
        wx.showToast({
          icon: 'error',
          title: e.errMsg,
        })
      }
    })
  }
}

export default BaseApi;
