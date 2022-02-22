<script lang="ts" setup>
import { ref, onUpdated} from 'vue';
import Player from './Player.vue';
import Credit from './Credit.vue';
import { sleep } from '../../shared/util';
import VolumeIcon from '../icons/VolumeIcon.vue';

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
  (e: "changeVolume", value: boolean): void;
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
        <credit :is-open="isCredit" @end="isCredit=false"  @fadeout="isResultBoard=true"/>
        <div class='action'>
          <div style="display: block; width: 120px"></div>
          <div class="next" @click="next" ref="nextRef">Next</div>
          <div class="volume">
            <input id="volume" type="checkbox" v-model="volumeFlag" />
            <label for="volume" @click="emit('changeVolume', volumeFlag)">
              <volume-icon style="--ggs:2" />
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
    line-height: 108px;
    position: relative;
    font-family: 'Satisfy', cursive;
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


@keyframes blink {
  0% {
    box-shadow:0px 0px 0px 0px rgba(255, 255, 255, 0.7);
  }
  100% {
    box-shadow:0px 0px 12px 12px rgba(255, 255, 255, 0.5);
  }
}

</style>