import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "./views/LoginView.vue";
import SignupView from "./views/SignupView.vue";
import HomeView from "./views/HomeView.vue";
import "./style.css";
import App from "./App.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeView, meta: { requiresAuth: true } },
    { path: "/login", component: LoginView },
    { path: "/signup", component: SignupView }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = false; // TODO logic

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

createApp(App).use(router).mount("#app");
