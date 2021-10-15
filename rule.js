/**
 * 获取规则列表
 */
function getRuleList(userRule = []) {
  // 根据 mockjs 的对象编写的规则
  const mockJsTpl = {
    address: [
      {
        tag: [`address.province`],
        tpl: `@province()`,
        info: {
          type: `string`,
          key: [],
          value: [
            [/^[\u4e00-\u9fa5]{2}省$/, 2]
          ],
        },
      },
      {
        tag: [`address.city`],
        tpl: `@city()`,
        info: {
          type: `string`,
          key: [],
          value: [
            [/^[\u4e00-\u9fa5]{2}市$/, 2]
          ],
        },
      },
      {
        tag: [`address.county`],
        tpl: `@county()`,
        info: {
          type: `string`,
          key: [],
          value: [
            [/^[\u4e00-\u9fa5]{2}县$/, 2]
          ],
        },
      },
    ],
    basic: [
      {
        tag: [`basic.boolean`, `basic.bool`],
        tpl: `@bool`,
        info: {
          type: `boolean`,
          key: [],
          value: [],
        },
      },
      {
        tag: [`basic.integer`, `basic.int`],
        tpl: `@integer(18,99)`,
        info: {
          type: [`integer`, `int`],
          key: [
            [/^age$/, 2],
          ],
          value: [
            [/^[1-9][0-9]$/, 2],
          ],
        },
      },
      {
        tag: [`basic.float`],
        tpl: `@float()`,
        info: {
          type: `float`,
          key: [],
          value: [],
        },
      },
    ],
    color: [
      {
        tag: [`color.color`, `color.hex`],
        tpl: `@hex`,
        info: {
          type: `string`,
          key: [],
          value: [
            [/^#[0-9a-fA-F]{6}$/, 2]
          ],
        },
      },
    ],
    date: [
      {
        tag: [`date.date`],
        tpl: `@date("yyyy-MM-dd")`,
        info: {
          type: `string`,
          key: [],
          value: [
            [/^(?:[1-9]\d)\d\d-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1]))$/, 2]
          ],
        },
      },
      {
        tag: [`date.datetime`],
        tpl: `@datetime("yyyy-MM-dd HH:mm:ss")`,
        info: {
          type: `string`,
          key: [],
          value: [
            [/^(?:[1-9]\d)\d\d-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1]\d)):[0-5]\d:[0-5]\d$/, 2]
          ],
        },
      },
      {
        tag: [`date.time`],
        tpl: `@time("HH:mm:ss")`,
        info: {
          type: `string`,
          key: [],
          value: [
            [/^(?:(?:[0-2][0-3])|(?:[0-1]\d)):[0-5]\d:[0-5]\d$/, 2]
          ],
        },
      },
    ],
    helper: [],
    image: [],
    misc: [
      {
        tag: [`misc.id`],
        tpl: `@id`,
        info: {
          type: `string`,
          key: [
          ],
          value: [
            [/^([0-9]){18}(X)?$/, 2],
          ],
        },
      },
    ],
    name: [
      {
        tag: [`name.cname`],
        tpl: `@cname`,
        info: {
          type: `string`,
          key: [
            [/^userName$/i, 2],
            [/^fullName$/i, 2],
          ],
          value: [
            [/^[\u4e00-\u9fa5]{2,4}$/, 2],
            [/^[\u4e00-\u9fa5]{2}$/],
          ],
        },
      },
    ],
    text: [
      {
        tag: [`text.cparagraph`],
        tpl: `@cparagraph`,
        info: {
          type: `string`,
          key: [],
          value: [
            [/^[^\x00-\xff]{19,}$/],
          ],
        },
      },
      {
        tag: [`text.csentence`],
        tpl: `@csentence(12,18)`,
        info: {
          type: `string`,
          key: [],
          value: [
            [/^[^\x00-\xff]{12,18}$/],
          ],
        },
      },
      {
        tag: [`text.ctitle`],
        tpl: `@ctitle(5,11)`,
        info: {
          type: `string`,
          key: [
            [/title$/i],
          ],
          value: [
            [/^[^\x00-\xff]{5,11}$/, 2],
          ],
        },
      },
    ],
    web: [
      {
        tag: [`web.email`],
        tpl: `@email`,
        info: {
          type: `string`,
          key: [],
          value: [
            [/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, 2]
          ],
        },
      },
    ],
  }
  return userRule.concat(...Object.values(mockJsTpl)).map(item => {
    item.info.type = typeof(item.info.type) === `string` 
      ? [item.info.type] 
      : item.info.type
    const strTpl = typeof(item.tpl) === `string` ? String(item.tpl) : undefined
    item.tpl = strTpl
    ? function(){return strTpl}
    : item.tpl
    
    return item
  })
}

/**
 * 生成方法的配置
 */
function defaultOption() {
  const option = {
    /**
      指定 code 字段
      
      被指定的字段不会新的数据, 而是从已有数据中选择
      
      例如:
      - 原始数据:
      ``` js
      {
        like: [
          {
            name: `张三`,
          },
          {
            name: `李四`,
          },
        ],
      }
      ```
      - 指定前:
      ``` js
      {
        like: [
          {
            name: `@cname`,
          },
        ],
      }
      ```
      - 指定后: `{code: [`like.name`]}`
      ``` js
      {
        like: [
          {
            name: `@pick('张三', '李四')`,
          },
        ],
      }
      ```
    */
    code: [],
    
    /**
      是否处理数组中的所有项为单个模板
      - 否
      不进行类型统一推测
      
      - 是 - 默认
      自动根据平均数、众数等规则获取最可能的特征生成单个模板
    */
    min: true,
    
    /**
      配置 key 的规则
    */
    keyRule: {
      /**
        当 option.min 为 true 时, 随机生成 x-y 条数据
      */
      array: `3-7`,
      
      /**
        设置对象的生成规则
      */
      object: undefined,
    },
  }
  return option
}

module.exports = {
  getRuleList,
  defaultOption,
}