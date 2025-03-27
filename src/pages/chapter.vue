<template>
  <v-container>
    <v-card flat color="transparent" max-width="600" class="mb-6 mx-auto">
      <div v-if="bibleInfo.nameLocal" class="text-center px-0 text-h6">
        {{ bibleInfo.nameLocal + " - " + bibleInfo.abbreviationLocal }}
      </div>
      <div class="text-center px-0 py-0 text-medium-emphasis">
        {{ bibleInfo.descriptionLocal }}
      </div>
    </v-card>
    <v-card
      flat
      max-width="600"
      class="mx-auto text-justify"
      color="transparent"
    >
      <div class="text-center px-0 text-h6">
        {{ chapterData.reference }}
      </div>
      <v-card-text>
        <div class="mt-4" v-html="chapterData.content" />
      </v-card-text>

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
        <v-btn size="small" :loading="loading" class="mx-2" flat> Prev </v-btn>
        <v-btn size="small" :loading="loading" class="mx-2" flat> Next </v-btn>
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
        <div v-else class="mt-4 text-disabled">
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
      console.log(this.chapterData);
    } else {
      this.$router.push("/");
    }
  },
  mounted() {
    //
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
    meditate(verse) {
      console.log(verse);
      this.$router.push(`/meditate?verse=${verse.text}`);
    },
  },
};
</script>
<style>
.cl {
  display: none;
}

.v {
  font-size: smaller;
  opacity: 0.6;
  margin-right: 5px;
  padding-top: 10px;
}

.v::before {
  content: "\A";
  white-space: pre;
  line-height: 1.5em;
  display: block;
}

.wj {
  color: #ff0000;
  font-weight: bold;
}
</style>
