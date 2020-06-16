import Vue from 'vue'
import yxbContainer from './yxb-container'
import yxbHighlight from './yxb-highlight'
import yxbIcon from './yxb-icon'
import yxbIconSelect from './yxb-icon-select'
import yxbIconSvg from './yxb-icon-svg'
import yxbIconHelp from './yxb-help'
import yxbNumberContainer from './yxb-number-container'
import yxbPageHeader from './yxb-page-header'
import yxbPageBody from './yxb-page-body'
import jcyPageBody from './jcy-page-body'
import yxbPageEdit from './yxb-page-edit'
import jcyPageDetail from './jcy-page-detail'
import jcyPageAudit from './jcy-page-audit'

// 注意 有些组件使用异步加载会有影响
Vue.component('yxb-container', yxbContainer)
Vue.component('yxb-highlight', yxbHighlight)
Vue.component('yxb-icon', yxbIcon)
Vue.component('yxb-icon-select', yxbIconSelect)
Vue.component('yxb-icon-svg', yxbIconSvg)
Vue.component('yxb-help', yxbIconHelp)
Vue.component('yxb-number-container', yxbNumberContainer)
Vue.component('yxb-page-header', yxbPageHeader)
Vue.component('yxb-page-body', yxbPageBody)
Vue.component('jcy-page-body', jcyPageBody)
Vue.component('yxb-page-edit', yxbPageEdit)
Vue.component('jcy-page-detail', jcyPageDetail)
Vue.component('jcy-page-audit', jcyPageAudit)
