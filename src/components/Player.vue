<template>
  <v-responsive
    class="mx-auto"
    max-width="600"
    height="100%"
  >
    <audio
      ref="audio"
      preload="auto"
      loop
    >
      <source
        src="@/assets/bg.mp3"
        type="audio/mp3"
      >
      Your browser does not support the audio element.
    </audio>
    <div class="player-container">
      <div class="player-verse">
        {{ verseData.content }}
      </div>
      <div class="player-controller">
        <div class="controll-panel">
          <v-btn
            variant="text"
            icon="mdi-bookshelf"
            to="/"
            :loading="loading"
          />
          <v-btn
            v-if="!loading"
            variant="text"
            icon="mdi-book-open-variant-outline"
            :loading="loading"
            @click="allBooks"
          />
          <v-btn
            v-if="!loading"
            variant="text"
            icon="mdi-chevron-left"
            :loading="loading"
            :disabled="!verseData.previous"
            @click="prevVerse"
          />
          <div
            v-if="!loading"
            class="text-caption"
          >
            {{ verseData.reference }}
          </div>
          <v-btn
            v-if="!loading"
            variant="text"
            icon="mdi-chevron-right"
            :loading="loading"
            :disabled="!verseData.next"
            @click="nextVerse"
          />
          <v-btn
            v-if="!isPlaying && !loading"
            variant="text"
            icon="mdi-play"
            :loading="loading"
            @click="playAudio"
          />
          <v-btn
            v-else-if="!loading"
            variant="text"
            icon="mdi-pause"
            :loading="loading"
            @click="pauseAudio"
          />
          <v-btn
            v-if="isFullScreen && !loading"
            variant="text"
            icon="mdi-fullscreen-exit"
            :loading="loading"
            @click="exitFullScreen"
          />
          <v-btn
            v-else-if="!loading"
            variant="text"
            icon="mdi-fullscreen"
            :loading="loading"
            @click="enterFullScreen"
          />
          <v-btn
            v-if="isPlaying && !loading"
            variant="text"
            icon="mdi-volume-high"
            :loading="loading"
            @click="toggleAudio"
          />
          <v-btn
            v-else-if="!loading"
            variant="text"
            icon="mdi-volume-off"
            :loading="loading"
            @click="toggleAudio"
          />
        </div>
      </div>
    </div>
  </v-responsive>
</template>

<script>
import { getBibleVerse } from "@/services/bibleService";
export default {
  data() {
    return {
      isFullScreen: false,
      isPlaying: false,
      loading: false,
      verseData: {},
    };
  },
  async created() {
    if (this.$route.params.bibleId && this.$route.params.verseId) {
      this.isFullScreen = !!document.fullscreenElement;
      await this.getBibleVerseX();
      document.addEventListener(
        "fullscreenchange",
        this.handleFullscreenChange
      );
    } else {
      this.$router.push("/");
    }
  },
  beforeUnmount() {
    document.removeEventListener(
      "fullscreenchange",
      this.handleFullscreenChange
    );
  },
  mounted() {
    this.$refs.audio.volume = 0.5;
  },
  methods: {
    async getBibleVerseX() {
      this.loading = true;
      this.verseData = await getBibleVerse(
        this.$route.params.bibleId,
        this.$route.params.verseId
      );
      console.log(this.verseData);
      this.loading = false;
    },

    handleFullscreenChange() {
      this.isFullScreen = !!document.fullscreenElement;
    },
    enterFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.();
      }
      this.isFullScreen = true;
    },
    exitFullScreen() {
      if (document.fullscreenElement) {
        document.exitFullscreen?.();
      }
      this.isFullScreen = false;
    },
    playAudio() {
      this.enterFullScreen();
      this.$refs.audio.play();
      this.isPlaying = true;
    },
    pauseAudio() {
      this.exitFullScreen();
      this.$refs.audio.pause();
      this.isPlaying = false;
    },
    toggleAudio() {
      if (this.isPlaying) {
        this.$refs.audio.pause();
      } else {
        this.$refs.audio.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    allBooks() {
      this.$router.push({
        name: "Bible",
      });
    },
    async nextVerse() {
      await this.$router.replace({
        params: { verseId: this.verseData.next.id },
      });
      await this.getBibleVerseX();
    },
    async prevVerse() {
      await this.$router.replace({
        params: { verseId: this.verseData.previous.id },
      });
      await this.getBibleVerseX();
    },
  },
};
</script>

<style scoped>
.player-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
}
.player-verse {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.player-controller {
  height: 60px;
}
.controll-panel {
  background: rgba(255, 255, 255, 0.138);
  backdrop-filter: blur(30px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 10px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  height: 100%;
}
.verse {
  text-align: center;
  font-family: "Baloo Thambi 2", system-ui;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
</style>
