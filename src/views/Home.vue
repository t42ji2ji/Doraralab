<template lang="pug">
  .home 
    .card
      .light(ref="light")
      h2 Dora
    .btn(@click="again")
      h3 Again
</template>

<script>
// @ is an alias to /src
import gsap from "gsap";

export default {
  name: "Home",
  data() {
    return {
      timeline: ""
    };
  },
  components: {},
  mounted() {
    this.timeline = gsap.timeline();
    this.timeline.from(".card", 1.3, {
      y: -500,
      x: -500,
      rotate: 300,
      ease: "circ.out",
      opacity: 0
    });
  },
  methods: {
    again() {
      console.log("object");
      this.timeline.restart();
    },
    ligth_anim() {
      var vm = this;
      var width = document.documentElement.clientWidth / 2;
      var height = document.documentElement.clientHeight / 2;
      document.addEventListener("mousemove", function(e) {
        var tgW = e.clientX - width;
        var tgH = e.clientY - height;
        vm.$refs.light.style.transform = `translate(${-tgW / 5}px, ${-tgH /
          5}px)`;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
  width: 100vw;
  height: 100vh;
  background: #171717;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
}

.btn {
  padding: 10px 50px;
  color: white;
  background-color: rgb(250, 121, 61);
  margin-top: 50px;
  border-radius: 5px;
  cursor: pointer;
  h3 {
    margin: 0;
  }
}

// .light {
//   width: 200%;
//   height: 200%;
//   position: absolute;
//   top: -50%;
//   left: -50%;
//   opacity: 0.3;
//   background: radial-gradient(circle at 90% 50%, white, white 20%, #414141 75%);
// }

.card {
  position: relative;
  width: 380px;
  height: 200px;
  background-color: rgb(26, 25, 25);
  border-radius: 7px;
  background: #2d2d2d;
  box-shadow: 3px 5px 11px 0 rgba(26, 26, 26, 0.5),
    inset -3px -3px 5px 0 rgba(0, 0, 0, 0.63),
    inset 3px 3px 3px 0 rgba(60, 60, 60, 0.5);
  border-radius: 12px;
  overflow: hidden;
  color: white;
}
</style>
