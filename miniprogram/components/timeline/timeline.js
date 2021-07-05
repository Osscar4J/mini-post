Page({
  data: {
    images: [
      "https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg",
      "https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg",
      "https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg",
      "https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg"
    ]
  },

  showImages(){
    wx.previewImage({
      urls: this.data.images,
    })
  }
});
