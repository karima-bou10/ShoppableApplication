# Vue3 hotspot library
A simple vue3 library for creating hotspots with adaptive and fully customizable hints.
## Getting started
### Installation
First step is to install it using npm
```
 npm i vue3-hot-spot
```

### Register library as global component (in your main.js file). Add styles sheet in main.js
```
 import HotSpots from ‘vue3-hot-spot’
 import ‘vue3-hot-spot/dist/vue3-hot-spot.css’
```
Add a library component where you want to use it
## Basic Using
```
<HotSpots :image="img"
          :edit="trigger"
          :onHover="true"
          :showOnClick="false"
          :onImageClick="true"
          :defaultInput="true"
          :data="array"
/>
```
First we need to add an image for setting hotspots. Then add a trigger for changing “edit” value for activating and deactivating editing mode. In active editing mode you can add hotspots by clicking on the image. Also you can edit hotspots placed earlier. To customize your hotspots you can use different props listed below. Attention! Hotspot hint will not be displayed if the hint text is empty.
### To see example, read about props and events visit the https://hotspot-documentation.onrender.com/