<template>
  <div class="home">
    <TheProductList />
    <hr>
    <TheShoppingCart />
  </div>
</template>

<script>
// @ is an alias to /src
import TheProductList from '@/components/TheProductList.vue'
import TheShoppingCart from '@/components/TheShoppingCart.vue'
  
export default {
  name: 'Home',
  components: {
    TheProductList,
    TheShoppingCart
  }
}
</script>
