<script lang="ts" setup>
import HeartIcon from './icons/HeartIcon.vue';
import SandClockIcon from './icons/SandClockIcon.vue';

interface Props {
  resultName: string;
  finalMinute: boolean;
  timeLeft: string;
}
defineProps<Props>();
</script>

<template>
<div class="chalkboard">
  <div class="state"><span class="symbol"><heart-icon /></span><span class="contents">{{resultName}}</span></div>
  <div class="time"><span class="symbol"><sand-clock-icon /></span><span class="contents" :class='{"final-minute": finalMinute}'>{{timeLeft}}</span></div>
</div>
</template>

<style lang="scss" scoped>
.chalkboard {
  width: 140px;
  background-image: radial-gradient(at 0px 0px, #104300 0%, #446B38, #104300 100%);
  padding: 1em 0 1em 1.9em;
  border: 8px solid;
  border-image: linear-gradient(-45deg, #935800 0%,#8E5500 20%, #844F00 50%, #a06000 100%);
  border-image-slice: 1;
  box-shadow: 2px 2px 4px #999, 2px 2px 2px #020 inset;
  .state, .time {
    font-size: large;
    padding: 0.5em 0;
    color: #fff;
    text-shadow: 0 0 2px #fff;
    display: flex;
    font-family:monospace;
  }
  .symbol {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22px;
    margin-right: 5px;
  }
  .contents {
    display: inline-block;
    text-align: center;
    width: 85px;
  }
  .final-minute {
    color: #ddc918;
  }
}
</style>
