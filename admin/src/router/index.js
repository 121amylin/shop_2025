    import { createRouter, createWebHistory } from 'vue-router';
    // 引入你的组件，例如 AboutView 和 HomeView
    import HomeView from '../views/HomeView.vue';
    import AboutView from '../views/AboutView.vue';

    const routes = [
      {
        path: '/',
        name: 'Home',
        component: HomeView, // 对应 HomeView.vue 组件
      },
      {
        path: '/about',
        name: 'About',
        component: AboutView, // 对应 AboutView.vue 组件
      },
      // ...其他路由配置
    ];

    const router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL), // 或使用其他模式
      routes,
    });

    export default router;