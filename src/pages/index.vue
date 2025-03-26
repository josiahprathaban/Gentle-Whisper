<template>
  <v-container>
    <Logo />
    <v-card
      flat
      color="transparent"
      max-width="600"
      class="mb-6 mx-auto"
    >
      <v-card-text class="text-body-2 font-weight-thin text-justify pa-0">
        Gentle Whisper is a peaceful meditation app designed to help you connect
        with God through His Word. Select a Bible verse, and immerse yourself in
        a calming, animated space filled with gentle sounds of peace and
        stillness. As you reflect on the verse, let the soothing atmosphere and
        soft music guide your heart and mind to rest in His presence. Gentle
        Whisper is a sacred space for meditation, prayer, and quiet moments with
        God.
      </v-card-text>
    </v-card>
    <v-text-field
      v-model="searchQuery"
      flat
      placeholder="Search for a Bible"
      append-inner-icon="mdi-magnify"
      max-width="600"
      class="mx-auto"
      variant="solo"
      clear-icon="mdi-close"
      clearable
      :loading="loading"
      @change="filterBibles"
      @click:append-inner="filterBibles"
      @click:clear="filterBibles"
    />
    <v-card
      flat
      max-width="600"
      class="mx-auto"
      color="transparent"
    >
      <v-expansion-panels elevation="0">
        <v-expansion-panel
          v-for="(items, langId) in groupedBibles"
          :key="langId"
          :value="langId"
          :title="items[0].language.nameLocal + '(' + langId + ')'"
          :lazy="true"
        >
          <v-expansion-panel-text>
            <v-list-item
              v-for="item in items"
              :key="item.id"
              rounded
              @click="selectBible(item.id)"
            >
              <v-list-item-title class="text-medium-emphasis">
                {{ item.nameLocal }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-disabled">
                {{ item.descriptionLocal || "No description" }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-card
        v-if="nodata"
        class="text-center text-body-2 pa-4"
      >
        No Items
      </v-card>
    </v-card>
  </v-container>
  <AppFooter />
</template>

<script>
import { getBibles } from "@/services/bibleService";
export default {
  components: {
    //
  },
  props: [
    //
  ],
  data: () => ({
    bibles: [],
    groupedBibles: {},
    openGroups: [],
    searchQuery: "",
    loading: false,
    nodata: false,
  }),
  computed: {
    //
  },
  async created() {
    this.loading = true;
    this.bibles = await getBibles();
    this.groupedBibles = this.groupBiblesByLanguage(this.bibles);
    this.loading = false;
    //
  },
  mounted() {
    //
  },
  methods: {
    groupBiblesByLanguage(bibles) {
      const grouped = {};
      bibles.forEach((item) => {
        const langId = item.language.id;
        if (!grouped[langId]) {
          grouped[langId] = [];
        }
        grouped[langId].push(item);
      });
      return grouped;
    },
    filterBibles() {
      if (!this.searchQuery || this.searchQuery.trim() == "") {
        this.groupedBibles = this.groupBiblesByLanguage(this.bibles);
      } else {
        const query = this.searchQuery.trim().toLowerCase();
        const filteredBibles = this.bibles.filter((item) => {
          const nameMatches = item.name.toLowerCase().includes(query);
          const languageMatches = item.language.name
            .toLowerCase()
            .includes(query);
          return nameMatches || languageMatches;
        });
        if (filteredBibles.length == 0) {
          this.nodata = true;
        } else {
          this.nodata = false;
        }
        this.groupedBibles = this.groupBiblesByLanguage(filteredBibles);
      }
    },
    selectBible(id) {
      this.$router.push(`/bible/${id}`);
    },
  },
};
</script>
