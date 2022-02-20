<script lang="ts" setup>
import { reactive } from 'vue';
import { randomNum } from '../../shared/util';

interface Props {
  turn: number;
  player: number;
  name: string;
  score: number;
  totalScore: number;
  passes:number;
  result: number;
}
const props = defineProps<Props>();
const resultText = (result: boolean) => result ? 'Winner' : 'Lose';
const isLose = () => props.player != props.result && props.result != 3;
const moveDuration = 3000;
const rotateDuration = 500;
const pieceNum = 30;
const colors = ["#e290a7", "#2f7ba1", "#d2b155", "#f1e53e", "#ac7db1", "#d62d81", "#d84d2a", "#96d3d6", "#3f8f4a", "#e79549"];

const getConfettiParams = (num: number) => {
  const ary = [];
  for (let i = 1; i <= num; i++)  {
    const delay = randomNum(0, moveDuration * .5);
    const param1 = {
      left: `${i * (100 / (num + 1))}%`,
      width: `${randomNum(6, 12)}px`,
      height: `${randomNum(6, 12)}px`,
      transform: `rotate(${randomNum(-80, 80)}deg)`,
      'animation-delay': `${delay}ms`,
      'animation-duration': `${randomNum(moveDuration * .7, moveDuration * 1.2)}ms`
    }
    const param2 = {
      'animation-delay': `${delay}ms`,
      'animation-duration': `${randomNum(rotateDuration * .7, rotateDuration * 1.2)}ms`,
      'background-color': colors[randomNum(0, 10)]
    };
    ary.push([param1, param2]);
  }
  return ary;
}
const confettiParamsFront = reactive(getConfettiParams(pieceNum * 0.3));
const confettiParamsBack = reactive(getConfettiParams(pieceNum * 0.7));

const getMoveClass = () => `confettiMove${randomNum(1, 6)}`;
const getRotateClass = () => `confettiRotate${randomNum(1, 3)}`;

</script>

<template>
  <div class="player-wrapper">
    <div v-if="result == player" class="confetti back">
      <span class="piece" :class="getMoveClass()" :style="item[0]" v-for="item in confettiParamsBack">
        <span class="piece-inner" :class="getRotateClass()" :style="item[1]"></span>
      </span>
    </div>

    <div class="player" :class='{black: turn == 1, winner: result == player, lose: isLose(), "draw-left": result == 3 && player == 1, "draw-right": result == 3 && player == 2}'>
      <span v-if='result !=3' class="result-text">{{resultText(result == player)}}</span>
      <div class="name">{{name}}</div>
      <div class="score"><span class="number">{{score}}</span> disks</div>
      <div class="passes"><span class="number">{{passes}}</span> passes</div>
    </div>

    <div v-if="result == player" class="confetti front">
      <span class="piece" :class="getMoveClass()" :style="item[0]" v-for="item in confettiParamsFront">
        <span class="piece-inner" :class="getRotateClass()" :style="item[1]"></span>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.player-wrapper {
  position: relative;
  .confetti {
    position: absolute;
    top: -100px;
    width: 100%;
    height: 500px;
    .piece {
      display: block;
      position: absolute;
      top: 0;
      opacity: 0;
      animation-iteration-count: infinite;
      animation-timing-function: ease-out;
      @for $i from 1 through 6 {
        &.confettiMove#{$i} { animation-name: confettiMove#{$i};}
      }
      .piece-inner {
        display: block;
        width: 100%;
        height: 100%;
        animation-iteration-count: infinite;
        animation-timing-function: ease-out;
        @for $i from 1 through 3 {
          &.confettiRotate#{$i} { animation-name: confettiRotate#{$i};}
        }
      }
    }
  }
}

.player {
  background-color: white;
  padding: 0.5em;
  width: 170px;
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 1s;
  border-radius: 50%;
  position: relative;
  font-size: medium;
  margin: 2em 100px;

  &.black {
    background-color: black;
    color: white;
  }

  &.winner {
    animation: winJumping 1.7s linear 0s infinite;
    .result-text {
      position: absolute;
      content: 'Winner';
      font-size: 50px;
      top: -60px;
      text-shadow: 2px 2px 2px #222;
      &:before {
        position: absolute;
        content: 'Winner';
        font-size: 50px;
        background-image: linear-gradient(0deg, #b8751e 0%, #ffce08 37%, #fefeb2 47%, #fafad6 50%, #fefeb2 53%, #e1ce08 63%, #b8751e 100%);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        text-shadow: none;
      }
    }
  }

  &.lose .result-text {
    position: absolute;
    content: 'Lose';
    font-size: 50px;
    top: -60px;
    color: white;
    text-shadow: 2px 2px 2px #222;
  }
  .name {
    font-size: xx-large;
    margin-bottom: 6px;
  }
  .score, .passes {
    width: 150px;
  }
  .number {
    text-align: right;
    font-size: x-large;
    display: inline-block;
    width: 50px;
    margin-left: 12px;
  }

  &.draw-right {
    animation: drawRight 2.5s ease-in infinite;
  }
  &.draw-left {
    animation: drawLeft 2.5s ease-in infinite;
  }
}

@keyframes winJumping {
  0%   { transform: scale(1.0, 1.0) translate(0%, 0%); }
  10%  { transform: scale(1.1, 0.9) translate(0%, 5%); }
  40%  { transform: scale(1.2, 0.8) translate(0%, 15%); }
  50%  { transform: scale(1.0, 1.0) translate(0%, 0%); }
  60%  { transform: scale(0.9, 1.2) translate(0%, -130%); }
  75%  { transform: scale(0.9, 1.2) translate(0%, -20%); }
  85%  { transform: scale(1.2, 0.8) translate(0%, 15%); }
  100% { transform: scale(1.0, 1.0) translate(0%, 0%); }
}

@keyframes drawRight {
  0%   { transform: translateX(0px) rotate(0deg); }
  10% { transform: translateX(100px) rotate(50deg); }
  90% { transform: translateX(-100px) rotate(-50deg); }
  100% { transform: translateX(0px) rotate(0deg); }
}

@keyframes drawLeft {
  0%   { transform: translateX(0px) rotate(0deg); }
  10% { transform: translateX(-100px) rotate(-50deg); }
  90% { transform: translateX(100px) rotate(50deg); }
  100% { transform: translateX(0px) rotate(0deg); }
}


@keyframes confettiMove1 {
  0% { opacity: 0; }
  10% { opacity: 1;}
  80% { opacity:1;}
  100% {opacity:0; transform: translate(0, 350px);}
}

@keyframes confettiMove2 {
  0% { opacity: 0;}
  10% { opacity: 1;}
  80% { opacity:1;}
  100% {opacity:0; transform: translate(100%, 350px);}
}

@keyframes confettiMove3 {
  0% { opacity: 0;}
  10% { opacity: 1;}
  80% { opacity:1;}
  100% {opacity:0; transform: translate(-100%, 350px);}
}

@keyframes confettiMove4 {
  0% { opacity: 0;}
  10% { opacity: 1;}
  80% { opacity:1;}
  100% {opacity:0; transform: translate(300%, 350px);}
}

@keyframes confettiMove5 {
  0% { opacity: 0;}
  10% { opacity: 1;}
  80% { opacity:1;}
  100% {opacity:0; transform: translate(-300%, 350px);}
}

@keyframes confettiMove6 {
  0% { opacity: 0;}
  10% { opacity: 1;}
  80% { opacity:1;}
  100% {opacity:0; transform: translate(-500%, 350px);}
}

@keyframes confettiRotate1 {
  0% { transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}

@keyframes confettiRotate2 {
  0% { transform: rotateX(0deg);}
  100% {transform: rotateX(360deg);}
}

@keyframes confettiRotate3 {
  0% { transform: rotateY(0deg);}
  100% {transform: rotateY(360deg);}
}
</style>
