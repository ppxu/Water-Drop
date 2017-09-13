<template>
  <div id="app">
    <div class="detail">
      <p class="title">链接：</p>
      <p class="content">{{ url }}</p>
    </div>
    <div class="detail">
      <p class="title">标题：</p>
      <p class="content">{{ title }}</p>
    </div>
    <div class="detail">
      <p class="title">分类：</p>
      <span class="category" v-for="cate in categories" :key="cate.key">
        <input type="radio" :id="cate.key" :value="cate.key" v-model="category" />
        <label :for="cate.key">{{cate.label}}</label>
      </span>
    </div>
    <div class="detail">
      <p class="title">说明：</p>
      <textarea rows="3" v-model="description" placeholder="说点啥～"></textarea>
    </div>
    <button :disabled="disable" v-on:click="submit">提交</button>
    <button v-on:click="query">查看列表</button>
    <div :class="[{ 'show': isShow }, 'tip']">{{ tip }}</div>
  </div>
</template>

<script>
import AV from 'leancloud-storage'

const appId = '883Ml4hpEll5MVigAMlv5W3v-gzGzoHsz'
const appKey = '1wXte4OPEo8xazj2GIoYkjSI'

AV.init({ appId, appKey })

const WaterObject = AV.Object.extend('Waters')
const water = new WaterObject()

const categories = [
  {
    key: 'language',
    label: '要闻'
  },
  {
    key: 'tool',
    label: '开源'
  },
  {
    key: 'post',
    label: '文章'
  },
  {
    key: 'study',
    label: '教程'
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
    key: 'interview',
    label: '面试'
  },
  {
    key: 'other',
    label: '其他'
  }
]

export default {
  name: 'popup',
  data () {
    return {
      url: '',
      title: '',
      categories,
      category: 'other',
      description: '',
      tip: '',
      isShow: false,
      disable: false
    }
  },
  created () {
    this.getContent(tab => {
      this.url = tab.url
      this.title = tab.title
    })
  },
  methods: {
    getContent (callback) {
      if(chrome && chrome.tabs && chrome.tabs.query) {
        chrome.tabs.query({
          active: true,
          currentWindow: true
        }, tabs => {
          const tab = tabs[0]
          callback(tab)
        })
      }
    },

    submit () {
      this.disable = true
      const post = {
        url: this.url,
        title: this.title,
        category: this.category,
        description: this.description
      }

      water.save(post).then(() => {
        this.showTip('提交成功')
      }, () => {
        this.showTip('提交失败')
      })
    },

    showTip (txt) {
      this.tip = txt
      this.isShow = true

      window.setTimeout(() => {
        this.isShow = false
        this.disable = false
      }, 1000)
    },

    query () {
      if(chrome && chrome.tabs && chrome.tabs.create) {
        chrome.tabs.create({
          url: './list.html'
        })
      }
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
  color: #1f2d3d;
  width: 300px;
  min-height: 320px;
  margin: 20px;
  position: relative;
  overflow: hidden;
}

.detail {
  width: 100%;
  margin-bottom: 10px;
}

p {
  margin: 0;
  line-height: 24px;
}

.title {
  font-weight: bold;
}

.content {
  word-break: break-all;
}

.category {
  display: inline-block;
  margin-top: 10px;
  width: 25%;
}

textarea {
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin: 10px 0 0;
  padding: 5px;
  resize: none;
}

button {
  background-color: #20a0ff;
  border: none;
  border-radius: 4px;
  color: #fff;
  width: 70px;
  height: 30px;
  float: right;
  margin: 10px 0 0 10px;
  outline: none;
  cursor: pointer;
}

button:hover {
  background-color: #4db3ff;
}

.tip {
  position: absolute;
  top: -30px;
  left: 0;
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background-color: rgba(32, 160, 255, 0.8);
  color: #fff;
  height: 30px;
  line-height: 30px;
  transition: all .5s ease-out;
}

.show {
  top: 0;
}
</style>
