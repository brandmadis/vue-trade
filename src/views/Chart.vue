<template>
  <trading-vue
    :width="this.width"
    :height="this.height"
    :data="this.$data"
    :color-back="colors.colorBack"
    :color-grid="colors.colorGrid"
    :color-text="colors.colorText"
  ></trading-vue>
</template>
<script>
import TradingVue from "trading-vue-js";

export default {
  name: "app",
  components: { TradingVue },
  methods: {
    onResize() {
      this.width = window.innerWidth / 1.2;
      this.height = window.innerHeight / 1.2;
    }
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  data() {
    return {
      width: window.innerWidth / 1.2,
      height: window.innerHeight / 1.2,
      colors: {
        colorBack: "#fff",
        colorGrid: "#eee",
        colorText: "#333"
      },
      ohlcv: [
        [1551128400000, 33, 37.1, 14, 14, 196],
        [1551132000000, 13.7, 30, 6.6, 30, 206],
        [1551135600000, 29.9, 33, 21.3, 21.8, 74],
        [1551139200000, 21.7, 25.9, 18, 24, 140],
        [1551142800000, 24.1, 24.1, 24, 24.1, 29]
      ]
    };
  }
};
</script>
