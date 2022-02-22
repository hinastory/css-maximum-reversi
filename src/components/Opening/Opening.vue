<script lang="ts" setup>
import { ref } from 'vue';
import Scene1 from './Scene1.vue';
import Scene2 from './Scene2.vue';
import Scene3 from './Scene3.vue';
import { sleep, randomNum } from '../../shared/util';


interface Props {
  volumeFlag: boolean;
}
const props = defineProps<Props>();

interface Emits {
  (e: "changeVolume", value: void): void;
  (e: "next", value: void): void;
}
const emit = defineEmits<Emits>();

const activeScenes = ref([]);
const isActive = (num: number) => activeScenes.value.includes(num);

const star = (num: number) => {
  let ary = [];
  for (let i= 0; i < num; i++) {
    ary.push(`${randomNum(0, 800)}px ${randomNum(0, 3000)}px #FFF`);
  }
  return ary;
}

const smallStar = ref(star(300));
const mediumStar = ref(star(100));
const bigStar = ref(star(50));

const start = async () => {
  activeScenes.value.push(0);
  await sleep(9000);
  activeScenes.value.push(1);
  await sleep(15400);
  activeScenes.value.push(2);
}

start();
</script>

<template>
<div class="opening">
  <div class="stars">
    <div class="small"></div>
    <div class="medium"></div>
    <div class="big"></div>
  </div>
  <scene1 v-if="isActive(0)" />
  <scene2 v-if="isActive(1)" />
  <scene3 v-if="isActive(2)" :volume-flag="volumeFlag" @next="emit('next')" @changeVolume="emit('changeVolume');" />
</div>
</template>

<style lang="scss" scoped>
.opening {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
  color: #eee;
  border-radius: 8px;
  text-shadow: 0 0 13px #ff0;
  overflow: hidden;
  flex-direction: column;
  &:after {
    content: '';
    position: absolute;
    z-index: 20;
    top: -100px;
    left: -100px;
    width: 100px;
    height: 600px;
    opacity: 0;
    transform: scale(2) rotate(20deg);
    background-image: linear-gradient(100deg, rgba(255, 255, 255, 0) 10%, rgba(255, 255, 255, .9) 100%, rgba(255, 255, 255, 0) 0%);
    animation-name: shiny;
    animation-duration: 0.45s;
    animation-timing-function: ease-in-out;
    animation-delay: 4s;
    animation-iteration-count: 1;
  }
}
.stars {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  .small {
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: v-bind(smallStar);
    animation: animStar 50s linear infinite;

    &:after {
      content: " ";
      position: absolute;
      width: 1px;
      height: 1px;
      background: transparent;
      box-shadow: v-bind(smallStar);
    }
  }
  .medium {
    width: 1.5px;
    height: 1.5px;
    background: transparent;
    box-shadow: v-bind(mediumStar);
    animation: animStar 100s linear infinite;

    &:after {
      content: " ";
      position: absolute;
      width: 2px;
      height: 2px;
      background: transparent;
      box-shadow: v-bind(mediumStar);
    }
  }

  .big {
    width: 2.4px;
    height: 2.4px;
    background: transparent;
    box-shadow: v-bind(bigStar);
    animation: animStar 150s linear infinite;

    &:after {
      content: " ";
      position: absolute;
      width: 2.4px;
      height: 2.4px;
      background: transparent;
      box-shadow: v-bind(bigStar);
      border-radius: 50%;
    }
  }
}

@keyframes shiny {
  0% { left: -40%; opacity: 0;}
  80% { left: 140%; opacity: 1;}
  100% { left: 160%; opacity: 0;}
}

@keyframes animStar {
  from {transform: translateY(0px);}
  to	{transform: translateY(-800px);}
}
</style>