<script lang="ts" setup>

interface Props {
  turn: number;
  name: string;
  score: number;
  passes:number;
  thinking: boolean;
  level: string;
}
const props = defineProps<Props>();

const levelSymbol = () => {
  if (props.name == "AI") {
    return props.level + "-symbol";
  } else {
    return "";
  }
};
</script>

<template>
<div class="player" :class="{glow: thinking, black: turn == 1, white: turn == 2, thinking: thinking}">
  <div class="name"><div :class="levelSymbol()">{{name}}</div></div>
  <div class="score"><span class="number">{{score}}</span> <span>disks</span></div>
  <div class="passes"><span class="number">{{passes}}</span> passes</div>
</div>
</template>

<style lang="scss" scoped>
  .player {
    background-color: white;
    padding: 0.5em;
    width: 120px;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 1s;
    border-radius: 50%;
    position: relative;
    font-size: small;
    &.black {
      background-color: black;
      color: white;
      &.thinking {
        &:after{
          position: absolute;
          content: '';
          width: 110px;
          height: 110px;
          border: 4px solid white;
          border-radius: 50%;
          border-left-color: transparent;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          animation: spin linear 2.5s;
          animation-iteration-count: infinite;
        }
      }
    }
    &.white {
      background-color: white;
      color: black;

      &.thinking {
        &:after{
          position: absolute;
          content: '';
          width: 110px;
          height: 110px;
          border: 4px solid black;
          border-radius: 50%;
          border-left-color: transparent;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          animation: spin ease-in 2.5s;
          animation-iteration-count: infinite;
        }
      }
    }

    &.glow {
      filter: drop-shadow(0 0 20px black);
    }

    .name {
      font-size: x-large;
      margin-bottom: 6px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: end;
    }

    .score, .passes {
      width: 110px;
    }
    .number {
      text-align: right;
      font-size: large;
      display: inline-block;
      width: 30px;
      margin-left:10px;
    }
  }

.easy-symbol {
   border-bottom: 4px solid pink;
}

.normal-symbol {
   border-bottom: 4px solid #E8DF90;
}

@keyframes spin {
  0% {transform: translate(-50%, -50%) rotate(0deg);}
  100% {transform: translate(-50%, -50%) rotate(360deg); }
}
</style>
