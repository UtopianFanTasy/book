import {
  get
} from "../../utils/db"
Page({
  data: {
    types: []
  },
  async onLoad() {
    let result = await get({
      collection: "type",
      limit:10,
      skip:0,
      where:{}
    }).catch(err => {
      console.error(err);
    })
    this.setData({
      types: result.data
    })
  },
  tolist(e){
    let id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/list/list?id='+id,
    })
  }
})