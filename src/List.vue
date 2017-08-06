<template>
  <div id="app">
    <h1>Water Drop</h1>
    <div class="toolbar">
      <el-date-picker
        v-model="range"
        :editable=false
        :clearable=false
        size="small"
        placeholder="选择日期范围"
        type="daterange"
        :picker-options="pickerOptions"
        @change="change">
      </el-date-picker>
      <el-button type="success" size="small" @click="weekly">Export Weekly</el-button>
    </div>
    <div v-for="cate in categories">
      <h2 :id="cate.key">{{cate.label}}</h2>
      <ul>
        <li v-for="post in list.filter(t => t.category === cate.key)">
          <a :href="post.url" target="_blank">
            {{post.title}}
          </a>
          <span>{{post.createdAt.slice(0, 10)}}</span>
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

const _start = moment().day(-2).startOf('day')
const _end = moment().day(5).endOf('day')

export default {
  name: 'list',
  data () {
    return {
      categories: categories,
      list: [],
      range: [new Date(_start), new Date(_end)],
      start: _start.format('YYMMDD'),
      end: _end.format('YYMMDD'),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > end.valueOf()
        }
      }
    }
  },
  created () {
    this.load(_start, _end)
  },
  methods: {
    change () {
      const newStart = moment(this.range[0]).startOf('day')
      const newEnd = moment(this.range[1]).endOf('day')

      this.start = newStart.format('YYMMDD');
      this.end = newEnd.format('YYMMDD');

      this.load(newStart, newEnd)
    },

    load (start, end) {
      const loading = this.$loading({
        fullscreen: true
      })

      this.query(start, end).then((res) => {
        loading.close()

        this.$message({
          message: '数据加载成功',
          type: 'success'
        })

        this.list = res.map(t => t.toJSON())
      }, (e) => {
        console.log(e)
        this.$message.error(e.toString())
      })
    },

    query (start, end) {
      const startQuery = new AV.Query('Waters')
      startQuery.greaterThan('createdAt', new Date(start))

      const endQuery = new AV.Query('Waters')
      endQuery.lessThan('createdAt', new Date(end))

      const query = AV.Query.and(startQuery, endQuery)

      return query.find()
    },

    weekly () {
      let md = ''
      categories.forEach(c => {
        let str = `## **${c.label}**\n\n`
        this.list.filter(t => t.category === c.key).forEach(p => {
          str += `* [${p.title}](${p.url})\n\n> ${p.description}\n\n`
        })
        md += str
      })

      const blob = new Blob([md])
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.download = `${this.start}-${this.end}.md`
      a.href = url
      a.click()
      URL.revokeObjectURL(url)
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

h1 {
  margin-bottom: 50px;
}

.toolbar {
  position: absolute;
  top: 10px;
  right: 10px;
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
</style>
