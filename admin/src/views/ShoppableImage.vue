<template>
  <div id="admin-navbar">
    <div id="elzero-app" class="container">
      <ul class="tabs-choose">
        <li @click="activeTab = '1'" :class="{ active: activeTab === '1' }">
          <div class="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
              />
            </svg>
          </div>
          ADD IMAGE
        </li>
        <li @click="activeTab = '2'" :class="{ active: activeTab === '2' }">
          <div class="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                d="M160 32c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160zM396 138.7l96 144c4.9 7.4 5.4 16.8 1.2 24.6S480.9 320 472 320H328 280 200c-9.2 0-17.6-5.3-21.6-13.6s-2.9-18.2 2.9-25.4l64-80c4.6-5.7 11.4-9 18.7-9s14.2 3.3 18.7 9l17.3 21.6 56-84C360.5 132 368 128 376 128s15.5 4 20 10.7zM192 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120V344c0 75.1 60.9 136 136 136H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H136c-48.6 0-88-39.4-88-88V120z"
              />
            </svg>
          </div>
          COLLECTION
        </li>
      </ul>
      <div class="tabs-content">
        <AddImage v-if="activeTab === '1'" />
        <Collection v-if="activeTab === '2'" />
      </div>
    </div>
  </div>
</template>

<script>
import AddImage from "../components/AddImage.vue";
import Collection from "../components/Collection.vue";

export default {
  components: {
    AddImage,
    Collection,
  },
  data() {
    return {
      activeTab: "1",
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  margin: 35px;
  width: auto;
  .tabs-choose {
    margin-bottom: 0;
    text-align: left;
    li {
      display: inline-block;
      padding: 8px 10px;
      background-color: #eee;
      font-weight: 400;
      font-size: medium;
      cursor: pointer;
      opacity: 0.3;
      border-top-right-radius: 4px;
      &.active {
        opacity: 1;
        color: #476ffe;
        border-top: 3px solid #476ffe;
      }
    }
  }
  .tabs-content {
    background-color: #eee;
    margin: 0 auto;
    padding: 10px;
  }
}
.icon-container {
  width: 28px;
  height: 14px;
  margin: 10px 32px;
  display: grid;
  place-items: center;
}
/* Change the color of the SVG icon */
svg path {
  fill: var(--icon-color, #476ffe);
}

.links-urls {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 10px;
  .link {
    padding: 10px 20px;
    display: block;
    background-color: #eee;
    margin-bottom: 10px;
    text-decoration: none;
    color: #777;
  }
}
</style>
