<script setup>
import api from './utils/api'
import { ref, onMounted } from 'vue'

import axios from 'axios'

console.log(api.get);


const posts = ref([])
const error = ref('')

import { useCounterStore } from './store/store'

const counter = useCounterStore()



onMounted(async () => {
  try {
    const res = await api.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    posts.value = res
  } catch (err) {
    error.value = err.message
  }
})

</script>

<template>
  <div>
    <nav>
      <router-link to="/">首页</router-link> |
      <router-link to="/about">关于</router-link>
    </nav>
     <h1 class="text-3xl font-bold underline text-blue-600">
    Hello Tailwind!
  </h1>
    <div class="p-4">
      <h1 class="text-xl font-bold">文章列表 (測試用)</h1>

      <div v-if="error" class="text-red-500">
        發生錯誤: {{ error }}
      </div>

      <ul v-else>
        <li v-for="post in posts" :key="post.id">
          {{ post.id }} - {{ post.title }}
        </li>
      </ul>

      <hr>
      <hr>
      <p>Count: {{ counter.count }}</p>
      <p>Double Count: {{ counter.doubleCount }}</p>
      <button @click="counter.increment">Increment</button>
      <input v-model="counter.name" placeholder="Name" />

      <el-button type="danger">Danger</el-button>
    </div>

    <router-view /> <!-- 这里会渲染当前匹配的路由组件 -->
  </div>

</template>

<style lang="scss">
#app {
  background-color: aqua;
}
</style>
