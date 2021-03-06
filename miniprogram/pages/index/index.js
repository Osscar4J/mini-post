//index.js
import CommonAPi from "../../api/commonApi"
import MyPostApi from "../../api/myPostApi"

const app = getApp()

Page({
  data: {
    userInfo: {},
    postNo: null,
    postInfo: null,
  },

  onLoad: function() {
    app.globalData.token = wx.getStorageSync('x-token')
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
    if (!app.globalData.token){
      wx.login({
        timeout: 1000,
        success: async function(res){
          res = await CommonAPi.login({
            data: {code: res.code}
          })
          app.globalData.token = res.data.content
          wx.setStorageSync('x-token', app.globalData.token)
        },
        fail: function(res){
          wx.showToast({
            icon: 'error',
            title: res.errMsg,
          })
        }
      })
    }
  },

  bindInput: function(e){
    for (let k in e.target.dataset){
      this.setData({ [e.target.dataset[k]]: e.detail.value })
    }
  },

  getPostInfo: async function(e){
    let postNo = this.data.postNo != null ? this.data.postNo.trim() : ''
    if (!postNo){
      wx.showToast({
        title: '请输入订单号',
        icon: 'error'
      })
      return false
    }
    wx.showToast({
      title: '正在查询...',
      icon: 'loading',
      mask: true,
      duration: 15000
    })
    let res = await MyPostApi.query({ data: { postNo: postNo } })
    let postList = res.data.content||[]
    postList.forEach(item => {
      item.postTimeFormat = new Date(item.postTime).Format('yyyy/MM/dd hh:mm')
    });
    this.setData({ postInfo: postList })
    wx.hideToast({
      success: (res) => {},
    })
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
