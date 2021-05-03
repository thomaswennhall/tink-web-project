<template>
  <section class="landing">
    <a class="connect-link" :href="tinkLink">Connect to your bank</a>
    <p>Connect to your bank to find out how you spent your money in 2020</p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tinkLink: "https://link.tink.com/1.0/transactions/connect-accounts/?client_id=860da303a43940749f00c49e6fd53577&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&market=SE&locale=en_US&test=true"
    };
  }
};
</script>

<style lang="scss" scoped>
.landing {
  min-height: 80vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  p {
    color: #fff;
  }
  .connect-link {
    text-decoration: none;
    background-color: #f89572;
    padding: 1.4rem;
    border-radius: 10rem;
    color: #fff;

    &:hover {
      background-color: #f0855f;
    }
  }
}
</style>