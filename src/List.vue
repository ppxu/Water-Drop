<template>
  <div id="app">
    <h1>Water Drop</h1>
    <div class="datepicker">
      <el-date-picker
        v-model="range"
        :editable=false
        :clearable=false
        size="small"
        placeholder="选择日期范围"
        type="daterange"
        :picker-options="pickerOptions"
        v-on:change="change">
      </el-date-picker>
    </div>
    <div v-for="cate in categories">
      <h2 :id="cate.key">{{cate.label}}</h2>
      <ul>
        <li v-for="post in list.filter(t => t.category === cate.key)">
          <a :href="post.url" target="_blank">
            {{post.title}}
          </a>
          <span>{{post.updatedAt.slice(0, 10)}}</span>
          <blockquote>{{post.description}}</blockquote>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import moment from 'moment'
import AV from 'leancloud-storage'

const appId = '883Ml4hpEll5MVigAMlv5W3v-gzGzoHsz'
const appKey = '1wXte4OPEo8xazj2GIoYkjSI'

AV.init({ appId, appKey })

const AVObject = AV.Object.extend('Waters')
const db = new AVObject()

const categories = [
  {
    key: 'language',
    label: '语言'
  },
  {
    key: 'tool',
    label: '工具'
  },
  {
    key: 'post',
    label: '文章'
  },
  {
    key: 'visual',
    label: '可视化'
  },
  {
    key: 'design',
    label: '设计'
  },
  {
    key: 'commuity',
    label: '社区'
  },
  {
    key: 'resource',
    label: '资源'
  },
  {
    key: 'other',
    label: '其他'
  },
]

const start = moment().day(-1).startOf('day')
const end = moment().day(5).endOf('day')

export default {
  name: 'list',
  data () {
    return {
      categories: categories,
      fulllist: [],
      list: [],
      range: [new Date(start), new Date(end)],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > end.valueOf()
        }
      }
    }
  },
  created () {
    db.fetch().then((res) => {
      this.$message({
        message: '加载成功',
        type: 'success'
      })
      this.fulllist = res.toJSON().results
      this.filter(start, end)
    }, (e) => {
      console.log(e)
      this.$message.error(e.toString())
    })
  },
  methods: {
    change () {
      const newStart = moment(this.range[0]).startOf('day')
      const newEnd = moment(this.range[1]).endOf('day')
      this.filter(newStart, newEnd)
    },

    filter (start, end) {
      this.list = this.fulllist.filter(t => {
        const updated = new Date(t.updatedAt).valueOf()
        return (updated > start.valueOf() && updated < end.valueOf())
      })
    }
  }
}
</script>

<style>
#app {
  font-family: "SF Pro SC","SF Pro Text","SF Pro Icons","PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #2c3e50;
  width: 1000px;
  margin: 50px auto;
  position: relative;
}

a {
  display: inline-block;
  color: #42b983;
  margin-right: 20px;
  line-height: 30px;
}

blockquote {
  padding-left: 20px;
  margin: 10px;
  border-left: 4px solid #e2e3e4;
  line-height: 25px;
}

h1 {
  margin-bottom: 40px;
}

.datepicker {
  position: absolute;
  top: 10px;
  right: 100px;
}
</style>
