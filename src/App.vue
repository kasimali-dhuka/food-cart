<template>
  <header class="top-bar spread">
    <nav class="top-bar-nav">
      <router-link to="/" class="top-bar-link">
        <i class="icofont-spoon-and-fork"></i>
        <span>Home</span>
      </router-link>
      <router-link to="/products" class="top-bar-link">
        <span>Products</span>
      </router-link>
      <router-link to="/past-orders" class="top-bar-link">
        <span>Past Orders</span>
      </router-link>
    </nav>
    <div class="top-bar-cart-link" @click="toggleSidebar">
      <i class="icofont-cart-alt icofont-1x"></i>
      <span>Cart ({{ cartCount }})</span>
    </div>
  </header>
  <router-view v-bind="myProps" />

  <CartSidebar 
    :showSidebar="showSidebar"
    :toggleCart="toggleSidebar"
    :inventory="inventory"
    :cart="cart"
    :placeOrder="placeOrder"
  />

</template>

<script>
import CartSidebar from '@/components/CartSidebar.vue';
import food from './food.json';

export default {
  components: {
    CartSidebar
  },
  data() {
    return {
      inventory: food,
      cart: {},
      showSidebar: false,
      orders: []
    }
  },
  computed: {
    cartCount() {
      return Object.keys(this.cart).length;
    },
    myProps() {
      let routeProps = {
        inventory: this.inventory,
      }
      if (this.$router.currentRoute.value.name === 'PastOrders') { 
        routeProps.orders = this.orders;
      } else {
        routeProps.addToCart = this.addToCart
      }
      return routeProps;
    }
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    addToCart(productName, index, quantity) {
      if (!this.cart[productName]) this.cart[productName] = 0;
      this.cart[productName] = quantity;
      this.inventory[index].quantity = quantity;
    },
    placeOrder() {
      let cartItems = Object.keys(this.cart);
      cartItems.forEach((value) => {
        let product = this.inventory.find(prod => prod.name === value);
        product.quantity = this.cart[value];
        this.orders.push(product);
        this.$router.push({ name: 'PastOrders' })
        this.toggleSidebar();
      });
    }
  }
}
</script>