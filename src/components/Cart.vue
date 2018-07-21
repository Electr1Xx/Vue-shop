<template>
  <div class="capsule cart">

    <div v-if="cartTotal > 0">
      <h1>Корзина</h1>
      <div class="cartitems"
           v-for="item in cart"
           :key="item.item.id" v-show="item.quantity">
        <img class="cartimg" :src="`${item.item.img}`" :alt="`Image of ${item.item.name}`">
        <div class="carttext">
          <h4>{{ item.item.name }}</h4>
          <p >{{ item.item.price  | uah}} грн. x {{ item.quantity }}</p>
        </div>
        <div>
        <button @click="addItem(item.item)">+</button>
        <button @click="removeFromCart(item.item)">-</button>
        </div>
        <p class="totalitem">Итого: <strong>{{ item.item.price * item.quantity | uah }} грн.</strong></p>

      </div>
      <div class="total">
        <button class="remove" @click="removeCart">Очистить корзину</button>
        <h3>Итого: {{ total | uah }} грн.</h3>
      </div>
      <div class="buy">
        <button class="buy" @click="buy">Купить</button>
      </div>
    </div>

    <div v-else-if="cartTotal === 0 && success === false" class="empty">
      <h1>Корзина</h1>
      <h3>Корзина пуста.</h3>
      <router-link exact to="/"><button class="remove">За покупками!</button></router-link>
    </div>

    <div v-else>
      <h2>Успешно!</h2>
      <p>Твой заказ в обработке</p>
    </div>
  </div>
</template>

<script>
import {UAH} from '../uah'

export default {
  name: 'cart',
  data () {
    return {
      success: false
      }
  },
  filters: {
    uah: function (value) {
      return UAH(value)
    }
  },
  computed: {
    cart: function () {
      return this.$store.state.cart

    },
    cartTotal () {
      return this.$store.state.cartTotal
    },
    total: function () {
      return Object.values(this.$store.state.cart).reduce((first, el) => { return first + (el.quantity * el.item.price) }, 0)
    }
  },
  methods: {
    removeFromCart: function (item) {
      this.$store.commit('removeItem', item)
    },
    addItem: function (item) {
      this.$store.commit('addItem', item)
    },
    removeCart: function () {
      this.$store.commit('removeCart')
    },
    buy: function () {
      this.$store.commit('removeCart')
      this.success = true
    }
  },
  watch: {
    number: function () {
      this.total()
    }
  }
}
</script>

<style scoped>
  .cart > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    padding: 50px;
    background: white;
    border-radius: 3px;
    margin-top: 10px;
  }
  .cart.empty h1,
  .cart.empty h3 {
    margin-bottom: 15px;
  }
  .cartitems {
    padding: 30px;
    border-bottom: 1px solid #ccc;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .carttext {
    width: 25%;
    float: left;
    display: flex;
    margin: 0 -15%;
    justify-content: space-between;
  }
  .carttext p{
    margin-top: 20px;
  }
  .cartimg {
    width: 20%;
    float: left;
  }
  .total {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  button {
    padding: 10px 0px;
    width: 60px;
    font-size: 13px;
    font-weight: 600;
    border-radius: 1000px;
    cursor: pointer;
    background: white;
    color: #3e64ea;
    border: 1px solid #3e64ea;
    font-family: 'Barlow', sans-serif;
    text-transform: uppercase;
    margin: 0 0 10px 0;
    transition: 0.15s all ease-out;
  }
  button:hover {
    background: #3e64ea;
    color: white;
    transition: 0.2s all ease-in;
  }
  button,
  button:active,
  button:focus {
    outline: none;
  }
  button.remove{
    padding: 10px 30px;
    width: auto;
  }
  button.buy{
    padding: 20px 0;
    width: 200px;
  }
  p.totalitem{
    margin-bottom: 30px;
  }
</style>
