<template>
    <aside :class="[
                'cart-container',
                showSidebar ? 'show-cart':''
            ]"
    >
        <div class="cart">
          <h1 class="cart-title spread">
            <span>
              Cart
              <i class="icofont-cart-alt icofont-1x"></i>
            </span>
            <button class="cart-close" @click="toggleCart">&times;</button>
          </h1>

          <div class="cart-body">
            <table class="cart-table">
              <thead>
                <tr>
                  <th><span class="sr-only">Product Image</span></th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th><span class="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(cartItem, key, index) in cart"
                  :key="index"
                >
                  <td>
                    <img :src="getSrcImg(key)" :alt="key" width="35" height="35" />
                  </td>
                  <td>{{ key }}</td>
                  <td>${{ getPrice(key) }}</td>
                  <!-- <td>$1.00</td> -->
                  <td class="center"> {{ cartItem }} </td>
                  <td>${{ (cartItem*getPrice(key)).toFixed(2) }}</td>
                  <td class="center">
                    <button class="btn btn-light cart-remove" @click="deleteItem(key)">
                      &times;
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <p class="center" v-if="!Object.keys(cart).length"><em>No items in cart</em></p>

            <div class="spread">
              <span><strong>Total:</strong> ${{ getTotalCartPrice() }} </span>
              <button class="btn btn-light" @click="placeOrder">Checkout</button>
            </div>
          </div>
        </div>
    </aside>
    <div 
    :class="[
        'overlay',
        {'show': showSidebar}
    ]"
    @click="toggleCart"
    ></div>
</template>

<script>
export default {
    props: ['toggleCart', 'showSidebar', 'cart', 'inventory', 'placeOrder'],
    methods: {
      getTotalCartPrice() {
        let keys = Object.keys(this.cart);
        let totalPrice = Object
                          .values(this.cart)
                          .reduce((acc, curr, index) => {
                            return acc + (curr * this.getPrice(keys[index]));
                          }, 0);
        return totalPrice.toFixed(2);
      },
      getItem(item) {
        return this.inventory.find(value => value.name === item)
      },
      getPrice (itemName) {
        let item = this.getItem(itemName);
        return item.price.USD.toFixed(2);
      },
      getSrcImg(item) {
        let img = this.getItem(item);

        try {
          let image = require(`@/assets/images/products/${img.icon}.png`);
          return image;
        } catch (error) {
          console.log(error.message);
          return './vegetable.png';
        }
      },
      deleteItem (item) {
        delete this.cart[item];
      }
    }
}
</script>