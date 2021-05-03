<template>
  <div class="home">
    <section class="action-panel">
      <FavouriteMerchant v-if="showFavouriteMerchant" />
      <ActionCard
        v-else
        @dispatch="dispatchMerchant"
        :loading="loadingFavouriteMerchant"
        :text="'Find out where you spent most money during 2020'"
      />

      <BiggestPurchase v-if="showBiggestPurchase" />
      <ActionCard
        v-else
        @dispatch="dispatchPurchase"
        :loading="loadingBiggestPurchase"
        :text="'Find out which purchase was your biggest purchase of the year'"
      />

      <MostFrequentMerchant v-if="showMostFrequentMerchant" />
      <ActionCard
        v-else
        @dispatch="dispatchMostFrequent"
        :loading="loadingMostFrequentMerchant"
        :text="
          'Find out where you made the largest amount of purchases last year'
        "
      />
    </section>
  </div>
</template>

<script>
import ActionCard from "../components/ActionCard";
import FavouriteMerchant from "../components/FavouriteMerchant";
import BiggestPurchase from "../components/BiggestPurchase";
import MostFrequentMerchant from "../components/MostFrequentMerchant";

export default {
  components: {
    ActionCard,
    FavouriteMerchant,
    BiggestPurchase,
    MostFrequentMerchant
  },

  data() {
    return {
      showFavouriteMerchant: false,
      loadingFavouriteMerchant: false,

      showBiggestPurchase: false,
      loadingBiggestPurchase: false,

      showMostFrequentMerchant: false,
      loadingMostFrequentMerchant: false
    };
  },

  methods: {
    getTokenFromCookie() {
      return this.$cookies.get("token");
    },
    toggleFavouriteMerchant() {
      this.showFavouriteMerchant = !this.showFavouriteMerchant;
    },
    toggleBiggestPurchase() {
      this.showBiggestPurchase = !this.showBiggestPurchase;
    },
    toggleMostFrequent() {
      this.showMostFrequentMerchant = !this.showMostFrequentMerchant;
    },
    async dispatchMerchant() {
      this.loadingFavouriteMerchant = true;
      await this.$store.dispatch("updateFavouriteMerchant");
      this.loadingFavouriteMerchant = false;
      this.toggleFavouriteMerchant();
    },
    async dispatchPurchase() {
      this.loadingBiggestPurchase = true;
      await this.$store.dispatch("updateBiggestPurchase");
      this.loadingBiggestPurchase = false;
      this.toggleBiggestPurchase();
    },
    async dispatchMostFrequent() {
      this.loadingMostFrequentMerchant = true;
      await this.$store.dispatch("updateMostFrequentMerchant");
      this.loadingMostFrequentMerchant = false;
      this.toggleMostFrequent();
    }
  },

  beforeMount() {
    const token = this.getTokenFromCookie();
    if (!token) {
      this.$router.push("/");
    }
    this.$store.dispatch("login", token);
  }
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 80vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 5rem 2rem;

  .action-panel {
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-end;
  }
}
</style>