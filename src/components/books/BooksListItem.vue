<template>
  <li
    class="books-list-item shadow-sm"
    :style="{ '--book-color': book.color }"
  >
    <!-- Book cover -->
    <picture class="books-list-item__cover-wrapper">
      <!-- Book's cover sized to card -->
      <img
        :alt="book.title"
        class="books-list-item__cover"
        :src="book.cover"
        width="220"
        height="321.2"
      >

      <!-- Overlay for book's synopsis -->
      <div
        v-if="book.synopsis.length"
        class="books-list-item__synopsis"
      >
        <p>{{ book.synopsis.join('\r\n') }}</p>
      </div>
    </picture>

    <!-- Card buttons -->
    <nav class="books-list-item__nav">
      <!-- View book -->
      <b-button
        class="btn-amplificatum"
        title="Voir le livre"
        :to="{ name: 'books-bookId', params: { bookId: book.isbn } }"
        type="button"
      >
        Amplificatum
      </b-button>

      <!-- Add to cart -->
      <b-button
        @click.prevent.stop="book.addedToCart ? $emit('removeFromCart', book.isbn) : $emit('addToCart', book.isbn)"
        :class="[ book.addedToCart && 'text-info' ]"
        :title="book.addedToCart ? 'Retirer du panier' : 'Ajouter au panier'"
        type="button"
      >
        <b-icon :icon="book.addedToCart ? 'cart-dash-fill' : 'cart-plus'" />
      </b-button>
    </nav>
  </li>
</template>

<script>
export default {
  name: 'BooksListItem',
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
}
</script>
