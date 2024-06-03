import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomePage.vue";
import CheckoutOrder from "../components/CheckoutOrder.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: () => import("../components/ProductDetails.vue"),
    props: true,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: CheckoutOrder,
    props: (route) => ({ cartItems: route.params.cartItems }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
