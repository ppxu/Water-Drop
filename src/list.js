import Vue from 'vue'
import { DatePicker, Message } from 'element-ui'
import List from './List.vue'

Vue.use(DatePicker)

Vue.prototype.$message = Message

new Vue({
  el: '#app',
  render: h => h(List)
})
