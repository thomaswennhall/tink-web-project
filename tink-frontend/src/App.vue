<template>
  <div id="app">
    <h1>YOUR 2020</h1>
    <router-view />
    <a class="clearbit" href="https://clearbit.com"
      >Logos provided by Clearbit</a
    >
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@200;300;400;600;700&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  width: 100vw;

  background-color: #004651;
  font-family: "Lato", Avenir, Helvetica, Arial, sans-serif;
  text-align: center;

  padding: 3rem;

  h1 {
    font-size: 3rem;
    font-weight: 600;
    color: #fff;
  }
  h2 {
    font-weight: 600;
  }
  p,
  a,
  button {
    font-family: "Lato", Avenir, Helvetica, Arial, sans-serif;
    font-weight: 400;
  }
  a {
    &.clearbit {
      color: #fff;
      font-size: 12px;
    }
  }
}
</style>
