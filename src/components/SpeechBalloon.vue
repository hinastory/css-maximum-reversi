<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { sleep, randomNum } from '../shared/util';

interface Props {
  isOpen: boolean;
}
defineProps<Props>();
const activeNum = ref(1);
const isContents = ref(false);
const isMaxim= ref(false);

const contents = reactive([
  'This is &quot;<span class="marked blue-line">CSS Maximum Reversi.</span>',
  'This is created by <span class="marked green-line">hinastory</span>.',
  'Opening BGM title is &quot;<span class="marked orange-line">Maximum The CSS</span>&quot;.',
  'Main BGM title is &quot;<span class="marked yellow-line">CSS MEETS VUE</span>&quot;.',
  'Ending BGM title is &quot;<span class="marked pink-line">NO CSS NO LIFE</span>&quot;.'
]);

const maxims = reactive([
  'Change before you have to.',
  'If you can dream it, you can do it.',
  'If you can imagine it, you can make it.',
  'Peace begins with a smile.',
  'Everything is practice.',
  'If you want to be happy, be.',
  'Happiness depends upon ourselves.',
  'Good artists copy, great artists steal.',
  'Imagination means nothing without doing.',
  'Everybody has talent, but ability takes hard work.',
  'Information is not knowledge.',
  'Name the greatest of all inventors. Accident.',
  'Every day is a new day.',
  'To live is to think.',
  'I think, therefore I am.',
  'The die is cast.',
  'Stay hungry. Stay foolish.',
  'Fear always springs from ignorance.',
  'The first and best victory is to conquer self.',
  'Often you have to rely on intuition.',
  'A goal without a plan is just a wish.',
  'Patience is also a form of action.',
  'Do something worth remembering.',
  'I am free, that is why I’m lost.',
  'Love truth, but pardon error.',
  'The more you reason the less you create.',
  'Find purpose, the means will follow.',
  'I do not seek, I find.',
  'Without haste, but without rest.',
  'Never, never, never, never give up.',
  'Things do not change; we change.',
  'Keep looking up.. That’s the secret of life..',
  'Quality questions create a quality life.',
  'Hell is other people.',
  'Conquer yourself rather than the world.',
  'Example is leadership.',
  'As you think, so shall you become.',
  'Truth is always strange, stranger than fiction.',
  'The cry of equality pulls everyone down.',
  'When you learn, teach, when you get, give.',
  'Be happy, but never satisfied.',
  'In the middle of difficulty lies opportunity.',
  'Think rich, look poor.',
  'To understand is to perceive patterns.',
  'Don’t find fault,find a remedy.',
  'Peace begins with a smile.',
  'Now or never!',
  'Don’t think, feel!',
  'No pain, no gain.',
  'Be a giver!',
  'Whatever you are, be a good one.',
  'There is always light behind the clouds.',
  'Never regret anything that made you smile.',
  'Quality means doing it right when no one is looking.',
  'Fate shuffles the cards and we play.',
  'God is in the details.',
  'Go figure. Nobody lent me a brain.'
]);

const startContents = async () => {
  await sleep(randomNum(7000, 15000));
  isContents.value = true;
  activeNum.value = randomNum(0, contents.length-1);
  await sleep(randomNum(10000, 15000));
  isContents.value = false;
}

const startMaxim = async () => {
  await sleep(randomNum(7000, 15000));
  isMaxim.value = true;
  activeNum.value = randomNum(0, maxims.length-1);
  await sleep(randomNum(10000, 15000));
  isMaxim.value = false;
}

startContents();
</script>

<template>
  <transition name="fade" v-on:after-leave="startMaxim()">
    <div v-if="isContents" class="speech-balloon">
      <span  class="content" v-html="contents[activeNum]"></span>
    </div>
  </transition>
  <transition name="fade" v-on:after-leave="startContents()">
    <div v-if="isMaxim" class="thinking-balloon">
      <span class="maxim">{{maxims[9]}}</span>
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
.speech-balloon {
  position: relative;
  display: inline-block;
  padding: 7px 10px;
  margin-top: 24px;
  min-width: 80%;
  max-width: 100%;
  background: rgb(255,235,231);
  border-radius: 15px;
  box-sizing: border-box;
  border: 4px solid rgb(248,213,205);
  box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.5);
  .content {
    color: black;
    font-size: 17px;
    line-height: 1.7em;
    font-weight: bold;
    font-family: serif;
    position: relative;

    :deep(.marked) {
      white-space: pre-wrap;
      background-position: right;
      transition: all 1s ease;
      box-shadow: inset 0 10px rgb(255,235,231);

      &:hover {
        background-position: left;
        background-size: 200% 200%;
      }

      &.pink-line {
        background-image: linear-gradient(transparent 45%, #ffb4db 10px);
        &:hover { background-image: linear-gradient(to right, #ffb4db 50%, transparent 50%);}
      }

      &.blue-line {
        background-image: linear-gradient(transparent 45%, #cce2fd 10px);
        &:hover { background-image: linear-gradient(to right, #cce2fd 50%, transparent 50%);}
      }

      &.yellow-line {
        background-image: linear-gradient(transparent 45%, #fdfd99 10px);
        &:hover { background-image: linear-gradient(to right, #fdfd99 50%, transparent 50%);}
      }

      &.orange-line {
        background-image: linear-gradient(transparent 45%, #fac69c 10px);
        &:hover { background-image: linear-gradient(to right, #fac69c 50%, transparent 50%);}
      }

      &.green-line {
        background-image: linear-gradient(transparent 45%, #bef8aa 10px);
        &:hover { background-image: linear-gradient(to right, #bef8aa 50%, transparent 50%);}
      }
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: -26px;
    left: 50%;
    margin-left: -15px;
    border: 12px solid transparent;
    border-bottom: 15px solid rgb(255,235,231);;
    z-index: 2;
  }
  &:after {
    content: "";
    position: absolute;
    top: -34px;
    left: 50%;
    margin-left: -17px;
    border: 14px solid transparent;
    border-bottom: 18px solid rgb(248,213,205);
    z-index: 1;
  }
}

.thinking-balloon {
  position: relative;
  margin: 2.9em 0 0 0;
  padding: 15px;
  background: rgba(255,240,198, 0.3);
  border-radius: 30px;
  min-width: 80%;
  max-width: 90%;
  box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.5);

  .maxim {
    color: #222;
    font-size: 18px;
    line-height: 1.7em;
    font-family: 'Comic Sans MS','Bradley Hand', cursive;
  }

  &:before {
    content: "";
    position: absolute;
    left: 48%;
    width: 13px;
    height: 12px;
    top: -40px;
    background: rgba(255,240,198,0.3);
    border-radius: 50%;
    box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.2);
  }

  &:after {
    content: "";
    position: absolute;
    left: 50%;
    width: 20px;
    height: 18px;
    top: -25px;
    background: rgba(255,240,198,0.3);
    border-radius: 50%;
    box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.2);
  }
}

@media screen and (max-width: 1120px) {
.speech-balloon {
  width: 150px;
  min-width: 50%;
  margin-top: 0;
  margin-left: 24px;
  .content {
    font-size: 15px;
  }
  &:before {
    top: 40%;
    left: -26px;
    margin-left: 0;
    border: 12px solid transparent;
    border-right: 15px solid rgb(255,235,231);;
    z-index: 2;
  }
  &:after {
    top: 39%;
    left: -34px;
    margin-left: 0;
    border: 14px solid transparent;
    border-right: 18px solid rgb(248,213,205);
    z-index: 1;
  }
}

.thinking-balloon {
  width: 153px;
  min-width: 30%;
  margin: 0 0 0 20px;
  padding: 7px;
  border-radius: 25px;

  .maxim {
    font-size: 15px;
  }

  &:before {
    left: -31px;
    top: -12px;
  }

  &:after {
    left: -13px;
    top: -12px;
  }
}

}
</style>