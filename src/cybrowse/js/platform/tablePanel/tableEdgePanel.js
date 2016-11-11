import $ from 'jquery'
import _ from 'lodash'

/** 
 * 界面下边的表格中连线数据面板 
 */
export default class TableEdgePanel {

  constructor() {
  }

  init(props, context) {
    const container = props.container
    const $el = $('<div/>').appendTo($(container))
    this.$el = $el
  }
  update(edgeElements) {
    const edgeDatas = _.map(edgeElements, (item) => {
      return item.data
    })
    let $el = this.$el
    /** 创建表格 */
    let $table = $('<table/>', { class: 'table' })
    let keys = []
    _.each(edgeDatas, (data) => {
      keys.push(_.keys(data))
    })
    keys = _.concat(...keys)
    keys = _.uniq(keys)
    /**
     * 添加表头
     */
    let $title = $('<thead/>').appendTo($table)
    let $thead = $('<tr/>').appendTo($title)
    _.each(keys, (key) => {
      $('<td/>').appendTo($thead).html(key)
    })

    /**
     * 添加表内容
     */
    let $content = $('<tbody/>').appendTo($table)
    _.each(edgeDatas, (data) => {
      let $row = $('<tr/>').appendTo($content)
      _.each(keys, (key) => {
        let value = data[key]
        $(`<td>${value}</td>`).appendTo($row)
      })
    })
    $el.empty()
    $el.append($table)
  }
}