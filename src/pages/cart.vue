<template>
  <main class="page-index">
    <!-- Vous êtes ici -->
    <b-container class="px-0" tag="nav">
      <b-breadcrumb :items="breadcrumb" />
    </b-container>

    <!-- Display books -->
    <section>
      <b-container tag="header">
        <h1>Mon Panier</h1>
      </b-container>

      <b-jumbotron class="books-list-wrapper">
        <cart
          @quantityChange="updateBookQuantity"
          :books="books"
          :discount="discount"
          :discount-loading="discountLoading"
          :price="price"
        />
      </b-jumbotron>
    </section>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CartPage',
  data () {
    return {
      breadcrumb: [ {
        text: `Page d'accueil`,
        to: { name: 'index' },
      }, {
        text: 'Panier',
        active: true,
      } ],
      discount: null,
      discountLoading: true,
    }
  },
  head () {
    return {
      title: `Mon Panier`,
    }
  },
  computed: {
    ...mapGetters('cart', [ 'books', 'price' ]),
  },
  watch: {
    books (books) {
      this.getDiscount(...books)
    },
  },
  async mounted () {
    await this.$nextTick()
    await this.getDiscount(...this.books)
  },
  methods: {
    ...mapActions('cart', [ 'addToCart', 'removeFromCart' ]),
    async getDiscount (...books) {
      this.discountLoading = true

      // get discount for book
      const discount = await this.$api.getDiscount(...books)
        .catch(() => null) // set discount to null if an error occured
        .finally(() => {
          this.discountLoading = false
        })

      this.discount = discount
    },
    async updateBookQuantity ([ book, quantity ]) {
      if (quantity) {
        await this.addToCart([[ book.isbn ], quantity, false])
        await this.$nextTick()

        return
      }

      this.removeFromCart([[ book.isbn ]])
    },
  }
}
</script>
