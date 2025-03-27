<template>
  <v-container>
    <!-- <Logo /> -->
    <v-card flat color="transparent" max-width="600" class="mb-6 mx-auto">
      <div v-if="bibleInfo.nameLocal" class="text-center px-0 text-h6">
        {{ bibleInfo.nameLocal + " - " + bibleInfo.abbreviationLocal }}
      </div>
      <div class="text-center px-0 py-0 text-medium-emphasis">
        {{ bibleInfo.descriptionLocal }}
      </div>
    </v-card>
    <v-text-field
      v-model="searchQuery"
      flat
      placeholder="Search keywords or passage reference"
      append-inner-icon="mdi-magnify"
      max-width="600"
      class="mx-auto"
      variant="solo"
      clearable
      clear-icon="mdi-close"
      :loading="loading"
      @change="searchX(false)"
      @click:append-inner="searchX(false)"
      @click:clear="clearSearch"
    />
    <v-card
      v-if="nodata"
      class="text-center text-body-2 pa-4 mx-auto mb-4 text-medium-emphasis"
      flat
      max-width="600"
    >
      Search not found. <br />
      Please refer to the index table or try using different keywords.
    </v-card>
    <v-card
      v-if="searchResults.length > 0"
      flat
      max-width="600"
      class="mx-auto"
      color="transparent"
    >
      <v-card v-for="verse in searchResults" :key="verse.id" flat class="my-3">
        <v-card-title class="text-subtitle-1">
          {{ verse.reference }}
        </v-card-title>
        <v-card-text class="pb-0">
          {{ verse.text }}
        </v-card-text>
        <v-card-actions>
          <v-btn size="small" color="grey" @click="readChapter(verse)">
            Read Chapter
            <v-icon class="ms-1"> mdi-book-open-variant-outline </v-icon>
          </v-btn>
          <v-btn color="grey-lighten-1" size="small" @click="meditate(verse)">
            Meditate
            <v-icon class="ms-1"> mdi-weather-windy </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <div class="text-center py-4">
        <v-btn
          v-if="isMore"
          size="small"
          :loading="loading"
          class="mx-2"
          flat
          @click="searchX(true)"
        >
          Load More
        </v-btn>
        <v-btn flat size="small" class="text-red mx-2" @click="clearSearch">
          Clear
        </v-btn>
      </div>
    </v-card>
    <v-card v-else flat max-width="600" class="mx-auto" color="transparent">
      <v-expansion-panels elevation="0">
        <v-expansion-panel
          v-for="book in bibleBooks"
          :key="book.id"
          :title="book.name"
        >
          <v-expansion-panel-text>
            <v-chip-group column>
              <v-chip
                v-for="chapter in book.chapters"
                :key="chapter.id"
                :text="chapter.number"
                rounded="sm"
              />
            </v-chip-group>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

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
import { search, getBibleInfo, getBibleBooks } from "@/services/bibleService";
export default {
  components: {
    //
  },
  props: [
    //
  ],
  data: () => ({
    offset: 1,
    isMore: false,
    searchQuery: "",
    searchResults: [],
    loading: false,
    nodata: false,
    openGroups: false,
    bibleInfo: {},
    bibleBooks: [],
  }),
  computed: {
    //
  },
  async created() {
    if (this.$route.params.bibleId) {
      await this.getBibleInfoX();
      await this.getBibleBooksX();
      if (this.$route.query.search) {
        this.searchQuery = this.$route.query.search;
        this.searchX();
      }
    } else {
      this.$router.push("/");
    }
  },
  mounted() {
    //
  },
  methods: {
    async searchX(isLoadMore = false) {
      this.searchQuery = this.searchQuery.trim();
      this.$router.replace({
        query: { ...this.$route.query, search: this.searchQuery },
      });
      if (this.searchQuery != "") {
        this.isMore = isLoadMore;
        if (isLoadMore) {
          this.offset++;
        } else {
          this.offset = 1;
        }
        this.loading = true;
        let response = await search(
          this.$route.params.bibleId,
          this.searchQuery,
          this.offset
        );
        if (isLoadMore) {
          this.searchResults.push(...response.verses);
        } else {
          this.searchResults = [];
          this.searchResults = response.verses;
        }
        this.nodata = this.searchResults.length == 0;

        this.isMore = response.total > this.searchResults.length;
        this.loading = false;
      } else {
        this.clearSearch();
      }
    },
    async getBibleInfoX() {
      this.loading = true;
      this.bibleInfo = await getBibleInfo(this.$route.params.bibleId);
      this.loading = false;
    },
    async getBibleBooksX() {
      this.loading = true;
      this.bibleBooks = await getBibleBooks(this.$route.params.bibleId);
      this.loading = false;
    },

    readChapter(verse) {
      console.log(verse)
      this.$router.push({ name: "Chapter", params: { chapterId: verse.chapterId } });
    },
    meditate(verse) {
      console.log(verse);
      this.$router.push(`/meditate?verse=${verse.text}`);
    },
    clearSearch() {
      this.nodata = false;
      this.searchQuery = "";
      this.searchResults = [];
      this.$router.replace({
        query: { ...this.$route.query, search: this.searchQuery },
      });
    },
  },
};
</script>
