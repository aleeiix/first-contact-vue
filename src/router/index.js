import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
        import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/services",
    name: "services",
    component: () =>
        import(/* webpackChunkName: "services" */ "../views/Services.vue")
  },
  {
    path: "/images/:id",
    name: "images",
    component: () =>
        import(/* webpackChunkName: "images" */ "../views/Images.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
