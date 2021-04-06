const app=getApp()
import {
  get,
  multiUpload,
  add
} from "../../utils/db";
Page({
  data: {
    typeList: [],
    files: null
  },
  async onLoad() {
    let result = await get({
      collection: "type",
      limit: 10,
      skip: 0,
      where: {}
    }).catch(err => {
      console.error(err);
    })
    this.setData({
      typeList: result.data
    })
  },
  handleSelect(e) {
    console.log(e);
    let arr = e.detail.tempFilePaths
    let files = arr.map(item => {
      return {
        url: item
      }
    })
    this.setData({
      files
    })
  },
  async tijiao(e) {
    // 单张图片上传
    // let tempfile=this.data.files[0].url
    // let result = await uPload(tempfile).catch(err=>console.error(err))
    // console.log(result);
    //多张图片上传
    wx.showLoading({
      title: '正在提交',
      mask: true
    })
    let arr = this.data.files
    let image = await multiUpload(arr).catch(err => console.error(err))
    console.log(image);
    let {name,typeid,info}=e.detail.value;
    let {avatarUrl,nickName}= app.globalData.userInfo
    let views=0;
    let likes=0;
    let addtime=new Date().getTime()
    let result = await add({
      collection:"menu",
      data:{ name, avatarUrl,info, nickName, typeid, image, views, likes,addtime}
    }).catch(err=>console.error(err))
    wx.hideLoading()
    console.log(result)
  }
})