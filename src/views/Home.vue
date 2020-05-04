<template lang="pug">
  .home
    //- .card
    //-   .light(ref="light")
    //-   h2 Dora
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
          .t.small doraralab
      //- #people(style="width:100px;height:100px;background-color:red;position:relative")
      #people.peopleContainer(@mouseleave="hoverCharacter(false)" 
      @mouseenter="hoverCharacter(true)" ref="people")
      .btn(@click="again")
        h3 Welcome
    .page.red
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
      nowScene: 0,
    };
  },
  components: {},
  mounted() {
    this.initLottie();
    this.initTimeLine();
    this.initScrollMagic();
  },
  methods: {
    initScrollMagic() {
      this.MagicController = new ScrollMagic.Controller();
      var blockTween = gsap.timeline().to("#people", {
        y: window.innerHeight - window.innerHeight / 10,
        x: window.innerWidth / 4,
      });

      // eslint-disable-next-line no-unused-vars
      var scene = new ScrollMagic.Scene({
        offset: 100, // start scene after scrolling for 100px
        duration: screen.height / 2, // pin the element for 400px of scrolling
        triggerElement: this.$people, // starting scene, when reaching this element
        triggerHook: 0, // don't trigger until #pinned-trigger1 hits the top of the viewport
      })
        .setTween(blockTween)
        .addTo(this.MagicController);
      scene.on("end", this.firstScene(1));
    },
    firstScene(nowScene) {
      console.log("end");
      this.nowScene = nowScene;
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
      var vm = this;
      this.lottieD.playSegments([17, 32], true);
      this.lottieD.addEventListener("loopComplete", () => {
        if (vm.hoverFlag) {
          vm.lottieD.pause();
        } else {
          vm.lottieD.play();
        }
      });
    },
    hoverCharacter(flag) {
      if (flag) {
        this.lottieD.playSegments([34, 56], true);
        this.hoverFlag = flag;
      } else {
        this.lottieD.playSegments([17, 32], true);
        this.hoverFlag = flag;
      }
    },
    again() {
      this.timeline2.restart();
      this.timeline.restart();
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
  .page {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    padding: 20px;
    width: 100vw;
    height: 100vh;
    background: #171717;
    flex-direction: column;
  }
  .red {
    background-color: darkred;
  }
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.containers {
  margin: 10px;
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
</style>
