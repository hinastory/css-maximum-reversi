<script lang="ts" setup>

interface Props {
  isOpen: boolean;
}
defineProps<Props>();

interface Emits {
  (e: "close", value: void): void;
}
const emit = defineEmits<Emits>();

</script>

<template>
  <transition name="fade"  @animationend = 'emit("close")'>
    <div v-if="isOpen" class="announce">
      <div class="call"><slot></slot></div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.announce {
  position: absolute;
  z-index: 30;
  display: flex;
  justify-content :center;
  align-items: center;
  top: 80px;
  opacity:0;
  animation-name: announce;
  animation-duration: 1.2s;
  animation-timing-function: linear;
  .call {
    font-size: 50px;
    color: white;
    font-weight: bolder;
    text-shadow:  2px 2px 2px black;
  }
}

@keyframes announce {
  0% {
    opacity: 0;
    transform: translateY(0px);
  }
  20%{
    opacity: 1;
    transform: translateY(50px);
  }
  40%{
    opacity: 1;
    transform: translateY(100px);
  }
  100%{
    opacity: 0;
    transform: translateY(120px);
  }
}

</style>