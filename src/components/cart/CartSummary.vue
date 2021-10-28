<template>
  <div class="cart-summary">
    <dl>
      <!-- Cart price -->
      <dt>Prix du panier&nbsp;:</dt>
      <dd>{{ fixedPrice }}€</dd>

      <!-- Discount -->
      <dt>Promotion&nbsp;:</dt>
      <dd v-if="discountLoading">
        <b-spinner small variant="secondary" />
      </dd>

      <template v-else-if="discount">
        <dd>{{ discount.text }}</dd>

        <!-- Discount diff -->
        <dt>Prix après réduction&nbsp;:</dt>
        <dd>
          {{ discount.fixedPrice }}€
          <small class="text-disabled">(soit {{ discount.fixedDiff }}€)</small>
        </dd>
      </template>

      <template v-else>
        <dd>Aucune promotion trouvée 😕</dd>
      </template>
    </dl>

    <b-button
      @click="fakeBuy"
      class="d-block"
      :disabled="discountLoading"
      variant="info"
    >
      <b-spinner v-if="discountLoading" class="mr-1" small variant="light" />
      <span>Payer {{ finalPrice }}€</span>
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'CartSummary',
  props: {
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
  computed: {
    finalPrice () {
      return this.discountLoading ? '' : (this.discount ? this.discount.fixedPrice : this.fixedPrice)
    },
    fixedPrice () {
      return this.price.toFixed(2)
    },
  },
  methods: {
    fakeBuy () {
      window.alert(`Notre système de paiement n'est pas disponible`)
    },
  }
}
</script>
