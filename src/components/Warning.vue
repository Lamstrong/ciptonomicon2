<template>
  <div class="warning_wrapper">
    <p style="color: red" class="warning">Такой тикер уже добавлен</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checker: false,
    };
  },
  methods: {
    addTicker() {
      this.$emit("checkSimular", this.checker);
    },
  },
};
</script>

<style>
.warning_wrapper {
  margin: 0 0 0 20px;
}
</style>
