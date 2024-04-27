import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Dashboard,
      meta: { title: "Dashboard" },
      beforeEnter: (to, from, next) => {
        // Redirect to the Dashboard page if the root path is accessed
        if (localStorage.getItem("is_expanded") !== "true") {
          localStorage.setItem("is_expanded", "true");
        }
        next();
      },
    },
    {
      path: "/products",
      component: () => import("../views/Products.vue"),
      meta: { title: "Products" },
    },
    {
      path: "/orders",
      component: () => import("../views/Orders.vue"),
      meta: { title: "Orders" },
    },
    {
      path: "/shoppable_image",
      component: () => import("../views/ShoppableImage.vue"),
      meta: { title: "Shoppable image" },
    },
    {
      path: "/message_to_buyer",
      component: () => import("../views/MessageToBuyer.vue"),
      meta: { title: "Message to buyer" },
    },
  ],
});

export default router;
