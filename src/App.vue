<script setup>
import Screen from "./components/Screen.vue"
</script>

<template>
  <Screen />
</template>

<style lang="scss">
html {
  width: 100%;
  height: 100%;
  body {
    font-family: 'Segoe UI', '-apple-system', 'MacSystemFont', 'Verdana', 'Arial', 'Helvetica', sans-serif;
    margin: 0;
    width: 100%;
    height: 100%;
    #app {
      width: 100%;
      height: 100%;
      min-height: 680px;
      min-width: 1120px;
      // Source: https://gradienta.io/faded-sun
      background:
        radial-gradient(ellipse closest-corner at 33% 82%, rgba(245, 228, 212, 0.25) 4%, rgba(255, 255, 255, 0) calc(4% + 1px)),
        radial-gradient(ellipse closest-corner at 35% 79%, rgba(245, 228, 212, 0.25) 3%, rgba(255, 255, 255, 0) calc(3% + 1px)),
        radial-gradient(ellipse closest-corner at 51% 88%, rgba(245, 228, 212, 0.25) 10%, rgba(255, 255, 255, 0) calc(10% + 1px)),
        radial-gradient(ellipse closest-corner at 68% 82%, rgba(245, 228, 212, 0.25) 4%, rgba(255, 255, 255, 0) calc(4% + 1px)),
        radial-gradient(ellipse closest-corner at 70% 79%, rgba(245, 228, 212, 0.25) 3%, rgba(255, 255, 255, 0) calc(3% + 1px)),
        linear-gradient(135deg, #ff0000 0%, #000036 100%),
        radial-gradient(ellipse at 28% 0%, #ffcfac 0%, rgba(98, 149, 144, 0.5) 100%),
        linear-gradient(180deg, #cd6e8a 0%, #f5eab0 69%, #d6c8a2 70%, #a2758d 100%);
      background-blend-mode: normal, normal, normal,normal,normal, screen, overlay, normal;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

@media screen and (max-width:1120px) {
  html body #app {
    min-width: 608px;
    min-height: 1040px;
  }
}
</style>
