import {
  get,
  findbyin,
  remove
} from "../../utils/db"
const app = getApp()
Page({
  data: {
    isLogin: false, //是否登录。 false 未登录  true，已经登录
    userInfo: null,
    tid: 0,
    recipes: [],
    types: [],
    lists: [],
  },
  _delStyle(e) {
    let id = e.currentTarget.id
    wx.showModal({
      title: "删除提示",
      content: "确定要删除么？",
      success: async res => {
        if (res.cancel) {

        } else {
          let result = await remove({
            collection: "menu",
            where: {
              _id: id
            }
          })
        }
      }
    })
  },
  onShow() {
    this.onLoad()
  },
  tofabu() {
    wx.navigateTo({
      url: '/pages/category/category',
    })
  },
  tod(e) {
    let id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })

  },
  async onLoad() {
    this.getFollows()
    let openid = wx.getStorageSync('openid')
    let result = await get({
      collection: "menu",
      where: {
        _openid: openid
      }
    }).catch(err => console.error(err))
    let typemenu = await get({
      collection: "type"
    }).catch(err => console.error(err))

    this.setData({
      recipes: result.data,
      types: typemenu.data
    })

    let userInfo = app.globalData.userInfo
    console.log(userInfo);
    if (userInfo == null) {
      app.myInfo = (res) => {
        this.setData({
          userInfo: res.userInfo,
          isLogin: true
        })
      }
    } else {
      this.setData({
        userInfo: userInfo,
        isLogin: true
      })
    }
  },
  click(e) {
    this.setData({
      tid: e.currentTarget.id
    })
  },
  getUserInfo(e) {
    wx.getUserProfile({
      desc: '正在获取', //不写不弹提示框
      success: res =>{      
        let userInfo = res.userInfo
          this.setData({
            userInfo,
            isLogin: true
          })   
      },
      fail: function (err) {
        console.log("获取失败: ", err)
      }
    })
  },
  toadd() {
    wx.navigateTo({
      url: '/pages/pbrecipe/pbrecipe',
    })
  },
  tolist(e) {
    let id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/list/list?id=' + id,
    })
  },
  async getFollows() {
    let openid = wx.getStorageSync('openid')
    let result = await get({
      collection: "follows",
      where: {
        _openid: openid,
      }
    }).catch(err => console.error(err))
    let arr = result.data.map(item => {
      return item.menuid
    })
    let res = await findbyin({
      collection: "menu",
      arr: arr
    }).catch(err => console.error(err))
    res.data.forEach(item => {
      if (item.likes == 0) {
        item.star = 0
      } else if (item.likes > 0 && item.likes <= 10) {
        item.star = 1
      } else if (item.likes > 10 && item.likes <= 20) {
        item.star = 2
      } else if (item.likes > 20 && item.likes <= 30) {
        item.star = 3
      } else if (item.likes > 30 && item.likes <= 40) {
        item.star = 4
      } else {
        item.star = 5
      }
    })
    this.setData({
      lists: res.data
    })

    console.log();
  }
})