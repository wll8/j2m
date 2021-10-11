/**
 * 获取规则列表
 */
function getRuleList() {
  // 根据 mockjs 的对象编写的规则
  const mockJsTpl = {
    address: [],
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
        tag: [`basic.natural`],
        tpl: `@natural(18,99)`,
        info: {
          type: `number`,
          key: [
            [/^age$/, 2],
          ],
          value: [
            [/^[1-9][0-9]$/, 2],
          ],
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
            [/name$/i],
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
  return [
    
  ].concat(...Object.values(mockJsTpl))
}


module.exports = {
  getRuleList,
}