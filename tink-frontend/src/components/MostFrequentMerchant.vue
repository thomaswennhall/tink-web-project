<template>
  <DetailsCard
    :header="'Your go-to merchant'"
    :merchant="merchant"
    :amount="amount + ' times'"
    :text="text"
  />
</template>

<script>
import DetailsCard from "./DetailsCard";

export default {
  components: { DetailsCard },

  computed: {
    mostFrequentMerchant() {
      return this.$store.getters.getMostFrequentMerchant;
    },
    merchant() {
      return this.mostFrequentMerchant.merchant;
    },
    amount() {
      return this.mostFrequentMerchant.amount;
    },
    text() {
      return `Your most frequently visited merchant was ${this.merchant} where you made ${this.amount} purchases`;
    }
  }
};
</script>