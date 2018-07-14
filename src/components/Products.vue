<template>
  <div class="container" >
    <div class="item" v-for="item in products" :key="item.id" >
    <img :src="`${item.img}`" :alt="`Image of ${item.name}`">
    <p>{{ item.name }}</p>
    <p>{{ item.price | uah }}<span style="font-size: 16px;"> грн.</span></p>
    <button class="add" @click="addItem(item)">Добавить</button>
    </div>
  </div>
</template>

<script>

import {UAH} from '../uah'

export default {
  name: 'products',
  data () {
    return {}
  },
  computed: {
    products: function () {
      return this.$store.state.products
    }
  },
  filters: {
    uah: function (value) {
      return UAH(value)
    }
  },
  methods: {
    addItem: function (item) {
      this.$store.commit('addItem', item)
    }
  }
}
</script>

<style scoped>
  .container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
  }
  .item {
    border: 1px solid #999999;
    border-radius: 10px 10px;
    box-shadow: 2px 2px 3px #999;
    background: white;
    margin: 30px;
    width: 25%;
  }

  p {
    font-size: 18px;
  }
  img{
    width: 90%;
    padding-top: 30px;
  }
  button {
    padding: 10px 30px;
    font-size: 13px;
    font-weight: 600;
    border-radius: 1000px;
    cursor: pointer;
    background: white;
    color: #3e64ea;
    border: 1px solid #3e64ea;
    font-family: 'Barlow', sans-serif;
    text-transform: uppercase;
    margin: 0 10px 30px 10px;
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
</style>
