<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import NewGameDialog from "./NewGame.vue";
import Board from './Board.vue';
import PowerGauge from './PowerGauge.vue';
import Chalkboard from './Chalkboard.vue';
import Player from './Player.vue';
import Reset from "./Reset.vue";
import Volume from "./Volume.vue";
import Announce from './Announce.vue';
import SpeechBalloon from './SpeechBalloon.vue';
import Opening from './Opening/Opening.vue';
import Ending from "./Ending/Ending.vue";
import { sleep } from '../shared/util';
import { checkReverse } from "../shared/checkReverse";

// @ts-ignore
import SearchWorker from '../workers/searcher?worker';

const playerName = ["You", "AI"];
const selfTurn = ref(1);
const showNewGameDialog = ref(false);
const reverseTurn = (turn: number) => (turn % 2) + 1;
const opponentTurn = computed(() => reverseTurn(selfTurn.value));
const selfPasses = ref(0);
const isGameEnding = ref(false);
const isBoardReset = ref(false);
const showFinalMinute = ref(false);
const isFinalMinute = ref(false);
const isOpeningStop = ref(false);
const showPass = ref(false);
const opponentPasses = ref(0);
const isThinking = (turn: number) => turn == currentTurn.value && gameResult.value == 0 && !isBoardReset.value;
const deadlock = ref(false);
const timeUp = ref(false);
const startTime = ref(new Date());
const currentTime = ref(new Date());
const timeSettings = ref(60 * 10);
const prePlaceCellNum = ref(-1);
const volumeFlag = ref(false);
const mainBGM = ref(null);
const openingBGM = ref(null);
const endingBGM = ref(null);
const gameLevel = ref("normal");
let prePlaceCells = Array(64).fill(0);
let opponentThinkingStartTime = new Date();
const prevPlacedCell = ref(-1);
const updateTime = async () => {
  while (true) {
    if (gameResult.value == 0 && !timeUp.value && !isOpeningStop.value) {
      currentTime.value = new Date();
    }
    await sleep(1000);
  }
}


const timeLeft = computed(() => {
  let elapsed = Math.floor((currentTime.value.getTime() - startTime.value.getTime()) / 1000);

  elapsed = timeSettings.value - elapsed;
  if (elapsed <= 0) {
    isFinalMinute.value = true;
    timeUp.value = true;
    selfCandidateCells.splice(0, selfCandidateCells.length);
    showNewGameDialog.value = true;
    return "00:00";
  }

  if (elapsed <= 60 && isFinalMinute.value == false && gameResult.value == 0 && !isOpeningStop.value) {
    isFinalMinute.value = true;
    if (!document.hidden) {
      showFinalMinute.value = true;
    }
  }

  const sec = elapsed % 60;
  const min = (elapsed - sec) / 60;
  return `${('00' + min).slice(-2)}:${('00' + sec).slice(-2)} `;
});

const currentTurn = ref(1);

const cells = reactive(Array(64).fill(0));
const convMatrix = () => {
  const newArr = [];
  const orig = cells.concat();
  while (orig.length) newArr.push(orig.splice(0, 8));
  return newArr;
};

const changeVolume = (isChange: boolean, target: string) => {
  if(isChange) {
    volumeFlag.value = !volumeFlag.value;
  }
  console.log(volumeFlag.value);
  const BGMs = {main: mainBGM, opening: openingBGM, ending: endingBGM}
  if (isChange && !volumeFlag.value) {
    for (let [, v] of Object.entries(BGMs)) {
      v.value.pause();
    }
    return;
  }
  for (let [k, v] of Object.entries(BGMs)) {
    if (k == target) {
      v.value.muted = false;
      v.value.volume = 0.2;
      v.value.play();
    } else {
      v.value.muted = true;
      v.value.play();
    }
  }
};

const searchWorker = new SearchWorker();

const checkDeadLock = () => {
  if (cells.filter(e => e == 0).length == 1) {
    const cellNum = cells.indexOf(0);
    const nextTurn = reverseTurn(currentTurn.value);
    const matrix = convMatrix();
    const [ret,] = checkReverse(nextTurn, cellNum, matrix);
    if (!ret) {
      deadlock.value = true;
      isGameEnding.value = true;
      if (volumeFlag.value) {
        changeVolume(false, 'ending')
      }
      return true;
    }
  }
  return false;
}

const bestTypeMessage = async (cellNum: number, newMat: number[][]) => {
  const diff = new Date().getTime() - opponentThinkingStartTime.getTime();
  const waitTime = diff < 1500 ? 1500 : 100;
  await sleep(waitTime);
  if (cellNum >= 0) {
    prePlaceCellNum.value = cellNum;
    prePlaceCells = newMat.flat();
    prevPlacedCell.value = -1;
  } else {
    if (checkDeadLock()) {
      return;
    }
    if (opponentScore.value == 0) {
      return;
    }
    showPass.value = true;
    opponentPasses.value += 1;
    currentTurn.value = reverseTurn(currentTurn.value);
    showSelfCandidatePlaces();
    console.log("no");
  }
}

const candidateTypeMessage = (candidates: number[]) => {
  for (const e of candidates) {
    selfCandidateCells.push(e);
  }

  if (selfCandidateCells.length == 0) {
    if (gameResult.value != 0) return;
    if (checkDeadLock()) {
      return;
    }
    showPass.value = true;
    selfPasses.value += 1;
    currentTurn.value = reverseTurn(currentTurn.value);
    thinkOpponent();
  }
}

searchWorker.addEventListener('message', async (e: MessageEvent) => {
  if (e.data.type == "best") {
    const [, cellNum, newMat] = e.data.data;
    await bestTypeMessage(cellNum, newMat);
  } else if (e.data.type == "candidate") {
    candidateTypeMessage(e.data.data);
  }
}, false);

const selfCandidateCells = reactive([]);

const prePlaceDisk = (cellNum: number) => {
  if (timeUp.value) return;
  if (selfTurn.value != currentTurn.value) return;

  const matrix = convMatrix();
  if (cells[cellNum] == 0) {
    const [ret, newMat] = checkReverse(currentTurn.value, cellNum, matrix);
    if (!ret) return;
    prePlaceCellNum.value = cellNum;
    prePlaceCells = newMat.flat();
    prevPlacedCell.value = -1;
  }
}

const placeDisk = async () => {
  prePlaceCells.flat().forEach((e, i) => { cells[i] = e; });
  selfCandidateCells.splice(0, selfCandidateCells.length);
  cells[prePlaceCellNum.value] = currentTurn.value;
  prevPlacedCell.value = prePlaceCellNum.value;
  prePlaceCellNum.value = -1;
  prePlaceCells = [];

  if (cells.filter(e => e == 0).length == 0) {
    isGameEnding.value = true;
    if (volumeFlag.value) {
      changeVolume(false, 'ending');
    }
    return;
  }
  if (currentTurn.value == selfTurn.value) {
    currentTurn.value = reverseTurn(currentTurn.value);
    thinkOpponent();
  } else {
    await sleep(1000);
    currentTurn.value = reverseTurn(currentTurn.value);
    showSelfCandidatePlaces();
  }
  if (gameResult.value != 0 && gameResult.value != 4) {
    isGameEnding.value = true;
    if (volumeFlag.value) {
      changeVolume(false, 'ending');
    }
  }
}

const setCell = (col: number, row: number, val: number) => cells[col + (row * 8)] = val;
const score = (turn) => cells.filter(state => state == turn).length;
const selfScore = computed(() => score(selfTurn.value));
const opponentScore = computed(() => score(opponentTurn.value));
const selfGauge = computed(() => {
  if (selfScore.value + opponentScore.value == 0) {
    return 50;
  } else {
    return Math.floor((selfScore.value / (selfScore.value + opponentScore.value)) * 100);
  }
});
const gameResult = computed(() => {
  const rest = cells.filter(e => e == 0).length;
  if (rest == 64) return 0; // in reset
  if (timeUp.value) return 4;
  if (selfScore.value == 0) {
    return 2;
  } else if (opponentScore.value == 0) {
    return 1;
  } else if (cells.filter(e => e == 0).length == 0 || deadlock.value == true) {
    if (selfScore.value > opponentScore.value) {
      return 1;
    } else if (selfScore.value < opponentScore.value) {
      return 2;
    } else {
      return 3; // draw
    }
  }
  return 0;
});

const resultName = ["In Play", `${playerName[0]} Win`, `${playerName[0]} Lose`, 'Draw', 'Time is up'];
const initBoard = () => {
  setCell(3, 3, 2); setCell(4, 3, 1);
  setCell(3, 4, 1); setCell(4, 4, 2);
}

const showSelfCandidatePlaces = () => {
  const matrix = convMatrix();
  searchWorker.postMessage({ type: 'candidate', data: { turn: currentTurn.value, matrix: matrix } });
}

const thinkOpponent = async () => {
  opponentThinkingStartTime = new Date();
  await sleep(100);
  const matrix = convMatrix();
  const level = gameLevel.value == "normal" ? 5 : 1;
  searchWorker.postMessage({ type: 'best', data: { turn: currentTurn.value, level: level, matrix: matrix } });
}

const newGame = async ({ turn, level }: { turn: number, level: string }) => {
  if (volumeFlag.value) {
    changeVolume(false, 'opening')
  }
  isBoardReset.value = true;
  await sleep(2000);
  cells.fill(0);
  isOpeningStop.value = true;
  await sleep(2000);
  gameLevel.value = level;
  showNewGameDialog.value = false;
  prevPlacedCell.value = -1;
  selfCandidateCells.splice(0, selfCandidateCells.length);
  selfTurn.value = turn;
  deadlock.value = false;
  currentTurn.value = 1;
  timeUp.value = false;
  isFinalMinute.value = false;
  initBoard();
  selfPasses.value = 0;
  opponentPasses.value = 0;
  isOpeningStop.value = true;
}

const newGameAfter = async () => {
  isOpeningStop.value = false;
  startTime.value = new Date();
  currentTime.value = new Date();
  await sleep(1500);
  if (volumeFlag.value) {
    changeVolume(false, 'main')
  }

  if (selfTurn.value == 2) {
    thinkOpponent();
  } else {
    showSelfCandidatePlaces();
  }
}

const newGameCancel = () => {
  showNewGameDialog.value = false;
  if (volumeFlag.value) {
    changeVolume(false, 'main')
  }
}

initBoard();
showSelfCandidatePlaces();
updateTime();
</script>

<template>
  <div class="play-area">
    <audio ref="openingBGM" loop>
      <source src="../assets/audio/cmr_opening.mp3" />
    </audio>
    <audio ref="mainBGM" loop>
      <source src="../assets/audio/cmr_main.mp3" />
    </audio>
    <audio ref="endingBGM" loop>
      <source src="../assets/audio/cmr_ending.mp3" />
    </audio>
    <new-game-dialog :isOpen="showNewGameDialog" @cancel="newGameCancel()" @start="newGame" />
    <ending
      :isOpen="isGameEnding"
      :gameResult="gameResult"
      :playerName="playerName"
      :selfTurn="selfTurn"
      :selfScore="selfScore"
      :selfPasses="selfPasses"
      :opponentScore="opponentScore"
      :opponentPasses="opponentPasses"
      :volumeFlag="volumeFlag"
      @changeVolume="changeVolume(true, 'ending')"
      @next="isGameEnding = false; showNewGameDialog = true;"
    />
    <div class="left status-column">
      <div class="player-wrapper">
        <player
          :turn="opponentTurn"
          :name="playerName[1]"
          :score="opponentScore"
          :passes="opponentPasses"
          :thinking="isThinking(opponentTurn)"
          :level="gameLevel"
        />
        <speech-balloon :isOpen="true" />
      </div>
      <div class="action">
        <volume :volumeFlag="volumeFlag" @change="changeVolume(true, 'main')"/>
        <reset
          @click="showNewGameDialog = true"
          :disabled="currentTurn != selfTurn && gameResult == 0"
        />
      </div>
    </div>
    <div
      class="board-column"
      :class="{ 'board-spin': isBoardReset == true, 'board-spin-stop': isOpeningStop }"
      @animationend="isBoardReset = false"
    >
      <announce :isOpen="showPass" @close="showPass = false">Pass</announce>
      <announce :isOpen="showFinalMinute" @close="showFinalMinute = false">
        <div class="final-minute">Final Minute!</div>
      </announce>
      <div v-if="isBoardReset" class="board-back" @animationend.stop>
        <opening @next="newGameAfter()" :volumeFlag="volumeFlag" @changeVolume="changeVolume(true, 'opening')"/>
      </div>
      <div class="board-edge">
        <div class="board-wrapper">
          <board
            :cells="cells"
            :selfCandidates="selfCandidateCells"
            :prevPlacedCell="prevPlacedCell"
            :prePlaceCell="prePlaceCellNum"
            :currentTurn="currentTurn"
            @prePlace="prePlaceDisk"
            @endPrePlace="placeDisk"
          />
        </div>
      </div>
    </div>
    <div class="right status-column">
      <chalkboard
        :resultName="resultName[gameResult]"
        :finalMinute="isFinalMinute"
        :timeLeft="timeLeft"
      />
      <power-gauge :selfTurn="selfTurn" :selfGauge="selfGauge" />
      <player
        :turn="selfTurn"
        :name="playerName[0]"
        :score="selfScore"
        :passes="selfPasses"
        :thinking="isThinking(selfTurn)"
        :level="gameLevel"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.play-area {
  color: black;
  display: flex;
  justify-content: center;
  perspective: 1000px;
  .board-column {
    padding: 0 0.8em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .board-spin {
    transform-style: preserve-3d;
    animation: board-spin linear 4s;
    position: relative;
    z-index: 10;
    .board-edge {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
  }
  .board-spin-stop {
    animation-play-state: paused;
  }
  .board-edge {
    border-style: solid;
    border-width: 43px;
    border-color: #454545 #3a3a3a #2a2a2a #5a5a5a;
    border-radius: 8px;
    background-color: #555;
  }
  .final-minute {
    color: #ddc918;
  }
  .board-back {
    position: absolute;
    transform: rotateX(180deg) translateZ(1px);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    width: 678px;
    height: 678px;
    position: absolute;
    left: 18px;
    top: 2px;
    z-index: 5;
  }
  .board-wrapper {
    border-style: solid;
    border-width: 17px;
    border-image: linear-gradient(90deg, #505050, #333, #2f2f2f, #3e3e3e) 1;
    box-shadow: -2px -2px 10px 10px #353535 inset;
    padding: 7px;
    background-image: linear-gradient(90deg, #444, #222, #444);
  }
  .player-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .status-column {
    width: 200px;
    margin: 0.5em 0;
    &.left {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
    &.right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
  }
  .action {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding-bottom: 1em;
  }
}

@keyframes board-spin {
  0% { transform: scale(1); }
  30% { transform: scale(1.7) rotateX(180deg); }
  70% { transform: scale(1.7) rotateX(180deg); }
  100% { transform: scale(1) rotateX(360deg); }
}

@media screen and (max-width: 1120px) {
  .play-area {
    flex-direction: column;
    align-items: center;

    .board-column {
      padding: 0;
    }
    .board-edge {
      border-style: solid;
      border-width: 25px;
      border-color: #454545 #3a3a3a #2a2a2a #5a5a5a;
      border-radius: 8px;
    }

  .board-back {
    width: 604px;
    height: 604px;
    position: absolute;
    left: 0;
    top: 0;
  }
    .board-wrapper {
      border-width: 0;
      padding: 5px;
    }
    .status-column {
      width: 90%;
      display: flex;
      &.left {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1em;
        .player-wrapper {
          display: flex;
          flex-direction: row;
          align-self: flex-start;
          justify-content: flex-start;
          width: 100%;
        }
        .action {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-bottom: 0;
        }
      }

      &.right {
        margin-top: 1em;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  @keyframes board-spin {
    0% { transform: scale(1); }
    30% { transform: scale(1.5) rotateX(180deg); }
    70% { transform: scale(1.5) rotateX(180deg); }
    100% { transform: scale(1) rotateX(360deg); }
  }
}
</style>
