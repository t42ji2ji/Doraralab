<template lang="pug">
  .about
    .views
      .view(@mouseover="hover")
        .close
      .view(@mouseover="hover")
        

</template>

<script>
import gsap from "gsap";
import lottie from "lottie-web";
export default {
  data() {
    return {
      patternclass: [
        "pattern-checks-lg ",
        "pattern-grid-lg",
        "pattern-dots-xl",
      ],
      flag: true,
      timeline: [],
    };
  },
  mounted() {
    console.log(require("../assets/bodymovin/data.json"));
    lottie.loadAnimation({
      container: document.querySelectorAll(".view")[1], // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../assets/bodymovin/data.json"), // the path to the animation json
    });
    this.timeline.push(
      gsap.to(".close", {
        keyframes: [
          { duration: 0.1, opacity: 1 },
          { duration: 0.1, x: 40 },
          { delay: 0.3 },
          { duration: 0.1, scale: 0.5 },
          { duration: 0.1, scale: 1.5 },
          { duration: 0.3, scale: 1 },
          { duration: 0.1, opacity: 0 },
          { duration: 0.1, opacity: 1 },
          { duration: 0.1, opacity: 0 },
          { duration: 0.1, opacity: 1 },
          { duration: 0.5, rotate: 90 },
        ],
        yoyo: true,
        repeatDelay: 0.1,
      })
    );
  },
  methods: {
    hover() {
      this.timeline[0].restart();
      // console.log("object");
      // var r = -1;
      // if (this.flag) {
      //   r = 1;
      //   this.flag = !this.flag;
      // } else {
      //   r = -1;
      //   this.flag = !this.flag;
      // }
      // gsap.to(".close", {
      //   keyframes: [
      //     { duration: 0.1, opacity: 1 },
      //     { duration: 0.1, x: r * 40 },
      //     { duration: 0.1, scale: 0.5 },
      //     { duration: 0.1, scale: 1.5 },
      //     { duration: 0.3, scale: 1 },
      //     { duration: 0.1, opacity: 0 },
      //     { duration: 0.1, opacity: 1 },
      //     { duration: 0.1, opacity: 0 },
      //     { duration: 0.1, opacity: 1 },
      //     { duration: 0.1, rotate: r * 90 }
      //   ],
      //   yoyo: true,
      //   repeatDelay: 0.1
      // });

      // gsap.to(".close", 1, {
      //   yoyo: true,
      //   keyframes: [
      //     { duration: 1, x: 100 },
      //     { duration: 1, y: 100 },
      //     { duration: 1, rotation: 360 }
      //   ]
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.close {
  opacity: 0;
}
.views {
  display: grid;
  height: 100vh;
  width: 100vw;
  padding-top: 10vh;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-self: flex-start;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(auto-fill, calc(100vw / 5));
  .view {
    padding: 1px;
    color: #ffdd51;
    transition: 0.3s;
    position: relative;
    &:hover {
      // transform: translateY(-10px);
    }
  }
}
</style>
