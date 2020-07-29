import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    checkoutStatus: null
  },
  
  getters: { // Computed
    availableProducts ( state ) {
      return state.products.filter( product => product.inventory > 0 )
    },
    cartProducts ( state ) {
      return state.cart.map( cartItem => {
        
        const product = state.products.find( product => product.id === cartItem.id )
        
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
        
      })     
    },
    cartTotal ( state, getters ) {
      let total = 0
      
      getters.cartProducts.forEach( product => {
        total += product.price * product.quantity
      })
      // Reduce vois myös
      return total
    },
    productIsInStock ( ) {
      return ( product ) => {
        return product.inventory > 0
      }
    }
  },
  
  mutations: { // Updates state
    setProducts ( state, products ) {
      state.products = products
    },
    pushProductToCart ( state, productId ) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },
    incrementItemQuantity ( state, cartItem ) {
      cartItem.quantity++
    },
    decrementProductInventory ( state, cartItem ) {
      cartItem.inventory--
    },
    setCheckoutStatus ( state, status ) {
      state.checkoutStatus = status
    },
    emptyCart ( state ) {
      state.cart = []
    }
  },
  
  actions: { // methods
    fetchProducts ( context ) {
      return new Promise (( resolve ) => {
        shop.getProducts( products => {
          context.commit( 'setProducts', products )
          resolve()
        });
      }) 
    },
    addProductToCart ( context, product ) {
      if ( product.inventory > 0 ) {
        
        const cartItem = context.state.cart.find( item => item.id === product.id )
        
        if ( !cartItem ) { // Lisätään itemi carttiin
          context.commit( 'pushProductToCart', product.id)
        } else { // Kasvatetaan itemien määrää
          context.commit( 'incrementItemQuantity', cartItem )
        }
        
      }
      
      context.commit( 'decrementProductInventory', product )
    },
    checkout ( {state, commit} ) {
      shop.buyProducts(
        state.car, 
        () => {
          commit('emptyCart');
          commit('setCheckoutStatus', 'success')
        },
        () => {
          commit('setCheckoutStatus', 'fail')
        }
      )
    }
  },
  
  modules: { 
    
  }
})
