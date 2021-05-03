<template>
  <DetailsCard
    :header="'Your biggest purchase'"
    :merchant="merchant"
    :amount="amount"
    :text="text"
  />
</template>

<script>
import DetailsCard from "./DetailsCard";

export default {
  components: { DetailsCard },

  computed: {
    biggestPurchase() {
      return this.$store.getters.getBiggestPurchase;
    },
    merchant() {
      return this.biggestPurchase.merchant;
    },
    amount() {
      return `${(this.biggestPurchase.amount * -1).toLocaleString()} SEK`;
    },
    text() {
      return `Your single biggest purchase was for ${this.amount} to ${this.merchant}`;
    }
  }
};
</script>