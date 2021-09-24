# j2m
转换 json 数据为 mockjs 模板.

## 方案
遍历 json, 如果是基本类型的值, 则对 key 和值进行分析得出结果.
例如:

``` js
key = `userName`
value = `张三`

```

| key | type | value |
| - | - | - |
| userName | string | 张三|

``` js
rule = {
  // mockjs 方法位置
  tag: [`name.cname`],
  
  // mockjs 占用符
  tpl: `@cname`,
  
  // 哪些信息项可以匹配该占位符
  info: {
    // value 的值类型 string
    type: `string`,
    
    // key 的特征
    key: [
      [/name$/i], // 以 name 为后缀
    ],
    
    // value 的特征
    value: [
      [str => { // 所有字符都是中文
        return str.match(/[^\u4e00-\u9fa5]/) ? false : true
      }],
      [/^.{2,4}$/, 2], // 2-4 个字符
    ],
  },
}

// info 中的每条规则权值为 1, 当为数组时, 每个数组的第一项是匹配规则, 第二项是权值, 默认为 1
```

如果有3+个数据源, 去掉最高最低取平均值.

## 参考
- http://wll8.gitee.io/mockjs-examples/

## todo
如何参与贡献?
- 交流QQ `1806184632` / 微信 `mypastcn`
- 克隆项目
- 在 `rule.js` 中完善 mockjs 的占位符特征列表
- 使用 `node index.js` 运行主程序

占位符完成度情况
- [x] basic.boolean
- [x] basic.bool
- [ ] basic.natural
- [ ] basic.integer
- [ ] basic.int
- [ ] basic.float
- [ ] basic.character
- [ ] basic.char
- [ ] basic.string
- [ ] basic.str
- [ ] basic.range
- [ ] date.date
  - [x] @date("yyyy-MM-dd")
  - [ ] @date("yy-MM-dd")
- [ ] date.time
- [ ] date.datetime
- [ ] date.now
- [ ] image.image
- [ ] image.img
- [ ] image.dataImage
- [x] color.color
- [ ] color.hex
- [ ] color.rgb
- [ ] color.rgba
- [ ] color.hsl
- [ ] text.paragraph
- [x] text.cparagraph
- [ ] text.sentence
- [ ] text.csentence
- [ ] text.word
- [ ] text.cword
- [ ] text.title
- [x] text.ctitle
- [ ] name.first
- [ ] name.last
- [ ] name.name
- [ ] name.cfirst
- [ ] name.clast
- [x] name.cname
- [ ] web.url
- [ ] web.protocol
- [ ] web.domain
- [ ] web.tld
- [ ] web.email
- [ ] web.ip
- [ ] address.region
- [ ] address.province
- [ ] address.city
- [ ] address.county
- [ ] address.zip
- [ ] helper.capitalize
- [ ] helper.upper
- [ ] helper.lower
- [ ] helper.pick
- [ ] helper.shuffle
- [ ] helper.order
- [ ] misc.d4
- [ ] misc.d6
- [ ] misc.d8
- [ ] misc.d12
- [ ] misc.d20
- [ ] misc.d100
- [ ] misc.guid
- [ ] misc.uuid
- [ ] misc.id
- [ ] misc.increment
- [ ] misc.inc