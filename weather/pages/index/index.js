//index.js
//获取应用实例
Page({
  data: {
    nowTemp: '14',
    nowWeather: '多云'
  },
  onLoad() {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now', //接口地址
      data: {
        city: '广州市'
      },
     
      success: res => {
        console.log(res)
        let result = res.data.result
        let temp = result.now.temp
        let weather = result.now.weather
        console.log(temp, weather)
      }
    })
  }
})
