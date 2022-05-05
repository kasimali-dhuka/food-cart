<template>
  <div>
    <main class="wrapper">
        <h1 style="text-align:center;margin:10px 0px">Past Orders</h1>

        <table class="product-table">
          <thead>
            <tr>
                <td>
                    <span class="sr-only">Product Image</span>
                </td>
                <td>Product</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Total</td>
                <td><span class="sr-only">Actions</span></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="orderItem in orders" :key="orderItem.id">
                <td>
                    <img :src="getSrcImg(orderItem.icon)" :alt="key" width="35" height="35" />
                </td>
                <td>{{ orderItem.name }}</td>
                <td>${{ orderItem.price.USD }}</td>
                <td>{{ orderItem.quantity }}</td>
                <td>${{ (orderItem.quantity*orderItem.price.USD).toFixed(2) }}</td>
                <td><button type="button" class="btn btn-danger">DELETE</button></td>
            </tr>
            <tr v-if="!orders.length">
              <td colspan="10" style="border-top:1px solid black">
                <h4 style="text-align:center;margin:0px;">⚠ No orders yet ⚠</h4>
              </td>
            </tr>
          </tbody>
        </table>
    </main>
  </div>
</template>

<script>
export default {
  props: ['inventory', 'orders'],
  methods: {
    getSrcImg(img) {
      try {
        let image = require(`@/assets/images/products/${img}.png`);
        return image;
      } catch (error) {
        console.log(error.message);
        return './vegetable.png';
      }
    },
  }
}
</script>