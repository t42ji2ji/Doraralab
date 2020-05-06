<template lang="pug">
  .home
    //- .card
    //-   .light(ref="light")
    //-   h2 Dora
    .pin 
      .msgbox
        .box
          .msg(v-for="letter in splitPinMsg(this.pinMsg)") {{letter}}
        .box
          .msgs(v-for="letter in splitPinMsg('自我介紹')") {{letter}}
      .line
    .page.flex-center
      .containers 
        .titles(@mouseover="hoverTitle" ref="light").pattern-dots-xl.max-w-40pc
          .t 哆
          .t 啦
          .t 啦
  
        .titles
          .t.small 實
          .t.small 驗
          .t.small 室
          .t.small Doraralab
      //- #people(style="width:100px;height:100px;background-color:red;position:relative")
      #people.peopleContainer(@mouseleave="hoverCharacter(false)" 
      @mouseenter="hoverCharacter(true)" ref="people" @click="clickCharacter")
      .btn(@click="again" )
        h3 Scroll Down
    .page.secondpage(ref="secondpage")
      .forbg.pattern-grid-lg#bg(ref="bg")
      .innerpage.innerpageL
        .texts
          .title.subtitle Xie Chung Ying
          .subtitle UI Design
          .subtitle Front End Developer
          .subtitle Js / Vue
          .subtitle Flutter
      .innerpage
      .check
        .text see more
        .text v 
    .page
</template>

<script>
// @ is an alias to /src
// eslint-disable-next-line no-unused-vars
import { TimelineMax, TweenMax, TweenLite, gsap } from "gsap";
// eslint-disable-next-line no-unused-vars
import lottie from "lottie-web";
// eslint-disable-next-line no-unused-vars
import ScrollMagic from "scrollmagic";

export default {
  name: "Home",
  data() {
    return {
      timeline: "",
      timeline2: "",
      lottieD: "",
      hoverFlag: false,
      MagicController: "",
      nowScene: [17, 32],
      testvar: 0,
      pinMsg: "歡迎光臨",
    };
  },
  components: {},
  mounted() {
    this.initLottie();
    this.initTimeLine();
    this.initScrollMagic();
    this.initP5();
    console.log(screen.height);
    console.log(screen.width);
    console.log(window.innerHeight);
    console.log(window.innerWidth);
  },
  computed: {},
  methods: {
    initP5() {
      var vm = this;
      const script = function(p5) {
        var speed = 2;
        var posX = 0;
        var width = vm.$refs.bg.clientWidth;
        var height = vm.$refs.bg.clientHeight;
        console.log(p5.width);

        // NOTE: Set up is here
        p5.setup = () => {
          p5.createCanvas(width, height);
        };
        // NOTE: Draw is here
        p5.draw = () => {
          // p5.background("#171717");
          const degree = p5.frameCount * 3;
          const y = p5.sin(p5.radians(degree)) * 50;
          p5.push();
          p5.noStroke();
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
            p5.rect(i * 48 + 2, 2, 48, 48);
          }
          p5.pop();
        };
      };
      // NOTE: Use p5 as an instance mode
      const P5 = require("p5");
      new P5(script, "bg");
    },
    splitPinMsg(tg) {
      return tg.split("");
    },
    clickCharacter() {},
    initScrollMagic() {
      var vm = this;

      this.MagicController = new ScrollMagic.Controller();
      var x = window.innerWidth;
      if (window.innerWidth > 1300) {
        x = 1300;
      }
      var peopleTween = gsap.timeline().to("#people", {
        y: window.innerHeight - 90,
        x: x / 4 - window.innerWidth / 20,
        scale: 1.2,
      });
      var subtitle = gsap.timeline().from(".subtitle", {
        opacity: 0,
        stagger: 0.2,
        scale: 0.8,
        y: 90,
      });
      var pinMsgTween = gsap.timeline().to(".msg", {
        opacity: 0,
        stagger: 0.2,
        scale: 0.8,
        y: 90,
      });
      var pinMsgTween2 = gsap.timeline().from(".msgs", {
        opacity: 0,
        stagger: 0.2,
      });

      // eslint-disable-next-line no-unused-vars
      var scene = new ScrollMagic.Scene({
        offset: 100, // start scene after scrolling for 100px
        duration: window.innerHeight / 2, // pin the element for 400px of scrolling
        triggerElement: this.$people, // starting scene, when reaching this element
        triggerHook: 0, // don't trigger until #pinned-trigger1 hits the top of the viewport
      })
        .setTween(peopleTween)
        .addTo(this.MagicController);
      // eslint-disable-next-line no-unused-vars
      var Pinscene = new ScrollMagic.Scene({
        offset: 100, // start scene after scrolling for 100px
        duration: window.innerHeight / 2, // pin the element for 400px of scrolling
        triggerHook: 0, // don't trigger until #pinned-trigger1 hits the top of the viewport
      })
        .setTween([pinMsgTween, pinMsgTween2])
        .addTo(this.MagicController);
      // eslint-disable-next-line no-unused-vars
      var scene2 = new ScrollMagic.Scene({
        offset: (window.innerHeight / 3) * 2, // start scene after scrolling for 100px
        duration: window.innerHeight / 3, // pin the element for 400px of scrolling
        // duration: (screen.height / 3) * 2 - 100, // pin the element for 400px of scrolling
        triggerElement: this.$secondpage, // starting scene, when reaching this element
        triggerHook: 0, // don't trigger until #pinned-trigger1 hits the top of the viewport
      })
        .setTween(subtitle)
        .addTo(this.MagicController);

      scene.on("end", () => {
        vm.nowScene = [0, 16];
        vm.lottieD.playSegments(vm.nowScene, true);
      });
      scene.on("progress", function(event) {
        console.log("Scene progress changed to " + event.progress);
        console.log(10 + Math.floor(event.progress * 10));
        var frame = 43 + Math.floor(event.progress * 10);
        if (event.progress == 0) {
          vm.nowScene = [17, 32];
        }
        if (frame > 43 && frame < 53) {
          vm.lottieD.goToAndStop(frame, true);
        } else {
          vm.lottieD.playSegments(vm.nowScene, true);
        }
      });
    },
    playnowScene() {
      this.lottieD.playSegments([0, 16], true);
    },
    initTimeLine() {
      this.timeline = gsap.timeline();
      this.timeline2 = gsap.timeline();
      this.timeline2.from(".peopleContainer", {
        height: 0,
        delay: 2,
      });
      // this.timeline2.to(".containers", {
      //   delay: 1,
      //   x: -200,
      //   scale: 0.6,
      // });
      this.timeline.from(".t", 0.2, {
        delay: 0.3,
        opacity: 0,
        stagger: 0.2,
        scale: 0.8,
        y: 90,
      });

      // this.timeline.to(".t", 0.8, {
      //   keyframes: [
      //     {
      //       scale: 1.3,
      //       ease: "Power1.in",
      //       stagger: 0.2
      //     },
      //     {
      //       scale: 1,
      //       ease: "Power2.in",
      //       stagger: 0.2
      //     }
      //   ]
      // });
      // this.timeline.from(".card", 1, {
      //   y: -500,
      //   x: -500,
      //   rotate: 300,
      //   ease: "circ.out",
      //   opacity: 0
      // });
      // this.timeline.pause();
    },
    initLottie() {
      this.lottieD = lottie.loadAnimation({
        container: document.querySelector(".peopleContainer"), // the dom element that will contain the animation
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("../assets/bodymovin/data.json"), // the path to the animation json
      });
      // var vm = this;
      this.lottieD.playSegments([17, 32], true);
      // this.lottieD.addEventListener("loopComplete", () => {
      //   console.log("Looped");
      //   if (vm.hoverFlag) {
      //     vm.lottieD.pause();
      //   } else {
      //     vm.lottieD.play();
      //   }
      // });
    },
    hoverCharacter(flag) {
      if (flag) {
        this.lottieD.playSegments([34, 56], true);
        this.hoverFlag = flag;
      } else {
        this.lottieD.playSegments(this.nowScene, true);
        this.hoverFlag = flag;
      }
    },
    again() {
      this.timeline2.restart();
      this.timeline.restart();
      // this.lottieD.goToAndStop(this.testvar, true);
      // console.log(this.testvar);
      // this.testvar++;
    },
    hoverTitle() {},
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
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  cursor: none;
  overflow-x: auto;
  background: #171717;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
  .peopleContainer {
    max-width: calc(100vh / 3);
    z-index: 999;
  }
  .page {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    padding: 20px;
    width: 100vw;
    height: 100vh;

    flex-direction: column;
    position: relative;
    .forbg {
      background-color: #171717;
      color: rgba(255, 255, 255, 0.1);
      width: 90vw;
      height: 70vh;
      max-width: 1300px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .check {
      position: absolute;
      bottom: 3%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1.5rem;
      color: white;
      animation: shake 0.5s infinite alternate ease-in-out;
    }
    .innerpageL {
      margin-left: 20px;
    }
    .innerpage {
      max-width: 650px;

      color: white;
      padding: 2rem;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      flex-direction: column;
      // border: solid rgba(255, 255, 255, 0.242) 1px;
      .texts {
        color: #ffdd51;
        font-family: "GenJyuuGothic-Heavy";
        display: flex;
        flex-direction: column;
        transform: skew(0deg, -5deg) !important;
      }
      .title {
        font-size: 3rem !important;
        color: #ffdd51 !important;
        margin-bottom: 20px;
      }
      .subtitle {
        display: flex;
        width: 100%;
        font-size: 2rem;
        text-align: left;
        color: white;
        position: relative;
        &:hover {
          color: #ffdd51;
        }
      }
    }
  }
  .secondpage {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.containers {
  margin: 10px;
  &:hover {
    animation: neo 0.3s infinite alternate ease-in-out;
    text-shadow: 0 0 5px #378f99, 0 0 5px #378f99, 0 0 60px #45e4fc,
      0 0 20px #45e4fc;
  }
}
.titles {
  color: #ffdd51;
  font-family: "GenJyuuGothic-Heavy";
  display: flex;
  font-size: 8rem;
  transform: skew(0deg, -5deg);

  cursor: pointer;
  // text-shadow: 5px 5px 0px rgb(87, 31, 124);
  .t {
    margin: 0px 15px;
    color: white;
  }
  .small {
    font-family: "GenJyuuGothic-Bold";

    margin-top: -50px;
    font-size: 3rem;
    letter-spacing: 1rem;
  }
}
.btn {
  padding: 10px 50px;
  color: black;
  background-color: #ffdd51;
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
.peopleContainer {
  transform: scale(1);
  &::before {
    position: fixed;
    content: "";
  }
}
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

.stickyball {
  width: 30px;
  display: flex;
  position: absolute;
  top: 50%;
  left: 2%;
  transform: translate(0%, -50%);
  .ball {
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    filter: blur(3px) contrast(10);
    transform: translate(-50%, 0%);
  }
  .ballL {
    transform: translate(-50%, 60%);
    animation: stickyL 1s infinite alternate ease-in-out;
  }
  .ballR {
    transform: translate(-50%, -60%);
    animation: stickyR 1s infinite alternate ease-in-out;
  }
}
@keyframes stickyL {
  0% {
    transform: translate(-50%, 0%);
  }
  100% {
    transform: translate(-50%, 300%);
  }
}
@keyframes stickyR {
  0% {
    transform: translate(-50%, 0%);
  }
  100% {
    transform: translate(-50%, -300%);
  }
}
@keyframes neo {
  0% {
    filter: brightness(1);
  }
  3% {
    filter: brightness(0.8);
  }
  6% {
    filter: brightness(1);
  }
  9% {
    filter: brightness(1);
  }
  12% {
    filter: brightness(0.9);
  }
  15% {
    filter: brightness(1);
  }

  41% {
    filter: brightness(0.95);
  }
  46% {
    filter: brightness(1);
  }

  68% {
    filter: brightness(0.95);
  }

  100% {
    filter: brightness(1);
  }
}
.pin {
  z-index: 999;
  position: fixed;
  right: 0;
  top: 50%;
  display: flex;
  flex-direction: row;
  transform: translate(0%, -50%);
  .msgbox {
    position: relative;
    .box {
      display: flex;
      position: absolute;
      color: white;
      right: 10px;
      top: -10px;
    }
  }
  .line {
    width: 20px;
    height: 2px;
    background-color: #fff;
  }
  .msg {
    color: white;
  }
}
</style>
