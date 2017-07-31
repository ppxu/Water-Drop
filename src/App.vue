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
      <span v-for="cate in categories">
        <input type="radio" :id="cate.key" :value="cate.key" v-model="category">
        <label :for="cate.key">{{cate.label}}</label>
      </span>
    </div>
    <div class="detail">
      <p class="title">说明：</p>
      <textarea rows=3 v-model="description" placeholder="说点啥～"></textarea>
    </div>
    <button v-on:click="submit">提交</button>
  </div>
</template>

<script>

const getTab = (callback) => {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    const tab = tabs[0];
    callback(tab);
  });
}

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
  name: 'app',
  data () {
    return {
      url: '',
      title: '',
      categories: categories,
      category: '',
      description: '',
    };
  },
  created () {
    this.getContent(tab => {
      this.url = tab.url;
      this.title = tab.title;
    });
  },
  methods: {
    getContent (callback) {
      getTab(callback);
    },
    submit () {
      const post = {
        url: this.url,
        title: this.title,
        category: this.category,
        description: this.description
      };

      console.log(post);
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
  width: 300px;
  min-height: 320px;
  margin: 20px;
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

span {
  display: inline-block;
  margin: 10px 20px 0 0;
}

textarea {
  width: 95%;
  margin-top: 10px;
}

button {
  background-color: #4fc08d;
  border: none;
  border-radius: 4px;
  color: #fff;
  width: 60px;
  height: 30px;
  margin-left: 80%;
  outline: none;
  cursor: pointer;
}

button:hover {
  background-color: #42b983;
}
</style>
