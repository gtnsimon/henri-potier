<template>
  <main class="page-books-single">
    <!-- Vous êtes ici -->
    <b-container class="px-0" tag="nav">
      <b-breadcrumb :items="breadcrumb" />
    </b-container>

    <!-- Content -->
    <article>
      <!-- Book title -->
      <header>
        <b-container tag="header">
          <h1>{{ book.title }}</h1>
        </b-container>
      </header>

      <book-infos
        @addToCart="addToCart([[ $event ], quantity])"
        @change="updateQuantity"
        :key="book.isbn"
        :book="book"
        :discount="discount"
        :discount-loading="discountLoading"
        :quantity="quantity"
      />

      <!-- Synopsis -->
      <b-container
        class="book-infos__synopsis mt-4"
        tag="section"
      >
        <header>
          <h2 :style="{ color: book.color }">Synopsis</h2>
        </header>

        <!-- Display each synopsis to a paragraph -->
        <p
          v-for="(synopsis, key) in book.synopsis"
          :key="key"
        >{{ synopsis }}</p>
      </b-container>
    </article>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SingleBookPage',
  asyncData ({ store, route, error }) {
    const { bookId } = route.params

    if (!store.getters['books/exists'](bookId)) {
      return error({ statusCode: 404, message: `Ce livre n'existe pas` })
    }

    return {
      bookId,
    }
  },
  data () {
    return {
      bookId: null, // current book id (from route params)
      discount: null, // best discount applied
      discountLoading: true, // is discount is fetching
      quantity: 1, // current quantity in <b-select />
    }
  },
  head () {
    return {
      title: this.book.title,
      meta: [ {
        vmid: 'description',
        name: 'description',
        content: `Découvrir ${this.book.title}`, // pas trop d'inspi.
      } ],
    }
  },
  created () {
    this.quantity = this.book.quantity || 1
  },
  computed: {
    ...mapGetters('books', [ 'getBook' ]),
    book () {
      return this.getBook(this.bookId)
    },
    breadcrumb () {
      return [ {
        text: `Page d'accueil`,
        to: { name: 'index' },
      }, {
        text: this.book.title,
        active: true,
      } ]
    },
  },
  async mounted () {
    await this.$nextTick()
    await this.getDiscount(this.quantity)
  },
  methods: {
    ...mapActions('cart', [ 'addToCart', 'removeFromCart' ]),
    async getDiscount (quantity) {
      this.discountLoading = true

      // get discount for book
      const discount = await this.$api.getDiscount({ ...this.book, quantity })
        .catch(() => null) // set discount to null if an error occured
        .finally(() => {
          this.discountLoading = false
        })

      this.discount = discount
    },
    updateQuantity (quantity) {
      this.quantity = quantity
      this.getDiscount(quantity)
    },
  }
}
</script>
