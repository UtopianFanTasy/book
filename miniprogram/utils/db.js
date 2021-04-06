const db = wx.cloud.database()

function get({
  collection,
  limit = 100,
  skip = 0,
  where = {},
  field = {},
  orderBy = {
    field: "addtime",
    sort: "desc"
  }
}) {
  return db.collection(collection).where(where).skip(skip).limit(limit)
    .field(field)
    .orderBy(orderBy.field, orderBy.sort)
    .get()
}

function update({
  collection = "",
  data = {},
  id
}) {
  return db.collection(collection).doc(id).update({
    data: data
  })
}

function findbyin({
  collection = "",
  arr = []
}) {
  return db.collection(collection).where({
    _id: db.command.in(arr)
  }).get()
}

function search({
  collection,
  keyword = ""
}) {
  return db.collection(collection).where({
    name: db.RegExp({
      regexp: keyword,
      options: "i",
    })
  }).get().catch(err => console.error(err))
}


function add({
  collection,
  data
}) {
  return db.collection(collection).add({
    data
  })
}

function inc({
  collection = "",
  id = "",
  count = 1
}) {
  db.collection(collection).doc(id).update({
    data: {
      views: db.command.inc(count)
    }
  })
}

function getById({
  collection = "",
  id = ""
}) {
  return db.collection(collection).doc(id).get()
}

function remove({
  collection = "",
  where = {}
}) {
  return db.collection(collection).where(where).remove()
}

function uPload(tempPath) {
  let nowtime = new Date().getTime()
  let ext = tempPath.split(".").pop()
  return new Promise((resolve, reject) => {
    wx.cloud.uploadFile({
      cloudPath: nowtime + "." + ext,
      filePath: tempPath,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

async function multiUpload(arr) {
  let promiseArr = []
  arr.forEach(item => {
    let result = uPload(item.url)
    promiseArr.push(result)
  })
  let result1 = await Promise.all(promiseArr)
  console.log(result1);
  let image = result1.map(item => {
    return item.fileID
  })
  return image
}

export {
  get,
  uPload,
  add,
  multiUpload,
  getById,
  inc,
  search,
  remove,
  findbyin,
  update
}