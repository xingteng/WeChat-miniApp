//index.js
//获取应用实例
const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}
const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}
Page({
  data: {
    nowTemp: '',
    nowWeather: '',
    nowWeatherBackground: '',
    hourlyweather: []
  },
  onPullDownRefresh() {
    this.getNow(()=> {
      wx.stopPullDownRefresh()
    })
  },
  onLoad() {
    this.getNow()
  },
  getNow(callback) {
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
        this.setData({
          nowTemp: temp,
          nowWeather: weatherMap[weather],
          nowWeatherBackground: '/images/' + weather + '-bg.png'
        })
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[weather]
        })
        //set hourlyweather
        let forecast = result.forecast
        let hourlyweather = []
        let nowHour = new Date().getHours()
        for (let i = 0; i < 24; i += 3) {
          hourlyweather.push({
            time: (i + nowHour) % 24 + "时",
            iconPath: '/images/' + forecast[i / 3].weather + '-icon.png',
            temp: forecast[i / 3].temp + '°'
          })
        }
        hourlyweather[0].time = '现在'
        this.setData({
          hourlyweather: hourlyweather
        })
      },
      complete:()=>{
        callback && callback()
      }
    })
  }
})
