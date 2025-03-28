<template>
  <v-container>
    <v-card
      flat
      color="transparent"
      max-width="600"
      class="mb-6 mx-auto"
    >
      <div
        v-if="bibleInfo.nameLocal"
        class="text-center px-0 text-h6"
      >
        {{ bibleInfo.nameLocal + " - " + bibleInfo.abbreviationLocal }}
      </div>
      <div class="text-center px-0 py-0 text-medium-emphasis">
        {{ bibleInfo.descriptionLocal }}
      </div>
    </v-card>
    <v-card
      flat
      max-width="600"
      class="mx-auto text-justif"
      color="transparent"
    >
      <div class="text-center px-0 text-h6">
        {{ chapterData.reference }}
      </div>
      <v-card-text>
        <div
          ref="content"
          v-html="chapterData.content"
        />
      </v-card-text>
      <!--
      <div>
        {{ chapterData.content }}
      </div> -->
      <!-- <span
        v-for="(para, i) in chapterData.content"
        :key="i"
        flat
        color="transparent"
        class="text-body-2"
      >
        <span v-for="(verse, j) in para.items" :key="'verse' + j">
          <span
            v-if="verse.type == 'text'"
            @click="meditate(verse)"
            style="cursor: pointer"
          >
            {{ verse.text }}
          </span>
          <sup
            v-else-if="verse.type == 'tag'"
            class="text-medium-emphasis font-italic mx-2"
          >
            <v-btn
              color="grey-lighten-1"
              variant="text"
              size="x-small"
              @click="meditate(verse)"
            >
              Meditate
              <v-icon class="ms-1"> mdi-weather-windy </v-icon>
            </v-btn>
            <div class="ma-2"></div>
            {{ verse.attrs.number }}
          </sup>
        </span>
      </span> -->
      <div class="text-center py-4">
        <v-btn
          v-if="!loading"
          size="small"
          :loading="loading"
          class="mx-2"
          flat
          :disabled="!chapterData.previous"
          @click="prevChap"
        >
          <v-icon>mdi-chevron-left</v-icon>
          Prev
        </v-btn>
        <v-btn
          :loading="loading"
          class="mx-2"
          icon="mdi-book-open-variant-outline"
          @click="allBooks"
        />
        <v-btn
          v-if="!loading"
          size="small"
          :loading="loading"
          class="mx-2"
          flat
          :disabled="!chapterData.next"
          @click="nextChap"
        >
          Next
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>

      <v-card-text
        v-if="bibleInfo.info || bibleInfo.copyright"
        class="text-body-2 px-0 my-4"
      >
        <v-divider />
        <div
          v-if="bibleInfo.info"
          class="mt-4 text-disabled"
          v-html="bibleInfo.info"
        />
        <div
          v-else
          class="mt-4 text-disabled"
        >
          {{ bibleInfo.copyright }}
        </div>
      </v-card-text>
    </v-card>
  </v-container>
  <AppFooter />
</template>

<script>
import { getBibleInfo, getBibleChapterVerses } from "@/services/bibleService";
export default {
  components: {
    //
  },
  props: [
    //
  ],
  data: () => ({
    loading: false,
    bibleInfo: {},
    chapterData: {},
  }),
  computed: {
    //
  },
  async created() {
    if (this.$route.params.bibleId && this.$route.params.chapterId) {
      await this.getBibleInfoX();
      await this.getBibleChapterVersesX();
      this.addClickEventListeners();
    } else {
      this.$router.push("/");
    }
  },
  mounted() {
    //
  },
  beforeUnmount() {
    this.removeClickEventListeners();
  },
  methods: {
    async getBibleInfoX() {
      this.loading = true;
      this.bibleInfo = await getBibleInfo(this.$route.params.bibleId);
      this.loading = false;
    },
    async getBibleChapterVersesX() {
      this.loading = true;
      this.chapterData = await getBibleChapterVerses(
        this.$route.params.bibleId,
        this.$route.params.chapterId
      );
      this.loading = false;
    },
    async nextChap() {
      await this.$router.replace({
        params: { chapterId: this.chapterData.next.id },
      });
      this.removeClickEventListeners();
      await this.getBibleChapterVersesX();
      this.addClickEventListeners();
      this.scrollToTop();
    },
    async prevChap() {
      await this.$router.replace({
        params: { chapterId: this.chapterData.previous.id },
      });
      this.removeClickEventListeners();
      await this.getBibleChapterVersesX();
      this.addClickEventListeners();
      this.scrollToTop();
    },
    allBooks() {
      this.$router.push({
        name: "Bible",
      });
    },
    addClickEventListeners() {
      const contentElement = this.$refs.content;
      const verses = contentElement.getElementsByClassName("v");
      Array.from(verses).forEach((verse) => {
        verse.addEventListener("click", this.handleClick);
      });
    },
    removeClickEventListeners() {
      const contentElement = this.$refs.content;
      const verses = contentElement.getElementsByClassName("v");
      Array.from(verses).forEach((verse) => {
        verse.removeEventListener("click", this.handleClick);
      });
    },
    handleClick(event) {
      const number = event.target.getAttribute("data-number");
      this.meditate(`${this.chapterData.id}.${number}`);
    },
    meditate(verseId) {
      this.$router.push({ name: "Meditate", params: { verseId: verseId } });
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>
<style>
.p {
  line-height: 1.5em;
}
.cl {
  display: none;
}

.v {
  font-size: x-small;
  opacity: 0.6;
  margin-right: 5px;
  cursor: pointer;
}

.v::before {
  content: "\A";
  white-space: pre;
  display: block;
  line-height: 1.2em;
}

/* .wj {
  color: #ff0000;
  font-weight: bold;
} */

.is {
  font-size: 1.1em;
}

.ip {
  margin-bottom: 10px;
}

.iot {
  font-size: 1.2em;
}

.io1 {
  font-size: 1em;
  margin-left: 20px;
  list-style-type: none;
  padding-left: 0;
}

.ip {
  padding: 5px;
  border-radius: 5px;
}

.is,
.iot {
  padding-bottom: 5px;
}
</style>
