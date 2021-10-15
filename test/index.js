const deepmerge = require(`deepmerge`)
const util = require(`../util.js`)
const {defaultOption} = require(`../rule.js`)
const mockjs = require(`mockjs`)
const obj = {
  userName: `张三`,
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

const flat = {}
const rootData = obj
const option = deepmerge(defaultOption(), {
  code: [
    `children.like.fruits`,
    `children.sex`,
    `like.type`,
  ],
  keyRule: {
    array: `1-2`,
    object: ``,
  },
})

function toTpl({value, prevPath}) { // 展开对象
  const valueType = util.isType(value)
  const result = {object: {}, array: []}[valueType]
  if(!result) { // 基本数据类型
    return value
  } else { // 复合类型
    Object.entries(value).forEach(([key, val]) => {
      const path = prevPath ? `${prevPath}.${key}` : key;
      const isDeep = [`object`, `array`].includes(util.isType(val))
      if(isDeep) {
        result[key] = Object.keys(val).length // 不处理空内容
          ? toTpl({value: val, prevPath: path}) 
          : val
      } else {
        flat[path] = val
        result[key] = util.getMockTag({
          rootData,
          key,
          value: val,
          path,
          option,
        })[0].rule.tpl || val
      }
    })
  }
  return result
}

/**
 * 处理带规则的 key
 * @param {*} param0 
 * @returns 
*/
function handleTpl({value}) {
  if(option.min === false) {
    return value
  }
  const valueType = util.isType(value)
  const result = {object: {}, array: []}[valueType]
  if(!result) { // 基本数据类型
    return value
  } else { // 复合类型
    Object.entries(value).forEach(([key, val]) => {
      const isDeep = [`object`, `array`].includes(util.isType(val))
      if(isDeep && (Object.keys(val).length === 0)) { // 不处理空内容
        result[key] = val
      } else if(util.isType(val, `array`)) {
        if(option.min) {
          const newKey = isNaN(Number(key)) ? `${key}|${option.keyRule.array}` : key
          result[newKey] = handleTpl({value: [
            val[
              // 获取字符数最多的那条数字作为模板
              val.map(item => JSON.stringify(item).length)
                .reduce((acc, cur, index) => {
                  if(acc.length < cur) {
                    acc.length = cur
                    acc.index = index
                  }
                  return acc
                }, {index: 0, length: 0}).index
            ]
          ]})
        } else {
          result[key] = handleTpl({value: val})
        }
      } else if(util.isType(val, `object`) && (Boolean(key.match(/^\d+$/)) === false)) {
        result[option.keyRule.object ? `${key}|${option.keyRule.object}` : key] = handleTpl({value: val})
      } else {
        result[key] = handleTpl({value: val})
      }
    })
  }
  return result
}

console.log(`res`, 
  mockjs.mock(
    handleTpl({
      value: toTpl({value: obj}),
    })
  ),

  handleTpl({
    value: toTpl({value: obj}),
  }),

)
