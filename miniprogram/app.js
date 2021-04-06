//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'test-pj-5gh47vun43ed9caa',
        traceUser: true,
      })
    }
    wx.getSetting({
      success: res => {
          wx.login({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.myInfo) {
                this.myInfo(res)
              }
            }
          })
      }
    })
    wx.cloud.callFunction({
      name:"login",
      success:res=>{
        wx.setStorageSync('openid',res.result.openid)
      }
    })
    this.globalData = {
      userInfo: null
    }
  }
})