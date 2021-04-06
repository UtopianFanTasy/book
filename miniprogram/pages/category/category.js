import {
  get,
  add,
  update,
  remove
} from "../../utils/db"
Page({
  data: {
    typelist: [],
    addTag: false,
    updateTag: false,
    name: "",
    id: ""
  },
  onLoad: async function (options) {
    let result = await get({
      collection: "type"
    }).catch(err => console.error(err))
    this.setData({
      typelist: result.data
    })
  },
  showAdd() {
    this.setData({
      addTag: true,
      updateTag:false
    })
  },
  async typeadd() {
    let result = await add({
      collection: "type",
      data: {
        name: this.data.name
      }
    }).catch(err => console.error(err))
    let res = await get({
      collection: "type"
    }).catch(err => console.error(err))
    this.setData({
      addTag: false,
      typelist: res.data
    })
  },
  uptag(e) {
    let id = e.currentTarget.dataset.id
    let nm = e.currentTarget.dataset.name

    console.log(e);
    this.setData({
      name: nm,
      id: id,
      updateTag: true,
      addTag:false
    })
  },
  async update() {
    let result = await update({
      collection: "type",
      id: this.data.id,
      data: {
        name: this.data.name
      }
    }).catch(err => console.error(err))
    let res = await get({
      collection: "type"
    }).catch(err => console.error(err))
    this.setData({
      updateTag: false,
      typelist: res.data
    })
  },
  async del(e) {
    let id = e.currentTarget.id
    wx.showModal({
      title: "删除提示",
      content: "确定要删除么？",
      success: async res => {
        if (res.confirm) {
          let result = await remove({
            collection: "type",
            where: {
              _id: id
            }
          })
          let res = await get({
            collection: "type"
          }).catch(err => console.error(err))
          this.setData({
            typelist: res.data
          })
        } else if (res.cancel) {
          console.log(res.cancel);
        }
      }
    })
  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})