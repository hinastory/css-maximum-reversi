<script lang="ts" setup>
import { ref} from 'vue';

const titleNeonColor = ref("#f40");
</script>

<template>
<div class="scene">
  <div>CSS</div>
  <div>Maximum</div>
  <div>Reversi</div>
</div>
</template>

<style lang="scss" scoped>

.scene {
  position: absolute;
  height: 100%;
  width: 70%;
  z-index: 10;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
  font-size: 65px;
  font-family: 'Satisfy', cursive;
  animation: slideIn 2s cubic-bezier(0.7, 0, 0.3, 1) 0s 1 forwards;
  color: rgba(255, 255, 255, 0.7);
  text-shadow:
    -0.1rem -0.1rem 0.5rem rgba(255, 255,255, 0.7),
    0.1rem 0.1rem 0.5rem rgba(255, 255, 255, 0.7),
    0 0 1.2rem v-bind(titleNeonColor),
    0 0 2.4rem v-bind(titleNeonColor),
    0 0 3.6rem v-bind(titleNeonColor),
    0 0 4.8rem v-bind(titleNeonColor),
    0 0 6rem v-bind(titleNeonColor);

  >*:first-child {
    align-self: flex-start;
    animation: blur 1s ease-out;
    animation-fill-mode: forwards;
    animation-delay: 8s;
    padding-left: 1em;
  }

  >*:nth-child(2) {
    align-self: center;
    animation: blur 1s ease-out;
    animation-fill-mode: forwards;
    animation-delay: 8.2s;
  }

  >*:nth-child(3) {
    padding-right: 1em;
    animation: blur 1s ease-out;
    animation-fill-mode: forwards;
    animation-delay: 8.4s;
    align-self: flex-end;
  }
}

@keyframes slideIn{
  0% { transform: translate(-100vw, 0); visibility: visible;}
  100% { transform: translate(0, 0);  visibility: visible;}
}

@keyframes blur {
	0%		{text-shadow:  0 0 0px v-bind(titleNeonColor);}
  50% {color: transparent;}
	90%		{text-shadow:  0 0 50px v-bind(titleNeonColor);}
	100%	{text-shadow:  0 0 100px v-bind(titleNeonColor); opacity:0; color: transparent;}
}
</style>