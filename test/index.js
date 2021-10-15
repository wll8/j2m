const mockjs = require(`mockjs`)
const j2m = require(`../index.js`)

const obj = {
  userName: `张三`,
  province: `广东省`,
  city: `东菀市`,
  region: `中江县`,
  describe: `他是一个很有趣的灵魂，时不时就蹦出来一个让人哭笑不得的段子`,
  isDelete: false,
  motto: `时间就像海绵里的水，只要愿挤总是有的`,
  age: 27,
  idCard: `522422199512121212`,
  createTime: `2015-02-10 16:43:09`,
  onlineTime: `17:23:41`,
  birth: `1995-01-17`,
  email: `zhang@qq.com`,
  emptyData: [],
  like: {
    color: `#79f2e3`,
    book: `一千零一夜`,
    fruits: [ `蕉`,`梨香蕉`,`香蕉梨梨`,`香梨蕉`,`香蕉`,`香蕉`,`香蕉`, `香蕉`, `梨子`, `梨子啊啊啊`],
    list: [
      [1,2,3]
    ],
    type: [`搞笑`, `青年`],
  },
  children: [
    {
      name: `张小大`,
      age: 3,
      sex: `男`,
      height: 155,
      score: 89.45,
    },
    {
      name: `张小二`,
      age: 2,
      sex: `男`,
      height: 155,
      score: 42.12,
    },
    {
      name: `张小小`,
      age: 1,
      sex: `女`,
      height: 155,
      score: 79.04,
      like: {
        color: `#123456`,
        book: `硅谷风云`,
        name: 232323,
        fruits: [`香蕉`, `梨子`],
      },
    },
  ],
}
const option = {
  rule: [
  ],
  code: [
    `children.like.fruits`,
    `children.sex`,
    `like.type`,
  ],
  keyRule: {
    array: `1-2`,
    object: ``,
  },
}

console.log(`res`, 
  mockjs.mock(
    j2m(obj, option)
  ),
  j2m(obj, option),
)
