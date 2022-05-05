<template>
    <div class="card">
        <div class="card-title">
            {{ product.name }}
        </div>
        <div class="card-body" style="padding-bottom:10px">
            <div class="product-img">
                <img 
                    :src="getSrcImg(product.icon)" 
                    width="160" 
                    height="160" 
                    :alt="product.name"
                />
            </div>
            <form>
                <div class="row">
                    <div class="cell">
                        <label>Type:</label>
                    </div>
                    <div class="cell">
                        <em>{{ product.type }}</em>
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <label>Price:</label>
                    </div>
                    <div class="cell">
                        ${{ product.price.USD }}
                    </div>
                </div>
                <div class="row">
                    <div class="cell">
                        <label>Quantity:</label>
                    </div>
                    <div class="cell input-cell">
                        <input 
                            type="number" 
                            @change="addToCart(product.name, index, quantity)"
                            v-model.number="quantity"
                            ref="qtyInput"
                            min="0"
                        />
                    </div>
                    <div class="cell">
                        <button 
                            class="btn btn-success action-btn"
                            @click="updateQuantity(true)"
                            type="button"
                        >
                            <svg 
                                version="1.1" id="Capa_1" 
                                xmlns="http://www.w3.org/2000/svg" 
                                xmlns:xlink="http://www.w3.org/1999/xlink" 
                                x="0px" 
                                y="0px"
                                viewBox="0 0 60.364 60.364" 
                                style="enable-background:new 0 0 60.364 60.364;" 
                                xml:space="preserve"
                                width="10px"
                                height="10px"
                            >
                                <g>
                                <path d="M54.454,23.18l-18.609-0.002L35.844,5.91C35.845,2.646,33.198,0,29.934,0c-3.263,0-5.909,2.646-5.909,5.91v17.269
                                    L5.91,23.178C2.646,23.179,0,25.825,0,29.088c0.002,3.264,2.646,5.909,5.91,5.909h18.115v19.457c0,3.267,2.646,5.91,5.91,5.91
                                    c3.264,0,5.909-2.646,5.91-5.908V34.997h18.611c3.262,0,5.908-2.645,5.908-5.907C60.367,25.824,57.718,23.178,54.454,23.18z"/>
                                </g>
                            </svg>
                        </button>
                        <button 
                            class="btn btn-danger action-btn"
                            @click="updateQuantity(false)"
                            type="button"
                        >
                            <svg 
                                version="1.1" 
                                id="Capa_1" 
                                xmlns="http://www.w3.org/2000/svg" 
                                xmlns:xlink="http://www.w3.org/1999/xlink" 
                                x="0px" 
                                y="0px"
                                viewBox="0 0 52.161 52.161" 
                                style="enable-background:new 0 0 52.161 52.161;" 
                                xml:space="preserve"
                                width="10px"
                                height="10px"
                            >
                                <g>
                                <path d="M52.161,26.081c0,3.246-2.63,5.875-5.875,5.875H5.875C2.63,31.956,0,29.327,0,26.081l0,0c0-3.245,2.63-5.875,5.875-5.875
                                    h40.411C49.531,20.206,52.161,22.835,52.161,26.081L52.161,26.081z"/>
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <!-- <div class="card-footer" :data-index="index">
        <button @click="addToCart(product.name, index, product.quantity)" class="btn btn-light addToCart">
            Add to cart
        </button>
        </div> -->
    </div>
</template>

<script>
export default {
    props: ['addToCart','product','index'],
    data () {
        return {
            quantity: 0
        }
    },
    methods: {
        updateQuantity(inc) {
            let qtyInputEvent = new Event('change');
            if (inc) {
                ++this.quantity;
            } else {
                if (this.quantity <= 0) return;
                --this.quantity;
            }
            this.$refs.qtyInput.dispatchEvent(qtyInputEvent);
        },
        getSrcImg(img) {
            try {
                let image = require(`@/assets/images/products/${img}.png`);
                return image;
            } catch (error) {
                console.log(error.message);
                return './vegetable.png';
            }
        }
    }
}
</script>