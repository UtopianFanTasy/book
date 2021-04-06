import {
  get
} from "../../utils/db"
Page({
  data: {
    keyword: "",
    hotlist: null,
    list: []
  },

  async onLoad() {
    let result = await get({
      collection: "menu",
      limit: 9,
      skip: 0,
      field: {
        name: true,
        _id: true
      },
      orderBy: {
        field: "views",
        sort: "desc"
      }
    })
    this.setData({
      hotlist: result.data
    })
  },
  todetail(e) {
    let id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },
  tolist() {
    let list = wx.getStorageSync('keyarr') || []
    let index = list.findIndex(item => {
      return item == this.data.keyword
    })
    if (index != -1) {
      list.splice(index, 1)
    }
    list.unshift(this.data.keyword)
    wx.setStorageSync('keyarr',list)
    wx.navigateTo({
      url: '/pages/list/list?keyword=' + this.data.keyword,
    })
  },

  jinqi(e) {
    let id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/list/list?keyword=' + id
    })
  },
  onShow() {
    let list=wx.getStorageSync('keyarr')||[];
    this.setData({
      list:list
    })
  }
})