<template>
  <div>
    <h1>Shopping cart</h1>
    <ul>
      <li v-for="cartItem in products" :key="cartItem.id">
        {{ cartItem.title }} - {{ cartItem.price }} - {{ cartItem.quantity }}
      </li>
    </ul>
    <p>Total: {{ total }}</p>
    <button @click="checkout">Checkout</button>
    <p v-id="$store.state.checkoutStatus">{{ $store.state.checkoutStatus }}</p>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  
  export default {
    data () {
      return {
        cartItemDetails: []
      }
    },
    computed:  {
      ...mapGetters({
        products: 'cartProducts',
        total: 'cartTotal'
      }),
      ...mapState({
        checkoutStatus: 'checkoutStatus'
      })
    },
    methods: {
      ...mapActions(['checkout'])
    }
  }
</script>

<style scoped>

</style>