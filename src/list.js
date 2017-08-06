import Vue from 'vue'
import { Button, DatePicker, Message, Loading } from 'element-ui'
import List from './List.vue'

Vue.use(Button)

Vue.use(DatePicker)

Vue.prototype.$loading = Loading.service

Vue.prototype.$message = Message

new Vue({
  el: '#app',
  render: h => h(List)
})
