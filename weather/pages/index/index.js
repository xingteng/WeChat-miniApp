//index.js
//获取应用实例
Page({
  onLoad() {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now', //接口地址
      data: {
        city: '广州市'
      },
     
      success: res => {
        console.log(res)
      }
    })
  }
})
