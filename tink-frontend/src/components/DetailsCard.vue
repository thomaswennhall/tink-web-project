<template>
  <article class="favourite-merchant">
    <p class="merchant-header">{{ header }}:</p>
    <img :src="merchantLogo" :alt="merchant" />
    <h2 class="amount">{{ amount }}</h2>
    <p class="little-text">{{ text }}</p>
  </article>
</template>

<script>
export default {
  data() {
    return {
      merchantLogo: null
    };
  },

  props: {
    header: String,
    merchant: String,
    amount: String,
    text: String
  },

  methods: {
    getLogo() {
      const oneWord = this.merchant.split(" ")[0];
      this.merchantLogo = "//logo.clearbit.com/" + oneWord + ".com?size=420";
    }
  },

  beforeMount() {
    this.getLogo();
  }
};
</script>

<style lang="scss">
.favourite-merchant {
  min-height: 22rem;
  max-width: 18rem;
  padding: 2rem;

  background: linear-gradient(0deg, rgba(0, 0, 0, 0) 5%, #fff 30%);
  box-shadow: rgba(31, 31, 32, 0.26) 2px -18px 10px;

  border-radius: 1rem 1rem 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  img {
    max-height: 7rem;
    padding: 1rem;
  }

  p {
    color: rgb(82, 82, 82);
    &.little-text {
      font-size: 12px;
      margin-top: 1rem;
      color: rgb(44, 44, 44);
    }
  }
}
</style>