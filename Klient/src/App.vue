<template>
<Header></Header>
<main>
<RouterView />
</main>
<Footer></Footer>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'



export default{
  components: {
  RouterLink,
  RouterView,
  Header,
  Footer
}
}
</script>


<style scoped>


@media (min-width: 1024px) {
 
}
</style>
