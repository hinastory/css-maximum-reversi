<script lang="ts" setup>
import { ref, onUpdated} from 'vue';
import Player from './Player.vue';
import { sleep } from '../../shared/util';
import Volume from '../icons/Volume.vue';

interface Props {
  isOpen: boolean;
  gameResult: number;
  playerName: string[];
  selfTurn: number;
  selfScore: number;
  selfPasses:number;
  opponentScore: number;
  opponentPasses: number;
  volumeFlag: boolean;
}
const props = defineProps<Props>();
const totalScore = ref(props.selfScore + props.opponentScore);
const isCredit = ref(false);
const isResultBoard = ref(true);

interface Emits {
  (e: "change", value: boolean): void;
  (e: "start", value: {turn: number}): void;
  (e: "next", value: void): void;
}
const emit = defineEmits<Emits>();

const nextRef = ref(null);
onUpdated(() => {
  if (props.isOpen) {
    nextRef.value.focus();
  }
});

const start = async() => {
  await sleep(14000);
  isResultBoard.value = false;
}

const next = async() => {
  isCredit.value = false;
  isResultBoard.value = true;
  emit('next');
}
</script>

<template>
  <teleport to="body">
    <transition name="fade" v-on:after-enter="start()">
      <div v-if="isOpen" class="game-ending">
        <transition name="fade" v-on:after-leave="isCredit=true">
          <div v-if="isResultBoard" class="result-board">
            <div v-if="gameResult==3" class="draw">Draw</div>
            <player :turn="(selfTurn % 2) + 1" :player="2" :name="playerName[1]" :score="opponentScore" :total-score="totalScore" :passes="opponentPasses" :result="gameResult"/>
            <player :turn="selfTurn" :player="1" :name="playerName[0]" :score="selfScore" :total-score="totalScore" :passes="selfPasses" :result="gameResult"/>
        </div>
        </transition>
        <transition name="fade" v-on:after-leave="isResultBoard=true">
          <div v-if="isCredit" class="credit">
            <div class="item title">CSS Maximum Reversi</div>
            <div class="item">〜 CSS Limits God Only Knows 〜</div>
            <div class="item">Staff</div>
            <div class="item"><span class="role">Programmer</span>hinastory</div>
            <div class="item"><span class="role">Graphic Designer</span>hinastory</div>
            <div class="item"><span class="role">Motion Designer</span>hinastory</div>
            <div class="item"><span class="role">Music Composer</span>hinastory</div>
            <div class="item">Special Thanks</div>
            <div class="item">CSS Creator and Contributors</div>
            <div class="item">Vue Creator and Contributors</div>
            <div class="item">CodePen and CSS Special Works</div>
            <div class="item">and All Software Contributors...</div>
            <div class="item" @animationend="isCredit=false">and you...</div>
          </div>
        </transition>
        <div class='action'>
          <div style="display: block; width: 120px"></div>
          <div class="next" @click="next" ref="nextRef">Next</div>
          <div class="volume">
            <input id="volume" type="checkbox" v-model="volumeFlag" />
            <label for="volume" @click="emit('change', volumeFlag)">
              <volume style="--ggs:2" />
            </label>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style lang="scss" scoped>
.fade-enter-active  {
  transition: opacity 6s ease;
}

.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.game-ending {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  font-size: xx-large;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  .result-board {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width:780px;
    height: 250px;
  }

  .credit {
    position: relative;
    width: 610px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Comic Sans MS','Bradley Hand', cursive;;
    font-size: 33px;
    color: #fff;
    font-weight: bolder;
    perspective: 200px;

     &:before {
      position: absolute;
      content: '';
      top: 80px;
      display: block;
      width: 610px;
      height: 170px;
      border-radius: 10px;
      background-color: black;
      background: linear-gradient(45deg, rgba(126, 14, 170, 0.4), rgba(0, 255, 0, 0.4), rgba(0, 0, 255, 0.4),rgba(238, 255, 0, 0.4), );
      background-size: 200% 200%;
      animation: bggradient 20s ease infinite;
      overflow: hidden;
    }

    .role {
      display: inline-block;
      padding-right: 2em;
    }

    .title {
      font-size: 38px;
      font-weight: 900;
    }

    .item {
      position: absolute;
      top: 0px;
      display: block;
      opacity: 0;
      animation: creditMove 8s linear;
      transform-style: preserve-3d;
    }

    @for $i from 2 through 13 {
      >*:nth-child(#{$i}) {
        animation-delay: #{($i - 1) * 5}s;
      }
    }
  }

  .draw {
    position: absolute;
    left: 43%;
    font-family: fantasy;
    font-size: 40px;
    color: rgb(243, 181, 65);
    text-shadow: 0px 2px 0px rgba(0, 0, 0, .4);
  }
  .next {
    width: 100px;
    height:100px;
    background-color: rgba(255, 255, 255, .2);
    border-radius: 50%;
    color: #fff;
    box-shadow: 0 4px 4px rgba(0, 0, 0, .2), inset 0 2px 2px rgba(255, 255, 255, .7);
    text-shadow: 0px 2px 0px rgba(0, 0, 0, .4);
    font-size: xx-large;
    text-align: center;
    vertical-align: middle;
    line-height: 95px;
    position: relative;
    cursor: pointer;
    margin-top: 120px;
    &:active {
      background-color: rgba(255, 255, 255, .3);
    }
    &:before {
      position: absolute;
      left: 0;
      top: 0;
      content: '';
      width: 100px;
      height:100px;
      border-radius: 50%;
      animation: blink 1.7s ease-in-out 0s infinite alternate;
    }
  }
}

.action {
  display: flex;
  justify-content: center;
  align-items: center;
}
.volume {
  margin-left: 40px;
  margin-top: 120px;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    opacity: 0;
  }
  label {
    display: block;
    position: relative;
    width: 20px;
    height: 20px;
    padding: 26px 28px 14px 12px;
    border-radius: 50%;
    color: #fff;
    background-color: rgba(106, 132, 148, 0.8);
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

@supports not (backdrop-filter: blur(12px)) {
  .game-ending {
    background: rgba(255,255,255,.4);
  }
}


@keyframes endingFadeOut {
  0% {
    display: block;
    opacity: 0;
  }
  20% { opacity: 1; }
  80% { opacity: 1; }
}


@keyframes blink {
  0% {
    box-shadow:0px 0px 0px 0px rgba(255, 255, 255, 0.7);
  }
  100% {
    box-shadow:0px 0px 12px 12px rgba(255, 255, 255, 0.5);
  }
}

@keyframes creditMove{
  0% {
    display: block;
    opacity: 0;
    transform: translateY(300px) rotateX(0deg) scale(1.4);
  }
  40% {
    display: block;
    opacity: 1;
    transform: translateY(150px) rotateX(0deg) scale(1);
  }
  60% {
    display: block;
    opacity: 1;
    transform: translateY(150px) rotateX(0deg) scale(1);
  }
  75% {
    display: block;
    opacity: 1;
    transform: translateY(75px) rotateX(25deg) scale(0.8);
  }
  100% {
    display: none;
    opacity: 0;
    transform: translateY(0px) rotateX(45deg) scale(0.6);
  }
}


@keyframes bggradient{
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>