/**
 * 获取规则列表
 */
 function getRuleList() {
  return [
    {
      tag: [`basic.boolean`, `basic.bool`],
      tpl: `@bool`,
      info: {
        type: `boolean`,
        key: [
          [/(^has)|(^is)/],
        ],
        value: [],
      },
    },
    {
      tag: [`text.ctitle`],
      tpl: `@ctitle`,
      info: {
        type: `string`,
        key: [
          [/title$/i],
        ],
        value: [
          [str => {
            return str.match(/[^\u4e00-\u9fa5]/) ? false : true
          }],
          [/^.{1,30}$/],
        ],
      },
    },
    {
      tag: [`name.cname`],
      tpl: `@cname`,
      info: {
        type: `string`,
        key: [
          [/name$/i],
        ],
        value: [
          [str => {
            return str.match(/[^\u4e00-\u9fa5]/) ? false : true
          }],
          [/^.{2,4}$/, 2],
        ],
      },
    },
    {
      tag: [`text.cparagraph`],
      tpl: `@cparagraph`,
      info: {
        type: `string`,
        key: [],
        value: [
          [/[\u4e00-\u9fa5]/],
        ],
      },
    },
    {
      tag: [`color.color`],
      tpl: `@color`,
      info: {
        type: `string`,
        key: [],
        value: [
          [/^#[0-9a-f]{6}$/, 2]
        ],
      },
    },
    {
      tag: [`date.date`],
      tpl: `@date("yyyy-MM-dd")`,
      info: {
        type: `string`,
        key: [],
        value: [
          [/^\d\d\d\d-\d\d-\d\d$/, 2]
        ],
      },
    },
  ]
}


module.exports = {
  getRuleList,
}