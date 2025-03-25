<template>
  <v-container>
    <!-- <Logo /> -->
    <v-card flat color="transparent" max-width="600" class="mb-6 mx-auto">
      <v-card-title class="text-center px-0">
        {{ bibleInfo.nameLocal + " - " + bibleInfo.abbreviationLocal }}
      </v-card-title>
      <v-card-subtitle class="text-center px-0 py-0">
        {{ bibleInfo.descriptionLocal }}
      </v-card-subtitle>
    </v-card>
    <v-text-field
      v-model="searchQuery"
      placeholder="Search keywords or passage reference"
      append-inner-icon="mdi-magnify"
      max-width="600"
      class="mx-auto"
      variant="solo"
      @change="searchX(false)"
    />
    <v-card
      v-if="searchResults.length > 0"
      flat
      max-width="600"
      min-height="4"
      class="mx-auto"
      :loading="loading"
      color="transparent"
    >
      <v-card
        v-for="(verse, id) in searchResults"
        :key="id"
        border
        flat
        class="my-4"
      >
        <v-card-title class="text-subtitle-1">
          {{ verse.reference }}
        </v-card-title>
        <v-card-text class="pb-0">
          {{ verse.text }}
        </v-card-text>
        <v-card-actions>
          <v-btn size="small"> Read Chapter </v-btn>
          <v-btn size="small"> Meditate </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="nodata" class="text-center text-body-2 pa-4">
        Search not found.
      </v-card>
      <div class="text-center py-4">
        <v-btn
          v-if="isMore"
          size="small"
          :loading="loading"
          class="mx-2"
          @click="searchX(true)"
        >
          Load More
        </v-btn>
        <v-btn size="small" class="text-red mx-2" @click="clearSearch">
          Clear
        </v-btn>
      </div>
    </v-card>
    <v-card
      v-else
      flat
      max-width="600"
      min-height="4"
      class="mx-auto"
      :loading="loading"
      color="transparent"
    >
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(book, id) in bibleBooks"
          :key="id"
          :title="book.name"
        >
          <v-expansion-panel-text>
            <v-chip-group column>
              <v-chip
                v-for="(chapter, id) in book.chapters"
                :key="id"
                :text="chapter.number"
              />
            </v-chip-group>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-card-text class="text-body-2 text-justify px-0 my-4">
        <v-divider />
        <div class="mt-4 text-disabled" v-html="bibleInfo.info" />
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
    if (this.$route.params.id) {
      if (this.$route.query.search) {
        this.searchQuery = this.$route.query.search;
        this.searchX();
      } else {
        await this.getBibleInfoX();
        await this.getBibleBooksX();
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
          this.$route.params.id,
          this.searchQuery,
          this.offset
        );
        if (isLoadMore) {
          this.searchResults.push(...response.verses);
        } else {
          this.searchResults = [];
          this.searchResults = response.verses;
        }
        if (this.searchResults.length == 0) {
          this.nodata = true;
        }
        this.isMore = response.total > this.searchResults.length;
        this.loading = false;
      } else {
        this.nodata = false;
      }
    },
    async getBibleInfoX() {
      this.loading = true;
      this.bibleInfo = await getBibleInfo(this.$route.params.id);
      console.log(this.bibleInfo);
      this.loading = false;
    },
    async getBibleBooksX() {
      this.loading = true;
      this.bibleBooks = await getBibleBooks(this.$route.params.id);
      this.loading = false;
    },

    readChapter(id) {
      console.log(id);
    },
    meditate() {},
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
