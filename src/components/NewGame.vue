<script lang="ts" setup>
import { ref } from 'vue';

interface Props {
  isOpen: boolean;
}
const props = defineProps<Props>();

interface Emits {
  (e: "start", value: {turn: number, level: string}): void;
  (e: "cancel", value: void): void;
}
const emit = defineEmits<Emits>();
const turn = ref(false);
let isStart = ref(false);
const level = ref("normal");

const close = () => {
  if (isStart.value){
    emit("start", {turn: turn.value == false ? 1 : 2, level: level.value});
  } else {
    emit("cancel");
  }

  turn.value = false;
  isStart.value = false;
  level.value = "normal";
}

const showModal = ref(false);
const startRef = ref(null);
</script>

<template>
  <teleport to="body">
    <transition name="fade"  v-on:after-enter="showModal = true">
      <div v-if="isOpen" class="modal-backdrop">
        <transition name="fade" v-on:after-leave='close()'>
          <div v-if="showModal" class="modal">
            <div class="modal-content">
              <h2>New Game</h2>
              Start a new game!
              <div class="turn">
                <span class="name">Turn</span>
                <div class="next-btn">
                  <input id="turn" class="disk disk-flip" type="checkbox" v-model="turn">
                  <label class="disk-btn " data-tg-off="1st" data-tg-on="2nd" for="turn" ></label>
                </div>
              </div>
              <div class="level">
	              <div class="tabs">
		              <input type="radio" id="easy" value="easy" v-model="level" />
		              <label class="tab" for="easy"><span class="easy-symbol"></span>Easy</label>
		              <input type="radio" id="normal" value="normal" v-model="level" />
		              <label class="tab" for="normal"><span class="normal-symbol"></span>Normal</label>
		              <span class="glider"></span>
	              </div>
              </div>
            </div>
            <div class="modal-action">
              <button ref="startRef" class="btn new-game" @click='isStart = true;showModal = false'>Start</button>
              <button class="btn" @click='showModal = false'>Cancel</button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content :center;
  align-items: center;
}
.modal {
  border-radius: 10px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  background-color: rgba(153,229,255, 0.175);
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
  border: 2px rgba(255,255,255,0.4) solid;
  border-bottom: 2px rgba(40,40,40,0.35) solid;
  border-right: 2px rgba(40,40,40,0.35) solid;
  margin: 15% auto;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  min-height: 330px;
  border-radius: 8px;
  display: flex;
  flex-flow: column;
  justify-content:space-between;
}

.modal-content {
  font-size: larger;
  text-align: center;
  padding: 0.9em;
  line-height: 2em;
  display: flex;
  flex-flow: column;
  color: #fff;
  text-shadow: 0px 0px 5px black, 1px 2px 5px rgb(0 0 0 / 50%);
  justify-content: center;
  align-items: center;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.turn {
  padding: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: none;
  .name {
    display: inline-block;
    margin-right: 10px;
  }
}
.modal-action {
  padding: 0.8em;
  display: flex;
  flex-direction: row-reverse;
  column-gap: 0.5em;

  .btn {
    width: 130px;
    background-color: rgba(255, 255, 255, 0.5);
    color: white;
    cursor: pointer;
    padding: 0.5em 1em;
    text-align: center;
    border: 2px rgba(255,255,255,0.4) solid;
    border-radius: 0.375em;
    font-size: 1.1rem;
    height: 2.5em;
    justify-content: center;
    line-height: 1.5;
    box-shadow: 3px 3px 3px rgba(255, 255, 255, 0.5);
    text-shadow: 0px 0px 5px black, 1px 2px 5px rgb(0 0 0 / 50%);

    &:hover {
      text-decoration: none;
      border-color: rgba(255,255,255,0.8);
    }

    &.new-game {
      background-color: rgba(72, 199, 142, 0.5);
      box-shadow: 3px 3px 3px rgba(100, 255, 150, 0.5);
      color: white;
    }
  }
}

.next-btn {
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  animation: blink 1.7s ease-in-out 0s infinite alternate;
}

.disk {
  display: none;
  &,
  &:after,
  &:before,
  & *,
  & *:after,
  & *:before,
  & + .disk-btn {
    box-sizing: border-box;
    &::selection {
      background: none;
    }
  }

  + .disk-btn {
    outline: 0;
    display: block;
    width: 4em;
    height: 2em;
    position: relative;
    cursor: pointer;
    user-select: none;
    &:after,
    &:before {
      position: relative;
      display: block;
      content: "";
      width: 50%;
      height: 100%;
    }

    &:after {
      left: 0;
    }

    &:before {
      display: none;
    }
  }

  &:checked + .disk-btn:after {
    left: 50%;
  }
}

.disk-flip {
  + .disk-btn {
    width:50px;
    height: 50px;
    padding: 2px;
    transition: all .2s ease;
    font-family: sans-serif;
    perspective: 100px;
    &:after,
    &:before {
      display: inline-block;
      transition: all .4s ease;
      width: 100%;
      text-align: center;
      position: absolute;
      line-height: 2em;
      font-weight: bold;
      color: #fff;
      position: absolute;
      top: 0;
      left: 0;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.5);
    }
    &:after {
      line-height: 50px;
      vertical-align: middle;
      font-size: medium;
      content: attr(data-tg-on);
      background: #eee;
      box-shadow: 2px 2px 1px#222;
      color: black;
      transform: rotateY(-180deg);
    }
    &:before {
      line-height: 50px;
      vertical-align: middle;
      font-size: medium;
      background: #222;
      box-shadow: 2px 2px 1px#eee;
      color: white;
      content: attr(data-tg-off);
    }

    &:active:before {
      transform: rotateY(-20deg);
    }
  }
  &:checked + .disk-btn {
    &:before {
      transform: rotateY(180deg);
    }

    &:after {
      transform: rotateY(0);
      left: 0;
      background: #eee;
      color: black;
      box-shadow: 2px 2px 1px#222;
    }

    &:active:after {
      transform: rotateY(20deg);
    }
  }
}

.level {
	display: flex;
	align-items: center;
	justify-content: center;
  text-shadow: none;
  margin-top: 10px;

  .tabs {
	  display: flex;
	  position: relative;
	  background-color: rgba(255, 255, 255, 0.2);
	  box-shadow: 0 0 1px 0 rgba(#185ee0, 0.15), 0 6px 12px 0 rgba(#185ee0, 0.15);
	  padding: 0.75rem;
	  border-radius: 99px;
	  * {
		  z-index: 2;
	  }
  }

  input[type="radio"] {
	  display: none;
  }

  .tab {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  height: 34px;
	  width: 100px;
	  font-size: 1rem;
	  font-weight: 500;
	  border-radius: 99px;
	  cursor: pointer;
	  transition: color 0.15s ease-in;
  }

  input[type="radio"] {
	  &:checked {
		  & + label {
        color: #5EB63E;
		  }
	  }
  }

  input[id="easy"] {
	  &:checked {
		  & ~ .glider {
			  transform: translateX(0);
		  }
	  }
  }

  input[id="normal"] {
	  &:checked {
		  & ~ .glider {
			  transform: translateX(100%);
		  }
	  }
  }

  .glider {
	  position: absolute;
	  display: flex;
	  height: 34px;
	  width: 100px;
	  background-color: #e6eef9;
	  z-index: 1;
	  border-radius: 99px;
	  transition: 0.25s ease-out;
  }
}

.easy-symbol {
  display: inline-block;
  width:15px;
  height: 15px;
  background-color: pink;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.5) 2px 2px 3px;
  margin-right: 7px;
}

.normal-symbol {
  display: inline-block;
  width:15px;
  height: 15px;
  background-color: #E8DF90;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.5) 2px 2px 3px;
  margin-right: 7px;
}

@keyframes blink {
  0% {
    box-shadow:0px 0px 0px 0px rgba(255, 255, 255, 0.8);
  }
  100% {
    box-shadow:0px 0px 8px 8px rgba(255, 255, 255, 0.6);
  }
}
</style>
