<script lang="ts" setup>
import { ref } from 'vue';

const sleep = (msec) => new Promise(s => setTimeout(s, msec));
const firstNo = ref(false);
const secondNo = ref(false);
const thirdNo = ref(false);

const start = async () => {
  firstNo.value = true;
  await sleep(3000);
  secondNo.value = true;
  await sleep(3000);
  thirdNo.value = true;
}

start();
</script>

<template>
<div class="scene">
  <div>
    <div v-if="!firstNo">&nbsp;</div>
    <div v-if="firstNo" class="dance">
      <span>N</span><span>o</span>&nbsp;<span>I</span><span>m</span><span>a</span><span>g</span><span>e</span><span>.</span>&nbsp;&nbsp;
      <span>N</span><span>o</span>&nbsp;<span>S</span><span>V</span><span>G</span><span>.</span>
    </div>
  </div>
  <div>
    <div v-if="!secondNo">&nbsp;</div>
    <div v-if="secondNo" class="dance">
      <span>N</span><span>o</span>&nbsp;<span>E</span><span>m</span><span>o</span><span>j</span><span>i</span><span>.</span>&nbsp;&nbsp;
       <span>N</span><span>o</span>&nbsp;<span>C</span><span>a</span><span>n</span><span>v</span><span>a</span><span>s</span><span>.</span>
    </div>
  </div>
  <div>
    <div v-if="!thirdNo">&nbsp;</div>
    <div v-if="thirdNo" class="dance">
      <span>N</span><span>o</span>&nbsp;<span>W</span><span>e</span><span>b</span><span>G</span><span>L</span><span>.</span>&nbsp;&nbsp;
      <span>N</span><span>o</span>&nbsp;<span>A</span><span>j</span><span>a</span><span>x</span><span>.</span>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
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
  font-size: 32px;
  perspective: 200px;

  @for $i from 1 through 3 {
    >*:nth-child(#{$i}) {
      line-height: 2.8em;
      transform-style: preserve-3d;
      @if $i % 2 == 0 {
       animation: spinReverse 2s ease-out;
      } @else {
        animation: spin 2s ease-out;
      }
      animation-fill-mode: forwards;
      animation-delay: #{$i + 11}s;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
  }
}

@keyframes spin {
  0% {transform: rotateY(0deg);}
  100% {transform: rotateY(180deg); }
}

@keyframes spinReverse {
  0% {transform: rotateY(0deg);}
  100% {transform: rotateY(-180deg); }
}

.dance span {
	display: inline-block;
  color: #eee;
  text-shadow: 0 0 13px #ff0;
	opacity: 0;
	transform: translate(-150px, 0) scale(.3);
	animation: leftRight 2s forwards;

  @for $i from 2 through 22 {
    &:nth-of-type(#{$i}) {
	    animation-delay: #{($i - 1) * 0.05}s;
    }
  }
}


@keyframes leftRight {
	40% {
		transform: translate(50px, 0) scale(.7);
		opacity: 1;
		color: rgb(244,198,181);
	}

	60% {
		color: rgb(217,215,115);
	}

	80% {
		transform: translate(0) scale(2);
		opacity: 0;
	}

	100% {
		transform: translate(0) scale(1);
		opacity: 1;
	}
}

</style>