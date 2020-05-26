<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import store from '@/store/index'; 
import Navbar from "@/components/Navbar"
export default {
    name: 'App',
    components: {
        Navbar
    }
}
</script>

<style lang="scss">
* {
  
}
</style>