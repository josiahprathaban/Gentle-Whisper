<template>
  <v-container>
    <!-- add a searc bar to searc for a bible using the name or language -->
    <Logo />
    <v-text-field
      v-model="searchQuery"
      placeholder="Search for a Bible"
      append-inner-icon="mdi-magnify"
      max-width="600"
      class="mx-auto"
      variant="outlined"
      @input="filterBibles"
    />
    <v-card
      border
      flat
      max-width="600"
      min-height="4"
      class="mx-auto"
      :loading="loading"
    >
      <v-list
        v-model:opened="openGroups"
        class="py-0"
      >
        <v-list-group
          v-for="(items, langId) in groupedBibles"
          :key="langId"
          :value="langId"
        >
          <template #activator="{ props }">
            <v-list-item v-bind="props">
              <v-list-item-title>
                {{ items[0].language.nameLocal }} ({{ langId }})
              </v-list-item-title>
            </v-list-item>
          </template>

          <v-list-item
            v-for="item in items"
            :key="item.id"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ item.descriptionLocal || "No description" }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list-group>
      </v-list>
      <div
        v-if="nodata"
        class="text-center text-body-2 pa-4"
      >
        No Items
      </div>
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
      const query = this.searchQuery.toLowerCase();
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
    },
  },
};
</script>
