<template>
  <suggestions-list
    class="books-suggestions-list"
    key-value="isbn"
    :show="show"
    suggestion-classname="books-suggestions-list__suggestion"
    :suggestions="books"
    :suggestion-nav-method="book => ({ name: 'books-bookId', params: { bookId: book.isbn } })"
  >
    <template #cover="book">
      <img
        :key="book.cover"
        :alt="book.title"
        class="books-suggestions-list__cover"
        :src="book.cover"
        width="43.52"
        height="64"
      >
    </template>

    <template #title="book">
      <div class="books-suggestions-list__content mx-2">
        <h1 class="books-suggestions-list__title">
          <span v-html="book.titleHLT || book.title" />
        </h1>

        <strong class="books-suggestions-list__price">{{ book.price }}€</strong>
      </div>
    </template>

    <template #action="book">
      <b-button
        @click.prevent.stop="book.addedToCart ? removeFromCart([[ book.isbn ]]) : addToCart([[ book.isbn ], undefined, $route.name !== 'cart'])"
        :class="[ book.addedToCart ? 'text-info' : 'text-dark' ]"
        class="books-suggestions-list__action"
        :title="book.addedToCart ? 'Retirer du panier' : 'Ajouter au panier'"
        type="button"
        variant="link"
      >
        <b-icon :icon="book.addedToCart ? 'cart-dash-fill' : 'cart-plus'" />
      </b-button>
    </template>
  </suggestions-list>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'BooksSuggestionsList',
  props: {
    books: {
      type: Array,
      default: () => ([]),
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions('cart', [ 'addToCart', 'removeFromCart' ]),
  }
}
</script>
