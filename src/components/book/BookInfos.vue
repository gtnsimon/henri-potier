<template>
  <b-jumbotron
    class="book-infos"
    :style="{ backgroundColor: $color(book.color).lightness(98) }"
  >
    <b-container tag="article">
      <div class="row justify-content-center justify-content-md-start">
        <!-- Book cover -->
        <div class="col-12 col-sm-8 col-md-4 col-lg-3 col-xl-3">
          <picture class="book-infos__cover-wrapper">
            <img
              :alt="book.title"
              class="book-infos__cover"
              :src="book.cover"
              :style="{ borderRadius: '4px' }"
              width="220"
              height="321.2"
            />
          </picture>
        </div>

        <!-- Add to cart block -->
        <div class="col-12 col-sm-8 col-md-4 col-xl-3 mt-3 mt-md-0 pr-md-0">
          <!-- Price and quantity selection -->
          <dl class="book-infos__buy">
            <!-- Price -->
            <dt>Prix&nbsp;:</dt>
            <dd class="book-infos__buy__price">
              <span :class="[ discount && 'old' ]">{{ book.totalPrice }}€</span>

              <b-spinner v-if="discountLoading" small variant="secondary" />
              <span v-else-if="discount" class="new">{{ discount.fixedPrice }}€</span>
            </dd>

            <!-- Quantity selection -->
            <dt>
              <label for="quantity" class="mb-0">Quantité&nbsp;:</label>
            </dt>
            <dd>
              <b-select
                @change="$emit('change', $event)"
                :value="quantity"
                id="quantity"
                class="bg-white"
                :options="quantityOptions"
                size="sm"
              />
            </dd>
          </dl>

          <!-- CTA Add to cart -->
          <b-button
            @click="$emit('addToCart', book.isbn)"
            :disabled="discountLoading || book.addedToCart && book.quantity === quantity"
            :style="{ backgroundColor: book.color, color: $color(book.color).isLight() ? '#000' : '#FFF', width: '100%' }"
          >
            <b-icon icon="cart-plus" font-scale="1.6" />
            <span>Ajouter au panier</span>
          </b-button>

          <!-- Message on book state in cart -->
          <span
            v-if="alreadyInCart"
            class="d-block text-center text-secondary mt-2"
          >Cet article est dans le panier</span>
        </div>
      </div>
    </b-container>
  </b-jumbotron>
</template>

<script>
import { MAX_QUANTITY } from '~/store/cart'
import { createQuantityOptions } from '~/utils/cart'

export default {
  name: 'BookInfos',
  model: {
    event: 'change',
    prop: 'quantity',
  },
  props: {
    book: {
      type: Object,
      required: true,
    },
    discount: {
      type: [ Object, null ],
      default: null,
    },
    discountLoading: {
      type: Boolean,
      default: false,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  data () {
    return {
      // list of quantity options
      quantityOptions: createQuantityOptions(MAX_QUANTITY),
    }
  },
  computed: {
    /**
     * Compute if book is already in cart for the selected quantity.
     * Store prevents to mutation to be called, this way user get a feedback.
     */
    alreadyInCart () {
      return this.book.addedToCart && this.book.quantity === this.quantity
    },
  },
}
</script>
