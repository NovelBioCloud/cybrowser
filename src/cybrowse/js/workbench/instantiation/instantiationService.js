import {
  EventEmitter
} from 'events'
import $ from 'jquery'

import Instantiation from './instantiation'

export default class InstantiationService {

  init(props, context) {
    this.props = props
    this.context = context
    this.instantiation = new Instantiation()
    this.instantiation.init(props, context)

  }
}