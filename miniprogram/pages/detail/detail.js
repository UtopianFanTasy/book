// const db = wx.cloud.database()
import {
  add,
  get,
  getById,
  inc,
  remove
} from "../../utils/db"
Page({
  data: {
    detail: {},
    tag: false
  },
  async onLoad(e) {
    let id = e.id
    let openid = wx.getStorageSync('openid')
    let res = await get({
      collection: "follows",
      where: {
        _openid: openid,
        menuid: id
      }
    }).catch(err => console.error(err))
    if (res.data.length > 0) {
      this.setData({
        tag: true
      })
    } else {
      this.setData({
        tag: false
      })
    }
    await inc({
      collection: "menu",
      id: id,
      count: 1
    })

    let result = await getById({
      collection: "menu",
      id
    }).catch(err => console.error(err))
    this.setData({
      detail: result.data
    })

    wx.setNavigationBarTitle({
      title: this.data.detail.name
    })

  },
  pr(e) {
    let url = e.currentTarget.id
    wx.previewImage({
      urls: this.data.detail.image,
      current: url
    })
  },
  async addlike() {
    let menuid = this.data.detail._id
    let result = await add({
      collection: "follows",
      data: {
        menuid
      }
    }).catch(err => console.error(err))
    this.setData({
      tag: true
    })
  },
  async cancelike() {
    let menuid = this.data.detail._id
    let openid = wx.getStorageSync('openid')
    let result = await remove({
      collection: "follows",
      where: {
        _openid: openid,
        menuid: menuid
      }
    }).catch(err => console.error(err))
    this.setData({
      tag: false
    })
  }
})