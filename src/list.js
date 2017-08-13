import Vue from 'vue'
import { Button, Select, Option, Message, Loading } from 'element-ui'
import List from './List.vue'

Vue.use(Button)

Vue.use(Select)

Vue.use(Option)

Vue.prototype.$message = Message

Vue.prototype.$loading = Loading.service

new Vue({
  el: '#app',
  render: h => h(List)
})
