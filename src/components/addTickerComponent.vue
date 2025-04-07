<template>
  <div class="ticker_wrapper">
    <h4 class="title">Тикер</h4>
    <form class="form" action="#">
      <input
        v-model="tickerInput"
        class="input"
        placeholder="Например BTC"
        type="text"
      />

      <add-button @click="addTicker" class="add_btn">Добавить</add-button>
    </form>
  </div>
</template>

<script>
import AddButton from "./AddButton.vue";

export default {
  components: {
    AddButton,
  },

  data() {
    return {
      tickerInput: "",
    };
  },
  methods: {
    addTicker() {
      this.$emit("create-ticker", this.tickerInput);
      this.tickerInput = "";
    },
  },
};
</script>

<style></style>
