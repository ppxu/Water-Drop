<template>
  <div id="app">
    <div v-for="cate in categories">
      <h2>{{cate.label}}</h2>
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

import AV from 'leancloud-storage'

const appId = '883Ml4hpEll5MVigAMlv5W3v-gzGzoHsz'
const appKey = '1wXte4OPEo8xazj2GIoYkjSI'

AV.init({ appId, appKey })

const AVObject = AV.Object.extend('Waters');
const db = new AVObject();

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
];

export default {
  name: 'list',
  data () {
    return {
      categories: categories,
      list: []
    };
  },
  created () {
    db.fetch().then((res) => {
      this.list = res.toJSON().results;
    }, (e) => {
      console.log(e);
    });
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
