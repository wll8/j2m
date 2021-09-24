const { getRuleList } = require(`./rule.js`)

/**
 * 获取类型对应的值
 */
 function getTypeValue(type) {
  return {
    object: {},
    array: [],
    undefined: undefined,
    number: 0,
    null: null,
  }[type]
}

/**
 * 根据 key 和 value 获取规则信息
 */
function getMockTag({key, value}) {
  const ruleList = getRuleList()
  const ruleListRes = ruleList.map((rule, index) => {
    const typeFeat = Number(isType(value) === rule.info.type)
    const keyFeat = matchList({ruleList: rule.info.key, str: key})
    const valueFeat = matchList({ruleList: rule.info.value, str: value})
    return {
      rule,
      index,
      sum: typeFeat + keyFeat + valueFeat,
      _sum: {typeFeat, keyFeat, valueFeat},
    }
    
  }).sort(({sum: a}, {sum: b}) => b - a)
  return ruleListRes
}

/**
 * 使用规则列表对字符串 str 校验
 * @param {*} param0 
 */
function matchList({ruleList, str}) {
  return ruleList.reduce((acc, [re, weight = 1]) => {
    let fn = {
      regexp: str => str.match(re),
      function: re,
      boolean: () => re,
    }[isType(re)]
    return acc + (fn(str) ? weight : 0)
  }, 0)
}


function isType(data, type = undefined) { // 判断数据是否为 type, 或返回 type
  const dataType = Object.prototype.toString.call(data).match(/\s(.+)]/)[1].toLowerCase()
  return type ? (dataType === type.toLowerCase()) : dataType
}

module.exports = {
  getTypeValue,
  getMockTag,
  isType,
}