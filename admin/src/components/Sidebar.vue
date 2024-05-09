<template>
  <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
    <div class="logo">
      <img :src="is_expanded ? logoURL1 : logoURL2" alt="logo" />
    </div>

    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-symbols-outlined">
          keyboard_double_arrow_right
        </span>
      </button>
    </div>

    <div class="menu">
      <router-link to="/dashboard" class="button">
        <span class="material-symbols-outlined"> dashboard </span>
        <span class="text">Dashboard</span>
      </router-link>
      <router-link to="/products" class="button">
        <span class="material-symbols-outlined"> package_2 </span>
        <span class="text">Products</span>
      </router-link>
      <router-link to="/orders" class="button">
        <span class="material-symbols-outlined"> shopping_bag </span>
        <span class="text">Orders</span>
      </router-link>
      <router-link to="/users" class="button">
        <span class="material-symbols-outlined"> group </span>
        <span class="text">Users</span>
      </router-link>
      <router-link to="/shoppable_image" class="button">
        <span class="material-symbols-outlined"> adjust </span>
        <span class="text">Shoppable image</span>
      </router-link>
      <router-link to="/message_to_buyer" class="button">
        <span class="material-symbols-outlined"> chat </span>
        <span class="text">Message to buyer</span>
      </router-link>
    </div>

    <div class="flex"></div>

    <div class="menu">
      <router-link to="/settings" class="button">
        <span class="material-symbols-outlined"> settings </span>
        <span class="text">Settings</span>
      </router-link>
      <button @click="handleClick" class="button">
        <span class="material-symbols-outlined"> logout </span>
        <span class="text">Log Out</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
/* eslint-disable */
import { ref, getCurrentInstance } from "vue";
import logoURL1 from "../assets/logoStoreino1.png";
import logoURL2 from "../assets/logoStoreino2.jpg";
import AuthService from "@/services/auth.service";
import { useRouter } from "vue-router";

const router = useRouter();
const instance = getCurrentInstance();

const handleClick = () => {
  // Implement your confirmation logic here
  const confirmLogout = window.confirm("Are you sure you want to log out?");
  if (confirmLogout) {
    AuthService.logout(); // Call logout method from AuthService to clear localStorage
    router.push("/"); // Redirect user to login page
  }
};
//const is_expanded = ref(localStorage.getItem("is_expanded") === "true");
const is_expanded = ref(true);

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;
  localStorage.setItem("is_expanded", is_expanded.value.toString());
  console.log(is_expanded.value);

  instance.emit("toggleExpanded", is_expanded.value);

  // Update main content's margin-left immediately
  const mainContent = document.querySelector(".main-content");
  if (mainContent) {
    mainContent.style.marginLeft = is_expanded.value
      ? `calc(var(--sidebar-width))`
      : "4rem";
  }
};
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  color: var(--grey);
  font-family: "Poppins", sans-serif;
  font-weight: 390;
  font-style: normal;
  width: calc(2rem + 32px);
  overflow: hidden;
  padding: 1rem;
  box-shadow: 1px 0 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  transition: width 0.2s ease;

  .flex {
    flex: 1 1 0%;
  }
  .logo {
    margin-bottom: 1rem;
    width: 100%;
  }
  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;

    .menu-toggle {
      transition: 0.2s ease-in-out;
      .material-symbols-outlined {
        font-size: 1.5rem;
        color: var(--grey);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-symbols-outlined {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      transition: 0.2s ease-in-out;
      padding: 0.6rem 1rem;

      .material-symbols-outlined {
        font-size: 1.5rem;
        color: var(--grey);
        transition: 0.2s ease-in-out;
      }
      .text {
        color: var(--black);
        transition: 0.2s ease-in-out;
        display: none;
      }

      &:hover {
        background-color: #f3f3f3;

        .material-symbols-outlined,
        .text {
          color: var(--primary);
        }
      }

      &.router-link-exact-active {
        border-right: 3px solid var(--primary);

        .material-symbols-outlined,
        .text {
          color: var(--primary);
        }
      }
    }
  }

  .footer {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    p {
      font-size: 0.875rem;
      color: var(--grey);
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);
    .logo {
      width: 97%;
      display: flex;
      justify-content: flex-start;
      margin-left: 28px;
      img {
        width: 60%;
      }
    }
    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    .button .text {
      opacity: 1;
      display: inline-block;
      transition: display 0.2s ease;
    }

    .button {
      .material-symbols-outlined {
        margin-right: 0.5rem;
      }
    }

    .footer {
      opacity: 0;
    }
  }
  .material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 450, "GRAD" 0, "opsz" 24;
    transition: 0.2s ease-out;
    margin-right: 0.5rem;
  }
}
</style>
