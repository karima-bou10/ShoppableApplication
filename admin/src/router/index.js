import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Home from "../views/Home.vue";
import AuthService from "../services/auth.service";
import Login from "../views/login.vue";
import Register from "../views/Register.vue";
import Products from "../views/Products.vue";
import Orders from "../views/Orders.vue";
import ShoppableImage from "../views/ShoppableImage.vue";
import MessageToBuyer from "../views/MessageToBuyer.vue";
import Users from "../views/Users.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Login,
    },
    { path: "/register", component: Register },
    {
      path: "/home",
      component: Home,
      meta: { requiresAuth: true },
      children: [
        { path: "", redirect: "dashboard" },
        {
          path: "/dashboard",
          component: Dashboard,
          meta: { title: "Dashboard" },
        },
        { path: "/products", component: Products, meta: { title: "Products" } },
        { path: "/orders", component: Orders, meta: { title: "Orders" } },
        {
          path: "/shoppable_image",
          component: ShoppableImage,
          meta: { title: "ShoppableImage" },
        },
        {
          path: "/message_to_buyer",
          component: MessageToBuyer,
          meta: { title: "Message To Buyer" },
        },
        {
          path: "/users",
          component: Users,
          meta: { title: "Users" },
        },
      ],
    },
  ],
});
// Navigation guard to check authentication for protected routes
router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if user is authenticated
    if (!AuthService.isAuthenticated()) {
      // Redirect to login page if not authenticated
      next("/");
    } else {
      // Continue to the route if authenticated
      next();
    }
  } else {
    // Continue to the route if no authentication required
    next();
  }
});

export default router;
