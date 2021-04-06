import {
  get,
  search
} from "../../utils/db"
Page({
  data: {
    lists: []
  },
  async onLoad(e) {
    let id = e.id
    let keyword = e.keyword
    if (id != undefined) {
      this.getListByTypeid(id)
    } else {
      let result = await search({
        collection: "menu",
        keyword: keyword
      })
      this.setData({
        lists: result.data
      })
    }
  },
  todetail(e) {
    let id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })

  },
  async getListByTypeid(typeid) {
    let result = await get({
      collection: "menu",
      where: {
        typeid: typeid
      }
    }).catch(err => console.error(err))
    result.data.forEach(item => {
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
    console.log(result);
    this.setData({
      lists: result.data
    })
  }
})