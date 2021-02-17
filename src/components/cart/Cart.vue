<template>
  <b-container class="cart">
    <!-- Does a cart have books? -->
    <template v-if="books.length">
      <div class="row">
        <!-- Cart items -->
        <div class="col-12 col-md-6 col-lg-6">
          <cart-item
            v-for="book in books"
            @change="$emit('quantityChange', [ book, $event ])"
            :key="book.isbn"
            :book="book"
          />
        </div>

        <!-- Cart summary -->
        <div class="col-12 offset-md-2 col-md-4 offset-md-1 col-lg-4 mt-5 mt-md-0">
          <cart-summary
            :discount="discount"
            :discount-loading="discountLoading"
            :price="price"
          />
        </div>
      </div>
    </template>

    <!-- A cart has no book -->
    <template v-else>
      <h2>Le panier est tristement vide 😢</h2>

      <b-button class="mt-5" :to="{ name: 'index' }" variant="primary">
        Ajouter des livres
      </b-button>
    </template>
  </b-container>
</template>

<script>
export default {
  name: 'Cart',
  props: {
    books: {
      type: Array,
      default: () => ([]),
    },
    discount: {
      type: [ Object, null ],
      default: null,
    },
    discountLoading: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
}
</script>
