<template>
  <v-container
    fluid
    class="background"
  >
    <canvas
      id="flowfield"
      ref="flowFieldCanvas"
      class="flowfield"
      :width="canvasWidth"
      :height="canvasHeight"
    />
    <Player />
  </v-container>
</template>

<script>
import FlowField from "@/utils/FlowField"; // Adjust the import path accordingly
import Vector from "@/utils/Vector"; // Adjust the import path accordingly
import { useGtag } from "vue-gtag-next";

export default {
  data() {
    return {
      flowField: null,
      mouse: { x: 0, y: 0 },
      lastStep: 0,
      canvasWidth: 500, // Set default width
      canvasHeight: 500, // Set default height
      verse: "",
    };
  },
  computed: {
    canvas() {
      return this.$refs.flowFieldCanvas;
    },
  },
  created() {
    if (this.$route.query.verse) {
      this.verse = this.$route.query.verse;
    }
  },
  mounted() {
    this.initializeCanvas();
    this.setupMouseEvents();
    this.startAnimation();
    const gtag = useGtag();
    gtag.event("button_click", {
      event_category: "User Actions",
      event_label: "Visit Page",
    });
  },
  methods: {
    // Initialize canvas and flowfield
    initializeCanvas() {
      const canvas = this.canvas;
      const box = canvas.getBoundingClientRect();
      const container = canvas.parentElement;

      // Adjust canvas size
      canvas.height =
        box.width * (container.clientHeight / container.clientWidth);
      canvas.width = box.width;

      const settings = {
        frequency: 0.1,
      };
      const tileSize = 40;
      const tileRatio = 2;
      const cols = Math.ceil(container.clientWidth / tileSize);
      const rows = Math.ceil(container.clientHeight / (tileSize * tileRatio));

      // Initialize FlowField
      this.flowField = new FlowField(cols, rows, settings);

      const ctxScale = {
        x: canvas.width / cols,
        y: canvas.height / rows,
      };

      // Custom draw function for FlowField
      this.flowField.onDraw = (vector, x, y) => {
        const ctx = canvas.getContext("2d");
        const xmove = vector.getLength() * Math.abs(vector.x);
        const ymove = vector.getLength() * Math.abs(vector.y);

        const red = Math.round(
          -20 * xmove + 80 * ymove + (50 - (0.6 * y * 255) / cols)
        );
        const green = Math.round(
          180 * xmove + 20 * ymove - 60 + (0.4 * y * 255) / rows
        );
        const blue = Math.round(
          50 * xmove +
            30 * ymove +
            (40 - (0.5 * y * 255) / rows) +
            (0.5 * y * 255) / rows
        );

        ctx.save();
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, 0.8)`;
        ctx.fillRect(x * ctxScale.x, y * ctxScale.y, ctxScale.x, ctxScale.y);
        ctx.restore();
      };

      // Manipulate vectors with mouse interaction
      this.flowField.manipulateVector = (vector, x, y) => {
        const pos = new Vector(
          x * ctxScale.x + 0.5 * ctxScale.x,
          y * ctxScale.y + 0.5 * ctxScale.y
        );

        const mouseEffect = new Vector(
          (this.mouse.x - pos.x) / canvas.width,
          (this.mouse.y - pos.y) / canvas.height
        );

        vector.addTo(mouseEffect);

        if (vector.getLength() > 1) vector.setLength(1);
      };
    },

    // Start animation loop
    startAnimation() {
      const step = (time) => {
        this.flowField.update(time - this.lastStep || 0);
        this.lastStep = time;
        window.requestAnimationFrame(step);
      };
      step();
    },

    // Mouse movement handler
    setupMouseEvents() {
      const updateMouse = (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      };
      document.addEventListener("mousemove", updateMouse);
    },
  },
};
</script>

<style scoped>
.background {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.flowfield {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  filter: blur(5px);
  width: 12.5%;
  transform: translate(-50%, -50%) scale(8);
}
</style>
