<template lang="pug">
  #app
    #nav
      a Home
      a About
    router-view
</template>

<style lang="scss">
html,
body {
  margin: 0;
  width: 100vw;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #a9adb1;
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
  a {
    font-weight: bold;
    color: #d3d6da;
    text-decoration: none;
    margin-left: 20px;
    cursor: pointer;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
