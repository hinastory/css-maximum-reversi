<script lang="ts" setup>

interface Props {
  selfTurn: number;
  selfGauge: number;
}
defineProps<Props>();

</script>

<template>
<div class="area-gauge-wrapper">
  <div class="area-gauge">
    <div class="top" :class="{black: selfTurn != 1}" :style="{height: (100 - selfGauge) + '%'}"></div>
    <div class="bottom" :class="{black: selfTurn == 1}" :style="{height: selfGauge + '%'}"></div>
  </div>
  <div class="gauge-num">{{selfGauge}} %</div>
</div>
</template>

<style lang="scss" scoped>
.area-gauge-wrapper {
  text-shadow: 0 0 2px #999;
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: right;
}
.area-gauge {
  box-shadow: inset 3px 0 5px rgb(120, 120, 120, 50%);
  width: 32px;
  height: 256px;
  overflow: hidden;
  border-radius: 22px;
  padding: 0px;
  margin-bottom: 0.3em;
  background-image: linear-gradient(to left, #999 0%, #aaa 8%, #eee 65%, #fff 75%, #eee 100%);

  .top, .bottom {
    width: 100%;
    height: 50%;
    transition: height 0.6s ease;
  }
  .black {
    background-image: linear-gradient(to left, black 0%, #333 8%, #666 65%, #eee 75%, #666 85%, #333 100%);
  }
}


@media screen and (max-width:1120px) {
.area-gauge-wrapper {
  display: flex;
  flex-direction: row;
  width: 100px;
}
.gauge-num {
  margin-left: 5px;
  width: 43px;
  display: inline-block;
}
.area-gauge {
  height: 128px;
}

}
</style>
