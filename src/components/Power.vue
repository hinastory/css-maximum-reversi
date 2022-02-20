<template>
  <div class="wrapper">
    <div class="inner">
      <span></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper:hover {
  transition: all .2s;
 	box-shadow:
    inset 0 2px 3px rgba(255,255,255,0.13),
    0 2px 4px rgba(0,0,0,0.5),
    0 2px 2px 4px rgba(0,0,0,0.3);
}
.wrapper:active {
  transition: all .1s;
  box-shadow:
    inset 0 2px 3px rgba(255,255,255,0.13),
    0 1px 1px rgba(0,0,0,0.5),
    0 1px 1px 2px rgba(0,0,0,0.3);
}
.wrapper {
 	width: 65px;
  height: 65px;
  border-radius: 50%;
  background: linear-gradient(#44B34D, #125E18);
  position: relative;
  cursor: pointer;
  padding: 10px;
  box-shadow:
    inset 0 2px 3px rgba(255,255,255,0.13),
    0 5px 8px rgba(0,0,0,0.5),
    0 10px 10px 4px rgba(0,0,0,0.3);
}

.wrapper:after {
 	content: "";
  position: absolute;
  left: -20px;
  right: -20px;
  top: -20px;
  bottom: -20px;
  z-index: -2;
  border-radius: inherit;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.1),
    0 1px 2px rgba(0,0,0,0.3),
    0 0 10px rgba(0,0,0,0.15);
}

.wrapper:before {
 	content: "";
  position: absolute;
  left: -10px;
  right: -10px;
  top: -10px;
  bottom: -10px;
  z-index: -1;
  border-radius: inherit;
  box-shadow: inset 0 10px 10px rgba(0,0,0,0.13);
  -webkit-filter:blur(1px);
  filter: blur(1px);
}

.inner {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(#208A29, #369E3E);
  display: block;
  box-shadow:
    0 -2px 5px rgba(255,255,255,0.05),
    0 2px 5px rgba(255,255,255,0.1);
}

.inner:after {
 	position: absolute;
  width: 41px;
  height: 41px;
  background: white;
  background: linear-gradient(#E7EDC2, #848C53);
  left: 50%;
  top: 50%;
  content: "";
  border-radius: inherit;
  margin: -21px 0 0 -20px;
  box-shadow: 0 3px 5px rgba(0,0,0,0.3);
}

.inner:before {
 	position: absolute;
  content: "";
  width: 31px;
  height: 31px;
  left: 50%;
  top: 50%;
  border-radius: inherit;
  background: inherit;
  margin: -16px 0 0 -15px;
  z-index: 2;
  box-shadow: inset 0 3px 5px rgba(0,0,0,0.3), 0 1px 2px rgba(255,255,255,1);
}

.inner span {
 	display: block;
  width: 21px;
  height: 21px;
  background: #278F2F;
  left: 50%;
  margin-left: -10px;
  top: 10px;
  z-index: 3;
  position: relative;
}
.inner span:before {
  content: "";
  position: absolute;
  width: 5px;
  height: 20px;
  background: linear-gradient(#E7EDC2, #E2E8BE);
  border-radius: 10px;
  box-shadow: 0 3px 5px rgba(0,0,0,0.3);
  left: 50%;
  top: 0;
  margin-left: -3px;
}
</style>