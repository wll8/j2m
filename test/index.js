const util = require(`../util.js`)
const mockjs = require(`mockjs`)
const obj = {
  userName: `张三`,
  describe: `他是一个很有趣的灵魂，时不时就蹦出来一个让人哭笑不得的段子`,
  isDelete: false,
  likeColor: `#79f2e3`,
  likeBook: `一千零一夜`,
  motto: `时间就像海绵里的水，只要愿挤总是有的`,
  age: 18,
  idCard: `522422199512121212`,
  createTime: `2015-02-10 16:43:09`,
  onlineTime: `17:23:41`,
  birth: `1995-01-17`,
  email: `zhang@qq.com`,
}
// 获取数据对应的模板
const tpl = Object.entries(obj).reduce((acc, [key, value]) => {
  const getMockTagRes = util.getMockTag({key, value})[0]
  acc[key] = getMockTagRes ? getMockTagRes.rule.tpl : value
  key === `userName` && console.log(getMockTagRes)
  return acc
}, {})

console.log(`res`, {
  tpl,
  data: mockjs.mock(tpl),
})
