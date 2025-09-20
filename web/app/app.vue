<script setup>
import { useCounterStore } from '~/stores/counter'
import { useApi } from '~/composables/useApi'
const api = useApi()

const counter = useCounterStore()

const posts = ref([])
const error = ref('')

onMounted(async () => {
  try {
    const res = await api.get('https://jsonplaceholder.typicode.com/posts?_limit=1')
    posts.value = res.data
  } catch (err) {
    error.value = err.message
  }
})


</script>

<template>
  <div>
    123
      <el-button type="danger">Danger</el-button>

       <p>{{ counter.count }}</p>
    <button @click="counter.increment">增加</button>
    <hr>
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
  </div>
  </div>
</template>
<!-- <style lang="scss">

</style> -->
