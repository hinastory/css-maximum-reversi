<script lang="ts" setup>
import { ref } from 'vue';
import Volume from '../icons/Volume.vue';

interface Props {
  volumeFlag: boolean;
}
const props = defineProps<Props>();

const titleNeonColor = ref("#f40");
interface Emits {
  (e: "change-volume", value: boolean): void;
  (e: "next", value: void): void;
}
const emit = defineEmits<Emits>();

</script>

<template>
<div class="scene" >
  <div>CSS Maximum Reversi</div>
  <div>
    <div>explore the best of Reversi UI/UX</div>
    <div> with <span class="css">CSS 3</span> and <span class="vue">Vue 3</span></div>
  </div>
  <div>
    <div>Source Code:</div>
    <div>GitHub <a href="https://github.com/hinastory/css-maximum-reversi" class="link" target="_blank">hinastory/css-maximum-reversi</a></div>
  </div>
  <div>
    <div style="display: block; width: 100px"></div>
    <div class="next" @click="emit('next')" ref="nextRef">Next</div>
    <div class="volume">
      <input id="volume" type="checkbox" v-model="volumeFlag" />
      <label for="volume" @click="emit('change-volume', volumeFlag)">
        <volume style="--ggs:1" />
      </label>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.next {
  width: 60px;
  height:60px;
  margin-top: 0.8em;
  background-color: rgba(255, 255, 255, .2);
  border-radius: 50%;
  color: #fff;
  font-size: 16px;
  font-family: 'Satisfy', cursive;
  box-shadow: 0 4px 4px rgba(0, 0, 0, .2), inset 0 2px 2px rgba(255, 255, 255, .7);
  text-shadow: 0px 2px 0px rgba(0, 0, 0, .4);
  text-align: center;
  vertical-align: middle;
  line-height: 64px;
  position: relative;
  cursor: pointer;
  &:active {
    background-color: rgba(255, 255, 255, .3);
  }
  &:before {
    position: absolute;
    left: 0;
    top: 0;
    content: '';
    width: 60px;
    height:60px;
    border-radius: 50%;
    animation: blink 1.7s ease-in-out 0s infinite alternate;
  }
}
.scene {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  font-size: 60px;
  font-family: 'Satisfy', cursive;
  align-items: center;
  justify-content: center;
  background: transparent;
  flex-direction: column;
  font-size: 28px;

  >*:first-child {
    font-size: 36px;
    color: white;
    text-shadow:
      -0.1rem -0.1rem 0.5rem rgba(255, 255,255, 0.7),
      0.1rem 0.1rem 0.5rem rgba(255, 255, 255, 0.7),
      0 0 1.2rem v-bind(titleNeonColor),
      0 0 2.4rem v-bind(titleNeonColor),
      0 0 3.6rem v-bind(titleNeonColor),
      0 0 4.8rem v-bind(titleNeonColor),
      0 0 6rem v-bind(titleNeonColor);
    animation-fill-mode: forwards;
    animation: flicker 1.5s;
    margin-bottom: 0.5em;
  }

  >*:nth-child(2) {
    animation: slideIn 2s cubic-bezier(0.7, 0, 0.3, 1) 2s 1 forwards;
    visibility: hidden;
    align-self: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 0.5em;
    >*:nth-child(1) {
      font-size: 22px;
      margin-bottom: 0.2em;
    }
    .css {
      background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
    .vue {
      background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
  }

  >*:nth-child(3) {
    visibility: hidden;
    align-self: center;
    animation: slideIn 2s cubic-bezier(0.7, 0, 0.3, 1) 4s 1 forwards;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1.2em;
    font-size: 14px;

    .link {
	    display: inline-block;
	    margin-left: 0.7em;
	    transition: .3s;
	    transform: scale(1);
	    color: rgb(179, 236, 247);
      text-decoration: none;

      &:hover {
	      transform: scale(1.05);
      }
    }
  }

  >*:nth-child(4) {
    display: flex;
    flex-direction: row;
    align-self: center;
    animation: nextSpin 2s ease-out forwards;
    animation-delay: 6s;
    transform: rotateY(180deg);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
}

.volume {
  margin-left: 40px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    opacity: 0;
  }
  label {
    display: block;
    position: relative;
    width: 10px;
    height: 10px;
    padding: 11px 16px 9px 4px;
    border-radius: 50%;
    color: #fff;
    background-color: rgba(106, 132, 148, 0.5);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s, box-shadow 0.2s;
  }

  label:hover,
  input:focus + label {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
  }

  input:checked + label {
    background-color: rgba(188, 188, 122, 0.5);
  }

  input:checked + label::before {
    background-color: #fff;
  }
}

@keyframes slideIn{
  0% { transform: translate(-100vw, 0); visibility: visible;}
  100% { transform: translate(0, 0);  visibility: visible;}
}


@keyframes nextSpin {
  0% {transform: rotateY(180deg);}
  100% {transform: rotateY(361deg);}
}

@keyframes blink {
  0% {
    box-shadow:0px 0px 0px 0px rgba(255, 255, 255, 0.7);
  }
  100% {
    box-shadow:0px 0px 12px 12px rgba(255, 255, 255, 0.5);
  }
}

@keyframes flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow:
      -0.1rem -0.1rem 0.5rem #fff,
      0.1rem 0.1rem 0.5rem #fff,
      0 0 1.2rem v-bind(titleNeonColor),
      0 0 2.4rem v-bind(titleNeonColor),
      0 0 3.6rem v-bind(titleNeonColor),
      0 0 4.8rem v-bind(titleNeonColor),
      0 0 6rem v-bind(titleNeonColor);
    }

    20%, 24%, 55% {
      text-shadow: none;
      box-shadow: none;
    }
}
</style>