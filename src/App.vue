<template>
  <add-ticker-component @create-ticker="addTicker" />
  <!-- <warning v-if="checker" /> -->
  <div class="filter_wrapper">
    <div class="filter_title">Найти:</div>
    <input v-model="filter" class="filter_input" type="text" />
  </div>

  <div class="clearHistoryLS_wrapper">
    <button @click="clearLocalStorage" class="clearHistory_btn">
      Очистить историю добавления
    </button>
  </div>

  <div class="items_wrapper">
    <div v-for="(el, i) in filteredTickers()" class="item_body">
      <div class="item_title">{{ el.name }} - USD</div>
      <div style="font-size: 18px; font-weight: 700" class="item_price">
        {{ formatPrice(el.price) }}
      </div>
      <button @click="removeTicker(i)" class="deletre_btn">Удалить</button>
    </div>
  </div>
</template>

<script>
import { setInterval } from "core-js";
import { loadTicker, subscribeToTicker } from "./api";
import AddTickerComponent from "./components/addTickerComponent.vue";
import Warning from "./components/Warning.vue";

export default {
  components: {
    AddTickerComponent,
    Warning,
  },

  data() {
    return {
      tickerInput: "",
      tickerList: [],
      checker: false,
      filter: "",
    };
  },

  created() {
    const storageItem = localStorage.getItem("criptonomicon-list");

    if (storageItem) {
      this.tickerList = JSON.parse(storageItem);
    }
    setInterval(() => this.updateTickers(), 4000);
  },

  watch: {
    tickerInput() {
      this.checker = false;
    },
  },

  methods: {
    formatPrice(price) {
      if (price === "-") {
        return price;
      }

      return price > 1 ? price.toFixed(2) : price.toPrecision(2);
    },

    clearLocalStorage() {
      localStorage.clear();
      this.tickerList.length = 0;
    },

    filteredTickers() {
      try {
        return this.tickerList.filter((el) => el.name.includes(this.filter));
      } catch (err) {
        console.log(err);
      }
    },

    async updateTickers() {
      if (!this.tickerList.length) {
        return;
      }

      const exchangeData = await loadTicker(this.tickerList.map((t) => t.name));
      this.tickerList.forEach((ticker) => {
        const price = exchangeData[ticker.name.toUpperCase()];

        if (!price) {
          ticker.price = "-";
          return;
        }

        ticker.price = price;
      });
    },

    addTicker(tickerInput, checkSimular) {
      const newTicker = {
        id: Date.now(),
        name: tickerInput,
        price: "-",
      };

      console.log(tickerInput);

      const findSimilarTicker = this.tickerList.find((el) => {
        return el.name === newTicker.name;
      });

      if (tickerInput.length !== 0 && !findSimilarTicker) {
        this.tickerList.push(newTicker);
        this.filter = "";

        localStorage.setItem(
          "criptonomicon-list",
          JSON.stringify(this.tickerList)
        );
      } else if (findSimilarTicker) {
        this.checker = !this.checker;
        return;
      }
    },

    removeTicker(el) {
      this.tickerList.splice(el, 1);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.ticker_wrapper {
  padding: 15px 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.title {
  font-size: 18px;
  color: #8a8a8a;
  letter-spacing: 2px;
}
.form {
  display: flex;
  flex-direction: column;
  max-width: 200px;
  gap: 10px;
}

.input {
  color: #8a8a8a;
  padding: 5px;
  font-size: 18px;
}

.add_btn {
  cursor: pointer;
  background: none;
  padding: 5px;
  max-width: 130px;
}

.items_wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 15px 30px;
}
.item_body {
  padding: 50px;
  display: flex;
  flex-direction: column;
  width: 150px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 18px;
  box-shadow: -10px 9px 16px -5px rgba(34, 60, 80, 0.2);
}
.item_title {
}
.item_price {
}

.deletre_btn {
  cursor: pointer;
  background: none;
  padding: 5px;
}

.filter_wrapper {
  padding: 15px 30px;
  display: flex;
  gap: 10px;
  align-items: center;
  text-align: center;
}
.filter_title {
  font-size: 18px;
  letter-spacing: 2px;
}
.filter_input {
  padding: 2px;
  font-size: 18px;
  color: #8a8a8a;
}

.clearHistoryLS_wrapper {
  padding: 15px 30px;
}
.clearHistory_btn {
  cursor: pointer;
  background: none;
  padding: 5px;
}

.counter_wrapper {
  padding: 15px 350px;
  font-size: 24px;
  color: #c40668;
  display: flex;
  gap: 10px;
}
.demoCounter {
  font-weight: 700;
}
.demotitle {
  letter-spacing: 2px;
}
</style>
