import $ from 'jquery'
export default class TabPanelService {
  constructor() {

  }
  init(props, context) {

    this.container = props.container
    const $el = $(`
      <div>
        <!-- Tab panes -->
        <div class="tab-content">
          <div role="tabpanel" class="fn-network tab-pane active" id="home">...</div>
          <div role="tabpanel" class="fn-style tab-pane" id="profile">...</div>
        </div>
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active"><a href="#home" role="tab" data-toggle="tab">Home</a></li>
          <li role="presentation"><a href="#profile" role="tab" data-toggle="tab">Profile</a></li>
          <li role="presentation"><a href="#messages" role="tab" data-toggle="tab">Messages</a></li>
          <li role="presentation"><a href="#settings" role="tab" data-toggle="tab">Settings</a></li>
        </ul>
      </div>
    `).appendTo($(this.container))
  }
}