<template>
  <article class="action-card">
    <p>{{ text }}</p>
    <button class="action-button" @click="$emit('dispatch')">
      <span class="text" :class="{ hide: loading }">Find out</span
      ><span class="text" :class="{ loading: loading }"></span>
    </button>
  </article>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    text: String
  }
};
</script>

<style lang="scss">
.action-card {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0) 20%, #427783);
  box-shadow: rgba(31, 31, 32, 0.26) 2px -16px 12px 2px;

  height: 12rem;
  width: 18rem;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  border-radius: 1rem;

  p {
    text-align: left;
    color: #fff;
  }

  .action-button {
    background-color: #f89572;
    padding: 1rem;
    border: none;
    outline: none;
    border-radius: 10rem;
    color: #fff;
    width: 6rem;

    &:hover,
    &:active {
      background-color: #f0855f;
    }

    .text {
      &.hide {
        display: none;
      }

      &.loading {
        &:after {
          content: "Find out";
          animation: spin 2s linear infinite;
        }
      }
    }
  }
}

@keyframes spin {
  0% {
    content: "$ind out";
  }
  10% {
    content: "L$nd out";
  }
  20% {
    content: "Lo$d out";
  }
  30% {
    content: "Loa$ out";
  }
  40% {
    content: "Load$out";
  }
  50% {
    content: "Loadi$ut";
  }
  60% {
    content: "Loadin$t";
  }
  70% {
    content: "Loading$";
  }
  80% {
    content: "Load$ng";
  }
  90% {
    content: "L$ading";
  }
  100% {
    content: "$oading";
  }
}
</style>