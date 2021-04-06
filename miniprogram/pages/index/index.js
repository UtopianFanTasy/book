import {
    get
} from "../../utils/db"
Page({
    data: {
        types: [{
                src: "../../imgs/index_07.jpg",
                typename: "欧洲书籍"
            },
            {
                src: "../../imgs/index_09.jpg",
                typename: "儿童书籍"
            },
        ],
        recipes: [],
        page: 1,
        pagesize: 10,
        ismore:true
    },
    totype(){
        wx.navigateTo({
          url: '/pages/type/type',
        })
    },
    async onLoad() {
    },
    async onShow() {
        wx.showLoading({
            title: '正在加载',
        })
        let result = await get({
            collection: 'menu',
            limit: this.data.pagesize*(this.data.page-1),
            skip: 0,
            where: {}
        }).catch(err => console.error(err))
        if(result.data.length<this.data.pagesize){
            this.data.ismore=false
        }
        this.setData({
            recipes: result.data
        })
        wx.hideLoading()
    },
    onReachBottom: async function () {
        if(!this.data.ismore)return
        this.data.page++
        this.getPage()
    },
    async getPage() {
        wx.showLoading({
            title: '正在加载',
        })
        let result = await get({
            collection: 'menu',
            limit: this.data.pagesize,
            skip: (this.data.page - 1) * this.data.pagesize,
            where: {}
        }).catch(err => console.error(err))
        if(result.data.length<this.data.pagesize){
            this.data.ismore=false
        }
        this.setData({
            recipes: this.data.recipes.concat(result.data)
        })
        wx.hideLoading()
    },
    to(e) {
        let id = e.currentTarget.id
        console.log(id);
        wx.navigateTo({
            url: '/pages/detail/detail?id=' + id,
        })
    }
})