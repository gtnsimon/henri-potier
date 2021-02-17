<template>
  <article class="cart-item">
    <!-- Item cover -->
    <div class="cart-item__cover-wrapper">
      <img
        :alt="book.title"
        class="cart-item__cover"
        :src="book.cover"
        width="130"
        height="70.2"
      >
    </div>

    <!-- Item summary -->
    <div class="cart-item__content">
      <header>
        <nuxt-link
          :to="{ name: 'books-bookId', params: { bookId: book.isbn } }"
          v-slot="{ href, navigate }"
        >
          <h1>
            <a
              @click="navigate"
              class="cart-item__title"
              :href="href"
            >
              {{ book.title }}
            </a>
          </h1>
        </nuxt-link>
      </header>

      <dl class="mb-1">
        <!-- Price -->
        <dt class="mt-3">Prix unitaire&nbsp;:</dt>
        <dd class="cart-item__price">{{ book.fixedPrice }}€</dd>

        <!-- Quantity selection -->
        <dt class="mt-3">
          <label for="quantity" class="mb-0">Quantité&nbsp;:</label>
        </dt>
        <dd class="mb-0">
          <b-select
            @change="$emit('change', $event)"
            class="cart-item__quantity bg-white"
            :value="book.quantity"
            id="quantity"
            :options="quantityOptions"
            size="sm"
          />
        </dd>

        <!-- Price by quantity -->
        <dt class="mt-3">Prix total&nbsp;:</dt>
        <dd class="cart-item__price">{{ book.totalPrice }}€</dd>
      </dl>

      <b-button
        @click="$emit('change', 0)"
        class="cart-item__btn-trash"
        type="button"
        variant="link"
      >
        <b-icon icon="trash" />
        <span>Retirer</span>
      </b-button>
    </div>
  </article>
</template>

<script>
import { MAX_QUANTITY } from '~/store/cart'
import { createQuantityOptions } from '~/utils/cart'

export default {
  name: 'CartItem',
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      // list of quantity options
      quantityOptions: createQuantityOptions(MAX_QUANTITY),
    }
  },
}
</script>
