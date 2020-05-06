<template lang="pug">
  .about
    .views
      .view(@mouseover="hover")
        .close
      .view(@mouseover="hover")
      .view#p5(@mouseover="hover")
        

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
    this.initP5();
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
    initP5() {
      const script = function(p5) {
        var speed = 2;
        var posX = 0;

        // NOTE: Set up is here
        p5.setup = () => {
          p5.createCanvas(innerWidth / 5, innerWidth / 5);
          p5.ellipse(p5.width / 2, p5.height / 2, 10, 10);
        };
        // NOTE: Draw is here
        p5.draw = () => {
          p5.background("#171717");
          const degree = p5.frameCount * 3;
          const y = p5.sin(p5.radians(degree)) * 50;

          p5.push();
          p5.translate(0, p5.height / 2);
          p5.ellipse(posX, y, 10, 10);
          p5.pop();
          drawRec(2);
          posX += speed;

          if (posX > p5.width || posX < 0) {
            speed *= -1;
          }
        };
        const drawRec = (x) => {
          p5.push();
          p5.stroke(255, 255, 255, 100);
          p5.strokeWeight(2);
          p5.fill(240, 150, 150);
          p5.noFill();
          for (var i = 0; i < x; i++) {
            p5.rect(i * 55 + 2, 2, 55, 55);
          }
          p5.pop();
        };
      };
      // NOTE: Use p5 as an instance mode
      const P5 = require("p5");
      new P5(script, "p5");
    },
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
    // &:hover {
    //   // transform: translateY(-10px);
    // }
  }
}
</style>
