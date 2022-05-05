<template>
  <h1 style="text-align:center;">Products</h1>

    <main class="wrapper">
        <div class="card-container">

            <ProductCard
                v-for="(product, index) in inventory"
                :addToCart="addToCart"
                :product="product"
                :index="index"
                :key="product.id"
            />

        </div>
    </main>

</template>

<script>
import ProductCard from "@/components/ProductCard.vue";


export default {
    name: 'ProductsView',
    props: ['inventory', 'addToCart'],
    components: {
        ProductCard
    }
}
</script>