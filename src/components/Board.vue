
<script lang="ts" setup>
interface Props {
  cells: number[];
  selfCandidates: number[];
  prevPlacedCell: number;
  prePlaceCell: number;
  currentTurn: number;
}
const props = defineProps<Props>();

interface Emits {
  (e: "prePlace", value: number): void;
  (e: "endPrePlace", value: void): void;
}
const emit = defineEmits<Emits>();
const isCellCircle = (cellNum: number) => [18, 22, 50, 54].includes(cellNum);
const findCandidate = (cellNum: number) => props.selfCandidates.some(e => e == cellNum);
</script>

<template>
<div class="board">
  <div class="cell" :class='{candidate: findCandidate(index), "prev-placed": index == prevPlacedCell, "cell-circle":isCellCircle(index)}' v-for="(item, index) in cells" @click='emit("prePlace", index)'>
    <div v-if="item > 0" class="disk black" :class='{"black-back": item != 1}'></div>
    <div v-if="item > 0" class="disk white" :class='{"white-front": item == 2}'></div>
    <div v-if="prePlaceCell == index" class="pre-place-disk" :class='{black: currentTurn == 1}' @animationend='emit("endPrePlace")'></div>
  </div>
</div>
</template>

<style lang="scss" scoped>
  .board {
    width: 544px;
    height: 544px;
    display: flex;
	  flex-wrap: wrap;
    background-image: radial-gradient(at 450px 500px, rgb(43, 87, 64) 0%, rgb(69, 138, 101) 60%,  rgb(151, 202, 175) 90%, rgb(121, 182, 155) 100% );
    z-index: 5;
    .cell {
      box-sizing: border-box;
      width: 68px;
      height: 68px;
      border: 1px solid #333;
      position: relative;
      transition: background-color 0.5s ease 0.5s;

      &.cell-circle {
        &:before {
          position: absolute;
          content: '';
          background-color: #3a3a3a;
          top: -7px;
          left: -7px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
      }
      &:not(.cell-circle) {
        &:before {
          position: absolute;
          content: '';
          background-color: #3a3a3a;
          top: -4px;
          left: -4px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
      }
      &.candidate {
        background-color: rgba(0,250, 0, 0.4);
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
      }
      &.prev-placed {
        background-color: rgba(255, 253, 129, 0.7);
        z-index: 2;
      }
      .pre-place-disk {
        position: absolute;
        border-radius: 50%;
        width: 58px;
        height: 58px;
        left: 3px;
        top: 3px;
        animation: pre-place 0.6s ease 0s 1 reverse;
        box-shadow: 2px 2px 1px#222;
        background-image: radial-gradient(at 20px 20px, #eee 0% 40%, #ddd 60% 80%, #eee 90%);
        z-index: 3;
        &.black {
          box-shadow: 2px 2px 1px#eee;
          background-image: radial-gradient(at 45px 45px, #111 0% 40%, #333 60%, #333 80%, #111 90%);
        }
      }
      .disk {
        border-radius: 50%;
        width: 58px;
        height: 58px;
        transition: all 1s ease-in-out;
        position: absolute;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        left: 3px;
        top: 3px;
        z-index: 1;

        &.black {
          box-shadow: 2px 2px 1px#eee;
          background-image: radial-gradient(at 45px 45px, #111 0% 40%, #333 60%, #333 80%, #111 90%);
        }
        &.white {
          box-shadow: 2px 2px 1px#222;
          background-image: radial-gradient(at 20px 20px, #eee 0% 40%, #ddd 60% 80%, #eee 90%);
          transform:rotateY(180deg);
        }
        &.white-front {
          transform:rotateY(0deg);
        }
        &.black-back {
          transform:rotateY(-180deg);
        }
      }
    }
  }

@keyframes pre-place {
  0% {transform: translate(-2px, -15px); opacity: 1;}
  100% {transform: translate(0px, 0px); opacity: 0.5;}
}
</style>
