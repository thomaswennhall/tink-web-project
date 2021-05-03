<template>
  <DetailsCard
    :header="'Your favourite merchant'"
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
    favouriteMerchant() {
      return this.$store.getters.getFavouriteMerchant;
    },
    merchant() {
      return this.favouriteMerchant.merchant;
    },
    amount() {
      return `${(this.favouriteMerchant.amount * -1).toLocaleString()} SEK`;
    },
    text() {
      return `During 2020 you've spent ${this.amount} at ${this.merchant}`;
    }
  }
};
</script>