<template lang="pug">
  #app
    .cursor(ref="cursor")
    .icons
      .icon
        <font-awesome-icon icon="envelope" href="https//:www.google.com" />
      .icon
        <font-awesome-icon icon="basketball-ball" />

    #nav
      router-link(to="/") Home
      router-link(to="/about") About
    router-view
</template>

<script>
export default {
  mounted() {
    document.addEventListener("mousemove", (e) => {
      var cursor = this.$refs.cursor;
      cursor.style.WebkitTransform = `translate(${e.clientX -
        20}px,${e.clientY - 20}px)`;
    });
  },
  methods: {
    test() {
      console.log("object");
    },
  },
};
</script>

<style lang="scss">
@import "./assets/css/pattern.css";
@import "./assets/css/close_btn.css";
@import "./assets/css/shorthand.css";

html,
body {
  margin: 0;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
}

@font-face {
  font-family: "GenJyuuGothic-Bold";
  src: url("./assets/fonts/GenJyuuGothic-Bold.ttf") format("font-truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "GenJyuuGothic-Heavy";
  src: url("./assets/fonts/GenJyuuGothic-Heavy.ttf") format("font-truetype");
  font-weight: normal;
  font-style: normal;
}

#app {
  font-family: GenJyuuGothic-Bold, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #a9adb1;
  background: #171717;
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
}
.cursor {
  position: fixed;
  transform-style: preserve-3d;
  z-index: 9999;
  background-color: #ffdc51c2;
  width: 40px;
  height: 40px;
  top: 0;
  left: 0;
  pointer-events: none;
  border-radius: 50%;
  mix-blend-mode: screen;

  &::before {
    content: "";
    border-radius: 50%;
    transform: translateZ(-1px);
    animation: twinkle 2s infinite alternate ease-out;

    background-color: #ffdc5190;
    width: 60px;
    height: 60px;
    position: absolute;
    top: -10px;
    left: -10px;
  }
}
#nav {
  top: 0;
  right: 0;
  position: absolute;
  padding: 30px;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: flex-end;
  z-index: 998;
  a {
    font-weight: bold;
    color: #d3d6da;
    text-decoration: none;
    margin-left: 20px;
    cursor: pointer;
    &.router-link-exact-active {
      color: #ffdd51;
    }
  }
}
.icons {
  position: fixed;
  left: 0;
  bottom: 50%;
  transform: translateY(-50%);
  display: flex;
  z-index: 999;

  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.105);
  border-radius: 0px 10px 10px 0px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    color: white;
    margin: 2px;
    font-size: 1.3rem;
    transition: 0.3s;
    display: block;
    &:hover {
      font-size: 2rem;
      color: #ffdd51;
    }
  }
}

@keyframes twinkle {
  0% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
@keyframes shake {
  0% {
    transform: translate(-50%, -10px);
  }
  100% {
    transform: translate(-50%, 0px);
  }
}
</style>
