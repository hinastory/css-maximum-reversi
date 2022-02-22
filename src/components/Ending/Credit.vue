<script lang="ts" setup>

interface Props {
  isOpen: boolean;
}
defineProps<Props>();

interface Emits {
  (e: "end", value: void): void;
  (e: "fadeout", value: void): void;
}
const emit = defineEmits<Emits>();

</script>

<template>
  <transition name="fade" v-on:after-leave="emit('fadeout')">
    <div v-if="isOpen" class="credit">
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
      <div class="item" @animationend="emit('end')">and you...</div>
      </div>
  </transition>
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
    animation: CreditBackGradient 20s ease infinite;
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

@keyframes endingFadeOut {
  0% {
    display: block;
    opacity: 0;
  }
  20% { opacity: 1; }
  80% { opacity: 1; }
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


@keyframes CreditBackGradient{
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