<script lang="ts" setup>
import VolumeIcon from './icons/VolumeIcon.vue';

interface Props {
  volumeFlag: boolean;
}
const props = defineProps<Props>();

interface Emits {
  (e: "change", value: void): void;
}
const emit = defineEmits<Emits>();
</script>

<template>
  <div class="volume">
    <input id="volume" type="checkbox" :value="volumeFlag"  />
    <label for="volume" @click="emit('change')">
    <volume-icon style="--ggs:2.3" />
    </label>
  </div>
</template>

<style lang="scss" scoped>
.volume {
  margin-bottom: 60px;
  input {
    opacity: 0;
  }
  label {
    display: block;
    position: relative;
    padding: 35px 30px 35px 20px;
    border: 3px solid #fff;
    border-radius: 50%;
    color: #fff;
    background-color: #6a8494;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s, box-shadow 0.2s;
  }

  label:hover,
  input:focus + label {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  }

  input:checked + label {
    background-color: #a8a955;
  }

  input:checked + label::before {
    background-color: #fff;
  }
}

@media screen and (max-width: 1120px) {
  .volume {
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    label {
      width: 30px;
      margin-right: 30px;
    }
  }
}
</style>