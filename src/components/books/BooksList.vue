<template>
  <ul class="books-list">
    <books-list-item
      v-for="book in books"
      @addToCart="addToCart([[ $event ]])"
      @removeFromCart="removeFromCart([[ $event ]])"
      :key="book.isbn"
      :book="book"
    />
  </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'BooksList',
  props: {
    books: {
      type: Array,
      default: () => ([]),
    },
  },
  methods: {
    ...mapActions('cart', [ 'addToCart', 'removeFromCart' ]),
  }
}
</script>
