import _ from 'lodash'
import { dispose } from '../../base/lifecycle/lifecycle'
import Emitter from '../../base/emitter/emitter'
import cytoscapeEvents from '../constants/cytoscapeEvents'

const DatasourceStrategy = {
  auto: 'auto',
  all: 'all',
  select: 'select'
}

export default class TableDataSourceService {
  constructor() {
    this._toDispose = []
    this._onNodeChange = new Emitter()
    this._onEdgeChange = new Emitter()
    this._datasourceStrategy = DatasourceStrategy.auto
  }
  get datasourceStrategy() {
    return this._datasourceStrategy
  }
  set datasourceStrategy(value) {
    this._datasourceStrategy = value
    this.updateData()
  }
  get onNodeChange() {
    return this._onNodeChange.event
  }
  get onEdgeChange() {
    return this._onEdgeChange.event
  }

  init(props, context) {
    this.props = props
    this.context = context

  }
  ready() {
    const context = this.context
    this.currentDataService = context.services.currentDataService
    this._toDispose.push(this.currentDataService.onChange(() => {
      this.updateData()
    }))
    this.viewPanelService = context.services.viewPanelService

    _.each(['tapend'], (eventName) => {
      const listener = (event) => {
        this.registerViewPanelListener(eventName, event)
      }
      this.viewPanelService.on(eventName, listener)
      this._toDispose.push({
        dispose: () => {
          this.viewPanelService.off(eventName, listener)
        }
      })
    })
  }
  getNodeData() {

  }
  getEdgeData() {

  }

  registerViewPanelListener(eventName, event) {
    setTimeout(() => {
      this.updateData(event.cy)
    }, 100)
  }
  dispose() {
    dispose(this._toDispose)
  }
  updateData(cy) {
    let nodeData = this.currentDataService.getNodeData()
    let edgeData = this.currentDataService.getEdgeData()
    if (cy) {
      /**获取node数据 */
      const selectedNode = cy.elements("node:selected")
      if (selectedNode.length == 0) {
        this._onNodeChange.emit(nodeData)
      } else {
        const _nodeData = _.map(selectedNode, (item) => {
          return _.find(nodeData, (nodeItem) => {
            return nodeItem.data.id === item.data().id
          })
        })
        this._onNodeChange.emit(_nodeData)
      }
      /**获取edge数据 */
      const selectedEdge = cy.elements("edge:selected")
      if (selectedEdge.length == 0) {
        this._onEdgeChange.emit(edgeData)
      } else {
        const _edgeData = _.map(selectedEdge, (item) => {
          return _.find(edgeData, (edgeItem) => {
            return edgeItem.data.source === item.data().source && edgeItem.data.target === item.data().target
          })
        })
        this._onEdgeChange.emit(_edgeData)
      }
    } else {
      this._onNodeChange.emit(nodeData)
      this._onEdgeChange.emit(edgeData)
    }
  }
  selectElement(element) {
    console.log(element)
  }

}