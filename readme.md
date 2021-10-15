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
  // mockjs 方法位置, 或自定义标签
  tag: [`name.cname`],
  
  // mockjs 占用符
  tpl: `@cname`,
  
  // 哪些信息项可以匹配该占位符
  info: {
    // value 的值类型 string
    type: `string`,
    
    // key 的特征, tag 中的每个词会自动作为 key 的匹配项
    key: [
      [/^name$/i], // 以 name 为后缀
    ],
    
    // value 的特征
    value: [
      [/^[\u4e00-\u9fa5]{2,4}$/, 2], // 2-4 个中文汉字
    ],
  },
}

// info 中的每条规则权值为 1, 当为数组时, 每个数组的第一项是匹配规则, 第二项是权值, 默认为 1
```

如果有3+个数据源, 去掉最高最低取平均值.

配置技巧:
- 几乎确定的情况, 比如邮箱, url这些是可以确定的, 这时候应写确定的规则, 并设置较高权重
- 不太确定的情况, 比如中文名和地区名, 这时候规则应以最常见方式去写规则, 例如名字可能有4个字的, 但只需考虑2-3个字的即可
- 如果 key 有明显标志时, 请配置 key 的标志
- 如果 value 的类型确认时, 请配置 type
- 当计算出来的权重相同时, 后面的规则会被优先获取

## 参考
- http://wll8.gitee.io/mockjs-examples/

## todo
如何参与贡献?
- 克隆项目
- 在 `rule.js` 中完善 mockjs 的占位符特征列表
- 使用 `node test\index.js` 运行程序

占位符完成度情况
- [ ] address
  - [ ] address.region
  - [ ] address.province
  - [ ] address.city
  - [ ] address.county
  - [ ] address.zip
- [ ] basic
  - [x] basic.boolean
  - [x] basic.bool
  - [ ] basic.natural
    - [x] @natural(18,99)
  - [ ] basic.integer
  - [ ] basic.int
  - [ ] basic.float
  - [ ] basic.character
  - [ ] basic.char
  - [ ] basic.string
  - [ ] basic.str
  - [ ] basic.range
- [ ] color
  - [x] color.color
  - [ ] color.hex
  - [ ] color.rgb
  - [ ] color.rgba
  - [ ] color.hsl
- [ ] date
  - [ ] date.date
    - [x] @date("yyyy-MM-dd")
  - [ ] date.time
  - [ ] date.datetime
    - [ ] @datetime("yyyy-MM-dd HH:mm:ss")
  - [ ] date.now
- [ ] helper
  - [ ] helper.capitalize
  - [ ] helper.upper
  - [ ] helper.lower
  - [ ] helper.pick
  - [ ] helper.shuffle
  - [ ] helper.order
- [ ] image
  - [ ] image.image
  - [ ] image.img
  - [ ] image.dataImage
- [ ] misc
  - [ ] misc.d4
  - [ ] misc.d6
  - [ ] misc.d8
  - [ ] misc.d12
  - [ ] misc.d20
  - [ ] misc.d100
  - [ ] misc.guid
  - [ ] misc.uuid
  - [x] misc.id
  - [ ] misc.increment
  - [ ] misc.inc
- [ ] name
  - [ ] name.first
  - [ ] name.last
  - [ ] name.name
  - [ ] name.cfirst
  - [ ] name.clast
  - [x] name.cname
- [ ] text
  - [ ] text.paragraph
  - [x] text.cparagraph
  - [ ] text.sentence
  - [ ] text.csentence
  - [ ] text.word
  - [ ] text.cword
  - [ ] text.title
  - [x] text.ctitle
- [ ] web
  - [ ] web.url
  - [ ] web.protocol
  - [ ] web.domain
  - [ ] web.tld
  - [ ] web.email
  - [ ] web.ip