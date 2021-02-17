<template>
  <transition
    name="cart-feedback"
    mode="out-in"
    appear
  >
    <aside
      v-if="hasFeedback"
      @click.prevent.stop="$emit('close')"
      @mousedown.stop
      class="cart-feedback-wrapper"
    >
      <!-- Close button -->
      <b-container class="text-right">
        <b-button
          @click.stop="$emit('close')"
          class="cart-feedback-close"
          title="Fermer cette fenêtre"
          variant="link"
        >
          <b-icon icon="x-circle" font-scale="2.5" variant="light" />
        </b-button>
      </b-container>

      <!-- Content -->
      <b-container
        v-if="addedBook"
        @click.stop
        ref="container"
        class="cart-feedback py-3 cart-feedback--added"
      >
        <!-- Title -->
        <header>
          <h1 class="cart-feedback__title">
            <em>{{ addedBook.title }}</em>
            <small class="text-success text-nowrap">a été ajouté au panier</small>
          </h1>
        </header>

        <!-- CTA -->
        <div class="text-right mt-3">
          <!-- Remove from cart -->
          <b-button @click.stop="handleRemove(addedBook)" size="sm">
            <b-icon icon="trash" />
            <span>Finite Incantatem</span>
          </b-button>

          <!-- Go to cart -->
          <b-button @click="navigateCart" variant="info">
            Voir le panier
          </b-button>
        </div>
      </b-container>
    </aside>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CardFeedback',
  props: {
    feedback: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('cart', [ 'hasFeedback' ]),
    addedBook () {
      const [ book = null ] = this.feedback.added

      return book
    },
  },
  methods: {
    ...mapActions('cart', [ 'removeFromCart' ]),
    async handleRemove (book) {
      await this.removeFromCart([[ book.isbn ]])
      this.$emit('close')
    },
    async navigateCart () {
      await this.$router.push({ name: 'cart' })
      this.$emit('close')
    },
  }
}
</script>

<style lang="scss">
@keyframes slide-up {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.cart-feedback {
  $curve: cubic-bezier(1.0, 0.5, 0.8, 1.0);

  &-enter-active {
    animation: slide-up 300ms #{$curve};
  }

  &-leave-active {
    animation: slide-up 450ms #{$curve} reverse;
  }

  &-wrapper {
    z-index: 100000;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    overflow-y: auto;
    background: linear-gradient(transparent, rgba(#000, 0.25) 10%, rgba(#000, 0.75));

    > .container {
      max-width: 440px !important;
    }
  }

  &-close {
    width: 64px;
    height: 64px;
    align-self: flex-end;
  }

  width: 100%;
  background-color: #FFF;
  box-shadow: 0 -0.125rem 0.5rem rgba(0, 0, 0, 0.25);
  border-radius: 4px 4px 0 0;

  &__title {
    line-height: 1.2;
    text-transform: none;
    letter-spacing: normal;
  }
}
</style>
